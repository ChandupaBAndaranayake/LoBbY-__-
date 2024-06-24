document.addEventListener('DOMContentLoaded', () => {
    const rainContainer = document.querySelector('.rain-container');

    function createRaindrop() {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = `${Math.random() * 100}vw`;
        raindrop.style.animationDuration = `${Math.random() * 2 + 2}s`;
        rainContainer.appendChild(raindrop);

        // Remove the raindrop after animation ends
        raindrop.addEventListener('animationend', () => {
            raindrop.remove();
        });
    }

    // Generate raindrops continuously
    setInterval(createRaindrop, 100);
});
