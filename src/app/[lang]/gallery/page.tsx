"use client";

import React, { useState, use, useEffect } from "react";
import Image from "next/image";
import { translations, Language } from "@/data/translations";
import { Compass, MapPin, X, ChevronLeft, ChevronRight, Grid } from "lucide-react";

interface GalleryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  city: "cairo" | "alexandria";
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "proj-1",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404988457_410925111264341_7271574323023163063_n.jpg?ssl=1"
  },
  {
    id: "proj-2",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/411421305_1411603436399368_8452237917376526267_n.jpg?ssl=1"
  },
  {
    id: "proj-3",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/LV124-BU22_RGB-scaled.jpg?ssl=1"
  },
  {
    id: "proj-4",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/414380617_299347582633123_5633256656819015546_n.jpg?ssl=1"
  },
  {
    id: "proj-5",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/412645827_277504551988706_6024384804993888044_n.jpg?ssl=1"
  },
  {
    id: "proj-6",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/LV124L-BR365K_RGB-scaled.jpg?ssl=1"
  },
  {
    id: "proj-7",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/403974911_261730143566147_4521124680826654386_n.jpg?ssl=1"
  },
  {
    id: "proj-8",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/403065353_261730130232815_6303203477708078953_n.jpg?ssl=1"
  },
  {
    id: "proj-9",
    titleEn: "Korean Cladding Project in Cairo, Imbaba",
    titleAr: "مشروع تكسيات كورية في القاهرة, إمبابة",
    locationEn: "Cairo, Imbaba",
    locationAr: "القاهرة, إمبابة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/LV126-G384G_RGB-scaled.jpg?ssl=1"
  },
  {
    id: "proj-10",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/LV127-IV93G_RGB-scaled.jpg?ssl=1"
  },
  {
    id: "proj-11",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/400084302_256935534045608_6046713313568962929_n.jpg?ssl=1"
  },
  {
    id: "proj-12",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/399739974_252970927775402_3789456537111612188_n.jpg?ssl=1"
  },
  {
    id: "proj-13",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/386093846_837092934780470_1764166186416885186_n.jpg?ssl=1"
  },
  {
    id: "proj-14",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/386096770_837093211447109_1908475519521425022_n.jpg?ssl=1"
  },
  {
    id: "proj-15",
    titleEn: "Korean Cladding Project in Alexandria, Fleming",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, فليمنج",
    locationEn: "Alexandria, Fleming",
    locationAr: "الإسكندرية, فليمنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404691570_251921554585411_8311057109280124817_n.jpg?ssl=1"
  },
  {
    id: "proj-16",
    titleEn: "Korean Cladding Project in Alexandria, Shatby",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, الشاطبي",
    locationEn: "Alexandria, Shatby",
    locationAr: "الإسكندرية, الشاطبي",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/386089426_836188158204281_5776525260016962227_n.jpg?ssl=1"
  },
  {
    id: "proj-17",
    titleEn: "Korean Cladding Project in Cairo, Badr City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة بدر",
    locationEn: "Cairo, Badr City",
    locationAr: "القاهرة, مدينة بدر",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/403425627_1818745311891132_1877073513785321557_n.jpg?ssl=1"
  },
  {
    id: "proj-18",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/376912980_216336831438812_7079343415048797493_n.jpg?ssl=1"
  },
  {
    id: "proj-19",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404251550_259414277131067_762805624632044752_n.jpg?ssl=1"
  },
  {
    id: "proj-20",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/399690221_254020324337129_7010745100206017506_n.jpg?ssl=1"
  },
  {
    id: "proj-21",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/440150751_763831195954811_2171214640239226838_n.jpg?ssl=1"
  },
  {
    id: "proj-22",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/440172733_763831322621465_1390583335338613271_n.jpg?ssl=1"
  },
  {
    id: "proj-23",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/414440747_280833868322441_7441669458979837173_n.jpg?ssl=1"
  },
  {
    id: "proj-24",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/415972685_288420644230430_1069558240195599061_n.jpg?ssl=1"
  },
  {
    id: "proj-25",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404246729_1358932891494996_8734334144172792611_n.jpg?ssl=1"
  },
  {
    id: "proj-26",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404549057_1341197136563683_8945680647452716397_n.jpg?ssl=1"
  },
  {
    id: "proj-27",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404522882_750203673676875_4449846563737413512_n.jpg?ssl=1"
  },
  {
    id: "proj-28",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404443137_343211945261007_8823667475256580106_n.jpg?ssl=1"
  },
  {
    id: "proj-29",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/403884084_334809569315758_7280822980105723309_n.jpg?ssl=1"
  },
  {
    id: "proj-30",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/WhatsApp-Image-2023-09-16-at-9.46.47-PM.jpeg?ssl=1"
  },
  {
    id: "proj-31",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404195797_3246133445687421_1885094443443296954_n.jpg?ssl=1"
  },
  {
    id: "proj-32",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/371765120_214246678294908_5896510504732793796_n.jpg?ssl=1"
  },
  {
    id: "proj-33",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/414066798_215875091566607_4666608980898340151_n.jpg?ssl=1"
  },
  {
    id: "proj-34",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/416833594_287734084299086_3376694594710410682_n.jpg?ssl=1"
  },
  {
    id: "proj-35",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/416613477_287747620964399_8496842224811418673_n.jpg?ssl=1"
  },
  {
    id: "proj-36",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/407869136_267606569645171_5755345795992167277_n.jpg?ssl=1"
  },
  {
    id: "proj-37",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/386092760_837093151447115_7758780579617848379_n.jpg?ssl=1"
  },
  {
    id: "proj-38",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/411221820_274249052314256_1069138552972966068_n.jpg?ssl=1"
  },
  {
    id: "proj-39",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/404009955_332581199608494_9109171876537592180_n.jpg?ssl=1"
  },
  {
    id: "proj-40",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/404891609_745856853757960_7769491440763621575_n.jpg?ssl=1"
  },
  {
    id: "proj-41",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/411473372_1083647359488475_4267651486312122905_n.jpg?ssl=1"
  },
  {
    id: "proj-42",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/24.jpg?ssl=1"
  },
  {
    id: "proj-43",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/408364760_270037836049125_922665418690092346_n.jpg?ssl=1"
  },
  {
    id: "proj-44",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/411411654_1503522603547877_5376078213957171417_n.jpg?ssl=1"
  },
  {
    id: "proj-45",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/7.jpg?ssl=1"
  },
  {
    id: "proj-46",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/404734954_1432544137668198_6720754578914862260_n.jpg?ssl=1"
  },
  {
    id: "proj-47",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/411273439_213518598507642_3773872953695681152_n.jpg?ssl=1"
  },
  {
    id: "proj-48",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/411436361_339673015559010_3541779459423215172_n.jpg?ssl=1"
  },
  {
    id: "proj-49",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/419220951_394105223123707_6076584011328765696_n.jpg?ssl=1"
  },
  {
    id: "proj-50",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/420057993_122122109972133308_2527390583200711836_n.jpg?ssl=1"
  },
  {
    id: "proj-51",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/420871230_926702925726862_8008088898041021132_n.jpg?ssl=1"
  },
  {
    id: "proj-52",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/420853317_1511340712765937_8029013565520045116_n.jpg?ssl=1"
  },
  {
    id: "proj-53",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/424611193_399650532575645_7620213734998688626_n.jpg?ssl=1"
  },
  {
    id: "proj-54",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/425486478_1055752145866523_3176637646623139561_n.jpg?ssl=1"
  },
  {
    id: "proj-55",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/449454169_488347323678019_5216000390074660113_n.jpg?ssl=1"
  },
  {
    id: "proj-56",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/449462032_2709640515856003_5023509483699257914_n.jpg?ssl=1"
  },
  {
    id: "proj-57",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/451984512_1658052915042112_191341718374656877_n.jpg?ssl=1"
  },
  {
    id: "proj-58",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/451939293_862306601895483_6332648491013924379_n.jpg?ssl=1"
  },
  {
    id: "proj-59",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/450923603_1631823660929873_5140173675222437358_n.jpg?ssl=1"
  },
  {
    id: "proj-60",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/417018185_1751242648716084_7097130478249279765_n.jpg?ssl=1"
  },
  {
    id: "proj-61",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/453140720_2273312936347482_7218320861883806338_n.jpg?ssl=1"
  },
  {
    id: "proj-62",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/449459277_1902152820198142_8670609718727122505_n.jpg?ssl=1"
  },
  {
    id: "proj-63",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/450672629_792458633087642_4740125454433733662_n.jpg?ssl=1"
  },
  {
    id: "proj-64",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/449197710_1006988697125505_178904063895151029_n.jpg?ssl=1"
  },
  {
    id: "proj-65",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/404619105_6821817067929488_580821421205722216_n.jpg?ssl=1"
  },
  {
    id: "proj-66",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/34.jpg?ssl=1"
  },
  {
    id: "proj-67",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/31.jpg?ssl=1"
  },
  {
    id: "proj-68",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/448780351_1759761708167238_7773791808115268687_n.jpg?ssl=1"
  },
  {
    id: "proj-69",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/453473411_1000627478042912_5738808226888052016_n.jpg?ssl=1"
  },
  {
    id: "proj-70",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/449395348_3887566274796140_5566659349833171144_n.jpg?ssl=1"
  },
  {
    id: "proj-71",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/07/LV123-BR384G_RGB-scaled.jpg?ssl=1"
  },
  {
    id: "proj-72",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/421114265_275354085344987_1489311959920372778_n.jpg?ssl=1"
  },
  {
    id: "proj-73",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/450599820_957804812751849_5636217981628413240_n.jpg?ssl=1"
  },
  {
    id: "proj-74",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/413473937_1380385962864126_6547008471791691454_n.jpg?ssl=1"
  },
  {
    id: "proj-75",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2024/08/420169439_296263083446186_5471613164768147221_n.jpg?ssl=1"
  },
  {
    id: "proj-76",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/514253728_1303613918128367_3263794708659564774_n.jpg?ssl=1"
  },
  {
    id: "proj-77",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/569960448_1336779064811852_4240249603338527829_n.jpg?ssl=1"
  },
  {
    id: "proj-78",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/569206614_1337664518056640_4683573768785231044_n.jpg?ssl=1"
  },
  {
    id: "proj-79",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/565879406_1336058848217207_4497987461135557159_n.jpg?ssl=1"
  },
  {
    id: "proj-80",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/565815642_1336058578217234_6363620592369611239_n.jpg?ssl=1"
  },
  {
    id: "proj-81",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/568468214_1336058361550589_1838101761477057150_n.jpg?ssl=1"
  },
  {
    id: "proj-82",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/547973032_1304673711355721_7106631279755856847_n.jpg?ssl=1"
  },
  {
    id: "proj-83",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/547173286_1305618737927885_6645026126509828844_n.jpg?ssl=1"
  },
  {
    id: "proj-84",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/569580657_1336778881478537_4599038678003312860_n.jpg?ssl=1"
  },
  {
    id: "proj-85",
    titleEn: "Korean Cladding Project in Cairo, Imbaba",
    titleAr: "مشروع تكسيات كورية في القاهرة, إمبابة",
    locationEn: "Cairo, Imbaba",
    locationAr: "القاهرة, إمبابة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/560182563_1329208195568939_2506306879835314701_n.jpg?ssl=1"
  },
  {
    id: "proj-86",
    titleEn: "Korean Cladding Project in Alexandria, Smouha",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سموحة",
    locationEn: "Alexandria, Smouha",
    locationAr: "الإسكندرية, سموحة",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/547202766_1305619331261159_359298164033202313_n.jpg?ssl=1"
  },
  {
    id: "proj-87",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/514276599_1305619137927845_8723781403481256289_n.jpg?ssl=1"
  },
  {
    id: "proj-88",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/560034629_1329208495568909_3000218389035047493_n.jpg?ssl=1"
  },
  {
    id: "proj-89",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/559207547_1329207878902304_2266520734312878345_n.jpg?ssl=1"
  },
  {
    id: "proj-90",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/560254568_1330649415424817_1718564412103903048_n.jpg?ssl=1"
  },
  {
    id: "proj-91",
    titleEn: "Korean Cladding Project in Cairo, Imbaba",
    titleAr: "مشروع تكسيات كورية في القاهرة, إمبابة",
    locationEn: "Cairo, Imbaba",
    locationAr: "القاهرة, إمبابة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/565172284_1329208695568889_3673753589911068579_n.jpg?ssl=1"
  },
  {
    id: "proj-92",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/565860703_1333530295136729_7474390330855080378_n.jpg?ssl=1"
  },
  {
    id: "proj-93",
    titleEn: "Korean Cladding Project in Cairo, Agouza",
    titleAr: "مشروع تكسيات كورية في القاهرة, العجوزة",
    locationEn: "Cairo, Agouza",
    locationAr: "القاهرة, العجوزة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/559961800_1330649882091437_3668711203950151585_n.jpg?ssl=1"
  },
  {
    id: "proj-94",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/564718522_1330649765424782_5693196333296480604_n.jpg?ssl=1"
  },
  {
    id: "proj-95",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/562034242_1329208038902288_1546988918356011521_n.jpg?ssl=1"
  },
  {
    id: "proj-96",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/567681480_1334426705047088_2053124439980291119_n.jpg?ssl=1"
  },
  {
    id: "proj-97",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/566219267_1333531041803321_3036550218299041041_n.jpg?ssl=1"
  },
  {
    id: "proj-98",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/565679870_1333530915136667_6719110059367475327_n.jpg?ssl=1"
  },
  {
    id: "proj-99",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/566214192_1336057938217298_2310397500497585582_n.jpg?ssl=1"
  },
  {
    id: "proj-100",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/566328093_1334771585012600_963310629098959446_n.jpg?ssl=1"
  },
  {
    id: "proj-101",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/565664681_1334771308345961_2286718176494435473_n.jpg?ssl=1"
  },
  {
    id: "proj-102",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/568628417_1334771091679316_2620284869466169832_n.jpg?ssl=1"
  },
  {
    id: "proj-103",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/578656232_1351928789963546_3611188478242033569_n.jpg?ssl=1"
  },
  {
    id: "proj-104",
    titleEn: "Korean Cladding Project in Cairo, Dokki",
    titleAr: "مشروع تكسيات كورية في القاهرة, الدقي",
    locationEn: "Cairo, Dokki",
    locationAr: "القاهرة, الدقي",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/572931137_1342186277604464_872583465217225866_n.jpg?ssl=1"
  },
  {
    id: "proj-105",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/570994128_1337665391389886_6126365674909956738_n.jpg?ssl=1"
  },
  {
    id: "proj-106",
    titleEn: "Korean Cladding Project in Alexandria, Loran",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, لوران",
    locationEn: "Alexandria, Loran",
    locationAr: "الإسكندرية, لوران",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/568412493_1336778734811885_2432763795526257717_n.jpg?ssl=1"
  },
  {
    id: "proj-107",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/514274000_1303613534795072_1663320239573177958_n.jpg?ssl=1"
  },
  {
    id: "proj-108",
    titleEn: "Korean Cladding Project in Cairo, EL Mokattam",
    titleAr: "مشروع تكسيات كورية في القاهرة, EL Mokattam",
    locationEn: "Cairo, EL Mokattam",
    locationAr: "القاهرة, EL Mokattam",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/514259328_1302793288210430_2336690465108997126_n.jpg?ssl=1"
  },
  {
    id: "proj-109",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/576995376_1348207497002342_7196977103034137277_n.jpg?ssl=1"
  },
  {
    id: "proj-110",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/577000393_1347404187082673_4269806188548893043_n.jpg?ssl=1"
  },
  {
    id: "proj-111",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/580760252_1354351536387938_6704871158370310430_n.jpg?ssl=1"
  },
  {
    id: "proj-112",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/580702792_1354351329721292_3231384430356952293_n.jpg?ssl=1"
  },
  {
    id: "proj-113",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/581962128_1354350403054718_721139028590581529_n.jpg?ssl=1"
  },
  {
    id: "proj-114",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/580701506_1354351979721227_3063740833272700827_n.jpg?ssl=1"
  },
  {
    id: "proj-115",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/514274560_1305618961261196_2243163436740272906_n.jpg?ssl=1"
  },
  {
    id: "proj-116",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/548571049_1304672771355815_5283335288312478774_n.jpg?ssl=1"
  },
  {
    id: "proj-117",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/548034230_1304673038022455_2116748100528357887_n.jpg?ssl=1"
  },
  {
    id: "proj-118",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/547275977_1304673314689094_1968954334518331049_n.jpg?ssl=1"
  },
  {
    id: "proj-119",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/548193643_1304673584689067_4540930489691975591_n.jpg?ssl=1"
  },
  {
    id: "proj-120",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/547911716_1302793168210442_7668401443597896998_n.jpg?ssl=1"
  },
  {
    id: "proj-121",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/545616478_1303613671461725_7655819385136262347_n.jpg?ssl=1"
  },
  {
    id: "proj-122",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/539415713_1290405726115853_1714748369111938796_n.jpg?ssl=1"
  },
  {
    id: "proj-123",
    titleEn: "Korean Cladding Project in Cairo, Zamalek",
    titleAr: "مشروع تكسيات كورية في القاهرة, الزمالك",
    locationEn: "Cairo, Zamalek",
    locationAr: "القاهرة, الزمالك",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/514248259_1303613804795045_6732565952025987824_n.jpg?ssl=1"
  },
  {
    id: "proj-124",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/545618821_1302793434877082_88817120791732972_n.jpg?ssl=1"
  },
  {
    id: "proj-125",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/539465455_1290405896115836_4679256160927478314_n.jpg?ssl=1"
  },
  {
    id: "proj-126",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/540270998_1290406026115823_4638404334236308182_n.jpg?ssl=1"
  },
  {
    id: "proj-127",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/539545296_1290406182782474_7889083977520547065_n.jpg?ssl=1"
  },
  {
    id: "proj-128",
    titleEn: "Korean Cladding Project in Cairo, Imbaba",
    titleAr: "مشروع تكسيات كورية في القاهرة, إمبابة",
    locationEn: "Cairo, Imbaba",
    locationAr: "القاهرة, إمبابة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/514345347_1302793008210458_6121061304807121351_n.jpg?ssl=1"
  },
  {
    id: "proj-129",
    titleEn: "Korean Cladding Project in Cairo, Imbaba",
    titleAr: "مشروع تكسيات كورية في القاهرة, إمبابة",
    locationEn: "Cairo, Imbaba",
    locationAr: "القاهرة, إمبابة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/544820558_1301097265046699_9045898840552332058_n.jpg?ssl=1"
  },
  {
    id: "proj-130",
    titleEn: "Korean Cladding Project in Cairo, Imbaba",
    titleAr: "مشروع تكسيات كورية في القاهرة, إمبابة",
    locationEn: "Cairo, Imbaba",
    locationAr: "القاهرة, إمبابة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/546520621_1301097018380057_5485647451868398561_n.jpg?ssl=1"
  },
  {
    id: "proj-131",
    titleEn: "Korean Cladding Project in Alexandria, Shatby",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, الشاطبي",
    locationEn: "Alexandria, Shatby",
    locationAr: "الإسكندرية, الشاطبي",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/530764656_1277425094080583_4674817377681197325_n.jpg?ssl=1"
  },
  {
    id: "proj-132",
    titleEn: "Korean Cladding Project in Alexandria, Shatby",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, الشاطبي",
    locationEn: "Alexandria, Shatby",
    locationAr: "الإسكندرية, الشاطبي",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/530805861_1277424714080621_2732450757569908416_n.jpg?ssl=1"
  },
  {
    id: "proj-133",
    titleEn: "Korean Cladding Project in Alexandria, Shatby",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, الشاطبي",
    locationEn: "Alexandria, Shatby",
    locationAr: "الإسكندرية, الشاطبي",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/519472392_1277424834080609_1374692332010764717_n.jpg?ssl=1"
  },
  {
    id: "proj-134",
    titleEn: "Korean Cladding Project in Alexandria, Shatby",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, الشاطبي",
    locationEn: "Alexandria, Shatby",
    locationAr: "الإسكندرية, الشاطبي",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/530373533_1277424954080597_6974937035353683029_n.jpg?ssl=1"
  },
  {
    id: "proj-135",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/530543222_1274837061006053_4874701438310334500_n.jpg?ssl=1"
  },
  {
    id: "proj-136",
    titleEn: "Korean Cladding Project in Cairo, Downtown Cairo",
    titleAr: "مشروع تكسيات كورية في القاهرة, وسط البلد، القاهرة",
    locationEn: "Cairo, Downtown Cairo",
    locationAr: "القاهرة, وسط البلد، القاهرة",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/529949147_1274840807672345_4093275505203427945_n.jpg?ssl=1"
  },
  {
    id: "proj-137",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/529271880_1274841001005659_1613498465949299314_n.jpg?ssl=1"
  },
  {
    id: "proj-138",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/528554033_1272966331193126_7720641597062054784_n.jpg?ssl=1"
  },
  {
    id: "proj-139",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/527798973_1270536071436152_1339222381552794522_n.jpg?ssl=1"
  },
  {
    id: "proj-140",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/527736643_1270535834769509_5025066178058028003_n.jpg?ssl=1"
  },
  {
    id: "proj-141",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/528749494_1272966037859822_2518519669723428122_n.jpg?ssl=1"
  },
  {
    id: "proj-142",
    titleEn: "Korean Cladding Project in Cairo ,Obour City",
    titleAr: "مشروع تكسيات كورية في القاهرة, مدينة العبور",
    locationEn: "Cairo ,Obour City",
    locationAr: "القاهرة, مدينة العبور",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/528198997_1272966517859774_1331013289105611002_n.jpg?ssl=1"
  },
  {
    id: "proj-143",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/528294106_1270535744769518_5345667140726362561_n.jpg?ssl=1"
  },
  {
    id: "proj-144",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/581221413_1351928553296903_5211233919674783015_n.jpg?ssl=1"
  },
  {
    id: "proj-145",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/561273462_1325115529311539_3208724003177754925_n.jpg?ssl=1"
  },
  {
    id: "proj-146",
    titleEn: "Korean Cladding Project in Alexandria, Sporting",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, سبورتنج",
    locationEn: "Alexandria, Sporting",
    locationAr: "الإسكندرية, سبورتنج",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/529363001_1272966137859812_7321473349616299063_n.jpg?ssl=1"
  },
  {
    id: "proj-147",
    titleEn: "Korean Cladding Project in Alexandria, Gleem",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جليم",
    locationEn: "Alexandria, Gleem",
    locationAr: "الإسكندرية, جليم",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/579222895_1351927806630311_5778134520656117739_n.jpg?ssl=1"
  },
  {
    id: "proj-148",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/569894735_1336778068145285_2011526537296331740_n.jpg?ssl=1"
  },
  {
    id: "proj-149",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/528914527_1272965824526510_8576218886316292245_n.jpg?ssl=1"
  },
  {
    id: "proj-150",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/537779464_1288580459631713_8241666150042751226_n.jpg?ssl=1"
  },
  {
    id: "proj-151",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/540681826_1291213682701724_3043683146006909601_n.jpg?ssl=1"
  },
  {
    id: "proj-152",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/539553646_1291212662701826_6931691972070037668_n.jpg?ssl=1"
  },
  {
    id: "proj-153",
    titleEn: "Korean Cladding Project in Cairo, Maadi",
    titleAr: "مشروع تكسيات كورية في القاهرة, Maadi",
    locationEn: "Cairo, Maadi",
    locationAr: "القاهرة, Maadi",
    city: "cairo",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/541502573_1291213422701750_7543483789846384515_n.jpg?ssl=1"
  },
  {
    id: "proj-154",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/538566928_1288580266298399_5692150103973304702_n.jpg?ssl=1"
  },
  {
    id: "proj-155",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/539939610_1288580719631687_913184217221998902_n.jpg?ssl=1"
  },
  {
    id: "proj-156",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/538889746_1288581026298323_7870232665115077007_n.jpg?ssl=1"
  },
  {
    id: "proj-157",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/539252147_1288883962934696_6005314912403545496_n.jpg?ssl=1"
  },
  {
    id: "proj-158",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/538808664_1288884229601336_1658210353845488870_n.jpg?ssl=1"
  },
  {
    id: "proj-159",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/539418276_1288884582934634_2738882738327877639_n.jpg?ssl=1"
  },
  {
    id: "proj-160",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/538985646_1288884692934623_6520670283626915698_n.jpg?ssl=1"
  },
  {
    id: "proj-161",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/539200201_1289488376207588_2441252916227979880_n.jpg?ssl=1"
  },
  {
    id: "proj-162",
    titleEn: "Korean Cladding Project in Alexandria, Green Plaza",
    titleAr: "مشروع تكسيات كورية في الإسكندرية, جرين بلازا",
    locationEn: "Alexandria, Green Plaza",
    locationAr: "الإسكندرية, جرين بلازا",
    city: "alexandria",
    image: "https://i0.wp.com/lanfawzy.com/wp-content/uploads/2025/11/538679352_1289488536207572_5553151719896767468_n.jpg?ssl=1"
  },
];

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function GalleryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  const [activeTab, setActiveTab] = useState<"all" | "cairo" | "alexandria">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter gallery items
  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "all") return true;
    return item.city === activeTab;
  });

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextSlide = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        if (lang === "ar") prevSlide();
        else nextSlide();
      }
      if (e.key === "ArrowLeft") {
        if (lang === "ar") nextSlide();
        else prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, lang]);

  return (
    <div className="py-16 bg-premium-dark text-premium-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gold-text-gradient mb-4">
            {t.gallery.title}
          </h1>
          <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
              activeTab === "all"
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                : "bg-premium-charcoal/30 text-premium-beige/80 border-primary/10 hover:border-primary/30"
            }`}
          >
            {lang === "ar" ? "كل المعارض" : "All Projects"}
          </button>
          <button
            onClick={() => setActiveTab("cairo")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
              activeTab === "cairo"
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                : "bg-premium-charcoal/30 text-premium-beige/80 border-primary/10 hover:border-primary/30"
            }`}
          >
            {lang === "ar" ? "معارض القاهرة" : "Cairo Projects"}
          </button>
          <button
            onClick={() => setActiveTab("alexandria")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
              activeTab === "alexandria"
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                : "bg-premium-charcoal/30 text-premium-beige/80 border-primary/10 hover:border-primary/30"
            }`}
          >
            {lang === "ar" ? "معارض الإسكندرية" : "Alexandria Projects"}
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const title = lang === "ar" ? item.titleAr : item.titleEn;
            const location = lang === "ar" ? item.locationAr : item.locationEn;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="premium-glass rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-premium-charcoal/50 border-b border-primary/10">
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover visual cue overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-md scale-95 group-hover:scale-100 transition-transform">
                      {lang === "ar" ? "عرض الصورة بالكامل" : "View Fullscreen"}
                    </span>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-4 bg-premium-charcoal/30 flex items-center justify-between text-left rtl:text-right gap-3">
                  <div className="space-y-1 overflow-hidden">
                    <span className="block text-xs font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
                      {lang === "ar" ? "تكسيات كورية فاخرة" : "Premium Korean Cladding"}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-premium-beige/60">
                      <MapPin className="w-3 h-3 text-primary shrink-0" />
                      <span className="line-clamp-1">{location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
            {/* Top Bar / Actions */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
              <span className="text-xs bg-black/55 backdrop-blur px-3 py-1.5 rounded-full font-semibold border border-white/10 select-none">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-black/55 hover:bg-premium-charcoal/80 border border-white/10 hover:border-primary text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slider Navigation: Prev */}
            <button
              onClick={prevSlide}
              className={`absolute ${lang === "ar" ? "right-4" : "left-4"} p-3 rounded-full bg-black/55 hover:bg-premium-charcoal/80 border border-white/10 hover:border-primary text-white transition-all z-10`}
              aria-label="Previous slide"
            >
              {lang === "ar" ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>

            {/* Image display */}
            <div className="relative w-full max-w-5xl h-[70vh] px-4 select-none">
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={lang === "ar" ? filteredItems[lightboxIndex].titleAr : filteredItems[lightboxIndex].titleEn}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Slider Navigation: Next */}
            <button
              onClick={nextSlide}
              className={`absolute ${lang === "ar" ? "left-4" : "right-4"} p-3 rounded-full bg-black/55 hover:bg-premium-charcoal/80 border border-white/10 hover:border-primary text-white transition-all z-10`}
              aria-label="Next slide"
            >
              {lang === "ar" ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>

            {/* Caption Overlay */}
            <div className="absolute bottom-6 left-4 right-4 text-center max-w-xl mx-auto z-10">
              <div className="p-4 rounded-xl bg-black/75 backdrop-blur border border-primary/20 shadow-lg text-premium-beige">
                <span className="block text-xs text-primary font-bold uppercase tracking-wider mb-1">
                  {lang === "ar" ? filteredItems[lightboxIndex].locationAr : filteredItems[lightboxIndex].locationEn}
                </span>
                <span className="text-sm font-semibold text-white">
                  {lang === "ar" ? filteredItems[lightboxIndex].titleAr : filteredItems[lightboxIndex].titleEn}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
