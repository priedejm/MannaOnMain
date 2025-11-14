export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
  inStock: boolean;
  stockQuantity: number; // Added stockQuantity field
}

export const products: Product[] = [
  {
    id: "1",
    title: "ESV Personal Size Reference Bible in Forest TruTone Imitation Leather",
    price: 34.99,
    imageUrl: "https://img.heroui.chat/image/book?w=400&h=500&u=1",
    category: "bibles",
    description: "This ESV Personal Size Reference Bible features a high-quality TruTone cover and includes more than 80,000 cross-references.",
    inStock: true,
    stockQuantity: 12
  },
  {
    id: "2",
    title: "ESV Large Print Value Thinline in Blush Rose TruTone with Fleur-De-Lis Design",
    price: 24.99,
    imageUrl: "https://img.heroui.chat/image/book?w=400&h=500&u=2",
    category: "bibles",
    description: "The ESV Large Print Value Thinline Bible includes 10-point type, a quality TruTone cover, and a concordance—all in a portable format that's less than 1 inch thick.",
    inStock: true,
    stockQuantity: 3 // Low stock
  },
  {
    id: "3",
    title: "ESV Large Print Value Thinline Bible (TruTone, Navy, Mosaic Cross Design)",
    price: 24.99,
    imageUrl: "https://img.heroui.chat/image/book?w=400&h=500&u=3",
    category: "bibles",
    description: "The ESV Large Print Value Thinline Bible includes 10-point type, a quality TruTone cover, and a concordance—all in a portable format that's less than 1 inch thick.",
    inStock: true
  },
  {
    id: "4",
    title: "ESV Value Thinline in Black TruTone Imitation Leather- Red Letter Edition",
    price: 19.99,
    imageUrl: "https://img.heroui.chat/image/book?w=400&h=500&u=4",
    category: "bibles",
    description: "The ESV Value Thinline Bible retains many of the features of the original ESV Thinline Bible. At less than 1 inch thick, this affordable Bible is perfect for regular use at home, at church, or on the go.",
    inStock: true,
    stockQuantity: 4 // Low stock
  },
  {
    id: "5",
    title: "ESV Large Print Value Thinline in Turquoise TruTone with Emblem Design",
    price: 24.99,
    imageUrl: "https://img.heroui.chat/image/book?w=400&h=500&u=5",
    category: "bibles",
    description: "The ESV Large Print Value Thinline Bible includes 10-point type, a quality TruTone cover, and a concordance—all in a portable format that's less than 1 inch thick.",
    inStock: true
  },
  {
    id: "6",
    title: "31 Decretos De Bendición Para Las Mujeres",
    price: 15.99,
    imageUrl: "https://img.heroui.chat/image/book?w=400&h=500&u=6",
    category: "books",
    description: "The 31 Decrees of Blessing for Women is a powerful, prophetic book that will help you understand the power of blessing and transform your life through the positive declaration of God's intentions for you.",
    inStock: true
  },
  {
    id: "7",
    title: "Life Blend Medium Roast 12oz",
    price: 24.99,
    imageUrl: "https://img.heroui.chat/image/food?w=400&h=400&u=1",
    category: "home-outdoor",
    description: "Seven Weeks Coffee's Life Blend Medium Roast is a smooth, balanced coffee with notes of chocolate, caramel, and a hint of citrus. Each purchase supports pro-life pregnancy centers.",
    inStock: true
  },
  {
    id: "8",
    title: "ESV Value Thinline Bible (TruTone, Paris Sky, Fleur-de-Lis Design)",
    price: 19.99,
    imageUrl: "https://img.heroui.chat/image/book?w=400&h=500&u=7",
    category: "bibles",
    description: "The ESV Value Thinline Bible retains many of the features of the original ESV Thinline Bible. At less than 1 inch thick, this affordable Bible is perfect for regular use at home, at church, or on the go.",
    inStock: true
  },
  {
    id: "9",
    title: "Our Baby Girl Memory Book",
    price: 29.99,
    imageUrl: "https://img.heroui.chat/image/book?w=400&h=500&u=8",
    category: "children",
    description: "Capture all of your baby girl's special moments with this beautiful memory book. Includes pages for milestones, photos, and memories from pregnancy through the first year.",
    inStock: true
  },
  {
    id: "10",
    title: "Wooden Cross Wall Hanging",
    price: 34.99,
    imageUrl: "https://img.heroui.chat/image/furniture?w=400&h=400&u=1",
    category: "home-outdoor",
    description: "This beautifully crafted wooden cross wall hanging adds a touch of faith to your home decor. Made from high-quality wood with a distressed finish.",
    inStock: false,
    stockQuantity: 0
  },
  {
    id: "11",
    title: "Faith Over Fear T-Shirt",
    price: 19.99,
    imageUrl: "https://img.heroui.chat/image/clothing?w=400&h=400&u=1",
    category: "apparel-accessories",
    description: "This comfortable cotton t-shirt features the inspiring message 'Faith Over Fear' in a modern, stylish design. Available in multiple sizes.",
    inStock: true
  },
  {
    id: "12",
    title: "Praying Hands Necklace",
    price: 24.99,
    imageUrl: "https://img.heroui.chat/image/fashion?w=400&h=400&u=1",
    category: "jewelry",
    description: "This elegant praying hands necklace is crafted from sterling silver and comes with an 18-inch chain. A beautiful reminder of the power of prayer.",
    inStock: true
  }
];
