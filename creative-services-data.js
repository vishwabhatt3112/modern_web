const u = (id) => `https://images.unsplash.com/${id}?w=900&q=85&auto=format&fit=crop`;

export const creativeServicesData = {
    videography: {
        title: 'Videography',
        media: [
            { type: 'video', title: 'Wedding Highlight Reel', src: 'videos/mvid.mp4' },
            { type: 'image', title: 'Wedding Portfolio', src: 'images/creative/videography/meet.png' },
            { type: 'image', title: 'Bridal Moments', src: 'images/creative/videography/meet2.png' }
        ]
    },
    'drone-photography': {
        title: 'Drone Photography',
        media: [
            { type: 'image', title: 'Aerial Wedding Film', src: 'images/creative/drone/aerial-wedding-film.png' },
            { type: 'image', title: 'Landscape Drone Reel', src: 'images/creative/drone/landscape-drone-reel.png' },
            { type: 'image', title: 'Cinematic Flyover', src: 'images/creative/drone/cinematic-flyover.png' }
        ]
    },
    'photo-editing-retouching': {
        title: 'Photo Editing & Retouching',
        samples: [
            {
                label: 'Portrait Retouch',
                combined: 'images/creative/editing/portrait-retouch.png'
            },
            {
                label: 'Wedding Color Grade',
                combined: 'images/creative/editing/wedding-color-grade.png'
            },
            {
                label: 'Skin & Tone Polish',
                combined: 'images/creative/editing/skin-tone-polish.png'
            },
            {
                label: 'Wedding Glam',
                combined: 'images/creative/editing/wedding-glam.png'
            },
            {
                label: 'Prewedding',
                combined: 'images/creative/editing/prewedding.png'
            }
        ]
    },
    'photo-frames-albums': {
        title: 'Photo Frames & Albums',
        albums: [
            { title: 'Leather Wedding Album', src: 'images/creative/frames-albums/leather-wedding-album.png' },
            { title: 'Premium Layflat Album', src: 'images/creative/frames-albums/premium-layflat-album.png' },
            { title: 'Family Memory Book', src: 'images/creative/frames-albums/family-memory-book.png' }
        ],
        frames: [
            { title: 'Classic Wooden Frame', src: 'images/creative/frames-albums/classic-wooden-frame.png' },
            { title: 'Gallery Wall Set', src: 'images/creative/frames-albums/gallery-wall-set.png' },
            { title: 'Lamination Frame', src: 'images/creative/frames-albums/lamination-frame.png' }
        ]
    }
};

export const creativeServiceNames = {
    'Videography': 'videography',
    'Drone Photography': 'drone-photography',
    'Photo Editing & Retouching': 'photo-editing-retouching',
    'Photo Frames & Albums': 'photo-frames-albums'
};
