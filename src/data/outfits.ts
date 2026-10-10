import { ClothingItem, GalleryOutfit } from "@/types";

export const defaultProfileSvg =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect width="300" height="300" fill="#eee"/>
      <circle cx="150" cy="115" r="55" fill="#bbb"/>
      <path d="M60 280 C60 205 105 180 150 180 C195 180 240 205 240 280" fill="#bbb"/>
    </svg>
  `);

export const shirts: ClothingItem[] = [
  {
    id: 1,
    name: "Basic T-Shirt",
    image: "/img-home/5.jpg",
    style: {
      casual: 90,
      modern: 70,
      streetwear: 60,
      formal: 20,
      elegant: 30,
    },
  },
  {
    id: 2,
    name: "Oversized Shirt",
    image: "/img-home/9.jpg",
    style: {
      casual: 80,
      modern: 85,
      streetwear: 85,
      formal: 20,
      elegant: 40,
    },
  },
  {
    id: 3,
    name: "Blouse",
    image: "/img-home/8.jpg",
    style: {
      casual: 60,
      modern: 70,
      streetwear: 20,
      formal: 65,
      elegant: 90,
    },
  },
  {
    id: 4,
    name: "Formal Shirt",
    image: "/img-home/6.jpg",
    style: {
      casual: 30,
      modern: 70,
      streetwear: 15,
      formal: 95,
      elegant: 80,
    },
  },
];

export const pants: ClothingItem[] = [
  {
    id: 1,
    name: "Blue Jeans",
    image: "/img-home/7.jpg",
    style: {
      casual: 90,
      modern: 70,
      streetwear: 70,
      formal: 20,
      elegant: 30,
    },
  },
  {
    id: 2,
    name: "Wide Pants",
    image: "/img-home/10.jpg",
    style: {
      casual: 70,
      modern: 90,
      streetwear: 60,
      formal: 40,
      elegant: 75,
    },
  },
  {
    id: 3,
    name: "Cargo Pants",
    image: "/img-home/11.jpg",
    style: {
      casual: 85,
      modern: 80,
      streetwear: 95,
      formal: 15,
      elegant: 20,
    },
  },
  {
    id: 4,
    name: "Chino Pants",
    image: "/img-home/12.jpg",
    style: {
      casual: 60,
      modern: 70,
      streetwear: 25,
      formal: 85,
      elegant: 70,
    },
  },
];

export const shoes: ClothingItem[] = [
  {
    id: 1,
    name: "White Sneakers",
    image: "/img-home/2.jpg",
    style: {
      casual: 90,
      modern: 80,
      streetwear: 80,
      formal: 20,
      elegant: 30,
    },
  },
  {
    id: 2,
    name: "Loafers",
    image: "/img-home/4.jpg",
    style: {
      casual: 40,
      modern: 65,
      streetwear: 20,
      formal: 90,
      elegant: 85,
    },
  },
  {
    id: 3,
    name: "Flats",
    image: "/img-home/1.jpg",
    style: {
      casual: 60,
      modern: 65,
      streetwear: 15,
      formal: 65,
      elegant: 90,
    },
  },
  {
    id: 4,
    name: "High Sneakers",
    image: "/img-home/3.jpg",
    style: {
      casual: 80,
      modern: 85,
      streetwear: 95,
      formal: 15,
      elegant: 25,
    },
  },
];

export const galleryOutfits: GalleryOutfit[] = [
  {
    id: 1,
    title: "Simple Campus Look",
    category: "casual",
    image: "/img-galeri/simple-cl.jpg",
    description: "Kombinasi sederhana dan nyaman untuk aktivitas kuliah sehari-hari.",
    tags: ["T-Shirt", "Jeans", "Sneakers"],
  },
  {
    id: 2,
    title: "Clean Campus Outfit",
    category: "casual",
    image: "/img-galeri/clean-cl.jpg",
    description: "Outfit clean dan rapi yang cocok untuk kuliah dan mengerjakan tugas.",
    tags: ["Shirt", "Straight Pants", "Sneakers"],
  },
  {
    id: 3,
    title: "Campus Formal",
    category: "formal",
    image: "/img-galeri/formal-cl.jpg",
    description: "Pilihan outfit formal untuk presentasi, seminar, atau kegiatan kampus.",
    tags: ["Shirt", "Chino", "Loafers"],
  },
  {
    id: 4,
    title: "Relaxed Streetwear",
    category: "streetwear",
    image: "/img-galeri/street-cl.jpg",
    description: "Style streetwear yang santai dan lebih bold untuk aktivitas kampus.",
    tags: ["Hoodie", "Cargo", "Sneakers"],
  },
  {
    id: 5,
    title: "Soft Campus Look",
    category: "elegant",
    image: "/img-galeri/soft-cl.jpg",
    description: "Outfit dengan potongan feminin dan elegant untuk tampilan kampus.",
    tags: ["Blouse", "Kulot", "Flats"],
  },
  {
    id: 6,
    title: "Hijab Daily Look",
    category: "hijab",
    image: "/img-galeri/hijab-cl.jpg",
    description: "Inspirasi outfit hijab yang simple dan nyaman digunakan sehari-hari.",
    tags: ["Hijab", "Oversized Shirt", "Jeans"],
  },
  {
    id: 7,
    title: "Modern Campus",
    category: "casual",
    image: "/img-galeri/modern-cl.jpg",
    description: "Perpaduan item basic dengan sentuhan modern untuk tampilan kampus.",
    tags: ["Basic Top", "Wide Pants", "Sneakers"],
  },
  {
    id: 8,
    title: "Elegant Hijab Look",
    category: "hijab",
    image: "/img-galeri/elegant-cl.jpg",
    description: "Tampilan hijab yang clean dan elegant untuk kegiatan kampus.",
    tags: ["Blouse", "Long Skirt", "Hijab"],
  },
];
