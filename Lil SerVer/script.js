function updateStatus() {
    fetch('/status')
        .then(response => response.json())
        .then(data => {
            document.getElementById('status').innerText = data.status;
        });
}

setInterval(updateStatus, 1000); // Update every second
updateStatus(); // Initial update
