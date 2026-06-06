import { Language } from "./translations";

export interface Product {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  category: "louver" | "chipboard" | "adhesive";
  widthM: number;
  heightM: number;
  thicknessMm: number;
  coveragePerUnitSqm: number;
  specificationsEn: string[];
  specificationsAr: string[];
  image: string;
}

export const productsCatalog: Product[] = [
  // PS Louvers
  {
    id: "ps-louver-e103",
    code: "E103",
    nameEn: "Royal Oak Korean PS Louver",
    nameAr: "بني البلوط الملكي - بديل الخشب الكوري",
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
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E103-scaled.png?resize=300%2C300&ssl=1"
  },
  {
    id: "ps-louver-e111",
    code: "E111",
    nameEn: "Classic Walnut Korean PS Louver",
    nameAr: "جوز كلاسيكي - بديل الخشب الكوري",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Authentic South Korean build quality",
      "Formaldehyde-Free and eco-friendly",
      "100% insect and mold resistant",
      "Solid core structure, zero hollow pockets",
      "Warm walnut wood finish"
    ],
    specificationsAr: [
      "جودة تصنيع كورية جنوبية أصلية",
      "صديق للبيئة وخالٍ تماماً من الفورمالديهايد",
      "مقاوم للحشرات والفطريات والرطوبة تماماً",
      "هيكل صلب غير مفرغ لمتانة تدوم طويلاً",
      "لون الجوز الدافئ الفاخر"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E111-scaled.png?resize=300%2C300&ssl=1"
  },
  {
    id: "ps-louver-e129",
    code: "E129",
    nameEn: "Premium Charcoal Korean PS Louver",
    nameAr: "فحمي فاخر - بديل الخشب الكوري",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Modern dark charcoal tone for luxury spaces",
      "Formaldehyde-Free, zero VOC emissions",
      "Solid-core polymer construction",
      "Ideal for high-end accent walls and office backdrops"
    ],
    specificationsAr: [
      "لون فحمي مودرن وتصميم أنيق للمساحات الفاخرة",
      "صديق للبيئة خالي من انبعاثات المركبات العضوية المتطايرة",
      "هيكل بوليستيرين صلب ومقاوم للصدمات",
      "مثالي للحوائط الديكورية الفخمة وخلفيات المكاتب"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E129-scaled.png?resize=300%2C300&ssl=1"
  },
  {
    id: "ps-louver-e123",
    code: "E123",
    nameEn: "Minimalist White Korean PS Louver",
    nameAr: "أبيض مينيمالست - بديل الخشب الكوري",
    category: "louver",
    widthM: 0.12,
    heightM: 2.9,
    thicknessMm: 12,
    coveragePerUnitSqm: 0.348,
    specificationsEn: [
      "Clean minimalist white finish",
      "Formaldehyde-Free and hypoallergenic",
      "Waterproof, easy to clean with soap and water",
      "Solid non-hollow profiles"
    ],
    specificationsAr: [
      "أبيض ناصع وتصميم مينيمالست هادئ ومريح",
      "صديق للبيئة ومضاد للحساسية",
      "مقاوم للمياه وسهل التنظيف والتعقيم",
      "قطاعات صلبة بالكامل ومستوية السطح"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2026/02/E123-scaled.png?resize=300%2C300&ssl=1"
  },

  // Chipboard Alternative
  {
    id: "chipboard-marble-calacatta",
    code: "CH-Calacatta",
    nameEn: "Calacatta Gold Chipboard Alternative",
    nameAr: "كالاكاتا ذهبي - بديل الشيبورد الصلب",
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
      "Stunning high-gloss Calacatta marble print with gold veins"
    ],
    specificationsAr: [
      "خام PVC صلب وممزوج ببودرة الحجر لملء المسام الداخلية",
      "هيكل مضغوط ومتماسك تماماً وغير مفرغ",
      "مقاوم للغازات المتطايرة الناتجة عن كُله السليكون ثقيل الوزن",
      "يمنع التقشير أو الانبعاج أو تكوين فقاعات هوائية مدى الحياة",
      "شكل رخامي فاخر بنقشة كالاكاتا وعروق ذهبية لامعة"
    ],
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2022/08/Home.png?resize=300%2C300&ssl=1"
  },

  // Adhesives
  {
    id: "korean-eco-adhesive",
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

/**
 * Calculates the quantities needed for a wall size
 * @param category Product category
 * @param width Wall width in meters
 * @param height Wall height in meters
 * @returns { panels: number, glue: number }
 */
export function calculateMaterials(
  category: "louver" | "chipboard",
  width: number,
  height: number
): { panels: number; glue: number } {
  const safetyFactor = 1.05; // 5% wastage margin
  
  if (category === "louver") {
    const louverWidth = 0.12; // 12cm
    const louverHeight = 2.9; // 2.9m
    
    // Panel width calculations
    const horizontalPanels = Math.ceil(width / louverWidth);
    // Vertical cuts
    const verticalStacks = Math.ceil(height / louverHeight);
    
    const basePanels = horizontalPanels * verticalStacks;
    const panels = Math.ceil(basePanels * safetyFactor);
    
    // 1 tube of adhesive for every 5 panels
    const glue = Math.max(1, Math.ceil(panels / 5));
    
    return { panels, glue };
  } else {
    // Chipboard alternative
    const sheetWidth = 1.22; // 1.22m
    const sheetHeight = 2.8; // 2.8m
    
    // Sheets needed to cover width and height
    const horizontalSheets = Math.ceil(width / sheetWidth);
    const verticalSheets = Math.ceil(height / sheetHeight);
    
    const baseSheets = horizontalSheets * verticalSheets;
    const panels = Math.ceil(baseSheets * safetyFactor);
    
    // 1 tube of adhesive per sheet
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
