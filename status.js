// Define your services and their URLs
const services = [
    { name: 'Website', url: 'https://ricardo-s-website.netlify.app/' },
    { name: 'API', url: 'https://boken.url.com' },
    // Add more services here with their URLs
];

// Function to check the status of each service
async function checkStatus() {
    for (const service of services) {
        try {
            const response = await fetch(service.url, { method: 'HEAD' });
            if (response.ok) {
                service.status = true;
            } else {
                service.status = false;
            }
        } catch (error) {
            console.error(`Error checking status of ${service.name}: ${error}`);
            service.status = false;
        }
    }
}

// Function to render the status of each service
function renderStatus() {
    const statusContainer = document.getElementById('status-container');
    statusContainer.innerHTML = '';

    services.forEach(service => {
        const serviceDiv = document.createElement('div');
        serviceDiv.classList.add('service');
        serviceDiv.innerHTML = `<span class="${service.status ? 'service-up' : 'service-down'}">${service.name} is ${service.status ? 'up' : 'down'}</span>`;
        statusContainer.appendChild(serviceDiv);
    });
}

// Function to periodically update the status
async function updateStatus() {
    await checkStatus();
    renderStatus();
    // Repeat every 5 minutes (300000 milliseconds)
    setTimeout(updateStatus, 300000);
}

// Initial rendering
updateStatus();
