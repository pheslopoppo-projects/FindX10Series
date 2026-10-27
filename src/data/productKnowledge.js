/**
 * Central Data Architecture for Find X10 Training Modules
 * Featuring official OPPO Find X10 Pro Max & OPPO Find X10 specifications and interactive quiz data.
 */

export const moduleContent = [
  {
    id: 'module-1',
    moduleId: 1,
    title: 'Find X10 Pro Max: Camera',
    subtitle: "World's First Triple 200MP Camera",
    badge: 'Module 1',
    locked: false,
    duration: '5 Slides • 3 Quiz Qs',
    slides: [
      {
        id: 'm1-s1',
        slideNumber: 1,
        title: "World's First Triple 200MP Camera System",
        description: "Co-developed with Hasselblad, the Find X10 Pro Max introduces the world's first smartphone featuring three distinct 200MP sensors across Wide, Telephoto, and Ultra-Wide lenses.",
        imageUrl: '/assets/images/SIDECAMERAMODULEPM.webp'
      },
      {
        id: 'm1-s2',
        slideNumber: 2,
        title: '200MP Ultra Clear Telephoto & 200MP Main Camera',
        description: 'Featuring a revolutionary 200MP Main lens with DeepPix technology for cinema quality dynamic range, and an Ultra Clear telephoto camera for unprecedented optical detail from 3X portraits!',
        imageUrl: '/assets/images/SUNSET.png'
      },
      {
        id: 'm1-s3',
        slideNumber: 3,
        title: 'Hasselblad Master Color Calibration',
        description: 'Legendary camera maker Hasselblad co-developed the color science, processing 16-bit computational RAW data from the 200MP sensors for authentic skin tones and natural tonal depth.',
        imageUrl: '/assets/images/TIGER.webp'
      },
      {
        id: 'm1-s4',
        slideNumber: 4,
        title: '200MP Ultra-Wide & 8K Video',
        description: 'The 200MP ultra-wide sensor is the biggest on any phone, and delivers edge-to-edge sharpness with zero distortion. With three 200MP cameras you can film 8K video on all rear cameras!',
        imageUrl: '/assets/images/8KVIDEO.webp'
      },
      {
        id: 'm1-s5',
        slideNumber: 5,
        title: 'AI Studio Portrait & 200MP High-Res Mode',
        description: 'Shoot full-resolution 200MP images with instant AI recomposition, intelligent object and reflection removal, and Hasselblad XCD portrait lens simulation.',
        imageUrl: '/assets/images/LUMOFRAMINGAFTER.png'
      }
    ],
    quiz: [
      {
        id: 'm1-q1',
        question: 'What makes the Find X10 Pro Max camera system a world first?',
        options: ['Triple 200MP Camera', 'Quad 50MP Camera', 'Dual 100MP Camera'],
        answer: 'Triple 200MP Camera',
        explanation: 'The Find X10 Pro Max is the world’s first phone featuring three 200MP sensors across all rear cameras.'
      },
      {
        id: 'm1-q2',
        question: 'Which legendary brand co-developed the imaging system?',
        options: ['Leica', 'Hasselblad', 'Zeiss'],
        answer: 'Hasselblad',
        explanation: 'OPPO partnered with Hasselblad to engineer natural color calibration and iconic portrait optics.'
      },
      {
        id: 'm1-q3',
        question: 'How many lenses can you capture 8K video with?',
        options: ['One', 'Two', 'All three'],
        answer: 'All three',
        explanation: 'All three rear lenses—wide, periscope telephoto, and ultra-wide—are equipped with 200MP sensors.'
      }
    ]
  },
  {
    id: 'module-2',
    moduleId: 2,
    title: 'Find X10 Pro Max: Power & OS',
    subtitle: '7150mAh Battery & Dimensity 9600 Pro',
    badge: 'Module 2',
    locked: false,
    duration: '5 Slides • 3 Quiz Qs',
    slides: [
      {
        id: 'm2-s1',
        slideNumber: 1,
        title: 'Massive 7,150mAh Silicon-Carbon Battery',
        description: 'Next-generation high-density Silicon-Carbon anode technology packs a massive 7,150mAh battery into an ultra-slim chassis, delivering over two full days of demanding use.',
        imageUrl: '/assets/images/BATTERYX10PM.webp'
      },
      {
        id: 'm2-s2',
        slideNumber: 2,
        title: 'Flagship MediaTek Dimensity 9600 Pro Chipset',
        description: 'Powered by the ultra-powerful Dimensity 9600 Pro 2nm processor, delivering benchmark-shattering CPU and GPU speeds with advanced generative AI hardware acceleration.',
        imageUrl: '/assets/images/CHIPSET9600PRO.webp'
      },
      {
        id: 'm2-s3',
        slideNumber: 3,
        title: '80W SUPERVOOC Flash Charge & 6-Year Longevity',
        description: '80W wired SUPERVOOC charges the 7,150mAh cell safely in minutes. The 6-Year Battery Longevity engine guarantees over 80% health after extended charging cycles.',
        imageUrl: '/assets/images/X10PMBATTERY.webp'
      },
      {
        id: 'm2-s4',
        slideNumber: 4,
        title: 'ColorOS 17 Out of the Box',
        description: 'Running the all-new ColorOS 17 out of the box, featuring a parallel animation architecture for uninterrupted 120Hz gestures and next-level privacy controls.',
        imageUrl: '/assets/images/COLOROS17.webp'
      },
      {
        id: 'm2-s5',
        slideNumber: 5,
        title: 'Fluid Cloud & Generative AI Mind Engine',
        description: 'Dynamic live activity tracking via Fluid Cloud, real-time voice call translation, and instant smart AI note summarization built directly into the operating system.',
        imageUrl: '/assets/images/COLOURPALLETTERESULT.png'
      }
    ],
    quiz: [
      {
        id: 'm2-q1',
        question: 'What is the battery capacity of the Find X10 Pro Max?',
        options: ['5000mAh', '7150mAh', '7050mAh'],
        answer: '7150mAh',
        explanation: 'A cutting-edge 7150mAh Silicon-Carbon battery provides class-leading endurance.'
      },
      {
        id: 'm2-q2',
        question: 'Which flagship chipset powers the device?',
        options: ['Snapdragon 8 Gen 4', 'Dimensity 9600 Pro', 'Dimensity 9600M'],
        answer: 'Dimensity 9600 Pro',
        explanation: 'The Dimensity 9600 Pro provides industry-leading processing efficiency and on-device AI performance.'
      },
      {
        id: 'm2-q3',
        question: 'What operating system does the device run out of the box?',
        options: ['ColorOS 16', 'ColorOS 17', 'OxygenOS 15'],
        answer: 'ColorOS 17',
        explanation: 'The Find X10 Pro Max ships with the new ColorOS 17 operating system pre-installed.'
      }
    ]
  },
  {
    id: 'module-3',
    moduleId: 3,
    title: 'OPPO Find X10',
    subtitle: 'Dual 200MP & 7150mAh Battery',
    badge: 'Module 3',
    locked: false,
    duration: '6 Slides • 4 Quiz Qs',
    slides: [
      {
        id: 'm3-s1',
        slideNumber: 1,
        title: 'OPPO Find X10: Mist Grey Elegance',
        description: 'Introducing the OPPO Find X10 in the signature Mist Grey colorway. Crafted with premium aerospace-grade materials, ergonomic curves, and an ultra-refined tactile finish that feels extraordinary in the hand.',
        imageUrl: '/X10BACKRIGHT.webp'
      },
      {
        id: 'm3-s2',
        slideNumber: 2,
        title: '7150mAh Silicon-Carbon Battery & 80W Charging',
        description: 'Boasting a massive 7150mAh Silicon-Carbon battery engineered for up to two full days of intensive use. Supported by 80W wired SUPERVOOC and 50W wireless flash charging for effortless power top-ups.',
        imageUrl: '/X10BATTERY.webp'
      },
      {
        id: 'm3-s3',
        slideNumber: 3,
        title: '6.59" 120Hz LTPO AMOLED 2000 Nits Display',
        description: 'Featuring a vivid 6.59-inch AMOLED LTPO display with dynamic 1-120Hz adaptive refresh rate and up to 2000 nits high brightness, delivering eye-catching color accuracy and seamless fluidity under bright sunlight.',
        imageUrl: '/X10FRONT.webp'
      },
      {
        id: 'm3-s4',
        slideNumber: 4,
        title: 'MediaTek Dimensity 9600M (3nm) Flagship Chipset',
        description: 'Powered by the revolutionary 3nm MediaTek Dimensity 9600M processor, providing blazing compute speeds, unmatched thermal efficiency, and next-generation on-device AI performance.',
        imageUrl: '/9600M.jpg'
      },
      {
        id: 'm3-s5',
        slideNumber: 5,
        title: 'Dual 200MP Camera System & 50MP Ultrawide',
        description: 'Equipped with a flagship dual 200MP camera system—headlined by a 200MP main sensor and a 200MP 2.8x telephoto camera—alongside a 50MP ultra-wide lens for pristine resolution at every angle.',
        imageUrl: '/X10CAMERAMODULE.jpg'
      },
      {
        id: 'm3-s6',
        slideNumber: 6,
        title: 'Summary: Four Pillars of Flagship Excellence',
        description: 'The OPPO Find X10 defines modern flagship value across four key pillars: a massive 7150mAh battery with 80W/50W charging, cutting-edge 3nm Dimensity 9600M processor, versatile dual 200MP camera with 50MP ultrawide, and a gorgeous 6.59" 120Hz LTPO screen.',
        imageUrl: ['/X10BACKLEFT.webp', '/X10FRONTRIGHT.webp'],
        imageUrls: ['/X10BACKLEFT.webp', '/X10FRONTRIGHT.webp']
      }
    ],
    quiz: [
      {
        id: 'm3-q1',
        question: 'What is the battery capacity of the OPPO Find X10?',
        options: ['5000mAh', '7150mAh', '6000mAh'],
        answer: '7150mAh',
        explanation: 'The OPPO Find X10 is equipped with a class-leading 7150mAh Silicon-Carbon battery with 80W wired and 50W wireless charging.'
      },
      {
        id: 'm3-q2',
        question: 'Which chipset powers the OPPO Find X10?',
        options: ['Snapdragon 8 Gen 3', 'MediaTek Dimensity 9600M', 'Dimensity 9300'],
        answer: 'MediaTek Dimensity 9600M',
        explanation: 'The Find X10 is powered by the 3nm MediaTek Dimensity 9600M chipset, providing flagship-grade performance and energy efficiency.'
      },
      {
        id: 'm3-q3',
        question: 'What is the camera configuration on the OPPO Find X10?',
        options: ['Triple 50MP setup', 'Dual 200MP setup with 50MP ultrawide', 'Single 200MP with 12MP zoom'],
        answer: 'Dual 200MP setup with 50MP ultrawide',
        explanation: 'The device boasts a dual 200MP camera setup (main and 2.8x telephoto) paired with a 50MP ultrawide sensor.'
      },
      {
        id: 'm3-q4',
        question: 'What is the screen size of the OPPO Find X10 display?',
        options: ['6.1 inches', '6.59 inches', '6.82 inches'],
        answer: '6.59 inches',
        explanation: 'The Find X10 features a 6.59-inch AMOLED LTPO display with 1-120Hz adaptive refresh rate and 2000 nits high brightness.'
      }
    ]
  }
];

export const modules = moduleContent;
export default moduleContent;
