document.addEventListener('DOMContentLoaded', () => {
    const birthDateInput = document.getElementById('birth-date');
    const fetchBtn = document.getElementById('fetch-btn');
    const resultSection = document.getElementById('result-section');
    const loader = document.getElementById('loader');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodExplanation = document.getElementById('apod-explanation');
    const mediaContainer = document.getElementById('media-container');
    const errorMessage = document.getElementById('error-message');

    const today = new Date().toISOString().split('T')[0];
    birthDateInput.setAttribute('max', today);

    fetchBtn.addEventListener('click', async () => {
        const date = birthDateInput.value;

        if (!date) {
            alert('Por favor, selecione uma data.');
            return;
        }

        resultSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loader.classList.remove('hidden');

        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`);

            if (!response.ok) {
                const text = await response.text(); // evita erro de JSON
                throw new Error(`Erro ${response.status}: ${text}`);
            }

            const data = await response.json();

            apodTitle.innerText = data.title || 'Imagem Astronômica do Dia';
            apodDate.innerText = data.date ? formatDate(data.date) : '';
            apodExplanation.innerText = data.explanation || 'Sem descrição disponível.';

            mediaContainer.innerHTML = '';

            if (data.media_type === 'image') {
                const img = document.createElement('img');
                img.src = data.url;
                img.alt = data.title;
                mediaContainer.appendChild(img);
            } else if (data.media_type === 'video') {
                const iframe = document.createElement('iframe');
                iframe.src = data.url;
                iframe.frameBorder = "0";
                iframe.allow = "autoplay; encrypted-media";
                iframe.allowFullscreen = true;
                mediaContainer.appendChild(iframe);
            }

            loader.classList.add('hidden');
            resultSection.classList.remove('hidden');
            resultSection.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error(error);
            loader.classList.add('hidden');
            errorMessage.classList.remove('hidden');
            errorMessage.innerText = `Erro: ${error.message}`;
        }
    });

    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr + "T00:00:00").toLocaleDateString('pt-BR', options);
    }
});