import { servicesData } from './services-data.js';

const root = document.getElementById('service-detail-root');
const slug = root?.dataset.service;
const service = slug ? servicesData[slug] : null;

if (!service) {
    window.location.href = '../index.html#services';
} else {
    document.title = `${service.title} | Modern Photo Studio`;

    root.innerHTML = `
        <a href="../index.html#services" class="service-detail-back">&larr; Back</a>
        <h1 class="service-detail-title">${service.title}</h1>
        <img class="service-detail-image" src="${service.image}" alt="${service.title}" decoding="async" fetchpriority="high">
        <p class="service-detail-description">${service.description}</p>
    `;
}
