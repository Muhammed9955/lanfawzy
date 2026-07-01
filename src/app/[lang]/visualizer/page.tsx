"use client";

import React, { useState, use, useEffect, useRef } from "react";
import Link from "next/link";
import { translations, Language } from "@/data/translations";
import { productsCatalog, getProductTranslation } from "@/data/products";
import {
  Palette, Eye, ArrowRight, Sparkles, Shield, Info,
  MessageSquare, Sun, ZoomIn, ZoomOut, X, Move,
  Camera, Sliders, LayoutGrid, Maximize, Minimize,
  Play, Share2, Download,
} from "lucide-react";
import * as THREE from "three";

interface PageProps {
  params: Promise<{ lang: string }>;
}

type MaterialType = "oak" | "charcoal" | "marble" | "walnut" | "white";
type RoomType = "living" | "office" | "bedroom" | "kitchen";
type ModalType = null | "specs" | "sample";
type FloorMaterial = "parquet" | "marble" | "concrete" | "tiles";
type GapColor = "black" | "gold" | "white";

export default function VisualizerPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  // ── Core states ──────────────────────────────────────────────────────────
  const [activeMaterial, setActiveMaterial] = useState<MaterialType>("oak");
  const [activeRoom, setActiveRoom] = useState<RoomType>("living");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showDragTip, setShowDragTip] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  // Compare Mode
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareMaterial, setCompareMaterial] = useState<MaterialType>("charcoal");
  const [splitRatio, setSplitRatio] = useState<number>(0.5);

  // Time of Day & Furniture
  const [timeOfDay, setTimeOfDay] = useState<number>(12.0);
  const [showFurniture, setShowFurniture] = useState<boolean>(true);

  // LED & Auto-Rotate
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [isLedActive, setIsLedActive] = useState<boolean>(false);
  const [ledColor, setLedColor] = useState<string>("#ffdfa9");

  // NEW: Room & Environment
  const [ceilingHeight, setCeilingHeight] = useState<number>(1.6);
  const [floorMaterial, setFloorMaterial] = useState<FloorMaterial>("parquet");
  const [blindsOpen, setBlindsOpen] = useState<boolean>(true);

  // NEW: Material & Finish
  const [textureScale, setTextureScale] = useState<number>(48);
  const [gapColor, setGapColor] = useState<GapColor>("black");
  const [isGloss, setIsGloss] = useState<boolean>(false);

  // NEW: Camera & Views
  const [autoRotateSpeed, setAutoRotateSpeed] = useState<number>(0.3);
  const [zoomSensitivity, setZoomSensitivity] = useState<number>(0.08);

  // NEW: Share toast
  const [shareToast, setShareToast] = useState<boolean>(false);

  // ── WebGL canvas/container refs ──────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Refs for Three.js render loop (no re-renders on state change) ─────────
  const materialRef = useRef<MaterialType>(activeMaterial);
  const roomRef = useRef<RoomType>(activeRoom);
  const isZoomedRef = useRef<boolean>(isZoomed);
  const isCompareModeRef = useRef<boolean>(isCompareMode);
  const compareMaterialRef = useRef<MaterialType>(compareMaterial);
  const splitRatioRef = useRef<number>(splitRatio);
  const timeOfDayRef = useRef<number>(timeOfDay);
  const showFurnitureRef = useRef<boolean>(showFurniture);
  const isAutoRotateRef = useRef<boolean>(isAutoRotate);
  const isLedActiveRef = useRef<boolean>(isLedActive);
  const ledColorRef = useRef<string>(ledColor);
  const ceilingHeightRef = useRef<number>(ceilingHeight);
  const floorMaterialRef = useRef<FloorMaterial>(floorMaterial);
  const blindsOpenRef = useRef<boolean>(blindsOpen);
  const textureScaleRef = useRef<number>(textureScale);
  const gapColorRef = useRef<GapColor>(gapColor);
  const isGlossRef = useRef<boolean>(isGloss);
  const autoRotateSpeedRef = useRef<number>(autoRotateSpeed);
  const zoomSensitivityRef = useRef<number>(zoomSensitivity);
  // Preset camera snap: set to {lon, lat} to smoothly move camera there
  const cameraSnapRef = useRef<{ lon: number; lat: number } | null>(null);

  // ── Sync all refs on state change ────────────────────────────────────────
  useEffect(() => { materialRef.current = activeMaterial; }, [activeMaterial]);
  useEffect(() => { roomRef.current = activeRoom; }, [activeRoom]);
  useEffect(() => { isZoomedRef.current = isZoomed; }, [isZoomed]);
  useEffect(() => { isCompareModeRef.current = isCompareMode; }, [isCompareMode]);
  useEffect(() => { compareMaterialRef.current = compareMaterial; }, [compareMaterial]);
  useEffect(() => { splitRatioRef.current = splitRatio; }, [splitRatio]);
  useEffect(() => { timeOfDayRef.current = timeOfDay; }, [timeOfDay]);
  useEffect(() => { showFurnitureRef.current = showFurniture; }, [showFurniture]);
  useEffect(() => { isAutoRotateRef.current = isAutoRotate; }, [isAutoRotate]);
  useEffect(() => { isLedActiveRef.current = isLedActive; }, [isLedActive]);
  useEffect(() => { ledColorRef.current = ledColor; }, [ledColor]);
  useEffect(() => { ceilingHeightRef.current = ceilingHeight; }, [ceilingHeight]);
  useEffect(() => { floorMaterialRef.current = floorMaterial; }, [floorMaterial]);
  useEffect(() => { blindsOpenRef.current = blindsOpen; }, [blindsOpen]);
  useEffect(() => { textureScaleRef.current = textureScale; }, [textureScale]);
  useEffect(() => { gapColorRef.current = gapColor; }, [gapColor]);
  useEffect(() => { isGlossRef.current = isGloss; }, [isGloss]);
  useEffect(() => { autoRotateSpeedRef.current = autoRotateSpeed; }, [autoRotateSpeed]);
  useEffect(() => { zoomSensitivityRef.current = zoomSensitivity; }, [zoomSensitivity]);

  // ── URL param initialization on mount ────────────────────────────────────
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const rp = sp.get("room") as RoomType | null;
    const mp = sp.get("material") as MaterialType | null;
    const fp = sp.get("floor") as FloorMaterial | null;
    const tp = sp.get("time");
    const lp = sp.get("led");
    const gp = sp.get("gloss");
    if (rp && ["living", "office", "bedroom", "kitchen"].includes(rp)) setActiveRoom(rp);
    if (mp && ["oak", "charcoal", "marble", "walnut", "white"].includes(mp)) setActiveMaterial(mp);
    if (fp && ["parquet", "marble", "concrete", "tiles"].includes(fp)) setFloorMaterial(fp);
    if (tp) setTimeOfDay(parseFloat(tp));
    if (lp === "1") setIsLedActive(true);
    if (gp === "1") setIsGloss(true);
  }, []);

  // ── Fullscreen listener ──────────────────────────────────────────────────
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // ── Product catalog lookups ──────────────────────────────────────────────
  const currentProduct = productsCatalog.find((p) => {
    if (activeMaterial === "oak") return p.id === "ps-louver-e103";
    if (activeMaterial === "charcoal") return p.id === "ps-louver-e129";
    if (activeMaterial === "walnut") return p.id === "ps-louver-e111";
    if (activeMaterial === "white") return p.id === "ps-louver-e123";
    if (activeMaterial === "marble") return p.id === "chipboard-marble-calacatta";
    return false;
  });

  const { name: productName, specifications } = currentProduct
    ? getProductTranslation(currentProduct, lang)
    : { name: "", specifications: [] as string[] };

  // ── Room label map ───────────────────────────────────────────────────────
  const roomLabels: Record<RoomType, string> = {
    living: lang === "en" ? "Living Room" : "غرفة معيشة",
    office: lang === "en" ? "Office" : "مكتب",
    bedroom: lang === "en" ? "Bedroom" : "غرفة نوم",
    kitchen: lang === "en" ? "Kitchen" : "مطبخ",
  };

  // ── WhatsApp sample link ─────────────────────────────────────────────────
  const getSampleWhatsAppLink = () => {
    if (!currentProduct) return "#";
    const message = lang === "ar"
      ? `مرحباً فوزي للديكور، أنا أستخدم مصمم الديكور التفاعلي الـ 360 درجة على موقعكم وأود طلب عينة طبيعية لمنتج: ${productName} (كود المنتج: ${currentProduct.code}). يرجى إفادتي بكيفية الشحن.`
      : `Hello Fawzy Decor, I am using your interactive 360° Visualizer and would like to request a physical sample of: ${productName} (Product Code: ${currentProduct.code}). Please let me know how to proceed.`;
    return `https://wa.me/201040044415?text=${encodeURIComponent(message)}`;
  };

  // ── Share Design Link ────────────────────────────────────────────────────
  const handleShareLink = () => {
    const sp = new URLSearchParams();
    sp.set("room", activeRoom);
    sp.set("material", activeMaterial);
    sp.set("floor", floorMaterial);
    sp.set("time", timeOfDay.toFixed(1));
    if (isLedActive) sp.set("led", "1");
    if (isGloss) sp.set("gloss", "1");
    const url = `${window.location.origin}${window.location.pathname}?${sp.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    });
  };

  // ── HD Snapshot with watermark ───────────────────────────────────────────
  const handleSnapshot = (format: "jpeg" | "png") => {
    if (!canvasRef.current) return;
    const src = canvasRef.current.toDataURL(
      format === "jpeg" ? "image/jpeg" : "image/png",
      0.95
    );
    const wCanvas = document.createElement("canvas");
    wCanvas.width = canvasRef.current.width;
    wCanvas.height = canvasRef.current.height;
    const ctx = wCanvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      // Watermark bar
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, wCanvas.height - 40, wCanvas.width, 40);
      ctx.fillStyle = "#f1b82d";
      ctx.font = "bold 14px Arial";
      ctx.textBaseline = "middle";
      ctx.fillText("© Fawzy Decor – lanfawzy.com", 16, wCanvas.height - 20);
      const link = document.createElement("a");
      link.download = `lanfawzy-${activeRoom}-${activeMaterial}.${format === "jpeg" ? "jpg" : "png"}`;
      link.href = wCanvas.toDataURL(format === "jpeg" ? "image/jpeg" : "image/png", 0.95);
      link.click();
    };
    img.src = src;
  };

  // ── WhatsApp Export (snapshot + message) ─────────────────────────────────
  const handleWhatsAppExport = () => {
    handleSnapshot("jpeg");
    const designLink = `${window.location.origin}${window.location.pathname}?room=${activeRoom}&material=${activeMaterial}&floor=${floorMaterial}`;
    const message = lang === "ar"
      ? `شاهد تصميمي لغرفتي باستخدام ${productName} من فوزي للديكور: ${designLink}`
      : `Check out my room design using ${productName} by Fawzy Decor: ${designLink}`;
    window.open(`https://wa.me/201040044415?text=${encodeURIComponent(message)}`, "_blank");
  };

  // ── Procedural Texture Generators ────────────────────────────────────────

  const createLouverTexture = (
    color1: string, color2: string, color3: string, highlight: string,
    grooveColor: string = "#000000"
  ): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = color2;
    ctx.fillRect(0, 0, 64, 256);

    const grad = ctx.createLinearGradient(0, 0, 64, 0);
    grad.addColorStop(0, color1);
    grad.addColorStop(0.12, color1);
    grad.addColorStop(0.5, color2);
    grad.addColorStop(0.88, color3);
    grad.addColorStop(1, color1);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 256);

    // Specular highlight line
    ctx.strokeStyle = highlight;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(8, 256);
    ctx.stroke();

    // Gap groove line at top edge (repeated per tile)
    ctx.strokeStyle = grooveColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 1);
    ctx.lineTo(64, 1);
    ctx.stroke();

    // Wood grain micro-detail
    ctx.fillStyle = "rgba(0,0,0,0.035)";
    for (let i = 0; i < 80; i++) {
      ctx.fillRect(Math.random() * 64, Math.random() * 256, Math.random() * 1.5 + 0.5, Math.random() * 60 + 20);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(48, 1);
    return texture;
  };

  const createMarbleTexture = (): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 360);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.65, "#f5f2eb");
    grad.addColorStop(1, "#e8e2d5");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const drawVein = (points: [number, number][], stroke: string, width: number) => {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i][0] + points[i + 1][0]) / 2;
        const yc = (points[i][1] + points[i + 1][1]) / 2;
        ctx.quadraticCurveTo(points[i][0], points[i][1], xc, yc);
      }
      ctx.stroke();
    };

    drawVein([[0, 80], [140, 190], [220, 140], [390, 290], [512, 230]], "rgba(176,141,92,0.3)", 3.5);
    drawVein([[200, 0], [180, 200], [290, 310], [420, 512]], "rgba(141,107,62,0.2)", 2.0);
    drawVein([[80, 0], [120, 120], [190, 250], [320, 370], [360, 512]], "rgba(90,90,95,0.2)", 1.2);
    drawVein([[0, 380], [180, 340], [280, 440], [480, 490]], "rgba(100,100,100,0.15)", 0.8);

    return new THREE.CanvasTexture(canvas);
  };

  const createParquetTexture = (): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#1b1713";
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = "#080605";
    ctx.lineWidth = 3;
    for (let y = 0; y <= 256; y += 64) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
    }
    ctx.lineWidth = 2;
    for (let y = 0; y < 256; y += 64) {
      const offset = (y / 64) % 2 === 0 ? 0 : 64;
      for (let x = offset; x <= 256; x += 128) {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 64); ctx.stroke();
      }
    }
    ctx.fillStyle = "rgba(255,255,255,0.015)";
    for (let i = 0; i < 80; i++) {
      ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 80 + 20, 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    return texture;
  };

  const createMarbleFloorTexture = (): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 360);
    grad.addColorStop(0, "#f8f8f6");
    grad.addColorStop(0.6, "#e8e6e0");
    grad.addColorStop(1, "#d8d4cc");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const dv = (pts: [number, number][], s: string, w: number) => {
      ctx.strokeStyle = s; ctx.lineWidth = w; ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 2; i++) {
        const xc = (pts[i][0] + pts[i + 1][0]) / 2;
        const yc = (pts[i][1] + pts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc);
      }
      ctx.stroke();
    };
    dv([[0, 100], [150, 200], [300, 150], [512, 300]], "rgba(180,170,155,0.4)", 3);
    dv([[100, 0], [200, 300], [350, 400], [450, 512]], "rgba(160,150,135,0.3)", 1.5);
    dv([[0, 400], [200, 350], [350, 450], [512, 380]], "rgba(140,130,115,0.2)", 1);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  };

  const createConcreteTexture = (): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#888890";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2500; i++) {
      const b = Math.random() * 40 - 20;
      ctx.fillStyle = `rgba(${b > 0 ? 255 : 0},${b > 0 ? 255 : 0},${b > 0 ? 255 : 0},${Math.abs(b) / 140})`;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    return texture;
  };

  const createTilesTexture = (): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const tileSize = 64;

    ctx.fillStyle = "#f2f2f4";
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = "#c0c0c4";
    ctx.lineWidth = 3;
    for (let x = 0; x <= 256; x += tileSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke(); }
    for (let y = 0; y <= 256; y += tileSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke(); }

    // Tile sheen
    for (let tx = 0; tx < 4; tx++) {
      for (let ty = 0; ty < 4; ty++) {
        const tileGrad = ctx.createLinearGradient(tx * tileSize, ty * tileSize, (tx + 1) * tileSize, (ty + 1) * tileSize);
        tileGrad.addColorStop(0, "rgba(255,255,255,0.25)");
        tileGrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = tileGrad;
        ctx.fillRect(tx * tileSize + 3, ty * tileSize + 3, tileSize - 6, tileSize - 6);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    return texture;
  };

  // ── Three.js Scene Setup & Render Loop ───────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    // 1. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c0c0e");
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 0.1);

    // 3. Room Group
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // 4. Shared Materials
    const fabricMat = new THREE.MeshStandardMaterial({ color: "#252528", roughness: 0.8 });
    const legMat = new THREE.MeshStandardMaterial({ color: "#b08d5c", metalness: 0.8, roughness: 0.2 });
    const woodMat = new THREE.MeshStandardMaterial({ color: "#3f2d1e", roughness: 0.4 });
    const cabinetMat = new THREE.MeshStandardMaterial({ color: "#161618", roughness: 0.85 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: "#f0f0f4", roughness: 0.95 });
    const headboardMat = new THREE.MeshStandardMaterial({ color: "#1d1d20", roughness: 0.8 });
    const frameMat = new THREE.MeshStandardMaterial({ color: "#111113", roughness: 0.8 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: "#b8b8be", metalness: 0.92, roughness: 0.08 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: "#b2a898", roughness: 0.65, metalness: 0.05 });
    const glassMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.04, metalness: 0.6 });
    const kitchenCabMat = new THREE.MeshStandardMaterial({ color: "#ede9e0", roughness: 0.65 });
    const sideWallMat = new THREE.MeshStandardMaterial({ color: "#dedede", roughness: 0.85 });

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight("#e0f0ff", 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#fffaf0", 2.8);
    sunLight.position.set(-2.8, 1.2, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0015;
    scene.add(sunLight);

    const spotLight = new THREE.SpotLight("#ffffff", 0);
    spotLight.position.set(0, 1.55, 0.6);
    spotLight.angle = Math.PI / 2.8;
    spotLight.penumbra = 0.8;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.001;
    scene.add(spotLight);

    const spotLightTarget = new THREE.Object3D();
    spotLightTarget.position.set(0, -0.6, 0.6);
    scene.add(spotLightTarget);
    spotLight.target = spotLightTarget;

    const lampLight = new THREE.PointLight("#ff8844", 0, 6);
    lampLight.position.set(2.4, 0.2, 1.2);
    scene.add(lampLight);

    const ledLight1 = new THREE.PointLight("#ffdfa9", 0, 5);
    ledLight1.position.set(-1.5, 1.45, -2.9);
    scene.add(ledLight1);

    const ledLight2 = new THREE.PointLight("#ffdfa9", 0, 5);
    ledLight2.position.set(1.5, 1.45, -2.9);
    scene.add(ledLight2);

    const ledBarMat = new THREE.MeshBasicMaterial({ color: "#ffdfa9" });
    const ledBar = new THREE.Mesh(new THREE.BoxGeometry(6, 0.015, 0.015), ledBarMat);
    ledBar.position.set(0, 1.48, -2.93);
    roomGroup.add(ledBar);

    // Kitchen under-cabinet accent light
    const kitchenLight = new THREE.PointLight("#fff5e0", 0, 4);
    kitchenLight.position.set(0, 0.30, -2.55);
    scene.add(kitchenLight);

    // 6. Floor (with swappable textures)
    const parquetTex = createParquetTexture();
    const marbleFloorTex = createMarbleFloorTexture();
    const concreteTex = createConcreteTexture();
    const tilesTex = createTilesTexture();

    const floorTextures: Record<FloorMaterial, THREE.Texture> = {
      parquet: parquetTex,
      marble: marbleFloorTex,
      concrete: concreteTex,
      tiles: tilesTex,
    };

    const floorMat = new THREE.MeshStandardMaterial({
      map: parquetTex,
      roughness: 0.52,
      metalness: 0.08,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.0;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // 7. Ceiling (dynamic height via ceilingHeightRef)
    const ceilingMat = new THREE.MeshStandardMaterial({ color: "#e6e6e8", roughness: 0.9 });
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = ceilingHeightRef.current;
    roomGroup.add(ceiling);

    // 8. Accent Wall (split for compare mode)
    const wallMatLeft = new THREE.MeshStandardMaterial({ roughness: 0.65, metalness: 0.1 });
    const wallMatRight = new THREE.MeshStandardMaterial({ roughness: 0.65, metalness: 0.1 });

    const wallBackLeft = new THREE.Mesh(new THREE.PlaneGeometry(6, 2.6), wallMatLeft);
    wallBackLeft.position.set(0, 0.3, -2.95);
    wallBackLeft.receiveShadow = true;
    roomGroup.add(wallBackLeft);

    const wallBackRight = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 2.6), wallMatRight);
    wallBackRight.position.set(0, 0.3, -2.95);
    wallBackRight.receiveShadow = true;
    wallBackRight.visible = false;
    roomGroup.add(wallBackRight);

    // 9. Side & Front Walls
    const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(6, 2.6), sideWallMat);
    wallLeft.position.set(-2.95, 0.3, 0);
    wallLeft.rotation.y = Math.PI / 2;
    roomGroup.add(wallLeft);

    const wallRight = new THREE.Mesh(new THREE.PlaneGeometry(6, 2.6), sideWallMat);
    wallRight.position.set(2.95, 0.3, 0);
    wallRight.rotation.y = -Math.PI / 2;
    roomGroup.add(wallRight);

    const wallFront = new THREE.Mesh(new THREE.PlaneGeometry(6, 2.6), sideWallMat);
    wallFront.position.set(0, 0.3, 2.95);
    wallFront.rotation.y = Math.PI;
    roomGroup.add(wallFront);

    // 10. Window (left wall) with blinds
    const windowMat = new THREE.MeshStandardMaterial({
      color: "#add8e6", roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.35,
    });
    const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.8, 3.2), windowMat);
    windowMesh.position.set(-2.93, 0.4, 0);
    roomGroup.add(windowMesh);

    const frameOuter = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.9, 3.3), frameMat);
    frameOuter.position.set(-2.94, 0.4, 0);
    roomGroup.add(frameOuter);

    // Blinds mesh (visible when closed)
    const blindsMat = new THREE.MeshStandardMaterial({ color: "#c8b89a", roughness: 0.75 });
    const blindsMesh = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.75, 3.1), blindsMat);
    blindsMesh.position.set(-2.91, 0.4, 0);
    blindsMesh.visible = !blindsOpenRef.current;
    roomGroup.add(blindsMesh);

    // 11. Right wall décor: mirror + console table
    const mirrorMat = new THREE.MeshStandardMaterial({ color: "#d0d0d8", roughness: 0.05, metalness: 0.95 });
    const mirror = new THREE.Mesh(new THREE.CircleGeometry(0.55, 32), mirrorMat);
    mirror.position.set(2.93, 0.5, 0.8);
    mirror.rotation.y = -Math.PI / 2;
    roomGroup.add(mirror);

    const mirrorFrame = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.58, 32), legMat);
    mirrorFrame.position.set(2.928, 0.5, 0.8);
    mirrorFrame.rotation.y = -Math.PI / 2;
    roomGroup.add(mirrorFrame);

    const consoleTop = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 1.3), woodMat);
    consoleTop.position.set(2.78, -0.22, 0.8);
    consoleTop.castShadow = true;
    roomGroup.add(consoleTop);

    const consoleLegs = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.74, 1.2), cabinetMat);
    consoleLegs.position.set(2.78, -0.61, 0.8);
    roomGroup.add(consoleLegs);

    // 12. Front wall painting
    const paintFrame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.04), frameMat);
    paintFrame.position.set(0, 0.5, 2.92);
    roomGroup.add(paintFrame);

    const paintCanvas = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 0.9),
      new THREE.MeshBasicMaterial({ color: "#22332a" })
    );
    paintCanvas.position.set(0, 0.5, 2.89);
    paintCanvas.rotation.y = Math.PI;
    roomGroup.add(paintCanvas);

    // 13. Baseboards
    const trimBack = new THREE.Mesh(new THREE.BoxGeometry(6, 0.08, 0.03), frameMat);
    trimBack.position.set(0, -0.96, -2.93);
    roomGroup.add(trimBack);

    const trimLeft = new THREE.Mesh(new THREE.BoxGeometry(6, 0.08, 0.03), frameMat);
    trimLeft.position.set(-2.93, -0.96, 0);
    trimLeft.rotation.y = Math.PI / 2;
    roomGroup.add(trimLeft);

    const trimRight = new THREE.Mesh(new THREE.BoxGeometry(6, 0.08, 0.03), frameMat);
    trimRight.position.set(2.93, -0.96, 0);
    trimRight.rotation.y = -Math.PI / 2;
    roomGroup.add(trimRight);

    // 14. Wall texture library
    const gapColorMap: Record<GapColor, string> = {
      black: "#000000",
      gold: "#c8a24a",
      white: "#f5f5f7",
    };

    const textures: Record<MaterialType, THREE.Texture> = {
      oak: createLouverTexture("#624a2c", "#cfa771", "#7e623d", "#f8e3c5", gapColorMap[gapColorRef.current]),
      charcoal: createLouverTexture("#0e0e10", "#3a3a3e", "#202022", "#66666e", gapColorMap[gapColorRef.current]),
      walnut: createLouverTexture("#2f1f10", "#7a5933", "#4d361d", "#be9970", gapColorMap[gapColorRef.current]),
      white: createLouverTexture("#bfbfcf", "#f5f5f7", "#dfdfe3", "#ffffff", gapColorMap[gapColorRef.current]),
      marble: createMarbleTexture(),
    };

    // 15. Furniture Groups
    const sofaGroup = new THREE.Group();
    const deskGroup = new THREE.Group();
    const bedGroup = new THREE.Group();
    const kitchenGroup = new THREE.Group();
    roomGroup.add(sofaGroup, deskGroup, bedGroup, kitchenGroup);

    // ── Sofa ──────────────────────────────────────────────────────────────
    const seatMesh = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.22, 0.85), fabricMat);
    seatMesh.position.set(0, -0.55, 1.25);
    seatMesh.castShadow = true;
    sofaGroup.add(seatMesh);

    const backMesh = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.45, 0.22), fabricMat);
    backMesh.position.set(0, -0.28, 0.95);
    backMesh.castShadow = true;
    sofaGroup.add(backMesh);

    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.85), fabricMat);
    armL.position.set(-1.15, -0.45, 1.25);
    sofaGroup.add(armL);

    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.85), fabricMat);
    armR.position.set(1.15, -0.45, 1.25);
    sofaGroup.add(armR);

    const sofaLegGeo = new THREE.CylinderGeometry(0.015, 0.01, 0.3);
    [[-1.05, -0.81, 0.9], [1.05, -0.81, 0.9], [-1.05, -0.81, 1.6], [1.05, -0.81, 1.6]].forEach((pos) => {
      const leg = new THREE.Mesh(sofaLegGeo, legMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      sofaGroup.add(leg);
    });

    // ── Office Desk ────────────────────────────────────────────────────────
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 0.8), woodMat);
    deskTop.position.set(0, -0.28, 1.25);
    deskGroup.add(deskTop);

    const drawerL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.62, 0.72), cabinetMat);
    drawerL.position.set(-0.75, -0.69, 1.25);
    deskGroup.add(drawerL);

    const drawerR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.62, 0.72), cabinetMat);
    drawerR.position.set(0.75, -0.69, 1.25);
    deskGroup.add(drawerR);

    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.01, 0.2), cabinetMat);
    laptopBase.position.set(0, -0.24, 1.25);
    deskGroup.add(laptopBase);

    const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.008), cabinetMat);
    laptopScreen.position.set(0, -0.155, 1.15);
    laptopScreen.rotation.x = -0.25;
    deskGroup.add(laptopScreen);

    // ── Bedroom Bed ────────────────────────────────────────────────────────
    const bedBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.22, 1.8), woodMat);
    bedBase.position.set(0, -0.89, 1.35);
    bedBase.castShadow = true;
    bedGroup.add(bedBase);

    const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 1.7), whiteMat);
    mattress.position.set(0, -0.65, 1.4);
    bedGroup.add(mattress);

    const headboard = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.95, 0.12), headboardMat);
    headboard.position.set(0, -0.4, 0.55);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    const pillowGeo = new THREE.BoxGeometry(0.5, 0.08, 0.32);
    const pillowL = new THREE.Mesh(pillowGeo, whiteMat);
    pillowL.position.set(-0.35, -0.48, 0.8);
    pillowL.rotation.x = 0.12;
    bedGroup.add(pillowL);

    const pillowR = new THREE.Mesh(pillowGeo, whiteMat);
    pillowR.position.set(0.35, -0.48, 0.8);
    pillowR.rotation.x = 0.12;
    bedGroup.add(pillowR);

    // ── Kitchen ────────────────────────────────────────────────────────────
    // Lower cabinets row (5 units along back wall)
    for (let i = 0; i < 5; i++) {
      const x = -2.0 + i * 1.0;
      const cab = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.85, 0.55), kitchenCabMat);
      cab.position.set(x, -0.575, -2.4);
      cab.castShadow = true;
      kitchenGroup.add(cab);
      // Door handle
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.015), chromeMat);
      handle.position.set(x + 0.28, -0.575, -2.115);
      kitchenGroup.add(handle);
    }

    // Countertop slab
    const counterTop = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.04, 0.60), stoneMat);
    counterTop.position.set(0, -0.145, -2.38);
    counterTop.castShadow = true;
    counterTop.receiveShadow = true;
    kitchenGroup.add(counterTop);

    // Counter edge trim
    const counterEdge = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.04, 0.015), chromeMat);
    counterEdge.position.set(0, -0.145, -2.08);
    kitchenGroup.add(counterEdge);

    // Sink basin
    const sinkBasin = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.14, 0.42), chromeMat);
    sinkBasin.position.set(-1.5, -0.22, -2.38);
    kitchenGroup.add(sinkBasin);

    // Faucet
    const faucetBase = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.22), chromeMat);
    faucetBase.position.set(-1.5, -0.04, -2.56);
    kitchenGroup.add(faucetBase);

    const faucetNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.26), chromeMat);
    faucetNeck.rotation.z = Math.PI / 4;
    faucetNeck.position.set(-1.38, 0.06, -2.56);
    kitchenGroup.add(faucetNeck);

    const faucetHead = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), chromeMat);
    faucetHead.position.set(-1.27, 0.18, -2.56);
    kitchenGroup.add(faucetHead);

    // Hob/Range glass surface
    const hobSurface = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.025, 0.52), glassMat);
    hobSurface.position.set(1.2, -0.13, -2.37);
    kitchenGroup.add(hobSurface);

    // Burner rings
    [[-0.22, -0.12], [0.22, -0.12], [-0.22, 0.12], [0.22, 0.12]].forEach(([ox, oz]) => {
      const burner = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 6, 20), chromeMat);
      burner.rotation.x = Math.PI / 2;
      burner.position.set(1.2 + ox, -0.125, -2.37 + oz);
      kitchenGroup.add(burner);
    });

    // Upper wall cabinets (4 units)
    for (let i = 0; i < 4; i++) {
      const x = -1.5 + i * 1.0;
      const upperCab = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.68, 0.37), kitchenCabMat);
      upperCab.position.set(x, 0.65, -2.60);
      upperCab.castShadow = true;
      kitchenGroup.add(upperCab);
      const upperHandle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.015, 0.015), chromeMat);
      upperHandle.position.set(x + 0.29, 0.65, -2.42);
      kitchenGroup.add(upperHandle);
    }

    // Range hood
    const hoodBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.38, 0.42), cabinetMat);
    hoodBody.position.set(1.2, 0.30, -2.59);
    kitchenGroup.add(hoodBody);

    const hoodFlange = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.04, 0.48), chromeMat);
    hoodFlange.position.set(1.2, 0.11, -2.59);
    kitchenGroup.add(hoodFlange);

    // Kitchen wall tiles backsplash (behind counter)
    const backsplashMat = new THREE.MeshStandardMaterial({ color: "#f5f2ed", roughness: 0.3, metalness: 0.05 });
    const backsplash = new THREE.Mesh(new THREE.PlaneGeometry(5.1, 0.85), backsplashMat);
    backsplash.position.set(0, 0.28, -2.94);
    kitchenGroup.add(backsplash);

    // 16. Pulsing Hotspots
    const hotspotMat = new THREE.MeshBasicMaterial({ color: "#f1b82d", side: THREE.DoubleSide });
    const hotspotTorusGeo = new THREE.TorusGeometry(0.045, 0.012, 8, 24);

    const hotspotWall = new THREE.Mesh(hotspotTorusGeo, hotspotMat);
    hotspotWall.position.set(0, 0.35, -2.85);
    roomGroup.add(hotspotWall);

    const hotspotFurniture = new THREE.Mesh(hotspotTorusGeo, hotspotMat);
    hotspotFurniture.position.set(0.4, -0.32, 1.25);
    roomGroup.add(hotspotFurniture);

    const hotspotLight = new THREE.Mesh(hotspotTorusGeo, hotspotMat);
    hotspotLight.position.set(-2.82, 0.4, 0.8);
    hotspotLight.rotation.y = Math.PI / 2;
    roomGroup.add(hotspotLight);

    const hotspots = [hotspotWall, hotspotFurniture, hotspotLight];

    // 17. 360° Drag & Touch Controls
    let lon = 0;
    let lat = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLon = 0;
    let startLat = 0;

    const targetLookAt = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3(0, 0, -1);

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLon = lon;
      startLat = lat;
      cameraSnapRef.current = null;
      setShowDragTip(false);
    };

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!isDragging) return;
      lon = startLon - (e.clientX - startX) * 0.14;
      lat = Math.max(-40, Math.min(40, startLat + (e.clientY - startY) * 0.14));
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);
      if (dx < 6 && dy < 6) {
        const rect = container.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / width) * 2 - 1,
          -((e.clientY - rect.top) / height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(hotspots);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          if (hit === hotspotWall) setModalType("specs");
          else if (hit === hotspotFurniture) setModalType("sample");
          else if (hit === hotspotLight) setTimeOfDay((prev) => (prev < 18 ? 20.0 : 12.0));
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return;
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startLon = lon;
      startLat = lat;
      cameraSnapRef.current = null;
      setShowDragTip(false);
    };

    const handleTouchMoveGlobal = (e: TouchEvent) => {
      if (!isDragging || !e.touches.length) return;
      lon = startLon - (e.touches[0].clientX - startX) * 0.18;
      lat = Math.max(-40, Math.min(40, startLat + (e.touches[0].clientY - startY) * 0.18));
    };

    const handleTouchEnd = () => { isDragging = false; };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMoveGlobal, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 18. Tick state for gap-color/scale change detection
    let lastGapColor: GapColor = gapColorRef.current;
    let lastTextureScale = textureScaleRef.current;

    // 19. Main Render Loop
    const clock = new THREE.Clock();
    let reqId: number;

    const tick = () => {
      const time = clock.getElapsedTime();

      // Pulse & spin hotspots
      hotspots.forEach((hotspot, idx) => {
        hotspot.rotation.y = time * 2;
        hotspot.rotation.x = time * 0.5;
        const scale = 1.0 + Math.sin(time * 5.0 + idx) * 0.15;
        hotspot.scale.set(scale, scale, scale);
      });

      // Camera preset snap (smooth lerp toward preset target)
      const snap = cameraSnapRef.current;
      if (snap && !isDragging) {
        lon += (snap.lon - lon) * 0.07;
        lat += (snap.lat - lat) * 0.07;
      }

      // Cinematic auto-rotate
      if (isAutoRotateRef.current && !isDragging) {
        lon += autoRotateSpeedRef.current;
      }

      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);

      targetLookAt.set(
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.cos(theta)
      );

      const lerpF = 0.095;
      currentLookAt.x += (targetLookAt.x - currentLookAt.x) * lerpF;
      currentLookAt.y += (targetLookAt.y - currentLookAt.y) * lerpF;
      currentLookAt.z += (targetLookAt.z - currentLookAt.z) * lerpF;

      camera.lookAt(
        camera.position.x + currentLookAt.x,
        camera.position.y + currentLookAt.y,
        camera.position.z + currentLookAt.z
      );

      // Dynamic ceiling height
      ceiling.position.y = ceilingHeightRef.current;

      // Blinds toggle
      blindsMesh.visible = !blindsOpenRef.current;
      const blindsMultiplier = blindsOpenRef.current ? 1.0 : 0.3;

      // Time-of-Day Lighting
      const hour = timeOfDayRef.current;
      let targetSun = 0;
      let sunColor = new THREE.Color("#fffaf0");
      let sunPos = new THREE.Vector3(-2.8, 1.2, 0);
      let targetAmbient = 0.85;
      let ambientColor = new THREE.Color("#e0f0ff");
      let targetSpot = 0;
      let targetLamp = 0;

      if (hour >= 6 && hour < 9) {
        const t = (hour - 6) / 3;
        targetSun = (0.5 * (1 - t) + 1.8 * t) * blindsMultiplier;
        sunColor.lerpColors(new THREE.Color("#ff5e00"), new THREE.Color("#fffaf0"), t);
        sunPos.set(-2.8, 0.4 + t * 0.8, -1.0 + t * 1.0);
        targetAmbient = (0.25 * (1 - t) + 0.65 * t) * blindsMultiplier;
        ambientColor.lerpColors(new THREE.Color("#b8c5d6"), new THREE.Color("#e0f0ff"), t);
        targetSpot = 0;
        targetLamp = 1.5 * (1 - t);
      } else if (hour >= 9 && hour < 15) {
        const t = (hour - 9) / 6;
        targetSun = 3.0 * blindsMultiplier;
        sunColor.set("#ffffff");
        sunPos.set(-2.8, 1.2 + t * 1.3, 0);
        targetAmbient = 0.9 * blindsMultiplier;
        ambientColor.set("#e0f0ff");
        targetSpot = 0; targetLamp = 0;
      } else if (hour >= 15 && hour < 18.5) {
        const t = (hour - 15) / 3.5;
        targetSun = (3.0 * (1 - t) + 1.2 * t) * blindsMultiplier;
        sunColor.lerpColors(new THREE.Color("#ffffff"), new THREE.Color("#ff8822"), t);
        sunPos.set(-2.8, 2.5 - t * 2.0, t * 1.0);
        targetAmbient = (0.9 * (1 - t) + 0.5 * t) * blindsMultiplier;
        ambientColor.lerpColors(new THREE.Color("#e0f0ff"), new THREE.Color("#d8c8b0"), t);
        targetSpot = 1.0 * t; targetLamp = 2.0 * t;
      } else {
        const t = Math.min(1, (hour - 18.5) / 3.5);
        targetSun = 1.2 * (1 - t) * blindsMultiplier;
        sunColor.set("#ff8822");
        sunPos.set(-2.8, 0.5, 1.0);
        targetAmbient = 0.5 * (1 - t) + 0.12 * t;
        ambientColor.lerpColors(new THREE.Color("#d8c8b0"), new THREE.Color("#0c0f1a"), t);
        targetSpot = 1.0 * (1 - t) + 5.5 * t;
        targetLamp = 2.0 * (1 - t) + 4.0 * t;
      }

      sunLight.intensity += (targetSun - sunLight.intensity) * 0.08;
      sunLight.color.lerp(sunColor, 0.08);
      sunLight.position.lerp(sunPos, 0.08);
      ambientLight.intensity += (targetAmbient - ambientLight.intensity) * 0.08;
      ambientLight.color.lerp(ambientColor, 0.08);
      spotLight.intensity += (targetSpot - spotLight.intensity) * 0.08;
      lampLight.intensity += (targetLamp - lampLight.intensity) * 0.08;

      // LED accent
      const ledActive = isLedActiveRef.current;
      const targetLedIntensity = ledActive ? 3.2 : 0;
      ledLight1.intensity += (targetLedIntensity - ledLight1.intensity) * 0.08;
      ledLight2.intensity += (targetLedIntensity - ledLight2.intensity) * 0.08;
      const ledThreeColor = new THREE.Color(ledColorRef.current);
      ledLight1.color.lerp(ledThreeColor, 0.08);
      ledLight2.color.lerp(ledThreeColor, 0.08);
      ledBarMat.color.lerp(ledThreeColor, 0.08);
      ledBar.visible = ledLight1.intensity > 0.05;

      // Kitchen under-cabinet light (fades in when kitchen room is active)
      const targetKitchenLight = roomRef.current === "kitchen" ? 1.8 : 0;
      kitchenLight.intensity += (targetKitchenLight - kitchenLight.intensity) * 0.05;

      // FOV zoom with adjustable sensitivity
      const targetFov = isZoomedRef.current ? 18 : 45;
      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov += (targetFov - camera.fov) * zoomSensitivityRef.current;
        camera.updateProjectionMatrix();
      }

      // Floor material swap
      const activeFloor = floorMaterialRef.current;
      if (floorMat.map !== floorTextures[activeFloor]) {
        floorMat.map = floorTextures[activeFloor];
        floorMat.roughness = activeFloor === "marble" ? 0.18 : activeFloor === "tiles" ? 0.28 : activeFloor === "concrete" ? 0.85 : 0.52;
        floorMat.metalness = activeFloor === "marble" ? 0.28 : 0.08;
        floorMat.needsUpdate = true;
      }

      // Gap color → regenerate louver textures when changed
      const activeGapColor = gapColorRef.current;
      const activeScale = textureScaleRef.current;

      if (activeGapColor !== lastGapColor) {
        lastGapColor = activeGapColor;
        const gc = gapColorMap[activeGapColor];
        const louverKeys: MaterialType[] = ["oak", "charcoal", "walnut", "white"];
        louverKeys.forEach((mat) => {
          textures[mat].dispose();
          if (mat === "oak") textures[mat] = createLouverTexture("#624a2c", "#cfa771", "#7e623d", "#f8e3c5", gc);
          else if (mat === "charcoal") textures[mat] = createLouverTexture("#0e0e10", "#3a3a3e", "#202022", "#66666e", gc);
          else if (mat === "walnut") textures[mat] = createLouverTexture("#2f1f10", "#7a5933", "#4d361d", "#be9970", gc);
          else textures[mat] = createLouverTexture("#bfbfcf", "#f5f5f7", "#dfdfe3", "#ffffff", gc);
          textures[mat].wrapS = THREE.RepeatWrapping;
          textures[mat].wrapT = THREE.RepeatWrapping;
          textures[mat].repeat.set(activeScale, 1);
        });
        // Force re-apply on next frame
        wallMatLeft.map = null;
        wallMatRight.map = null;
      }

      // Texture scale slider
      if (activeScale !== lastTextureScale) {
        lastTextureScale = activeScale;
        (["oak", "charcoal", "walnut", "white"] as MaterialType[]).forEach((mat) => {
          textures[mat].repeat.set(activeScale, 1);
          textures[mat].needsUpdate = true;
        });
      }

      // Gloss ↔ Matte smooth transition
      const targetRoughness = isGlossRef.current ? 0.04 : 0.65;
      const targetMetalness = isGlossRef.current ? 0.88 : 0.1;
      if (Math.abs(wallMatLeft.roughness - targetRoughness) > 0.005) {
        wallMatLeft.roughness += (targetRoughness - wallMatLeft.roughness) * 0.08;
        wallMatLeft.metalness += (targetMetalness - wallMatLeft.metalness) * 0.08;
        wallMatLeft.needsUpdate = true;
        wallMatRight.roughness = wallMatLeft.roughness;
        wallMatRight.metalness = wallMatLeft.metalness;
        wallMatRight.needsUpdate = true;
      }

      // Wall material + split compare
      const activeCompare = isCompareModeRef.current;
      const activeRatio = splitRatioRef.current;
      const activeMatKey = materialRef.current;
      const compareMatKey = compareMaterialRef.current;

      if (activeCompare) {
        const leftWidth = 6.0 * activeRatio;
        const rightWidth = 6.0 * (1.0 - activeRatio);
        wallBackLeft.geometry.dispose();
        wallBackLeft.geometry = new THREE.PlaneGeometry(leftWidth, 2.6);
        wallBackLeft.position.x = -3.0 + leftWidth / 2;
        wallBackRight.geometry.dispose();
        wallBackRight.geometry = new THREE.PlaneGeometry(rightWidth, 2.6);
        wallBackRight.position.x = 3.0 - rightWidth / 2;
        wallBackRight.visible = true;
        if (wallMatLeft.map !== textures[activeMatKey]) { wallMatLeft.map = textures[activeMatKey]; wallMatLeft.needsUpdate = true; }
        if (wallMatRight.map !== textures[compareMatKey]) { wallMatRight.map = textures[compareMatKey]; wallMatRight.needsUpdate = true; }
      } else {
        if (wallBackLeft.position.x !== 0 || wallBackRight.visible) {
          wallBackLeft.geometry.dispose();
          wallBackLeft.geometry = new THREE.PlaneGeometry(6.0, 2.6);
          wallBackLeft.position.x = 0;
          wallBackRight.visible = false;
        }
        if (wallMatLeft.map !== textures[activeMatKey]) { wallMatLeft.map = textures[activeMatKey]; wallMatLeft.needsUpdate = true; }
      }

      // Room furniture visibility
      const activeRoomKey = roomRef.current;
      const furnitureVisible = showFurnitureRef.current;
      sofaGroup.visible = furnitureVisible && activeRoomKey === "living";
      deskGroup.visible = furnitureVisible && activeRoomKey === "office";
      bedGroup.visible = furnitureVisible && activeRoomKey === "bedroom";
      kitchenGroup.visible = furnitureVisible && activeRoomKey === "kitchen";

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(tick);
    };

    tick();

    // Resize handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMoveGlobal);
      window.removeEventListener("touchend", handleTouchEnd);
      resizeObserver.disconnect();

      floorMat.dispose(); wallMatLeft.dispose(); wallMatRight.dispose();
      sideWallMat.dispose(); ceilingMat.dispose(); windowMat.dispose();
      frameMat.dispose(); mirrorMat.dispose(); blindsMat.dispose();
      ledBarMat.dispose(); hotspotTorusGeo.dispose(); hotspotMat.dispose();
      sofaLegGeo.dispose(); pillowGeo.dispose();

      Object.values(textures).forEach((tex) => tex.dispose());
      Object.values(floorTextures).forEach((tex) => tex.dispose());

      const disposeNode = (node: THREE.Object3D) => {
        const mesh = node as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
          else mesh.material.dispose();
        }
      };
      sofaGroup.traverse(disposeNode);
      deskGroup.traverse(disposeNode);
      bedGroup.traverse(disposeNode);
      kitchenGroup.traverse(disposeNode);
      renderer.dispose();
    };
  }, []);

  // ── JSX Return ───────────────────────────────────────────────────────────
  return (
    <div className="py-20 bg-premium-dark text-premium-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <Palette className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gold-text-gradient mb-4">
            {t.visualizer.title}
          </h1>
          <p className="text-lg text-premium-beige/70 max-w-2xl mx-auto">
            {t.visualizer.subtitle}
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">

          {/* ── Controls Panel ── */}
          <div className="lg:col-span-1 flex flex-col gap-5 premium-glass p-6 sm:p-8 rounded-2xl border border-primary/15 self-start z-10 overflow-y-auto max-h-[88vh]">

            {/* ── ROOM & ENVIRONMENT ── */}
            <div>
              <h2 className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>{t.visualizer.selectRoom}</span>
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {(["living", "office", "bedroom", "kitchen"] as RoomType[]).map((room) => (
                  <button
                    key={room}
                    onClick={() => setActiveRoom(room)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all ${
                      activeRoom === room
                        ? "bg-primary text-white font-bold"
                        : "bg-premium-charcoal text-premium-beige hover:bg-premium-charcoal/80"
                    }`}
                  >
                    {roomLabels[room]}
                  </button>
                ))}
              </div>
            </div>

            {/* Ceiling Height */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white">
                  {lang === "en" ? "Ceiling Height" : "ارتفاع السقف"}
                </span>
                <span className="text-xs font-mono text-primary-light">
                  {(2.5 + (ceilingHeight - 1.4) / 0.6).toFixed(1)}m
                </span>
              </div>
              <input
                type="range" min="1.4" max="2.0" step="0.05"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-premium-charcoal rounded-lg appearance-none cursor-pointer accent-primary border border-primary/20"
              />
              <div className="flex justify-between text-[9px] text-premium-beige/55 mt-1 font-semibold">
                <span>2.5m</span><span>3.0m</span><span>3.5m</span>
              </div>
            </div>

            {/* Floor Material */}
            <div>
              <h2 className="text-xs font-bold text-white mb-2">
                {lang === "en" ? "Floor Material" : "خامة الأرضية"}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { key: "parquet" as FloorMaterial, label: lang === "en" ? "Parquet" : "باركيه", color: "#2d1f10" },
                  { key: "marble" as FloorMaterial, label: lang === "en" ? "Marble" : "رخام", color: "#e8e6e0" },
                  { key: "concrete" as FloorMaterial, label: lang === "en" ? "Concrete" : "خرسانة", color: "#888890" },
                  { key: "tiles" as FloorMaterial, label: lang === "en" ? "Tiles" : "سيراميك", color: "#f2f2f4" },
                ]).map(({ key, label, color }) => (
                  <button
                    key={key}
                    onClick={() => setFloorMaterial(key)}
                    className={`flex items-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      floorMaterial === key
                        ? "border-primary bg-primary/15 text-primary-light"
                        : "border-primary/10 bg-premium-charcoal hover:border-primary/40 text-premium-beige"
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-sm border border-white/20 shrink-0" style={{ backgroundColor: color }} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Window Blinds Toggle */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-white flex items-center gap-2">
                <Sun className="w-4 h-4 text-primary" />
                <span>{lang === "en" ? "Window Blinds Open" : "ستائر النافذة مفتوحة"}</span>
              </span>
              <input type="checkbox" checked={blindsOpen} onChange={(e) => setBlindsOpen(e.target.checked)} className="sr-only peer" />
              <div className="relative w-9 h-5 bg-premium-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-premium-beige after:border-primary/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
            </label>

            <hr className="border-primary/10" />

            {/* ── TIME OF DAY ── */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sun className="w-4 h-4 text-primary animate-spin-slow" />
                  <span>{lang === "en" ? "Time of Day" : "الوقت من اليوم"}</span>
                </h2>
                <span className="text-xs font-mono text-primary-light">
                  {(() => {
                    const hrs = Math.floor(timeOfDay);
                    const mins = Math.floor((timeOfDay - hrs) * 60).toString().padStart(2, "0");
                    const ampm = hrs >= 12 ? (lang === "en" ? "PM" : "مساءً") : (lang === "en" ? "AM" : "صباحاً");
                    const d = hrs > 12 ? hrs - 12 : hrs === 0 ? 12 : hrs;
                    return `${d}:${mins} ${ampm}`;
                  })()}
                </span>
              </div>
              <input
                type="range" min="6.0" max="22.0" step="0.25"
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-premium-charcoal rounded-lg appearance-none cursor-pointer accent-primary border border-primary/20 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-premium-beige/55 mt-1.5 font-semibold">
                <span>{lang === "en" ? "Sunrise" : "الشروق"}</span>
                <span>{lang === "en" ? "Noon" : "الظهيرة"}</span>
                <span>{lang === "en" ? "Sunset" : "الغروب"}</span>
                <span>{lang === "en" ? "Night" : "الليل"}</span>
              </div>
            </div>

            <hr className="border-primary/10" />

            {/* ── MATERIAL & FINISH ── */}
            <div>
              <h2 className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span>{isCompareMode ? (lang === "en" ? "Left Side Material" : "خامة الجانب الأيسر") : t.visualizer.selectMaterial}</span>
              </h2>
              <div className="flex flex-col gap-2">
                {(["oak", "charcoal", "walnut", "white", "marble"] as MaterialType[]).map((material) => (
                  <button
                    key={material}
                    onClick={() => setActiveMaterial(material)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left rtl:text-right font-medium transition-all ${
                      activeMaterial === material
                        ? "border-primary bg-primary/15 text-primary-light"
                        : "border-primary/10 bg-premium-charcoal hover:border-primary/45 hover:bg-premium-charcoal/85"
                    }`}
                  >
                    <span>{t.visualizer.materials[material]}</span>
                    <span className={`w-4 h-4 rounded-full border border-white/20 shadow-inner ${
                      material === "oak" ? "bg-[#e5d5be]" : material === "charcoal" ? "bg-[#212124]"
                        : material === "walnut" ? "bg-[#7c5f3e]" : material === "white" ? "bg-[#f5f5f7]" : "bg-[#f5f2eb]"
                    }`} />
                  </button>
                ))}
              </div>

              {/* Matte vs Gloss */}
              <div className="mt-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-white">{lang === "en" ? "Gloss Finish" : "لمسة لاك براق"}</span>
                  <input type="checkbox" checked={isGloss} onChange={(e) => setIsGloss(e.target.checked)} className="sr-only peer" />
                  <div className="relative w-9 h-5 bg-premium-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-premium-beige after:border-primary/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>

              {/* Gap Color (louvers only) */}
              {activeMaterial !== "marble" && (
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-premium-beige/70">
                    {lang === "en" ? "Panel Gap Color" : "لون فجوة اللوح"}
                  </span>
                  <div className="flex gap-2">
                    {([
                      { key: "black" as GapColor, color: "#111111", label: "Black" },
                      { key: "gold" as GapColor, color: "#c8a24a", label: "Gold" },
                      { key: "white" as GapColor, color: "#f5f5f7", label: "White" },
                    ]).map(({ key, color, label }) => (
                      <button
                        key={key}
                        onClick={() => setGapColor(key)}
                        title={label}
                        className={`w-5 h-5 rounded-full border transition-all ${
                          gapColor === key ? "border-primary scale-125 ring-1 ring-primary/40" : "border-white/20 hover:scale-110"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Texture Scale */}
              {activeMaterial !== "marble" && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold text-premium-beige/70">
                      {lang === "en" ? "Panel Width Scale" : "عرض اللوح"}
                    </span>
                    <span className="text-[9px] font-mono text-primary-light">{textureScale}</span>
                  </div>
                  <input
                    type="range" min="12" max="96" step="4"
                    value={textureScale}
                    onChange={(e) => setTextureScale(parseInt(e.target.value))}
                    className="w-full h-1 bg-premium-charcoal rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[9px] text-premium-beige/40 mt-1">
                    <span>{lang === "en" ? "Wide" : "عريض"}</span>
                    <span>{lang === "en" ? "Narrow" : "ضيق"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Compare Mode */}
            <div className="pt-2 border-t border-primary/10">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  <span>{lang === "en" ? "Split Comparison Mode" : "وضع المقارنة الثنائية"}</span>
                </span>
                <input type="checkbox" checked={isCompareMode} onChange={(e) => setIsCompareMode(e.target.checked)} className="sr-only peer" />
                <div className="relative w-9 h-5 bg-premium-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-premium-beige after:border-primary/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {isCompareMode && (
              <div className="space-y-2.5 animate-fade-in-up">
                <h2 className="text-xs font-bold text-white flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-primary-light" />
                  <span>{lang === "en" ? "Right Side Material" : "خامة الجانب الأيمن"}</span>
                </h2>
                <div className="flex flex-col gap-2">
                  {(["oak", "charcoal", "walnut", "white", "marble"] as MaterialType[]).map((material) => (
                    <button
                      key={material}
                      onClick={() => setCompareMaterial(material)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left rtl:text-right font-medium transition-all ${
                        compareMaterial === material
                          ? "border-primary-light bg-primary/10 text-primary-light"
                          : "border-primary/10 bg-premium-charcoal hover:border-primary/45 hover:bg-premium-charcoal/85"
                      }`}
                    >
                      <span>{t.visualizer.materials[material]}</span>
                      <span className={`w-4 h-4 rounded-full border border-white/20 shadow-inner ${
                        material === "oak" ? "bg-[#e5d5be]" : material === "charcoal" ? "bg-[#212124]"
                          : material === "walnut" ? "bg-[#7c5f3e]" : material === "white" ? "bg-[#f5f5f7]" : "bg-[#f5f2eb]"
                      }`} />
                    </button>
                  ))}
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] text-premium-beige/60 font-semibold mb-1">
                    <span>{lang === "en" ? "Left Side" : "الجانب الأيسر"}</span>
                    <span>{Math.round(splitRatio * 100)}%</span>
                    <span>{lang === "en" ? "Right Side" : "الجانب الأيمن"}</span>
                  </div>
                  <input
                    type="range" min="0.05" max="0.95" step="0.01"
                    value={splitRatio}
                    onChange={(e) => setSplitRatio(parseFloat(e.target.value))}
                    className="w-full h-1 bg-premium-charcoal rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            )}

            <hr className="border-primary/10" />

            {/* ── CAMERA & VIEWS ── */}
            <div>
              <h2 className="text-xs font-bold text-white mb-2.5 flex items-center gap-2">
                <Camera className="w-4 h-4 text-primary" />
                <span>{lang === "en" ? "Camera & Views" : "الكاميرا والمناظر"}</span>
              </h2>

              {/* Preset angle buttons */}
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {([
                  { key: "front", label: lang === "en" ? "Front" : "أمامي", lon: 0, lat: 0 },
                  { key: "corner", label: lang === "en" ? "Corner" : "زاوية", lon: -45, lat: -10 },
                  { key: "top", label: lang === "en" ? "Top" : "علوي", lon: 0, lat: 82 },
                  { key: "low", label: lang === "en" ? "Low" : "سفلي", lon: 0, lat: -35 },
                ]).map(({ key, label, lon: snapLon, lat: snapLat }) => (
                  <button
                    key={key}
                    onClick={() => { cameraSnapRef.current = { lon: snapLon, lat: snapLat }; }}
                    className="py-2 px-1 rounded-xl bg-premium-charcoal border border-primary/10 text-[10px] font-semibold text-premium-beige hover:border-primary/40 hover:bg-primary/5 hover:text-primary-light transition-all"
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Auto-Rotate toggle */}
              <label className="flex items-center justify-between cursor-pointer mb-2">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary" />
                  <span>{lang === "en" ? "Cinematic Auto-Rotate" : "تدوير تلقائي سينمائي"}</span>
                </span>
                <input type="checkbox" checked={isAutoRotate} onChange={(e) => setIsAutoRotate(e.target.checked)} className="sr-only peer" />
                <div className="relative w-9 h-5 bg-premium-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-premium-beige after:border-primary/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
              </label>

              {/* Auto-rotate speed (visible when ON) */}
              {isAutoRotate && (
                <div className="mb-3 pl-6 rtl:pl-0 rtl:pr-6 animate-fade-in-up">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold text-premium-beige/70">{lang === "en" ? "Rotation Speed" : "سرعة الدوران"}</span>
                    <span className="text-[9px] font-mono text-primary-light">{autoRotateSpeed.toFixed(2)}°/f</span>
                  </div>
                  <input
                    type="range" min="0.05" max="1.5" step="0.05"
                    value={autoRotateSpeed}
                    onChange={(e) => setAutoRotateSpeed(parseFloat(e.target.value))}
                    className="w-full h-1 bg-premium-charcoal rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              )}

              {/* Zoom Sensitivity */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-premium-beige/70">{lang === "en" ? "Zoom Sensitivity" : "حساسية التكبير"}</span>
                  <span className="text-[9px] font-mono text-primary-light">{Math.round(zoomSensitivity * 100)}%</span>
                </div>
                <input
                  type="range" min="0.02" max="0.2" step="0.01"
                  value={zoomSensitivity}
                  onChange={(e) => setZoomSensitivity(parseFloat(e.target.value))}
                  className="w-full h-1 bg-premium-charcoal rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <hr className="border-primary/10" />

            {/* ── LIGHTING & EFFECTS ── */}
            <div className="flex flex-col gap-2.5">
              {/* Furniture Toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-primary" />
                  <span>{lang === "en" ? "Show Room Furniture" : "إظهار أثاث الغرفة"}</span>
                </span>
                <input type="checkbox" checked={showFurniture} onChange={(e) => setShowFurniture(e.target.checked)} className="sr-only peer" />
                <div className="relative w-9 h-5 bg-premium-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-premium-beige after:border-primary/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
              </label>

              {/* LED Toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <Sun className="w-4 h-4 text-primary animate-pulse" />
                  <span>{lang === "en" ? "LED Strip Accent Light" : "إضاءة LED المخفية"}</span>
                </span>
                <input type="checkbox" checked={isLedActive} onChange={(e) => setIsLedActive(e.target.checked)} className="sr-only peer" />
                <div className="relative w-9 h-5 bg-premium-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-premium-beige after:border-primary/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
              </label>

              {/* LED Color — presets + full RGB picker */}
              {isLedActive && (
                <div className="flex items-center justify-between pl-6 rtl:pl-0 rtl:pr-6 py-1 animate-fade-in-up">
                  <span className="text-[10px] font-semibold text-premium-beige/60">{lang === "en" ? "LED Color" : "لون الإضاءة"}</span>
                  <div className="flex gap-1.5 items-center">
                    {[
                      { hex: "#ffdfa9", label: "Warm" },
                      { hex: "#e0f0ff", label: "Cool" },
                      { hex: "#0088ff", label: "Blue" },
                      { hex: "#00ff88", label: "Green" },
                      { hex: "#ff0066", label: "Pink" },
                      { hex: "#ff8800", label: "Amber" },
                    ].map((col) => (
                      <button
                        key={col.hex}
                        onClick={() => setLedColor(col.hex)}
                        className={`w-4 h-4 rounded-full border transition-all ${
                          ledColor === col.hex ? "border-primary scale-125 ring-1 ring-primary/40" : "border-white/15 hover:scale-110"
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.label}
                      />
                    ))}
                    {/* Full RGB picker */}
                    <input
                      type="color"
                      value={ledColor}
                      onChange={(e) => setLedColor(e.target.value)}
                      className="w-5 h-5 rounded-full cursor-pointer border-0 bg-transparent p-0 opacity-80 hover:opacity-100"
                      title={lang === "en" ? "Custom Color" : "لون مخصص"}
                    />
                  </div>
                </div>
              )}
            </div>

            <hr className="border-primary/10" />

            {/* ── ACTIONS ── */}
            <div className="flex flex-col gap-2.5">
              {/* Share Design */}
              <div className="relative">
                <button
                  onClick={handleShareLink}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-primary/40 text-primary-light hover:border-primary hover:bg-primary/5 font-bold transition-all text-xs"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{lang === "en" ? "Copy Share Link" : "نسخ رابط التصميم"}</span>
                </button>
                {shareToast && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap animate-fade-in-up shadow-lg z-50">
                    {lang === "en" ? "✓ Link copied to clipboard!" : "✓ تم نسخ الرابط"}
                  </div>
                )}
              </div>

              {/* Snapshot — JPEG + PNG */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSnapshot("jpeg")}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-primary/40 text-primary-light hover:border-primary hover:bg-primary/5 font-bold transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JPEG</span>
                </button>
                <button
                  onClick={() => handleSnapshot("png")}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-primary/40 text-primary-light hover:border-primary hover:bg-primary/5 font-bold transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PNG</span>
                </button>
              </div>

              {/* WhatsApp Export */}
              <button
                onClick={handleWhatsAppExport}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25d366]/15 border border-[#25d366]/40 text-[#25d366] hover:bg-[#25d366]/25 font-bold transition-all text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === "en" ? "Share via WhatsApp" : "مشاركة عبر واتساب"}</span>
              </button>

              {/* View Specs */}
              <button
                onClick={() => setShowSidebar((prev) => !prev)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-premium-charcoal/80 border border-primary/20 text-premium-beige hover:border-primary/40 hover:bg-premium-charcoal font-bold transition-all text-xs"
              >
                <Info className="w-4 h-4 text-primary" />
                <span>{lang === "en" ? "View Material Specifications" : "عرض مواصفات الخامة"}</span>
              </button>
            </div>

            <hr className="border-primary/10" />

            {/* Calculator CTA */}
            <Link
              href={`/${lang}/calculator?product=${currentProduct?.category === "chipboard" ? "chipboard" : "louver"}`}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-[0_0_15px_rgba(176,141,92,0.4)] transition-all font-bold text-sm mt-1"
            >
              <span>{lang === "en" ? "Send to Material Calculator" : "حساب الكميات في حاسبة المواد"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* ── Interactive WebGL 3D Canvas ── */}
          <div
            ref={containerRef}
            className="lg:col-span-2 relative min-h-[520px] lg:min-h-[620px] rounded-2xl overflow-hidden border border-primary/20 shadow-2xl flex flex-col justify-between items-stretch bg-[#0c0c0e]"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full z-0 block cursor-grab active:cursor-grabbing"
            />

            {/* Drag tip overlay */}
            {showDragTip && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/45 z-10 pointer-events-none transition-opacity duration-500">
                <div className="flex flex-col items-center gap-3 bg-premium-charcoal/90 border border-primary/20 px-6 py-4 rounded-2xl text-center shadow-lg">
                  <Move className="w-8 h-8 text-primary animate-pulse" />
                  <p className="text-xs font-bold text-white tracking-wider">
                    {lang === "en" ? "Drag / Swipe to look around in 360°" : "اسحب لتحريك الغرفة في 360 درجة"}
                  </p>
                </div>
              </div>
            )}

            {/* Floating action buttons (right) */}
            <div className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 flex flex-col gap-2.5">
              <button
                onClick={() => setIsZoomed((prev) => !prev)}
                className="p-3.5 rounded-xl bg-black/65 hover:bg-black/80 text-white border border-white/10 hover:border-primary/50 transition-all shadow-md animate-fade-in"
                title={lang === "en" ? "Inspect Texture Close-up" : "تقريب لمعاينة ملمس الخامة"}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5 text-primary" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                onClick={() => {
                  if (!containerRef.current) return;
                  if (!document.fullscreenElement) {
                    containerRef.current.requestFullscreen().catch((err) => {
                      console.error(`Error enabling fullscreen: ${err.message}`);
                    });
                  } else {
                    document.exitFullscreen();
                  }
                }}
                className="p-3.5 rounded-xl bg-black/65 hover:bg-black/80 text-white border border-white/10 hover:border-primary/50 transition-all shadow-md animate-fade-in"
                title={lang === "en" ? "Toggle Fullscreen View" : "ملء الشاشة"}
              >
                {isFullscreen ? <Minimize className="w-5 h-5 text-primary" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>

            {/* Product info overlay (top-left) */}
            {currentProduct && !isCompareMode && (
              <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 z-20 max-w-[240px] sm:max-w-xs premium-glass p-4 rounded-xl text-left rtl:text-right text-xs shadow-lg animate-fade-in-up">
                <div
                  onClick={() => setShowSidebar(true)}
                  className="flex items-center gap-1.5 text-primary-light font-bold uppercase tracking-wider mb-2 cursor-pointer hover:underline"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{currentProduct.code} - Specs</span>
                </div>
                <h4 className="font-bold text-white mb-2 text-sm">{productName}</h4>
                <p className="text-[11px] text-premium-beige/65">
                  {lang === "en" ? "Click gold pulsing rings to interact" : "اضغط على الحلقات الذهبية للتفاعل"}
                </p>
              </div>
            )}

            {/* Specs Slide-out Sidebar */}
            {showSidebar && currentProduct && (
              <div className="absolute top-0 bottom-0 right-0 rtl:right-auto rtl:left-0 w-80 max-w-full z-40 premium-glass border-l border-primary/20 backdrop-blur-lg p-6 shadow-2xl flex flex-col justify-between animate-fade-in-up text-left rtl:text-right">
                <div className="flex-grow overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-primary/10 pb-3 mb-5">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-white uppercase tracking-wider">
                        {currentProduct.code} {lang === "en" ? "Specs" : "المواصفات"}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="p-1 rounded-lg text-premium-beige/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentProduct.image}
                    alt={productName}
                    className="w-full h-28 object-cover rounded-xl border border-primary/15 mb-5 shrink-0"
                  />

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{productName}</h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/25 text-[10px] font-bold text-primary-light uppercase tracking-wider mb-5">
                    {currentProduct.category === "louver" ? t.products.louver.title : t.products.chipboard.title}
                  </span>

                  <div className="space-y-2 text-xs bg-premium-charcoal/40 border border-primary/5 rounded-xl p-3 mb-5 font-medium">
                    <div className="flex justify-between">
                      <span className="text-premium-beige/50">{lang === "en" ? "Dimensions" : "الأبعاد"}</span>
                      <span className="text-white font-bold">{currentProduct.category === "louver" ? "12cm x 290cm" : "122cm x 280cm"}</span>
                    </div>
                    <div className="flex justify-between border-t border-primary/5 pt-2">
                      <span className="text-premium-beige/50">{lang === "en" ? "Thickness" : "السمك"}</span>
                      <span className="text-white font-bold">{currentProduct.thicknessMm}mm</span>
                    </div>
                    <div className="flex justify-between border-t border-primary/5 pt-2">
                      <span className="text-premium-beige/50">{lang === "en" ? "Coverage / Unit" : "نسبة تغطية اللوح"}</span>
                      <span className="text-white font-bold">{currentProduct.coveragePerUnitSqm} sqm</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{lang === "en" ? "Key Features" : "أهم المميزات"}</h4>
                    <ul className="space-y-2 text-xs text-premium-beige/75">
                      {specifications.map((spec, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-primary/10 pt-4 mt-auto">
                  <a
                    href={getSampleWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(176,141,92,0.4)] hover:scale-102 transition-all duration-300"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{lang === "en" ? "Order Sample Box" : "طلب علبة العينات"}</span>
                  </a>
                </div>
              </div>
            )}

            <div className="h-24 pointer-events-none" />

            {/* Bottom CTA Bar */}
            <div className="relative z-30 w-full p-4 sm:p-5 bg-premium-charcoal/90 border-t border-primary/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left rtl:text-right">
                <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/25 shrink-0 hidden sm:block">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    {lang === "en" ? "Evaluate Physical Materials" : "عاين الخامات على الطبيعة"}
                  </p>
                  <p className="text-xs text-premium-beige/60">
                    {lang === "en" ? "Request a B2B catalog sample box." : "اطلب صندوق عينات فوزي للديكور مجاناً."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalType("sample")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm hover:shadow-[0_0_15px_rgba(176,141,92,0.45)] hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>{lang === "en" ? "Request Sample Box" : "اطلب علبة عينات"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal Overlays ── */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in-up">
          <div className="relative w-full max-w-lg premium-glass p-8 sm:p-10 rounded-2xl border border-primary/25 shadow-2xl text-right animate-scale-up">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 left-4 p-2 text-premium-beige/70 hover:text-white rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {modalType === "specs" && currentProduct && (
              <div className="space-y-6">
                <div className="flex items-center justify-end gap-2 text-primary-light font-bold text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  <span>{currentProduct.code} - {lang === "en" ? "Technical Specifications" : "المواصفات الفنية"}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{productName}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm bg-premium-charcoal/60 p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="text-premium-beige/50 block text-xs">{lang === "en" ? "Category" : "القسم"}</span>
                    <span className="text-white font-bold">{currentProduct.category === "louver" ? t.products.louver.title : t.products.chipboard.title}</span>
                  </div>
                  <div>
                    <span className="text-premium-beige/50 block text-xs">{lang === "en" ? "Dimensions" : "الأبعاد"}</span>
                    <span className="text-white font-bold">{currentProduct.category === "louver" ? "12cm x 290cm" : "122cm x 280cm"}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-premium-beige/50 block text-xs">{lang === "en" ? "Thickness" : "السمك"}</span>
                    <span className="text-white font-bold">{currentProduct.thicknessMm}mm</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-premium-beige/50 block text-xs">{lang === "en" ? "Coverage/Unit" : "نسبة تغطية اللوح"}</span>
                    <span className="text-white font-bold">{currentProduct.coveragePerUnitSqm} sqm</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-base">{lang === "en" ? "Material Features" : "مميزات الخامات"}</h4>
                  <ul className="space-y-2.5 text-sm text-premium-beige/85">
                    {specifications.map((spec, idx) => (
                      <li key={idx} className="flex gap-2 justify-end">
                        <span>{spec}</span>
                        <span className="text-primary font-bold">•</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {modalType === "sample" && (
              <div className="space-y-6">
                <div className="flex items-center justify-end gap-2 text-primary-light font-bold text-xs uppercase tracking-wider">
                  <Shield className="w-4 h-4" />
                  <span>{lang === "en" ? "Order Sample Box" : "اطلب علبة عينات"}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {lang === "en" ? "Request Physical Samples" : "اطلب العينات الطبيعية لمعاينتها"}
                </h3>
                <p className="text-sm text-premium-beige/75 leading-relaxed">
                  {lang === "en"
                    ? "We ship premium Korean sample boxes directly to architects, contractors, and decorators. Click below to coordinate shipping via WhatsApp."
                    : "نقوم بشحن علب عينات بديل الخشب والشيبورد الكوري لجميع محافظات مصر والشرق الأوسط للشركات والمصممين. اضغط لتأكيد الطلب مباشرة."}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setModalType(null)}
                    className="w-full py-3.5 px-6 rounded-xl border border-white/10 hover:bg-white/5 text-white font-bold text-sm transition-all"
                  >
                    {lang === "en" ? "Cancel" : "إلغاء"}
                  </button>
                  <a
                    href={getSampleWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm text-center flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(176,141,92,0.45)] transition-all"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>{lang === "en" ? "Request on WhatsApp" : "أرسل طلب العينات"}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
