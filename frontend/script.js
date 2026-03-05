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

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    birthDateInput.setAttribute('max', today);

    fetchBtn.addEventListener('click', async () => {
        const date = birthDateInput.value;
        if (!date) {
            alert('Por favor, selecione uma data.');
            return;
        }

        // Reset UI
        resultSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loader.classList.remove('hidden');

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/apod?date=${date}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Erro ao buscar dados da NASA');
            }

            // Update UI with NASA data
            apodTitle.innerText = data.title;
            apodDate.innerText = formatDate(data.date);
            apodExplanation.innerText = data.explanation;

            // Handle media (image or video)
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
        return new Date(dateStr + "T00:00:00").toLocaleDateString('pt-br', options);
    }
});
