import { resolve } from 'path';
import { defineConfig } from 'vite';

const servicePages = [
    'wedding-photography',
    'pre-wedding-photography',
    'engagement-photography',
    'birthday-photography',
    'baby-shoot',
    'maternity-shoot',
    'fashion-photography',
    'event-photography',
    'studio-portrait-photography',
    'corporate-headshots',
    'passport-size-photos',
    'visa-photos',
    'aadhaar-card-photos',
    'pan-card-photos',
    'id-card-photos',
    'instant-photo-printing',
    'videography',
    'drone-photography',
    'photo-editing-retouching',
    'photo-frames-albums'
];

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                ...Object.fromEntries(
                    servicePages.map((slug) => [slug, resolve(__dirname, `services/${slug}.html`)])
                )
            }
        }
    }
});
