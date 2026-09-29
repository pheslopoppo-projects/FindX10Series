/**
 * Central Data Architecture for Find X10 Training Modules
 * Featuring official OPPO Find X10 Pro Max specifications and interactive quiz data.
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
    title: 'Find X10 Handset',
    subtitle: 'Standard Flagship Series',
    badge: 'Coming Soon',
    locked: true,
    duration: 'Available Next Week',
    slides: [],
    quiz: []
  }
];

export const modules = moduleContent;
export default moduleContent;
