import { Product } from '../types';

export const products: Product[] = [
  {
    id: "p1",
    name: "iPhone 15 Pro Titanium",
    brand: "Apple",
    category: "Smartphones",
    superCategory: "Smartphones",
    price: 999,
    originalPrice: 1099,
    rating: 4.9,
    reviewsCount: 2413,
    images: [
      { gradient: "from-[#D6D6D6] to-[#A8A8A8]", src: "./products/p1.jpg", emoji: "📱", label: "Front" },
      { gradient: "from-[#2a2a2a] to-[#6a6a6a]", src: "./products/p1.jpg", emoji: "📱", label: "Back" },
      { gradient: "from-[#c9c9c9] to-[#ececec]", src: "./products/p1.jpg", emoji: "📱", label: "Side" },
      { gradient: "from-[#f0f0f0] to-[#c2c2c2]", src: "./products/p1.jpg", emoji: "📱", label: "Detail" }
    ],
    specs: {
      Chip: "A17 Pro",
      Display: '6.1" Super Retina XDR',
      Camera: "48MP Pro System",
      Battery: "Up to 29h"
    },
    description: "Forged in titanium. The lightest Pro ever, with the most powerful iPhone camera system.",
    features: ["Titanium design", "A17 Pro chip", "Action button", "USB-C with USB 3"],
    box: ["iPhone", "USB-C Cable", "Documentation"],
    colors: [
      { name: "Natural", hex: "#C2B8AD" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F5F0" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    isPromo: true
  },
  {
    id: "p2",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    superCategory: "Smartphones",
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviewsCount: 1822,
    images: [
      { gradient: "from-[#2E2E3A] to-[#6C5CFF]", src: "./products/p2.jpg", emoji: "📱", label: "Front" },
      { gradient: "from-[#1a1a2e] to-[#3a3a5a]", src: "./products/p2.jpg", emoji: "📱", label: "Titanium Gray" },
      { gradient: "from-[#3a3a5a] to-[#8a8ac0]", src: "./products/p2.jpg", emoji: "📱", label: "Side" },
      { gradient: "from-[#6C5CFF] to-[#E8FF5A]", src: "./products/p2.jpg", emoji: "📱", label: "Detail" }
    ],
    specs: {
      Chip: "Snapdragon 8 Gen 3",
      Display: '6.8" Dynamic AMOLED 2X',
      Camera: "200MP + S Pen",
      Battery: "5000mAh"
    },
    description: "The ultimate Galaxy. Built-in S Pen, 200MP camera, and Galaxy AI that thinks with you.",
    features: ["Galaxy AI", "S Pen included", "Titanium frame", "Circle to Search"],
    box: ["Phone", "S Pen", "USB-C Cable"],
    colors: [
      { name: "Titanium Violet", hex: "#6C5CFF" },
      { name: "Black", hex: "#111" },
      { name: "Yellow", hex: "#E8FF5A" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    isPromo: false
  },
  {
    id: "p3",
    name: "WH-1000XM5",
    brand: "Sony",
    category: "Headphones",
    superCategory: "Audio",
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 5421,
    images: [
      { gradient: "from-[#EAEAEA] to-[#CFCFCF]", src: "./products/p3.jpg", emoji: "🎧", label: "Front" },
      { gradient: "from-[#111] to-[#444]", src: "./products/p3.jpg", emoji: "🎧", label: "Black" },
      { gradient: "from-[#d9d9d9] to-[#f5f5f5]", src: "./products/p3.jpg", emoji: "🎧", label: "Fold" },
      { gradient: "from-[#6C5CFF]/20 to-[#E8FF5A]/20", src: "./products/p3.jpg", emoji: "🎧", label: "Case" }
    ],
    specs: {
      Driver: "30mm carbon fiber",
      ANC: "8 mics HD NC Processor",
      Battery: "30h + Quick Charge",
      Weight: "250g"
    },
    description: "Industry-leading noise cancellation, now with auto NC optimizer. Silence, perfected.",
    features: ["Industry-leading ANC", "Crystal clear calls", "30h battery", "Wear detection"],
    box: ["Headphones", "Carry Case", "USB-C Cable", "Audio Cable"],
    colors: [
      { name: "Silver", hex: "#E5E5E5" },
      { name: "Black", hex: "#111" },
      { name: "Midnight Blue", hex: "#1E293B" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isPromo: true
  },
  {
    id: "p4",
    name: "QuietComfort Ultra",
    brand: "Bose",
    category: "Headphones",
    superCategory: "Audio",
    price: 379,
    rating: 4.8,
    reviewsCount: 3210,
    images: [
      { gradient: "from-[#1A1A1A] to-[#4A4A4A]", src: "./products/p4.jpg", emoji: "🎧", label: "Black" },
      { gradient: "from-[#F5F1E8] to-[#D6CFC0]", src: "./products/p4.jpg", emoji: "🎧", label: "Sandstone" },
      { gradient: "from-[#2a2a2a] to-[#5a5a5a]", src: "./products/p4.jpg", emoji: "🎧", label: "Side" },
      { gradient: "from-[#E8FF5A] to-[#6C5CFF]", src: "./products/p4.jpg", emoji: "🎧", label: "Detail" }
    ],
    specs: {
      Audio: "CustomTune spatial",
      ANC: "CustomTune + Quiet",
      Battery: "24h",
      Connectivity: "Bluetooth 5.3"
    },
    description: "Bose immersive audio. Sound that feels like it’s coming from everywhere but your headphones.",
    features: ["Immersive audio", "CustomTune", "24h battery", "Aware Mode"],
    box: ["Headphones", "Case", "USB-C + 3.5mm cables"],
    colors: [
      { name: "Black", hex: "#111" },
      { name: "White Smoke", hex: "#F5F1E8" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: false
  },
  {
    id: "p5",
    name: 'MacBook Pro 16" M3 Max',
    brand: "Apple",
    category: "Laptops",
    superCategory: "Laptops",
    price: 2499,
    rating: 4.9,
    reviewsCount: 893,
    images: [
      { gradient: "from-[#C0C0C0] to-[#8A8A8A]", src: "./products/p5.jpg", emoji: "💻", label: "Open" },
      { gradient: "from-[#2a2a2a] to-[#0a0a0a]", src: "./products/p5.jpg", emoji: "💻", label: "Space Black" },
      { gradient: "from-[#e0e0e0] to-[#a0a0a0]", src: "./products/p5.jpg", emoji: "💻", label: "Keyboard" },
      { gradient: "from-[#6C5CFF] to-[#111]", src: "./products/p5.jpg", emoji: "💻", label: "Performance" }
    ],
    specs: {
      Chip: "M3 Max 16-core",
      Display: '16.2" Liquid Retina XDR',
      Memory: "36GB Unified",
      Storage: "1TB SSD"
    },
    description: "Supercharged by M3 Max. The most advanced MacBook Pro ever. Brutally powerful.",
    features: ["M3 Max chip", "22h battery", "Liquid Retina XDR", "1080p camera"],
    box: ["MacBook Pro", "140W adapter", "USB-C to MagSafe 3"],
    colors: [
      { name: "Space Black", hex: "#1A1A1A" },
      { name: "Silver", hex: "#C0C0C0" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    isPromo: false
  },
  {
    id: "p6",
    name: "Surface Studio 2+",
    brand: "Microsoft",
    category: "All-In-One",
    superCategory: "Computing",
    price: 4299,
    rating: 4.7,
    reviewsCount: 412,
    images: [
      { gradient: "from-[#E8E8E8] to-[#B0B0B0]", src: "./products/p6.jpg", emoji: "🖥️", label: "Front" },
      { gradient: "from-[#D1D1D1] to-[#8E8E8E]", src: "./products/p6.jpg", emoji: "🖥️", label: "Hinge" },
      { gradient: "from-[#f5f5f5] to-[#c5c5c5]", src: "./products/p6.jpg", emoji: "🖥️", label: "Studio Mode" },
      { gradient: "from-[#6C5CFF]/30 to-[#111]/10", src: "./products/p6.jpg", emoji: "🖥️", label: "Touch" }
    ],
    specs: {
      Display: '28" PixelSense 4500x3000 Touch',
      CPU: "Intel i7-11370H",
      GPU: "RTX 3060",
      Storage: "1TB SSD"
    },
    description: "The ultimate creative studio. Transforms from desktop to drafting table.",
    features: ["Zero-gravity hinge", "Touch + Pen + Dial", '28" 4.5K display', "RTX graphics"],
    box: ["Surface Studio", "Keyboard", "Mouse", "Pen"],
    colors: [
      { name: "Platinum", hex: "#E5E5E5" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: false,
    isPromo: true
  },
  {
    id: "p7",
    name: "Quest 3 512GB",
    brand: "Meta",
    category: "Consoles",
    superCategory: "Computing",
    price: 649,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 2103,
    images: [
      { gradient: "from-[#F0F0F0] to-[#B8B8B8]", src: "./products/p7.jpg", emoji: "🥽", label: "Headset" },
      { gradient: "from-[#E8FF5A] to-[#6C5CFF]", src: "./products/p7.jpg", emoji: "🥽", label: "Mixed Reality" },
      { gradient: "from-[#111] to-[#444]", src: "./products/p7.jpg", emoji: "🥽", label: "Controllers" },
      { gradient: "from-[#fafafa] to-[#d0d0d0]", src: "./products/p7.jpg", emoji: "🥽", label: "Side" }
    ],
    specs: {
      Optics: "4K+ Infinite Display",
      Chip: "Snapdragon XR2 Gen 2",
      Tracking: "Inside-out + hand",
      Storage: "512GB"
    },
    description: "Breakthrough mixed reality. Expand your world with 3x resolution and full color passthrough.",
    features: ["Mixed reality", "4K+ display", "Touch Plus controllers", "512GB"],
    box: ["Headset", "Controllers", "Charging cable", "Power adapter"],
    colors: [
      { name: "White", hex: "#FAF9F6" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    isPromo: true
  },
  {
    id: "p8",
    name: "Watch Ultra 2",
    brand: "Apple",
    category: "Smartwatches",
    superCategory: "Wearables",
    price: 799,
    rating: 4.9,
    reviewsCount: 3321,
    images: [
      { gradient: "from-[#C9A86A] to-[#8A6D3B]", src: "./products/p8.jpg", emoji: "⌚", label: "Titanium" },
      { gradient: "from-[#1A1A1A] to-[#4A4A4A]", src: "./products/p8.jpg", emoji: "⌚", label: "Alpine Loop" },
      { gradient: "from-[#E8FF5A] to-[#C9A86A]", src: "./products/p8.jpg", emoji: "⌚", label: "Action" },
      { gradient: "from-[#111] to-[#2a2a2a]", src: "./products/p8.jpg", emoji: "⌚", label: "Night" }
    ],
    specs: {
      Case: "49mm Titanium",
      Display: "3000 nits Always-On",
      Battery: "36h normal / 72h low power",
      Features: "Dual GPS + Depth gauge"
    },
    description: "The most rugged and capable Apple Watch. Built for adventure beyond.",
    features: ["Titanium case", "3000 nits", "Precision dual GPS", "Depth gauge 40m"],
    box: ["Watch", "Alpine Loop", "USB-C magnetic cable"],
    colors: [
      { name: "Titanium", hex: "#C9A86A" },
      { name: "Black", hex: "#111" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    isPromo: false
  },
  {
    id: "p9",
    name: "Ray-Ban Meta Glasses",
    brand: "Meta",
    category: "Glasses",
    superCategory: "Wearables",
    price: 329,
    rating: 4.6,
    reviewsCount: 987,
    images: [
      { gradient: "from-[#1A1A1A] to-[#3A3A3A]", src: "./products/p9.jpg", emoji: "🕶️", label: "Wayfarer" },
      { gradient: "from-[#E8FF5A] to-[#6C5CFF]", src: "./products/p9.jpg", emoji: "🕶️", label: "AI POV" },
      { gradient: "from-[#2a2a2a] to-[#5a5a5a]", src: "./products/p9.jpg", emoji: "🕶️", label: "Charging Case" },
      { gradient: "from-[#111] to-[#6C5CFF]", src: "./products/p9.jpg", emoji: "🕶️", label: "Live" }
    ],
    specs: {
      Camera: "12MP ultra-wide",
      Audio: "Open-ear 5-mic array",
      AI: "Meta AI voice",
      Battery: "4h + 32h case"
    },
    description: "Iconic design, supercharged. Capture, share, and hear with Meta AI built-in.",
    features: ["12MP camera", "Meta AI", "Open-ear audio", "Live streaming"],
    box: ["Glasses", "Charging case", "Cleaning cloth"],
    colors: [
      { name: "Shiny Black", hex: "#111" },
      { name: "Matte Black", hex: "#2A2A2A" },
      { name: "Transparent", hex: "#E8E8E8" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: true
  },
  {
    id: "p10",
    name: "PlayStation 5 Slim",
    brand: "Sony",
    category: "Consoles",
    superCategory: "Computing",
    price: 499,
    rating: 4.9,
    reviewsCount: 7211,
    images: [
      { gradient: "from-[#FFFFFF] to-[#D0D0D0]", src: "./products/p10.jpg", emoji: "🎮", label: "Console" },
      { gradient: "from-[#111] to-[#444]", src: "./products/p10.jpg", emoji: "🎮", label: "DualSense" },
      { gradient: "from-[#E8FF5A] to-[#fff]", src: "./products/p10.jpg", emoji: "🎮", label: "Games" },
      { gradient: "from-[#6C5CFF] to-[#111]", src: "./products/p10.jpg", emoji: "🎮", label: "Bundle" }
    ],
    specs: {
      CPU: "AMD Zen 2 8-core",
      GPU: "RDNA 2 10.28 TFLOPs",
      Storage: "1TB SSD",
      Features: "4K 120Hz + Ray tracing"
    },
    description: "The PS5 console unleashes new gaming possibilities. PlayStation, elevated.",
    features: ["1TB SSD", "Ray tracing", "4K 120Hz", "Haptic feedback"],
    box: ["PS5 console", "DualSense controller", "HDMI cable", "USB cable"],
    colors: [
      { name: "White", hex: "#FFFFFF" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isPromo: false
  },
  {
    id: "p11",
    name: 'iMac 24" M3',
    brand: "Apple",
    category: "All-In-One",
    superCategory: "Computing",
    price: 1299,
    rating: 4.8,
    reviewsCount: 543,
    images: [
      { gradient: "from-[#FF6B6B] to-[#FF8E53]", src: "./products/p11.jpg", emoji: "🖥️", label: "Pink" },
      { gradient: "from-[#4ECDC4] to-[#44A08D]", src: "./products/p11.jpg", emoji: "🖥️", label: "Green" },
      { gradient: "from-[#6C5CFF] to-[#8A7DFF]", src: "./products/p11.jpg", emoji: "🖥️", label: "Purple" },
      { gradient: "from-[#E8FF5A] to-[#FFF59D]", src: "./products/p11.jpg", emoji: "🖥️", label: "Yellow" }
    ],
    specs: {
      Chip: "M3 8-core",
      Display: '24" 4.5K Retina',
      Memory: "8GB",
      Camera: "1080p FaceTime"
    },
    description: "The all-in-one. Packed with more juice, joy, and M3. Seven vibrant colors.",
    features: ["M3 chip", "4.5K Retina", "1080p camera", "Six-speaker audio"],
    box: ["iMac", "Magic Keyboard", "Magic Mouse"],
    colors: [
      { name: "Blue", hex: "#6C5CFF" },
      { name: "Pink", hex: "#FF6B6B" },
      { name: "Yellow", hex: "#E8FF5A" },
      { name: "Green", hex: "#4ECDC4" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: false
  },
  {
    id: "p12",
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    category: "Earphones",
    superCategory: "Audio",
    price: 249,
    originalPrice: 279,
    rating: 4.9,
    reviewsCount: 9234,
    images: [
      { gradient: "from-[#FFFFFF] to-[#E0E0E0]", src: "./products/p12.jpg", emoji: "🎧", label: "Case" },
      { gradient: "from-[#F5F5F5] to-[#CFCFCF]", src: "./products/p12.jpg", emoji: "🎧", label: "Buds" },
      { gradient: "from-[#111] to-[#333]", src: "./products/p12.jpg", emoji: "🎧", label: "ANC" },
      { gradient: "from-[#6C5CFF]/20 to-[#E8FF5A]/20", src: "./products/p12.jpg", emoji: "🎧", label: "Tips" }
    ],
    specs: {
      Chip: "H2",
      ANC: "2x more cancellation",
      Battery: "6h + 30h case",
      Features: "Personalized Spatial Audio"
    },
    description: "The next level of active noise cancellation and immersive sound. Hearing health built-in.",
    features: ["2x ANC", "Adaptive Audio", "Personalized volume", "USB-C"],
    box: ["AirPods Pro", "MagSafe Case", "Ear tips", "USB-C Cable"],
    colors: [
      { name: "White", hex: "#FFFFFF" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isPromo: true
  },
  {
    id: "p13",
    name: "SRS-XG300 Speaker",
    brand: "Sony",
    category: "Speakers",
    superCategory: "Audio",
    price: 348,
    rating: 4.7,
    reviewsCount: 612,
    images: [
      { gradient: "from-[#1A1A1A] to-[#3A3A3A]", src: "./products/p13.jpg", emoji: "🔊", label: "Black" },
      { gradient: "from-[#6C5CFF] to-[#2A2A5A]", src: "./products/p13.jpg", emoji: "🔊", label: "Light" },
      { gradient: "from-[#E8FF5A] to-[#3A3A3A]", src: "./products/p13.jpg", emoji: "🔊", label: "Party" },
      { gradient: "from-[#333] to-[#666]", src: "./products/p13.jpg", emoji: "🔊", label: "Handle" }
    ],
    specs: {
      Power: "X-Balanced + Passive Radiators",
      Battery: "25h + Quick charge",
      Waterproof: "IP67",
      Lights: "Sync to beat"
    },
    description: "Powerful party sound. Fill your life with punchy bass and lighting that syncs to the beat.",
    features: ["25h battery", "IP67", "Light sync", "Guitar/mic input"],
    box: ["Speaker", "AC adaptor", "Strap"],
    colors: [
      { name: "Black", hex: "#111" },
      { name: "Gray", hex: "#888" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: false,
    isPromo: true
  },
  {
    id: "p14",
    name: "SoundLink Flex",
    brand: "Bose",
    category: "Speakers",
    superCategory: "Audio",
    price: 149,
    rating: 4.8,
    reviewsCount: 3219,
    images: [
      { gradient: "from-[#EAEAEA] to-[#9A9A9A]", src: "./products/p14.jpg", emoji: "🔊", label: "State" },
      { gradient: "from-[#1A1A1A] to-[#4A4A4A]", src: "./products/p14.jpg", emoji: "🔊", label: "PositionIQ" },
      { gradient: "from-[#E8FF5A] to-[#EAEAEA]", src: "./products/p14.jpg", emoji: "🔊", label: "Outdoor" },
      { gradient: "from-[#6C5CFF] to-[#EAEAEA]", src: "./products/p14.jpg", emoji: "🔊", label: "Clip" }
    ],
    specs: {
      Tech: "PositionIQ auto EQ",
      Battery: "12h",
      Waterproof: "IP67 waterproof + dustproof",
      Clip: "Utility loop"
    },
    description: "State-of-the-art design with crisp, balanced sound. Whatever you do, bring the beat.",
    features: ["PositionIQ", "12h battery", "IP67", "Built-in mic"],
    box: ["Speaker", "USB-C cable"],
    colors: [
      { name: "Black", hex: "#111" },
      { name: "White Smoke", hex: "#EAEAEA" },
      { name: "Blue", hex: "#6C5CFF" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isPromo: false
  },
  {
    id: "p15",
    name: "Galaxy Buds2 Pro",
    brand: "Samsung",
    category: "Earphones",
    superCategory: "Audio",
    price: 179,
    originalPrice: 229,
    rating: 4.6,
    reviewsCount: 2104,
    images: [
      { gradient: "from-[#E8E8F0] to-[#B8B8D0]", src: "./products/p15.jpg", emoji: "🎧", label: "Bora Purple" },
      { gradient: "from-[#111] to-[#333]", src: "./products/p15.jpg", emoji: "🎧", label: "Graphite" },
      { gradient: "from-[#f5f5f5] to-[#d0d0d0]", src: "./products/p15.jpg", emoji: "🎧", label: "Case" },
      { gradient: "from-[#6C5CFF] to-[#E8FF5A]", src: "./products/p15.jpg", emoji: "🎧", label: "Hi-Fi" }
    ],
    specs: {
      Audio: "24-bit Hi-Fi",
      ANC: "Intelligent ANC",
      Battery: "5h + 18h case",
      Fit: "Ergonomic + 3 tips"
    },
    description: "Ultimate Hi-Fi sound in your ears. 24-bit Hi-Fi + Intelligent ANC that actually hears you.",
    features: ["24-bit Hi-Fi", "Intelligent ANC", "360 Audio", "Auto Switch"],
    box: ["Buds", "Charging case", "Eartips", "USB-C"],
    colors: [
      { name: "Bora Purple", hex: "#C9B1D6" },
      { name: "Graphite", hex: "#2A2A2A" },
      { name: "White", hex: "#FFFFFF" }
    ],
    inStock: false,
    isNew: false,
    isBestSeller: false,
    isPromo: true
  },
  {
    id: "p16",
    name: "Pixel 8 Pro",
    brand: "Google",
    category: "Smartphones",
    superCategory: "Smartphones",
    price: 999,
    rating: 4.7,
    reviewsCount: 1523,
    images: [
      { gradient: "from-[#8AB4F8] to-[#1A73E8]", src: "./products/p16.jpg", emoji: "📱", label: "Bay Blue" },
      { gradient: "from-[#202124] to-[#5F6368]", src: "./products/p16.jpg", emoji: "📱", label: "Obsidian" },
      { gradient: "from-[#F8F9FA] to-[#DADCE0]", src: "./products/p16.jpg", emoji: "📱", label: "Porcelain" },
      { gradient: "from-[#E8FF5A] to-[#8AB4F8]", src: "./products/p16.jpg", emoji: "📱", label: "AI" }
    ],
    specs: {
      Chip: "Google Tensor G3",
      Display: '6.7" LTPO OLED 120Hz',
      Camera: "50MP + Magic Eraser",
      AI: "Best Take + Audio Eraser"
    },
    description: "The Google phone with the best AI. Built to make your photos, calls, and day better.",
    features: ["Tensor G3", "Best Take", "Audio Magic Eraser", "7 years updates"],
    box: ["Pixel", "USB-C cable", "Adapter", "SIM tool"],
    colors: [
      { name: "Bay", hex: "#8AB4F8" },
      { name: "Obsidian", hex: "#202124" },
      { name: "Porcelain", hex: "#F8F9FA" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: false
  },
  {
    id: "p17",
    name: "ROG Ally",
    brand: "Microsoft",
    category: "Consoles",
    superCategory: "Computing",
    price: 699,
    rating: 4.7,
    reviewsCount: 876,
    images: [
      { gradient: "from-[#FFFFFF] to-[#B0B0B0]", src: "./products/p17.jpg", emoji: "🎮", label: "White" },
      { gradient: "from-[#111] to-[#6C5CFF]", src: "./products/p17.jpg", emoji: "🎮", label: "Performance" },
      { gradient: "from-[#E8FF5A] to-[#fff]", src: "./products/p17.jpg", emoji: "🎮", label: "Game Pass" },
      { gradient: "from-[#2a2a2a] to-[#5a5a5a]", src: "./products/p17.jpg", emoji: "🎮", label: "Grip" }
    ],
    specs: {
      CPU: "AMD Z1 Extreme",
      Display: '7" 120Hz FHD',
      Storage: "512GB SSD",
      OS: "Windows 11 + Armoury"
    },
    description: "Play all your games. Xbox Game Pass + Steam + more. Handheld power, no limits.",
    features: ["Z1 Extreme", "120Hz FHD", "512GB", "Xbox Game Pass 3mo"],
    box: ["ROG Ally", "Charger", "Stand"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#111" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: true
  },
  {
    id: "p18",
    name: "Nothing Ear (2)",
    brand: "Nothing",
    category: "Earphones",
    superCategory: "Audio",
    price: 149,
    rating: 4.6,
    reviewsCount: 1123,
    images: [
      { gradient: "from-[#FFFFFF] to-[#E0E0E0]", src: "./products/p18.jpg", emoji: "🎧", label: "Transparent" },
      { gradient: "from-[#1A1A1A] to-[#3A3A3A]", src: "./products/p18.jpg", emoji: "🎧", label: "Black" },
      { gradient: "from-[#f0f0f0] to-[#c0c0c0]", src: "./products/p18.jpg", emoji: "🎧", label: "Case" },
      { gradient: "from-[#E8FF5A] to-[#fff]", src: "./products/p18.jpg", emoji: "🎧", label: "Glyph" }
    ],
    specs: {
      Driver: "11.6mm custom",
      ANC: "Adaptive 45dB",
      Battery: "6.3h + 36h",
      Design: "Transparent"
    },
    description: "Sculpted sound. Transparent design. Nothing like you’ve heard.",
    features: ["LHDC 5.0", "Adaptive ANC", "36h total", "Dual connection"],
    box: ["Ear (2)", "Case", "Ear tips S/M/L", "USB-C"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#111" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: false
  },
  {
    id: "p19",
    name: "Beosound A5",
    brand: "Bang & Olufsen",
    category: "Speakers",
    superCategory: "Audio",
    price: 1099,
    rating: 4.8,
    reviewsCount: 234,
    images: [
      { gradient: "from-[#D8CFC0] to-[#A89C8A]", src: "./products/p19.jpg", emoji: "🔊", label: "Nordic Weave" },
      { gradient: "from-[#1A1A1A] to-[#4A4A4A]", src: "./products/p19.jpg", emoji: "🔊", label: "Dark Oak" },
      { gradient: "from-[#E8FF5A] to-[#D8CFC0]", src: "./products/p19.jpg", emoji: "🔊", label: "Handle" },
      { gradient: "from-[#6C5CFF] to-[#D8CFC0]", src: "./products/p19.jpg", emoji: "🔊", label: "Modular" }
    ],
    specs: {
      Drivers: "4 drivers + room adapt",
      Battery: "12h+",
      Connectivity: "WiFi + BT + AirPlay",
      Material: "Oak + aluminium"
    },
    description: "A timeless speaker. Interchangeable covers, crafted to last decades.",
    features: ["Modular design", "Room adaptation", "12h+", "Wireless charging"],
    box: ["A5", "Power cable", "Quick start"],
    colors: [
      { name: "Nordic Weave", hex: "#D8CFC0" },
      { name: "Dark Oak", hex: "#2A2A2A" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: false,
    isPromo: false
  },
  {
    id: "p20",
    name: "Xbox Series X",
    brand: "Microsoft",
    category: "Consoles",
    superCategory: "Computing",
    price: 499,
    originalPrice: 549,
    rating: 4.9,
    reviewsCount: 5432,
    images: [
      { gradient: "from-[#0F0F0F] to-[#3A3A3A]", src: "./products/p20.jpg", emoji: "🎮", label: "Matte Black" },
      { gradient: "from-[#107C10] to-[#000]", src: "./products/p20.jpg", emoji: "🎮", label: "Velocity" },
      { gradient: "from-[#222] to-[#555]", src: "./products/p20.jpg", emoji: "🎮", label: "Controller" },
      { gradient: "from-[#E8FF5A] to-[#107C10]", src: "./products/p20.jpg", emoji: "🎮", label: "Game Pass" }
    ],
    specs: {
      CPU: "Custom Zen 2 8-core",
      GPU: "12 TFLOPS RDNA 2",
      Storage: "1TB NVMe",
      Features: "4K 120FPS + Quick Resume"
    },
    description: "The fastest, most powerful Xbox ever. 12 teraflops of raw power.",
    features: ["12 TFLOPS", "1TB SSD", "4K gaming", "Quick Resume"],
    box: ["Series X", "Wireless controller", "HDMI cable"],
    colors: [
      { name: "Carbon Black", hex: "#0F0F0F" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: true,
    isPromo: true
  },
  {
    id: "p21",
    name: "Pixel Watch 2",
    brand: "Google",
    category: "Smartwatches",
    superCategory: "Wearables",
    price: 349,
    rating: 4.5,
    reviewsCount: 765,
    images: [
      { gradient: "from-[#E8E8E8] to-[#A0A0A0]", src: "./products/p21.jpg", emoji: "⌚", label: "Silver" },
      { gradient: "from-[#1A1A1A] to-[#444]", src: "./products/p21.jpg", emoji: "⌚", label: "Matte Black" },
      { gradient: "from-[#8AB4F8] to-[#E8E8E8]", src: "./products/p21.jpg", emoji: "⌚", label: "Fitbit" },
      { gradient: "from-[#E8FF5A] to-[#8AB4F8]", src: "./products/p21.jpg", emoji: "⌚", label: "Stress" }
    ],
    specs: {
      Display: "41mm AMOLED",
      Chip: "Qualcomm 5100 + Cortex M33",
      Health: "Fitbit + cEDA stress",
      Battery: "24h + always-on"
    },
    description: "Help by Google, health by Fitbit. The most personal Pixel Watch.",
    features: ["Fitbit integration", "Stress tracking", "Safety features", "6 months Fitbit Premium"],
    box: ["Watch", "Active band", "USB-C charger"],
    colors: [
      { name: "Polished Silver", hex: "#E8E8E8" },
      { name: "Matte Black", hex: "#1A1A1A" },
      { name: "Champagne Gold", hex: "#C9A86A" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: false
  },
  {
    id: "p22",
    name: "Vision Pro 256GB",
    brand: "Apple",
    category: "Glasses",
    superCategory: "Wearables",
    price: 3499,
    rating: 4.7,
    reviewsCount: 321,
    images: [
      { gradient: "from-[#E8E8E8] to-[#B8B8B8]", src: "./products/p22.jpg", emoji: "🥽", label: "Glass" },
      { gradient: "from-[#111] to-[#444]", src: "./products/p22.jpg", emoji: "🥽", label: "Knit Band" },
      { gradient: "from-[#6C5CFF] to-[#E8E8E8]", src: "./products/p22.jpg", emoji: "🥽", label: "Spatial" },
      { gradient: "from-[#E8FF5A] to-[#E8E8E8]", src: "./products/p22.jpg", emoji: "🥽", label: "Eyesight" }
    ],
    specs: {
      Display: "23M pixels dual micro-OLED",
      Chip: "M2 + R1",
      Tracking: "Eye + hand + voice",
      Battery: "2h + all day plugged"
    },
    description: "The era of spatial computing. Seamlessly blend digital content with physical space.",
    features: ["23M pixels", "Eye tracking", "Spatial audio", "Optic ID"],
    box: ["Vision Pro", "Light Seal", "Head Band", "Battery", "Polishing cloth"],
    colors: [
      { name: "Glass", hex: "#E8E8E8" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: false
  },
  {
    id: "p23",
    name: "XPS 14 OLED",
    brand: "Dell",
    category: "Laptops",
    superCategory: "Laptops",
    price: 1799,
    originalPrice: 1999,
    rating: 4.6,
    reviewsCount: 534,
    images: [
      { gradient: "from-[#F5F5F0] to-[#CFCFC0]", src: "./products/p23.jpg", emoji: "💻", label: "Platinum" },
      { gradient: "from-[#2A2A2A] to-[#5A5A5A]", src: "./products/p23.jpg", emoji: "💻", label: "Graphite" },
      { gradient: "from-[#E8FF5A] to-[#F5F5F0]", src: "./products/p23.jpg", emoji: "💻", label: "OLED" },
      { gradient: "from-[#111] to-[#6C5CFF]", src: "./products/p23.jpg", emoji: "💻", label: "Keys" }
    ],
    specs: {
      CPU: "Intel Ultra 7 155H",
      Display: '14.5" 3.2K OLED Touch',
      GPU: "RTX 4050",
      Battery: "12h"
    },
    description: "Minimal design, maximal power. InfinityEdge OLED, invisible haptics.",
    features: ["OLED Touch", "Haptic touchpad", "RTX 4050", "12h battery"],
    box: ["XPS 14", "60W charger", "USB-C to USB-A + HDMI adapters"],
    colors: [
      { name: "Platinum", hex: "#F5F5F0" },
      { name: "Graphite", hex: "#2A2A2A" }
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    isPromo: true
  },
  {
    id: "p24",
    name: "Nothing Phone (2)",
    brand: "Nothing",
    category: "Smartphones",
    superCategory: "Smartphones",
    price: 599,
    rating: 4.5,
    reviewsCount: 923,
    images: [
      { gradient: "from-[#FFFFFF] to-[#D0D0D0]", src: "./products/p24.jpg", emoji: "📱", label: "White" },
      { gradient: "from-[#1A1A1A] to-[#4A4A4A]", src: "./products/p24.jpg", emoji: "📱", label: "Dark Gray" },
      { gradient: "from-[#E8FF5A] to-[#fff]", src: "./products/p24.jpg", emoji: "📱", label: "Glyph" },
      { gradient: "from-[#6C5CFF] to-[#fff]", src: "./products/p24.jpg", emoji: "📱", label: "Interface" }
    ],
    specs: {
      Chip: "Snapdragon 8+ Gen 1",
      Display: '6.7" LTPO OLED 120Hz',
      Glyph: "Glyph Interface + 11 LEDs",
      OS: "Nothing OS 2.0"
    },
    description: "Less distractions. More soul. Glyph Interface that speaks in light.",
    features: ["Glyph Interface", "Nothing OS 2.0", "50MP dual", "120Hz LTPO"],
    box: ["Phone (2)", "USB-C cable", "Screen protector", "SIM tool"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Dark Gray", hex: "#2A2A2A" }
    ],
    inStock: true,
    isNew: false,
    isBestSeller: false,
    isPromo: true
  }];
