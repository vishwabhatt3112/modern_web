import { creativeServicesData } from './creative-services-data.js';

const modal = document.getElementById('creative-service-modal');
const modalTitle = document.getElementById('creative-service-modal-title');
const modalBody = document.getElementById('creative-service-modal-body');
const modalClose = document.querySelector('.creative-service-modal-close');

function youtubeEmbed(id) {
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}

function renderVideos(videos) {
    return `<div class="creative-video-grid">${videos
        .map(
            (v) => `
        <div class="creative-video-item">
            <h4>${v.title}</h4>
            <iframe src="${youtubeEmbed(v.id)}" title="${v.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`
        )
        .join('')}</div>`;
}

function renderVideographyMedia(media) {
    return `<div class="creative-video-grid">${media
        .map((item) => {
            if (item.type === 'video') {
                return `
        <div class="creative-video-item">
            <h4>${item.title}</h4>
            <video class="creative-local-video" controls playsinline preload="metadata">
                <source src="${item.src}" type="video/mp4">
            </video>
        </div>`;
            }
            return `
        <div class="creative-video-item">
            <h4>${item.title}</h4>
            <img class="creative-videography-image" src="${item.src}" alt="${item.title}" loading="lazy">
        </div>`;
        })
        .join('')}</div>`;
}

function renderEditing(samples) {
    return `<div class="creative-edit-list">${samples
        .map((s) => {
            if (s.combined) {
                return `
        <div class="creative-edit-item">
            <h4>${s.label}</h4>
            <figure class="creative-before-after-combined">
                <img src="${s.combined}" alt="${s.label}" loading="lazy">
            </figure>
        </div>`;
            }
            return `
        <div class="creative-edit-item">
            <h4>${s.label}</h4>
            <div class="creative-before-after">
                <figure>
                    <img src="${s.before}" alt="${s.label} before" loading="lazy">
                    <figcaption>Before</figcaption>
                </figure>
                <figure>
                    <img src="${s.after}" alt="${s.label} after" loading="lazy">
                    <figcaption>After</figcaption>
                </figure>
            </div>
        </div>`;
        })
        .join('')}</div>`;
}

function renderGallerySection(title, items) {
    return `
        <div class="creative-gallery-section">
            <h4>${title}</h4>
            <div class="creative-gallery-grid">
                ${items
                    .map(
                        (item) => `
                    <figure>
                        <img src="${item.src}" alt="${item.title}" loading="lazy">
                        <figcaption>${item.title}</figcaption>
                    </figure>`
                    )
                    .join('')}
            </div>
        </div>`;
}

function openCreativeModal(key) {
    const data = creativeServicesData[key];
    if (!data || !modal) return;

    modalTitle.textContent = data.title;

    if (data.media) {
        modalBody.innerHTML = renderVideographyMedia(data.media);
    } else if (data.videos) {
        modalBody.innerHTML = renderVideos(data.videos);
    } else if (data.samples) {
        modalBody.innerHTML = renderEditing(data.samples);
    } else if (data.albums) {
        modalBody.innerHTML =
            renderGallerySection('Album Photos', data.albums) +
            renderGallerySection('Frame Photos', data.frames);
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCreativeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
}

export function initCreativeServiceModals(creativeGrid, serviceNames) {
    if (!modal || !creativeGrid) return;

    creativeGrid.querySelectorAll('.service-card').forEach((card) => {
        const name = card.querySelector('.service-name')?.textContent.trim();
        const key = name ? serviceNames[name] : null;
        if (!key) return;

        card.style.cursor = 'pointer';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        const open = () => openCreativeModal(key);

        card.addEventListener('click', open);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
        });
    });

    modalClose?.addEventListener('click', closeCreativeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCreativeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCreativeModal();
        }
    });
}
