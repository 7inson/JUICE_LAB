import { JuiceProduct, TimelineStep, SubscriptionPlan, QuizQuestion } from './types';
import heroMainImage from './assets/images/regenerated_image_1782474193749.png';

export const HERO_MAIN_IMAGE = heroMainImage;
export const SUBSCRIPTION_BOX_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFfuNanH1k-fM7TeVO9YjiDV838Yy2TFnmbwbC48lOo3W3SsEd6Zj915jVzIOsQJZbJf717g85q6yTo_eKGuQoLovgpJNVNGyGSYGehGq0FPeJ7nQ6_zOJIT0IGmvjC0d4yjd0HK-dCk4O7-Q6nHUr-mdkhZFb2w_JLDiWVv0Y08U8xSzf6kwWGwUpGx6PiIOMP5FTkMAkPbX6CriMsNW3C1Vsa4CdEt0HWiA7jjnERH_IMvOtB2WS-15ZPdmgk-Hvvv_r13SQdp8';
export const NEON_DATA_GRAPH_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmryYc8kFKGoRISXYnhYpBHfsdymD6qotnG-z8A-EmfizOepVxLxxnzfUO8a94lr8prIAmTbn3p7viBXbPEvnJt4aXJdZjrzJjei3AEYGHmRURQQz9kzGJ6XKYbaF-WrZSzYK0wYsoJzv-KXxIGCj5x7dFzpZDTlOH7BYmx22sFCnzfhWgQRHrtklVNiKDKfXVuHDTN7WwGUinTegC8RsNLihw849sZvlTw0PMtG_7y4r0U04CDBgxckW-QusVpFksafLZPFARPHA';
export const ABSTRACT_WAVE_BG_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaZG5AgALD8o_vatRSs8eHne-FhGdKPcJ4a0KbiJvc_DSoQeHW4jKf2Jftia-GCR58XjDpZw_e_J33t0Hday2600himT8ZvlNWpzEsT3ePwgdmGVVbkfZ0ivDBz2DTys5ruRbreioeJkGNLqYAJhJDHJr4vh0_gFsp4HGKt42L_RWvMcBjNqlkAjqZ5JJ34i2p_kmDii6p614lIxOJ9zX1e3zl7po8DyQWwtVqMR-2HIU9424LLnH6Bi-YawtYFqoq-4ojWWhYZ_U';

export const PRODUCTS: JuiceProduct[] = [
  {
    id: 'florida-classic',
    name: 'The Florida Classic',
    tagline: 'Sun-drenched, cold-pressed standard',
    category: 'orange',
    badge: 'Best Seller',
    description: 'Our signature blend of sweet heirloom oranges and tangy tangerines, cold-pressed daily. High in Vitamin C to brighten your mornings.',
    price: 180.00,
    image: HERO_MAIN_IMAGE,
    isBestSeller: true,
    colorTheme: 'orange',
    nutrition: {
      vitaminC: 120,
      calories: 110,
      naturalSugars: 22,
      potassium: 420,
      calcium: 4
    },
    sweetness: 4,
    pulp: 2,
    energy: 5,
    benefits: ['Immune Support', 'Natural Energy boost', 'Cardiovascular health']
  },
  {
    id: 'mango-nectar',
    name: 'Mango Nectar',
    tagline: 'Velvety tropical luxury',
    category: 'mango',
    badge: 'Tropical',
    description: 'Thick, premium Alphonso mangoes matched with organic passionfruit juice. Delivers an unparalleled creamy texture and exotic sweetness.',
    price: 240.00,
    image: HERO_MAIN_IMAGE,
    colorTheme: 'mango',
    nutrition: {
      vitaminC: 90,
      calories: 140,
      naturalSugars: 28,
      potassium: 310,
      calcium: 2
    },
    sweetness: 5,
    pulp: 4,
    energy: 4,
    benefits: ['Digestion aid', 'Skin health (Vitamin A)', 'Antioxidant rich']
  },
  {
    id: 'orchard-apple',
    name: 'Orchard Apple',
    tagline: 'Crisp green & red balance',
    category: 'apple',
    badge: 'Crisp',
    description: 'A delicate pressed mix of Honeycrisp and Granny Smith apples with a tiny hint of organic ginger. Refreshing, tart, and completely natural.',
    price: 215.00,
    image: HERO_MAIN_IMAGE,
    colorTheme: 'apple-light',
    nutrition: {
      vitaminC: 45,
      calories: 95,
      naturalSugars: 19,
      potassium: 280,
      calcium: 1
    },
    sweetness: 3,
    pulp: 1,
    energy: 3,
    benefits: ['Hydration support', 'Anti-inflammatory ginger', 'Daily detoxifier']
  },
  {
    id: 'signature-citrus',
    name: 'Signature Citrus Pitcher',
    tagline: 'Premium social blend',
    category: 'orange',
    badge: 'Limited Batch',
    description: 'Double-filtered sweet citrus and blood orange nectar packaged in a premium shareable vessel. Handcrafted for slow Sunday brunches.',
    price: 350.00,
    image: HERO_MAIN_IMAGE,
    colorTheme: 'orange',
    nutrition: {
      vitaminC: 150,
      calories: 120,
      naturalSugars: 24,
      potassium: 480,
      calcium: 5
    },
    sweetness: 4,
    pulp: 1,
    energy: 5,
    benefits: ['High-dose Vitamin C', 'Great for groups', 'Electrolyte rich']
  },
  {
    id: 'crimson-root',
    name: 'Crimson Root',
    tagline: 'Deep beet & dark berry boost',
    category: 'berry',
    badge: 'Superfood',
    description: 'A potent infusion of organic beetroot, wild blackberries, pomegranate, and a touch of lemon juice. Perfect for athletic endurance.',
    price: 260.00,
    image: HERO_MAIN_IMAGE,
    colorTheme: 'pink',
    nutrition: {
      vitaminC: 75,
      calories: 115,
      naturalSugars: 21,
      potassium: 540,
      calcium: 3
    },
    sweetness: 2,
    pulp: 2,
    energy: 5,
    benefits: ['Athletic performance', 'Blood oxygenation', 'Nitric Oxide recovery']
  },
  {
    id: 'verdant-glow',
    name: 'Verdant Glow',
    tagline: 'Ultimate cold-pressed green juice',
    category: 'apple',
    badge: 'Pure Cleanse',
    description: 'Organic kale, cucumber, celery, sweet granny smith apples, squeezed lemon, and a touch of organic ginger root. Nutrient-dense hydration.',
    price: 295.00,
    image: HERO_MAIN_IMAGE,
    colorTheme: 'verdant',
    nutrition: {
      vitaminC: 60,
      calories: 80,
      naturalSugars: 14,
      potassium: 390,
      calcium: 8
    },
    sweetness: 2,
    pulp: 1,
    energy: 4,
    benefits: ['Deep cellular alkaline balance', 'High bone mineral content', 'Detoxifies heavy metals']
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'The Regenerative Farm',
    subtitle: 'Sourced with Integrity',
    description: 'We believe that exceptional flavor begins with the health of the soil. Our farmers use rotational cover crops, organic compost, and dynamic water conservation to build biological richness back into the Indore, India farm beds.',
    badges: ['Pesticide Free', 'Soil Health First', 'Biodynamic Certified'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZi0SI178vLkdxYgQt9S-vHo_X9faYqi5qd7oar_zSvqBFrVOO0DzFych8xJnsodUZ9WlxsfZBBh0E443wLVnWy35devts7x6DO3fb7eCplzaynUxVFW6Z6uAhy2Xn9ZCRFQM8h-LRs1u2bKGsRxdDHDMVpKtajaozLrZ9VJ7-Jx71_8-irKoPr0YpD5DU8d2iOsVzEasNoAdKoh2eXuW1fGFb9r3cbTvwz4jqwMpRFto4iZeUAASDSWnKav2DiBtRRMqBFbKIdEo',
    details: [
      'Rotational farming prevents soil exhaustion and increases mineral uptake.',
      'Zero synthetic pesticides or dangerous fertilizers ever reach our trees.',
      'Rainwater collection captures and recycles up to 80% of our hydration demands.'
    ]
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'Peak Harvest',
    subtitle: 'Hand-picked at the optimal sugar level',
    description: 'Every single citrus, apple, and superfood root is carefully hand-harvested only when the sugar-to-acidity ratio matches our rigorous flavor parameters. No green-harvesting; pure tree-ripened perfection.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7X_6gOPas9DBMdYjvUAl93eW0l0xoLQV1uDwT2_EKFmfnMECIwNAU-4C1DqvZ5m1LdY52GVxaYUBzWiim3TRq0i2qEsHIOhQuxAQeUKvsOYUWMzm7ostdO64chZ_Nlj3rJ-e-Xpj7IYIowsCfuYGeTEwYo59arGKtcyLm2dzvk-P_KM-C0sZvH44WsB0VFmcGHfdmOELNEhPvJMLxpD-Z1Sql5CR-YYXPsGtD9iTsVBO3DSoo3XVb9XBD7aqQ1xAQpkT8cGT_2vs',
    location: 'Indore, India',
    locationPinImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3AxAnU5nEg-UNrYcDYojcIxVXBY_Jcka80Y7iWnqOnqsB1GVrnk_JDxua7VCzLaVOXNHEketdOmvkCDBmdkGy2d3GAr__TC6DjtZavzTwJpKxRFTRt5cPgb2iCohKW_g9ejqoNusbzYEDCXHqEO95pTCU3AZBa50su5ixR2zl5xX8Hhp4WVjPOVg1FCN1RLijw6OMQRCyNBvTqBsx0os9Fk4Xzd2eIHBDJ4v1XmZ6vf-eu4vPPaK5-RD0zmXQZXmQK8w6P5itFag',
    latLng: { x: 42, y: 55 }, // Indore, India map percentage
    badges: ['100% Hand Selected', 'Zero Bruising Guarantee'],
    details: [
      'Brix level tests run multiple times daily to verify sugar concentration.',
      'Gentle sorting prevents cell rupture or bruising before pressing.',
      'Picked and delivered in specialized temperature-controlled cradles in under 4 hours.'
    ]
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: 'Cold Pressed Precision',
    subtitle: 'Extracting flavor without heat or oxidation',
    description: 'Traditional juicers chop fruit with high-speed blades that generate friction, heating up and destroying valuable enzymes. Our hydraulic press squeezes out every droplet of nectar using thousands of pounds of pressure, locking in full nutrition.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPbo1rrhMYOpNJ5RF0-fOgCby-F9aeGU2-LUXYZRyyyI0PqjtsjL2I80PUupkIhut4oiIZopEFA8ndg25yJ3oq_pXy25Gm_Usce9Y26Wg-3wLAjlFJNomuwf4hnLXC-KkmGCAtXk0fhHc1dTYqEfNM4uqpNRft7N-5IIdqf2e2JghkCSoJDn0upvXNcbS9fzdPSTdr9GcRXKsYGHrJ266wgYEwHfySYwyYwOGh5yxD1U2wpLvZAJ0zZQpSpqTjuc-TzC2Tlotqwc',
    badges: ['Hydraulic Extracted', 'No Friction Oxidation', 'Enzyme Alive'],
    actionLabel: 'Explore Cold Press vs Centrifugal',
    details: [
      '14,000 lbs of pure continuous hydraulic force draws out maximum vitamin yield.',
      'Cold-room environment (kept at strict 36°F) guarantees no thermal degradation.',
      'Preserves active live digestive enzymes for up to 17 days.'
    ]
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'The Starter',
    price: 1200,
    bottles: 6,
    interval: 'biweekly',
    savings: 5,
    description: 'Kickstart your healthy habits. The perfect set of raw cold-pressed juices delivered right when you need them.',
    benefits: [
      '6 Premium 12oz Bottles',
      'Delivery every 2 weeks',
      'Flexible blend selection',
      'Pause or cancel anytime'
    ]
  },
  {
    id: 'ritual',
    name: 'The Ritual',
    price: 2200,
    bottles: 12,
    interval: 'weekly',
    savings: 15,
    isPopular: true,
    badge: 'Most Popular',
    description: 'Our most sought-after plan. Establish a deep wellness baseline with daily cold-pressed juices delivered straight to your door.',
    benefits: [
      '12 Premium 12oz Bottles',
      'Delivery every week',
      'Free Priority Insulated Shipping',
      'Swap flavors anytime before midnight',
      'Includes 2 seasonal limited-batch bottles'
    ]
  },
  {
    id: 'optimal',
    name: 'The Optimal',
    price: 4200,
    bottles: 24,
    interval: 'weekly',
    savings: 20,
    description: 'Designed for active families, wellness offices, or high-octane individuals requiring continuous dynamic hydration.',
    benefits: [
      '24 Premium 12oz Bottles',
      'Delivery every week',
      'Free Priority Insulated Shipping',
      '1-on-1 Nutritionist text consultation',
      'Exclusive Juice Lab insulated flask & merch'
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your primary wellness target?",
    options: [
      { text: "Dynamic energy surge & vitality boost", score: { orange: 3, mango: 1, berry: 1 } },
      { text: "Radiant cell regeneration & deep antioxidant cleanse", score: { berry: 3, apple: 1 } },
      { text: "Immune fortification & premium cold season defense", score: { orange: 2, mango: 2 } },
      { text: "Gentle digestive reset, fiber uptake & hydration balance", score: { apple: 3, mango: 1 } }
    ]
  },
  {
    id: 2,
    question: "Which flavor profile speaks to your soul?",
    options: [
      { text: "Zesty, citrusy, and vibrant spark", score: { orange: 3 } },
      { text: "Velvety, rich, and naturally sweet tropical depth", score: { mango: 3 } },
      { text: "Crisp, refreshing, slightly tart, and clean", score: { apple: 3 } },
      { text: "Earthy, robust, with deep dark berry complexity", score: { berry: 3 } }
    ]
  },
  {
    id: 3,
    question: "What kind of pulp/consistency do you prefer?",
    options: [
      { text: "Sleek & micro-filtered (almost zero pulp/light weight)", score: { apple: 2, orange: 1, berry: 1 } },
      { text: "Rich, smooth, and full-bodied (luxurious weight)", score: { mango: 3 } },
      { text: "Natural cold pressed texture (subtle natural fibers)", score: { orange: 2, berry: 2 } }
    ]
  },
  {
    id: 4,
    question: "When is your prime juice slot?",
    options: [
      { text: "First thing in the morning as an elegant alarm clock", score: { orange: 3, apple: 1 } },
      { text: "Mid-afternoon pick-me-up to conquer the rest of the day", score: { mango: 2, berry: 2 } },
      { text: "Pre/post workout intense dynamic hydration", score: { berry: 3, orange: 1 } },
      { text: "Late evening detoxifying treat", score: { apple: 3 } }
    ]
  }
];
