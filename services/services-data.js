const unsplash = (id) =>
    `https://images.unsplash.com/${id}?w=1600&q=85&auto=format&fit=crop`;

export const servicesData = {
    'wedding-photography': {
        title: 'Wedding Photography',
        description: 'Capturing every romantic moment, traditional ritual, and high-fashion couple portraits on your big day.',
        image: '../images/services/wedding-photography.png'
    },
    'pre-wedding-photography': {
        title: 'Pre-Wedding Photography',
        description: 'Artistic, cinematic outdoor couples sessions telling your unique love story before the wedding.',
        image: '../images/services/pre-wedding-photography.png'
    },
    'engagement-photography': {
        title: 'Engagement Photography',
        description: 'Candid coverage of your ring ceremony and editorial lifestyle portraits of your commitment.',
        image: '../images/services/engagement-photography.png'
    },
    'birthday-photography': {
        title: 'Birthday Photography',
        description: 'Fun, energetic, and beautifully lit captures of milestone birthday celebrations and parties.',
        image: unsplash('photo-1530103862676-de8c9debad1d')
    },
    'baby-shoot': {
        title: 'Baby Shoot',
        description: 'Patient and creative baby portrait sessions utilizing safe, warm, and highly aesthetic settings.',
        image: '../images/services/baby-shoot.png'
    },
    'maternity-shoot': {
        title: 'Maternity Shoot',
        description: 'Celebrating motherhood with elegant, ethereal portraits showcasing the beautiful journey of life.',
        image: '../images/services/maternity-shoot.png'
    },
    'fashion-photography': {
        title: 'Fashion Photography',
        description: 'High-end editorial fashion portfolio designs for models, designers, and luxury apparel brands.',
        image: unsplash('photo-1509631179647-0177331693ae')
    },
    'event-photography': {
        title: 'Event Photography',
        description: 'Complete photographic coverage of corporate events, concerts, galas, and private functions.',
        image: unsplash('photo-1492684223066-81342ee5ff30')
    },
    'studio-portrait-photography': {
        title: 'Studio Portrait Photography',
        description: 'Classic studio portraiture capturing individual character with high-end dramatic lighting.',
        image: '../images/services/studio-portrait-photography.png'
    },
    'corporate-headshots': {
        title: 'Corporate Headshots',
        description: 'Sharp, authoritative portraits for LinkedIn, websites, and business publications that command respect.',
        image: '../images/services/corporate-headshots.png'
    },
    'passport-size-photos': {
        title: 'Passport Size Photos',
        description: 'Perfect lighting and composition matching official governmental specifications for any country.',
        image: '../images/services/passport-size-photos.png'
    },
    'visa-photos': {
        title: 'Visa Photos',
        description: 'Strict compliance with international embassy guidelines including sizes (US, Schengen, etc.).',
        image: '../images/services/visa-photos.png'
    },
    'aadhaar-card-photos': {
        title: 'Aadhaar Card Photos',
        description: 'High-contrast, direct front-facing official identity card portraits ready for update portals.',
        image: '../images/services/aadhaar-card-photos.png'
    },
    'pan-card-photos': {
        title: 'PAN Card Photos',
        description: 'Professional compliance portraits scaled perfectly for PAN card application guidelines.',
        image: '../images/services/pan-card-photos.png'
    },
    'id-card-photos': {
        title: 'ID Card Photos',
        description: 'Standardized student or corporate employee ID photo shoots with customizable background choices.',
        image: '../images/services/id-card-photos.png'
    },
    'instant-photo-printing': {
        title: 'Instant Photo Printing',
        description: 'Ultra-premium dye-sublimation gloss/matte photo prints ready in minutes at our studio counters.',
        image: '../images/services/instant-photo-printing.png'
    },
    'videography': {
        title: 'Videography',
        description: 'Cinematic 4K videos, wedding highlight reels, and creative corporate brand commercials.',
        image: unsplash('photo-1492691527719-9d1e07b1b6a0')
    },
    'drone-photography': {
        title: 'Drone Photography',
        description: 'Dramatic aerial shots and video sequences using state-of-the-art cinematic drones.',
        image: unsplash('photo-1473968961928-a2b0aec79a8b')
    },
    'photo-editing-retouching': {
        title: 'Photo Editing & Retouching',
        description: 'Skin smoothing, color grading, background cleaning, and custom digital composite editing.',
        image: unsplash('photo-1542038784456-1ea8e935640e')
    },
    'photo-frames-albums': {
        title: 'Photo Frames & Albums',
        description: 'Handcrafted premium leather-bound photo albums and customized wooden wall mount framing.',
        image: unsplash('photo-1586393308450-e8d85d5ddc11')
    }
};
