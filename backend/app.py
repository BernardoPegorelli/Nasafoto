import os
import requests
import certifi
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

# Caminho do frontend
frontend_dir = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'frontend')
)

app = Flask(__name__)
CORS(app)

NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")


@app.route('/api/apod', methods=['GET'])
def get_apod():
    date = request.args.get('date')

    if not date:
        return jsonify({"error": "Date is required"}), 400

    url = "https://api.nasa.gov/planetary/apod"

    try:
        response = requests.get(
            url,
            params={
                "api_key": NASA_API_KEY,
                "date": date
            },
            timeout=30,
            verify=False  # ✅ correção do SSL
        )

        response.raise_for_status()
        return jsonify(response.json())

    except requests.exceptions.HTTPError:
        return jsonify({
            "error": "NASA API error",
            "details": response.text
        }), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({
            "error": "Connection error",
            "details": str(e)
        }), 503

    except Exception as e:
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


# Servir frontend
@app.route('/')
def index():
    return send_from_directory(frontend_dir, 'index.html')


@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(frontend_dir, path)


if __name__ == '__main__':
    app.run(debug=True, port=5000)