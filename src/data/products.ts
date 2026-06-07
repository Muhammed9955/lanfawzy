import { Language } from "./translations";

export interface Product {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  category: "louver" | "chipboard" | "adhesive" | "flat-pvc" | "flat-ps";
  widthM: number;
  heightM: number;
  thicknessMm: number;
  coveragePerUnitSqm: number;
  specificationsEn: string[];
  specificationsAr: string[];
  image: string;
}

export const productsCatalog: Product[] = [
  {
    id: "louver-e157-4",
    code: "E157-4",
    nameEn: "E157-4 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-4 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_076.png?ssl=1"
  },
  {
    id: "louver-e157-28",
    code: "E157-28",
    nameEn: "E157-28 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-28 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_091.png?ssl=1"
  },
  {
    id: "louver-e157-27",
    code: "E157-27",
    nameEn: "E157-27 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-27 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_092.png?ssl=1"
  },
  {
    id: "louver-e157-24",
    code: "E157-24",
    nameEn: "E157-24 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-24 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_073.png?ssl=1"
  },
  {
    id: "louver-e157-30",
    code: "E157-30",
    nameEn: "E157-30 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-30 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_086.png?ssl=1"
  },
  {
    id: "louver-e157-29",
    code: "E157-29",
    nameEn: "E157-29 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-29 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_089.png?ssl=1"
  },
  {
    id: "louver-e157-26",
    code: "E157-26",
    nameEn: "E157-26 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-26 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_090.png?ssl=1"
  },
  {
    id: "louver-e157-34",
    code: "E157-34",
    nameEn: "E157-34 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-34 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/Picture1.jpg?ssl=1"
  },
  {
    id: "louver-e157-17",
    code: "E157-17",
    nameEn: "E157-17 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-17 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1893-1-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-18",
    code: "E157-18",
    nameEn: "E157-18 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-18 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1880-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-5",
    code: "E157-5",
    nameEn: "E157-5 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-5 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1898-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-14",
    code: "E157-14",
    nameEn: "E157-14 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-14 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1897-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-15",
    code: "E157-15",
    nameEn: "E157-15 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-15 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1894-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-13",
    code: "E157-13",
    nameEn: "E157-13 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-13 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1881-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-22",
    code: "E157-22",
    nameEn: "E157-22 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-22 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1883-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-10",
    code: "E157-10",
    nameEn: "E157-10 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-10 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1884-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-11",
    code: "E157-11",
    nameEn: "E157-11 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-11 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1885-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-23",
    code: "E157-23",
    nameEn: "E157-23 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-23 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1886-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-12",
    code: "E157-12",
    nameEn: "E157-12 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-12 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1892-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e157-6",
    code: "E157-6",
    nameEn: "E157-6 Korean PS Louver (Thick Stripes)",
    nameAr: "E157-6 بديل الخشب الكوري - خطوط سميكة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Manufactured from high-density eco-friendly PS polymer",
      "Formaldehyde-Free, US FDA approved for safe living environments",
      "100% Waterproof and moisture-proof",
      "Solid core construction, highly break-resistant",
      "Finished with premium anti-static wood-grain texture"
    ],
    specificationsAr: [
      "مصنع من بوليمر البوليستيرين (PS) عالي الكثافة الصديق للبيئة",
      "خالٍ تماماً من الفورمالديهايد والغازات المسرطنة (معتمد من FDA الأمريكية)",
      "مقاوم للمياه والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل ومقاوم للكسر والاصطدام",
      "مغطى بطبقة ذات ملمس خشبي طبيعي طارد للأتربة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/File_072.png?ssl=1"
  },
  {
    id: "louver-e512",
    code: "E512",
    nameEn: "E512 Korean PS Louver (Thin Stripes)",
    nameAr: "E512 بديل الخشب الكوري - خطوط رفيعة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium South Korean build quality (Thin Slat Design)",
      "Formaldehyde-Free and eco-friendly",
      "100% insect, mold and warp resistant",
      "Solid core structure, zero hollow pockets",
      "Elegant thin-stripe linear texture"
    ],
    specificationsAr: [
      "جودة تصنيع كورية جنوبية أصلية بتصميم قطاعات رفيعة",
      "صديق للبيئة وخالٍ تماماً من الفورمالديهايد",
      "مقاوم للحشرات والفطريات والرطوبة بنسبة 100%",
      "هيكل صلب غير مفرغ لمتانة تدوم طويلاً",
      "تكسيات خطوط رفيعة كلاسيكية أنيقة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1906-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e511",
    code: "E511",
    nameEn: "E511 Korean PS Louver (Thin Stripes)",
    nameAr: "E511 بديل الخشب الكوري - خطوط رفيعة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium South Korean build quality (Thin Slat Design)",
      "Formaldehyde-Free and eco-friendly",
      "100% insect, mold and warp resistant",
      "Solid core structure, zero hollow pockets",
      "Elegant thin-stripe linear texture"
    ],
    specificationsAr: [
      "جودة تصنيع كورية جنوبية أصلية بتصميم قطاعات رفيعة",
      "صديق للبيئة وخالٍ تماماً من الفورمالديهايد",
      "مقاوم للحشرات والفطريات والرطوبة بنسبة 100%",
      "هيكل صلب غير مفرغ لمتانة تدوم طويلاً",
      "تكسيات خطوط رفيعة كلاسيكية أنيقة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1915-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e503",
    code: "E503",
    nameEn: "E503 Korean PS Louver (Thin Stripes)",
    nameAr: "E503 بديل الخشب الكوري - خطوط رفيعة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium South Korean build quality (Thin Slat Design)",
      "Formaldehyde-Free and eco-friendly",
      "100% insect, mold and warp resistant",
      "Solid core structure, zero hollow pockets",
      "Elegant thin-stripe linear texture"
    ],
    specificationsAr: [
      "جودة تصنيع كورية جنوبية أصلية بتصميم قطاعات رفيعة",
      "صديق للبيئة وخالٍ تماماً من الفورمالديهايد",
      "مقاوم للحشرات والفطريات والرطوبة بنسبة 100%",
      "هيكل صلب غير مفرغ لمتانة تدوم طويلاً",
      "تكسيات خطوط رفيعة كلاسيكية أنيقة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1903-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e516",
    code: "E516",
    nameEn: "E516 Korean PS Louver (Thin Stripes)",
    nameAr: "E516 بديل الخشب الكوري - خطوط رفيعة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium South Korean build quality (Thin Slat Design)",
      "Formaldehyde-Free and eco-friendly",
      "100% insect, mold and warp resistant",
      "Solid core structure, zero hollow pockets",
      "Elegant thin-stripe linear texture"
    ],
    specificationsAr: [
      "جودة تصنيع كورية جنوبية أصلية بتصميم قطاعات رفيعة",
      "صديق للبيئة وخالٍ تماماً من الفورمالديهايد",
      "مقاوم للحشرات والفطريات والرطوبة بنسبة 100%",
      "هيكل صلب غير مفرغ لمتانة تدوم طويلاً",
      "تكسيات خطوط رفيعة كلاسيكية أنيقة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1904-scaled.jpeg?ssl=1"
  },
  {
    id: "louver-e510",
    code: "E510",
    nameEn: "E510 Korean PS Louver (Thin Stripes)",
    nameAr: "E510 بديل الخشب الكوري - خطوط رفيعة",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium South Korean build quality (Thin Slat Design)",
      "Formaldehyde-Free and eco-friendly",
      "100% insect, mold and warp resistant",
      "Solid core structure, zero hollow pockets",
      "Elegant thin-stripe linear texture"
    ],
    specificationsAr: [
      "جودة تصنيع كورية جنوبية أصلية بتصميم قطاعات رفيعة",
      "صديق للبيئة وخالٍ تماماً من الفورمالديهايد",
      "مقاوم للحشرات والفطريات والرطوبة بنسبة 100%",
      "هيكل صلب غير مفرغ لمتانة تدوم طويلاً",
      "تكسيات خطوط رفيعة كلاسيكية أنيقة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1914-scaled.jpeg?ssl=1"
  },
  {
    id: "flat-pvc-e643-(60cm)",
    code: "E643 (60CM)",
    nameEn: "E643 (60CM) Premium Flat PVC 3D Cladding",
    nameAr: "E643 (60CM) بديل الرخام فلات PVC ثلاثي الأبعاد",
    category: "flat-pvc",
    widthM: 0.6,
    heightM: 2.8,
    thicknessMm: 5,
    coveragePerUnitSqm: 1.68,
    specificationsEn: [
      "Premium PVC 3D flat cladding panel (60cm width)",
      "100% waterproof and moisture resistant",
      "Easy installation on flat surfaces using silicone",
      "Eco-friendly, formaldehyde-free material",
      "High durability and resistance to wear and scratch"
    ],
    specificationsAr: [
      "ألواح تكسيات فلات ثلاثية الأبعاد PVC فاخرة (عرض 60 سم)",
      "مقاومة للماء والرطوبة بنسبة 100%",
      "سهلة التركيب على الأسطح المستوية باستخدام السيلكون",
      "صديقة للبيئة وخالية من الفورمالديهايد",
      "متانة عالية ومقاومة للتآكل والخدوش"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/IMG_2891-scaled.jpg?ssl=1"
  },
  {
    id: "flat-pvc-e647-(60cm)",
    code: "E647 (60CM)",
    nameEn: "E647 (60CM) Premium Flat PVC 3D Cladding",
    nameAr: "E647 (60CM) بديل الرخام فلات PVC ثلاثي الأبعاد",
    category: "flat-pvc",
    widthM: 0.6,
    heightM: 2.8,
    thicknessMm: 5,
    coveragePerUnitSqm: 1.68,
    specificationsEn: [
      "Premium PVC 3D flat cladding panel (60cm width)",
      "100% waterproof and moisture resistant",
      "Easy installation on flat surfaces using silicone",
      "Eco-friendly, formaldehyde-free material",
      "High durability and resistance to wear and scratch"
    ],
    specificationsAr: [
      "ألواح تكسيات فلات ثلاثية الأبعاد PVC فاخرة (عرض 60 سم)",
      "مقاومة للماء والرطوبة بنسبة 100%",
      "سهلة التركيب على الأسطح المستوية باستخدام السيلكون",
      "صديقة للبيئة وخالية من الفورمالديهايد",
      "متانة عالية ومقاومة للتآكل والخدوش"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/IMG_2889-scaled.jpg?ssl=1"
  },
  {
    id: "flat-pvc-e649-(60cm)",
    code: "E649 (60CM)",
    nameEn: "E649 (60CM) Premium Flat PVC 3D Cladding",
    nameAr: "E649 (60CM) بديل الرخام فلات PVC ثلاثي الأبعاد",
    category: "flat-pvc",
    widthM: 0.6,
    heightM: 2.8,
    thicknessMm: 5,
    coveragePerUnitSqm: 1.68,
    specificationsEn: [
      "Premium PVC 3D flat cladding panel (60cm width)",
      "100% waterproof and moisture resistant",
      "Easy installation on flat surfaces using silicone",
      "Eco-friendly, formaldehyde-free material",
      "High durability and resistance to wear and scratch"
    ],
    specificationsAr: [
      "ألواح تكسيات فلات ثلاثية الأبعاد PVC فاخرة (عرض 60 سم)",
      "مقاومة للماء والرطوبة بنسبة 100%",
      "سهلة التركيب على الأسطح المستوية باستخدام السيلكون",
      "صديقة للبيئة وخالية من الفورمالديهايد",
      "متانة عالية ومقاومة للتآكل والخدوش"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/IMG_2871-scaled.jpg?ssl=1"
  },
  {
    id: "flat-pvc-e642-(60cm)",
    code: "E642 (60CM)",
    nameEn: "E642 (60CM) Premium Flat PVC 3D Cladding",
    nameAr: "E642 (60CM) بديل الرخام فلات PVC ثلاثي الأبعاد",
    category: "flat-pvc",
    widthM: 0.6,
    heightM: 2.8,
    thicknessMm: 5,
    coveragePerUnitSqm: 1.68,
    specificationsEn: [
      "Premium PVC 3D flat cladding panel (60cm width)",
      "100% waterproof and moisture resistant",
      "Easy installation on flat surfaces using silicone",
      "Eco-friendly, formaldehyde-free material",
      "High durability and resistance to wear and scratch"
    ],
    specificationsAr: [
      "ألواح تكسيات فلات ثلاثية الأبعاد PVC فاخرة (عرض 60 سم)",
      "مقاومة للماء والرطوبة بنسبة 100%",
      "سهلة التركيب على الأسطح المستوية باستخدام السيلكون",
      "صديقة للبيئة وخالية من الفورمالديهايد",
      "متانة عالية ومقاومة للتآكل والخدوش"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/IMG_2879-scaled.jpg?ssl=1"
  },
  {
    id: "flat-pvc-e646-(60cm)",
    code: "E646 (60CM)",
    nameEn: "E646 (60CM) Premium Flat PVC 3D Cladding",
    nameAr: "E646 (60CM) بديل الرخام فلات PVC ثلاثي الأبعاد",
    category: "flat-pvc",
    widthM: 0.6,
    heightM: 2.8,
    thicknessMm: 5,
    coveragePerUnitSqm: 1.68,
    specificationsEn: [
      "Premium PVC 3D flat cladding panel (60cm width)",
      "100% waterproof and moisture resistant",
      "Easy installation on flat surfaces using silicone",
      "Eco-friendly, formaldehyde-free material",
      "High durability and resistance to wear and scratch"
    ],
    specificationsAr: [
      "ألواح تكسيات فلات ثلاثية الأبعاد PVC فاخرة (عرض 60 سم)",
      "مقاومة للماء والرطوبة بنسبة 100%",
      "سهلة التركيب على الأسطح المستوية باستخدام السيلكون",
      "صديقة للبيئة وخالية من الفورمالديهايد",
      "متانة عالية ومقاومة للتآكل والخدوش"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/IMG_2881-scaled.jpg?ssl=1"
  },
  {
    id: "flat-pvc-e645-(60cm)",
    code: "E645 (60CM)",
    nameEn: "E645 (60CM) Premium Flat PVC 3D Cladding",
    nameAr: "E645 (60CM) بديل الرخام فلات PVC ثلاثي الأبعاد",
    category: "flat-pvc",
    widthM: 0.6,
    heightM: 2.8,
    thicknessMm: 5,
    coveragePerUnitSqm: 1.68,
    specificationsEn: [
      "Premium PVC 3D flat cladding panel (60cm width)",
      "100% waterproof and moisture resistant",
      "Easy installation on flat surfaces using silicone",
      "Eco-friendly, formaldehyde-free material",
      "High durability and resistance to wear and scratch"
    ],
    specificationsAr: [
      "ألواح تكسيات فلات ثلاثية الأبعاد PVC فاخرة (عرض 60 سم)",
      "مقاومة للماء والرطوبة بنسبة 100%",
      "سهلة التركيب على الأسطح المستوية باستخدام السيلكون",
      "صديقة للبيئة وخالية من الفورمالديهايد",
      "متانة عالية ومقاومة للتآكل والخدوش"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/12/IMG_2906-scaled.jpg?ssl=1"
  },
  {
    id: "flat-ps-lan310",
    code: "LAN310",
    nameEn: "LAN310 Premium Flat PS Korean Cladding",
    nameAr: "LAN310 تكسيات فلات PS كوري فاخر",
    category: "flat-ps",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium flat PS polymer profile from South Korea",
      "Formaldehyde-Free, US FDA approved materials",
      "100% Waterproof and insect resistant",
      "Solid core construction, zero hollow pockets",
      "Sleek contemporary matte finish"
    ],
    specificationsAr: [
      "قطاعات فلات بوليستيرين (PS) كورية فاخرة",
      "خالية تماماً من الفورمالديهايد ومعتمدة من منظمة الغذاء والدواء الأمريكية (FDA)",
      "مقاومة للمياه والحشرات والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل بدون فراغات داخلية",
      "مظهر مطفأ (مط) عصري وأنيق"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1963-scaled.jpeg?ssl=1"
  },
  {
    id: "flat-ps-lan309",
    code: "LAN309",
    nameEn: "LAN309 Premium Flat PS Korean Cladding",
    nameAr: "LAN309 تكسيات فلات PS كوري فاخر",
    category: "flat-ps",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium flat PS polymer profile from South Korea",
      "Formaldehyde-Free, US FDA approved materials",
      "100% Waterproof and insect resistant",
      "Solid core construction, zero hollow pockets",
      "Sleek contemporary matte finish"
    ],
    specificationsAr: [
      "قطاعات فلات بوليستيرين (PS) كورية فاخرة",
      "خالية تماماً من الفورمالديهايد ومعتمدة من منظمة الغذاء والدواء الأمريكية (FDA)",
      "مقاومة للمياه والحشرات والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل بدون فراغات داخلية",
      "مظهر مطفأ (مط) عصري وأنيق"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1958-scaled.jpeg?ssl=1"
  },
  {
    id: "flat-ps-lan308",
    code: "LAN308",
    nameEn: "LAN308 Premium Flat PS Korean Cladding",
    nameAr: "LAN308 تكسيات فلات PS كوري فاخر",
    category: "flat-ps",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium flat PS polymer profile from South Korea",
      "Formaldehyde-Free, US FDA approved materials",
      "100% Waterproof and insect resistant",
      "Solid core construction, zero hollow pockets",
      "Sleek contemporary matte finish"
    ],
    specificationsAr: [
      "قطاعات فلات بوليستيرين (PS) كورية فاخرة",
      "خالية تماماً من الفورمالديهايد ومعتمدة من منظمة الغذاء والدواء الأمريكية (FDA)",
      "مقاومة للمياه والحشرات والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل بدون فراغات داخلية",
      "مظهر مطفأ (مط) عصري وأنيق"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1959-scaled.jpeg?ssl=1"
  },
  {
    id: "flat-ps-lan314",
    code: "LAN314",
    nameEn: "LAN314 Premium Flat PS Korean Cladding",
    nameAr: "LAN314 تكسيات فلات PS كوري فاخر",
    category: "flat-ps",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Premium flat PS polymer profile from South Korea",
      "Formaldehyde-Free, US FDA approved materials",
      "100% Waterproof and insect resistant",
      "Solid core construction, zero hollow pockets",
      "Sleek contemporary matte finish"
    ],
    specificationsAr: [
      "قطاعات فلات بوليستيرين (PS) كورية فاخرة",
      "خالية تماماً من الفورمالديهايد ومعتمدة من منظمة الغذاء والدواء الأمريكية (FDA)",
      "مقاومة للمياه والحشرات والرطوبة بنسبة 100%",
      "هيكل صلب بالكامل بدون فراغات داخلية",
      "مظهر مطفأ (مط) عصري وأنيق"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/IMG_1960.jpeg?ssl=1"
  },
  {
    id: "chipboard-e122",
    code: "E122",
    nameEn: "E122 Solid-Core Chipboard Alternative",
    nameAr: "E122 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E122-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e121",
    code: "E121",
    nameEn: "E121 Solid-Core Chipboard Alternative",
    nameAr: "E121 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E121-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e120",
    code: "E120",
    nameEn: "E120 Solid-Core Chipboard Alternative",
    nameAr: "E120 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E120.png?ssl=1"
  },
  {
    id: "chipboard-e119",
    code: "E119",
    nameEn: "E119 Solid-Core Chipboard Alternative",
    nameAr: "E119 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E119-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e118",
    code: "E118",
    nameEn: "E118 Solid-Core Chipboard Alternative",
    nameAr: "E118 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E118-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e117",
    code: "E117",
    nameEn: "E117 Solid-Core Chipboard Alternative",
    nameAr: "E117 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E117.png?ssl=1"
  },
  {
    id: "chipboard-e116",
    code: "E116",
    nameEn: "E116 Solid-Core Chipboard Alternative",
    nameAr: "E116 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E116-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e115",
    code: "E115",
    nameEn: "E115 Solid-Core Chipboard Alternative",
    nameAr: "E115 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E103-scaled.png"
  },
  {
    id: "chipboard-e114",
    code: "E114",
    nameEn: "E114 Solid-Core Chipboard Alternative",
    nameAr: "E114 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E115.png?ssl=1"
  },
  {
    id: "chipboard-e106",
    code: "E106",
    nameEn: "E106 Solid-Core Chipboard Alternative",
    nameAr: "E106 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E106-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e108",
    code: "E108",
    nameEn: "E108 Solid-Core Chipboard Alternative",
    nameAr: "E108 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E108-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e109",
    code: "E109",
    nameEn: "E109 Solid-Core Chipboard Alternative",
    nameAr: "E109 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E109-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e110",
    code: "E110",
    nameEn: "E110 Solid-Core Chipboard Alternative",
    nameAr: "E110 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E110-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e101",
    code: "E101",
    nameEn: "E101 Solid-Core Chipboard Alternative",
    nameAr: "E101 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E101.png?ssl=1"
  },
  {
    id: "chipboard-e102",
    code: "E102",
    nameEn: "E102 Solid-Core Chipboard Alternative",
    nameAr: "E102 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E102-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e103",
    code: "E103",
    nameEn: "E103 Solid-Core Chipboard Alternative",
    nameAr: "E103 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E103-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e111",
    code: "E111",
    nameEn: "E111 Solid-Core Chipboard Alternative",
    nameAr: "E111 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E111-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e112",
    code: "E112",
    nameEn: "E112 Solid-Core Chipboard Alternative",
    nameAr: "E112 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E112-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e105",
    code: "E105",
    nameEn: "E105 Solid-Core Chipboard Alternative",
    nameAr: "E105 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E105-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e131",
    code: "E131",
    nameEn: "E131 Solid-Core Chipboard Alternative",
    nameAr: "E131 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E131-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e130",
    code: "E130",
    nameEn: "E130 Solid-Core Chipboard Alternative",
    nameAr: "E130 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E130-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e129",
    code: "E129",
    nameEn: "E129 Solid-Core Chipboard Alternative",
    nameAr: "E129 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E129-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e128",
    code: "E128",
    nameEn: "E128 Solid-Core Chipboard Alternative",
    nameAr: "E128 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E128-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e127",
    code: "E127",
    nameEn: "E127 Solid-Core Chipboard Alternative",
    nameAr: "E127 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E127-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e126",
    code: "E126",
    nameEn: "E126 Solid-Core Chipboard Alternative",
    nameAr: "E126 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E126-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e124",
    code: "E124",
    nameEn: "E124 Solid-Core Chipboard Alternative",
    nameAr: "E124 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E124-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e123",
    code: "E123",
    nameEn: "E123 Solid-Core Chipboard Alternative",
    nameAr: "E123 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E123-scaled.png?ssl=1"
  },
  {
    id: "chipboard-e125",
    code: "E125",
    nameEn: "E125 Solid-Core Chipboard Alternative",
    nameAr: "E125 بديل الشيبورد الصلب - مقاوم للرطوبة",
    category: "chipboard",
    widthM: 1.22,
    heightM: 2.8,
    thicknessMm: 18,
    coveragePerUnitSqm: 3.416,
    specificationsEn: [
      "Premium solid core PVC blended with stone powder",
      "Ultra-compact structure to fill all interior micro-pores",
      "Chemical resistance to volatile gases released from heavy silicone adhesives",
      "Will not deform, peel, bubble, or blister over time",
      "Stunning texture with high-quality surface coating"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل فاخر وتلميع عالي الجودة للأسطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E125-scaled.png?ssl=1"
  },
  // Adhesives
  {
    id: "adhesive-ad-eco",
    code: "AD-Eco",
    nameEn: "Korean Architectural Heavy-Duty Adhesive",
    nameAr: "المادة اللاصقة المعمارية الكورية فائقة القوة",
    category: "adhesive",
    widthM: 0,
    heightM: 0,
    thicknessMm: 0,
    coveragePerUnitSqm: 0,
    specificationsEn: [
      "Specially formulated for PS polymers and PVC-stone composites",
      "High initial tack, holds panels instantly without slipping",
      "Low odor, eco-friendly formula, zero harmful solvents",
      "Maintains flexibility, absorbs minor wall expansions"
    ],
    specificationsAr: [
      "تركيبة مخصصة لقطاعات البوليستيرين وألواح الـ PVC والبودرة الحجرية",
      "تماسك أولي فائق السرعة لمنع انزلاق الألواح أثناء التركيب",
      "رائحة خفيفة للغاية وخالية تماماً من المذيبات الضارة",
      "يحافظ على مرونة طفيفة لامتصاص حركات تمدد الجدران"
    ],
    image: "https://lanfawzy.com/wp-content/uploads/2022/08/Home-1024x640.png"
  }
];

export function calculateMaterials(
  category: "louver" | "chipboard" | "flat-pvc" | "flat-ps",
  width: number,
  height: number
): { panels: number; glue: number } {
  const safetyFactor = 1.05; // 5% wastage margin
  
  if (category === "louver" || category === "flat-ps") {
    const louverWidth = 0.12; // 12cm
    const louverHeight = 2.9; // 2.9m
    const horizontalPanels = Math.ceil(width / louverWidth);
    const verticalStacks = Math.ceil(height / louverHeight);
    const basePanels = horizontalPanels * verticalStacks;
    const panels = Math.ceil(basePanels * safetyFactor);
    const glue = Math.max(1, Math.ceil(panels / 5));
    return { panels, glue };
  } else if (category === "flat-pvc") {
    const panelWidth = 0.60; // 60cm
    const panelHeight = 2.8; // 2.8m
    const horizontalPanels = Math.ceil(width / panelWidth);
    const verticalStacks = Math.ceil(height / panelHeight);
    const basePanels = horizontalPanels * verticalStacks;
    const panels = Math.ceil(basePanels * safetyFactor);
    const glue = Math.max(1, Math.ceil(panels / 2)); // PVC needs more glue per panel (approx 1 tube for 2 panels)
    return { panels, glue };
  } else {
    // Chipboard alternative
    const sheetWidth = 1.22; // 1.22m
    const sheetHeight = 2.8; // 2.8m
    const horizontalSheets = Math.ceil(width / sheetWidth);
    const verticalSheets = Math.ceil(height / sheetHeight);
    const baseSheets = horizontalSheets * verticalSheets;
    const panels = Math.ceil(baseSheets * safetyFactor);
    const glue = Math.max(1, panels);
    return { panels, glue };
  }
}

export function getProductTranslation(product: Product, lang: Language) {
  return {
    name: lang === "ar" ? product.nameAr : product.nameEn,
    specifications: lang === "ar" ? product.specificationsAr : product.specificationsEn,
  };
}

export function getOptimizedImageUrl(url: string, width: number, height?: number) {
  if (!url) return "";
  if (url.includes("i0.wp.com") || url.includes("lanfawzy.com")) {
    const cleanUrl = url.split("?")[0];
    let cdnUrl = cleanUrl;
    if (!cdnUrl.startsWith("https://i0.wp.com/")) {
      cdnUrl = cdnUrl.replace("https://", "https://i0.wp.com/");
    }
    if (height) {
      return `${cdnUrl}?resize=${width}%2C${height}&ssl=1`;
    }
    return `${cdnUrl}?w=${width}&ssl=1`;
  }
  return url;
}
