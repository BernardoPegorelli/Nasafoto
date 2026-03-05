import os
import requests
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

# Get the absolute path to the frontend directory
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend'))

app = Flask(__name__)
CORS(app)

NASA_API_KEY = os.getenv("NASA_API_KEY")

@app.route('/')
def index():
    return send_from_directory(frontend_dir, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(frontend_dir, path)

@app.route('/api/apod', methods=['GET'])
def get_apod():
    date = request.args.get('date')
    if not date:
        return jsonify({"error": "Date is required"}), 400
    
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}&date={date}"
    
    try:
        response = requests.get(url, verify=False)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.HTTPError as e:
        return jsonify({"error": str(e), "details": response.json().get('msg', 'Error fetching APOD')}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
