"use client";

import React, { useState, use, useEffect, useRef } from "react";
import Link from "next/link";
import { translations, Language } from "@/data/translations";
import { productsCatalog, getProductTranslation } from "@/data/products";
import { 
  Palette, Eye, ArrowRight, Sparkles, Shield, Info, 
  MessageSquare, Sun, Moon, ZoomIn, ZoomOut, X, Move
} from "lucide-react";
import * as THREE from "three";

interface PageProps {
  params: Promise<{ lang: string }>;
}

type MaterialType = "oak" | "charcoal" | "marble" | "walnut" | "white";
type RoomType = "living" | "office" | "bedroom";
type LightMode = "day" | "night";
type ModalType = null | "specs" | "sample";

export default function VisualizerPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === "ar" ? "ar" : "en";
  const t = translations[lang] || translations.en;

  // Visualizer states
  const [activeMaterial, setActiveMaterial] = useState<MaterialType>("oak");
  const [activeRoom, setActiveRoom] = useState<RoomType>("living");
  const [lightMode, setLightMode] = useState<LightMode>("day");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showDragTip, setShowDragTip] = useState<boolean>(true);

  // WebGL references
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ref state sync for Three.js render loop
  const materialRef = useRef<MaterialType>(activeMaterial);
  const roomRef = useRef<RoomType>(activeRoom);
  const lightModeRef = useRef<LightMode>(lightMode);
  const isZoomedRef = useRef<boolean>(isZoomed);

  useEffect(() => { materialRef.current = activeMaterial; }, [activeMaterial]);
  useEffect(() => { roomRef.current = activeRoom; }, [activeRoom]);
  useEffect(() => { lightModeRef.current = lightMode; }, [lightMode]);
  useEffect(() => { isZoomedRef.current = isZoomed; }, [isZoomed]);

  // Find corresponding product catalog entry
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

  // Calculate dynamic WhatsApp link for sample request
  const getSampleWhatsAppLink = () => {
    if (!currentProduct) return "#";
    
    const message = lang === "ar"
      ? `مرحباً فوزي للديكور، أنا أستخدم مصمم الديكور التفاعلي الـ 360 درجة على موقعكم وأود طلب عينة طبيعية لمنتج: ${productName} (كود المنتج: ${currentProduct.code}). يرجى إفادتي بكيفية الشحن.`
      : `Hello Fawzy Decor, I am using your interactive 360° Visualizer and would like to request a physical sample of: ${productName} (Product Code: ${currentProduct.code}). Please let me know how to proceed.`;
      
    return `https://wa.me/201040044415?text=${encodeURIComponent(message)}`;
  };

  // Helper functions for procedural in-memory textures
  const createLouverTexture = (
    color1: string,
    color2: string,
    color3: string,
    highlight: string
  ): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Slat base
    ctx.fillStyle = color2;
    ctx.fillRect(0, 0, 64, 256);

    // Bevel shading gradient
    const grad = ctx.createLinearGradient(0, 0, 64, 0);
    grad.addColorStop(0, color1); // Left deep shadow
    grad.addColorStop(0.12, color1);
    grad.addColorStop(0.5, color2); // Center flat face
    grad.addColorStop(0.88, color3); // Right face shadow
    grad.addColorStop(1, color1); // Right deep shadow
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 256);

    // Specular slat highlight line on left edge
    ctx.strokeStyle = highlight;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(8, 256);
    ctx.stroke();

    // Wood grain lines
    ctx.fillStyle = "rgba(0,0,0,0.035)";
    for (let i = 0; i < 80; i++) {
      const rx = Math.random() * 64;
      const ry = Math.random() * 256;
      const rw = Math.random() * 1.5 + 0.5;
      const rh = Math.random() * 60 + 20;
      ctx.fillRect(rx, ry, rw, rh);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(48, 1); // Louvers repeated across the accent wall
    return texture;
  };

  const createMarbleTexture = (): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Base marble cream/white gradient
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

    // Soft golden-brown veins
    drawVein([[0, 80], [140, 190], [220, 140], [390, 290], [512, 230]], "rgba(176, 141, 92, 0.3)", 3.5);
    drawVein([[200, 0], [180, 200], [290, 310], [420, 512]], "rgba(141, 107, 62, 0.2)", 2.0);
    // Dark grey fine veins
    drawVein([[80, 0], [120, 120], [190, 250], [320, 370], [360, 512]], "rgba(90, 90, 95, 0.2)", 1.2);
    drawVein([[0, 380], [180, 340], [280, 440], [480, 490]], "rgba(100, 100, 100, 0.15)", 0.8);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  const createFloorTexture = (): THREE.Texture => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Dark wood floor planks
    ctx.fillStyle = "#1b1713";
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = "#080605";
    ctx.lineWidth = 3;
    for (let y = 0; y <= 256; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }

    ctx.lineWidth = 2;
    for (let y = 0; y < 256; y += 64) {
      const offset = (y / 64) % 2 === 0 ? 0 : 64;
      for (let x = offset; x <= 256; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 64);
        ctx.stroke();
      }
    }

    // Wood grain detail
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

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    // 1. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c0c0e");

    // 3. Perspective Camera (placed at eye level in room center)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 0.1);

    // 4. Parallax & Room Group
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // Shared Materials for Furniture & Elements
    const fabricMat = new THREE.MeshStandardMaterial({ color: "#252528", roughness: 0.8 });
    const legMat = new THREE.MeshStandardMaterial({ color: "#b08d5c", metalness: 0.8, roughness: 0.2 });
    const woodMat = new THREE.MeshStandardMaterial({ color: "#3f2d1e", roughness: 0.4 });
    const cabinetMat = new THREE.MeshStandardMaterial({ color: "#161618", roughness: 0.85 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: "#f0f0f4", roughness: 0.95 });
    const headboardMat = new THREE.MeshStandardMaterial({ color: "#1d1d20", roughness: 0.8 });

    // 5. Lighting Setup
    // A. Ambient Light
    const ambientLight = new THREE.AmbientLight("#e0f0ff", 0.85);
    scene.add(ambientLight);

    // B. Sunlight (from Left Window)
    const sunLight = new THREE.DirectionalLight("#fffaf0", 2.8);
    sunLight.position.set(-2.8, 1.2, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0015;
    scene.add(sunLight);

    // C. Ceiling Spotlights (Night Mode spotlight)
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

    // D. Cozy Amber Lamp (Night Mode side light)
    const lampLight = new THREE.PointLight("#ff8844", 0, 6);
    lampLight.position.set(2.4, 0.2, 1.2);
    scene.add(lampLight);

    // 6. Room Box Geometries
    const floorGeo = new THREE.PlaneGeometry(6, 6);
    const wallGeo = new THREE.PlaneGeometry(6, 2.6);

    const floorTexture = createFloorTexture();
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.52,
      metalness: 0.08,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.0;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Ceiling
    const ceilingMat = new THREE.MeshStandardMaterial({ color: "#e6e6e8", roughness: 0.9 });
    const ceiling = new THREE.Mesh(floorGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 1.6;
    roomGroup.add(ceiling);

    // Accent Wall (Back wall visualizer target at z = -2.95)
    const wallMat = new THREE.MeshStandardMaterial({ roughness: 0.65, metalness: 0.1 });
    const wallBack = new THREE.Mesh(wallGeo, wallMat);
    wallBack.position.set(0, 0.3, -2.95);
    wallBack.receiveShadow = true;
    roomGroup.add(wallBack);

    // Left Wall - Features a large glass window
    const wallLeftMat = new THREE.MeshStandardMaterial({ color: "#dedede", roughness: 0.85 });
    const wallLeft = new THREE.Mesh(wallGeo, wallLeftMat);
    wallLeft.position.set(-2.95, 0.3, 0);
    wallLeft.rotation.y = Math.PI / 2;
    roomGroup.add(wallLeft);

    // Glass Window Pane
    const windowGeo = new THREE.BoxGeometry(0.04, 1.8, 3.2);
    const windowMat = new THREE.MeshStandardMaterial({
      color: "#add8e6",
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.35,
    });
    const windowMesh = new THREE.Mesh(windowGeo, windowMat);
    windowMesh.position.set(-2.93, 0.4, 0);
    roomGroup.add(windowMesh);

    // Window Frame
    const frameMat = new THREE.MeshStandardMaterial({ color: "#111113", roughness: 0.8 });
    const frameOuter = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.9, 3.3), frameMat);
    frameOuter.position.set(-2.94, 0.4, 0);
    roomGroup.add(frameOuter);

    // Right Wall - Features a decorative console table and a round mirror
    const wallRight = new THREE.Mesh(wallGeo, wallLeftMat);
    wallRight.position.set(2.95, 0.3, 0);
    wallRight.rotation.y = -Math.PI / 2;
    roomGroup.add(wallRight);

    // Round Mirror
    const mirrorMat = new THREE.MeshStandardMaterial({
      color: "#d0d0d8",
      roughness: 0.05,
      metalness: 0.95,
    });
    const mirror = new THREE.Mesh(new THREE.CircleGeometry(0.55, 32), mirrorMat);
    mirror.position.set(2.93, 0.5, 0.8);
    mirror.rotation.y = -Math.PI / 2;
    roomGroup.add(mirror);

    const mirrorFrame = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.58, 32), legMat);
    mirrorFrame.position.set(2.928, 0.5, 0.8);
    mirrorFrame.rotation.y = -Math.PI / 2;
    roomGroup.add(mirrorFrame);

    // Console table under mirror
    const consoleTop = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 1.3), woodMat);
    consoleTop.position.set(2.78, -0.22, 0.8);
    consoleTop.castShadow = true;
    roomGroup.add(consoleTop);

    const consoleLegs = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.74, 1.2), cabinetMat);
    consoleLegs.position.set(2.78, -0.61, 0.8);
    consoleLegs.castShadow = true;
    roomGroup.add(consoleLegs);

    // Front Wall (Behind camera)
    const wallFront = new THREE.Mesh(wallGeo, wallLeftMat);
    wallFront.position.set(0, 0.3, 2.95);
    wallFront.rotation.y = Math.PI;
    roomGroup.add(wallFront);

    // Decorative painting on front wall
    const paintFrameGeo = new THREE.BoxGeometry(1.6, 1.0, 0.04);
    const paintFrame = new THREE.Mesh(paintFrameGeo, frameMat);
    paintFrame.position.set(0, 0.5, 2.92);
    roomGroup.add(paintFrame);

    const paintCanvasGeo = new THREE.PlaneGeometry(1.5, 0.9);
    const paintCanvasMat = new THREE.MeshBasicMaterial({ color: "#22332a" });
    const paintCanvas = new THREE.Mesh(paintCanvasGeo, paintCanvasMat);
    paintCanvas.position.set(0, 0.5, 2.89);
    paintCanvas.rotation.y = Math.PI;
    roomGroup.add(paintCanvas);

    // Baseboard trim at room corners
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

    // 7. Procedural Texture Library
    const textures: Record<MaterialType, THREE.Texture> = {
      oak: createLouverTexture("#624a2c", "#cfa771", "#7e623d", "#f8e3c5"),
      charcoal: createLouverTexture("#0e0e10", "#3a3a3e", "#202022", "#66666e"),
      walnut: createLouverTexture("#2f1f10", "#7a5933", "#4d361d", "#be9970"),
      white: createLouverTexture("#bfbfcf", "#f5f5f7", "#dfdfe3", "#ffffff"),
      marble: createMarbleTexture(),
    };

    // 8. 3D Furniture Groups
    const sofaGroup = new THREE.Group();
    const deskGroup = new THREE.Group();
    const bedGroup = new THREE.Group();

    roomGroup.add(sofaGroup);
    roomGroup.add(deskGroup);
    roomGroup.add(bedGroup);

    // Sofa construction
    const seatMesh = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.22, 0.85), fabricMat);
    seatMesh.position.set(0, -0.55, 1.25);
    seatMesh.castShadow = true;
    seatMesh.receiveShadow = true;
    sofaGroup.add(seatMesh);

    const backMesh = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.45, 0.22), fabricMat);
    backMesh.position.set(0, -0.28, 0.95);
    backMesh.castShadow = true;
    backMesh.receiveShadow = true;
    sofaGroup.add(backMesh);

    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.85), fabricMat);
    armL.position.set(-1.15, -0.45, 1.25);
    armL.castShadow = true;
    armL.receiveShadow = true;
    sofaGroup.add(armL);

    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.85), fabricMat);
    armR.position.set(1.15, -0.45, 1.25);
    armR.castShadow = true;
    armR.receiveShadow = true;
    sofaGroup.add(armR);

    // Sofa legs
    const sofaLegGeo = new THREE.CylinderGeometry(0.015, 0.01, 0.3);
    const sofaLegPositions = [
      [-1.05, -0.81, 0.9],
      [1.05, -0.81, 0.9],
      [-1.05, -0.81, 1.6],
      [1.05, -0.81, 1.6],
    ];
    sofaLegPositions.forEach((pos) => {
      const leg = new THREE.Mesh(sofaLegGeo, legMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      leg.castShadow = true;
      sofaGroup.add(leg);
    });

    // Office Desk construction
    const deskTopMesh = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 0.8), woodMat);
    deskTopMesh.position.set(0, -0.28, 1.25);
    deskTopMesh.castShadow = true;
    deskTopMesh.receiveShadow = true;
    deskGroup.add(deskTopMesh);

    const drawerL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.62, 0.72), cabinetMat);
    drawerL.position.set(-0.75, -0.69, 1.25);
    drawerL.castShadow = true;
    drawerL.receiveShadow = true;
    deskGroup.add(drawerL);

    const drawerR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.62, 0.72), cabinetMat);
    drawerR.position.set(0.75, -0.69, 1.25);
    drawerR.castShadow = true;
    drawerR.receiveShadow = true;
    deskGroup.add(drawerR);

    // Laptop
    const laptopBaseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.01, 0.2), cabinetMat);
    laptopBaseMesh.position.set(0, -0.24, 1.25);
    laptopBaseMesh.castShadow = true;
    deskGroup.add(laptopBaseMesh);

    const laptopScreenMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.008), cabinetMat);
    laptopScreenMesh.position.set(0, -0.155, 1.15);
    laptopScreenMesh.rotation.x = -0.25;
    laptopScreenMesh.castShadow = true;
    deskGroup.add(laptopScreenMesh);

    // Bedroom Bed construction
    const bedBaseMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.22, 1.8), woodMat);
    bedBaseMesh.position.set(0, -0.89, 1.35);
    bedBaseMesh.castShadow = true;
    bedBaseMesh.receiveShadow = true;
    bedGroup.add(bedBaseMesh);

    const mattressMesh = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 1.7), whiteMat);
    mattressMesh.position.set(0, -0.65, 1.4);
    mattressMesh.castShadow = true;
    mattressMesh.receiveShadow = true;
    bedGroup.add(mattressMesh);

    const headboardMesh = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.95, 0.12), headboardMat);
    headboardMesh.position.set(0, -0.4, 0.55);
    headboardMesh.castShadow = true;
    headboardMesh.receiveShadow = true;
    bedGroup.add(headboardMesh);

    // Pillows
    const pillowGeo = new THREE.BoxGeometry(0.5, 0.08, 0.32);
    const pillowLMesh = new THREE.Mesh(pillowGeo, whiteMat);
    pillowLMesh.position.set(-0.35, -0.48, 0.8);
    pillowLMesh.rotation.x = 0.12;
    bedGroup.add(pillowLMesh);

    const pillowRMesh = new THREE.Mesh(pillowGeo, whiteMat);
    pillowRMesh.position.set(0.35, -0.48, 0.8);
    pillowRMesh.rotation.x = 0.12;
    bedGroup.add(pillowRMesh);

    // 9. Pulsing 3D Interactive Hotspots
    const hotspotMat = new THREE.MeshBasicMaterial({ color: "#f1b82d", side: THREE.DoubleSide });
    const hotspotTorusGeo = new THREE.TorusGeometry(0.045, 0.012, 8, 24);

    // Hotspot A: Technical specifications (Back Wall center)
    const hotspotWall = new THREE.Mesh(hotspotTorusGeo, hotspotMat);
    hotspotWall.position.set(0, 0.35, -2.85);
    roomGroup.add(hotspotWall);

    // Hotspot B: Sample Box request (On Sofa/Furniture)
    const hotspotFurniture = new THREE.Mesh(hotspotTorusGeo, hotspotMat);
    hotspotFurniture.position.set(0.4, -0.32, 1.25);
    roomGroup.add(hotspotFurniture);

    // Hotspot C: Light mode switch (Near Left Window)
    const hotspotLight = new THREE.Mesh(hotspotTorusGeo, hotspotMat);
    hotspotLight.position.set(-2.82, 0.4, 0.8);
    hotspotLight.rotation.y = Math.PI / 2;
    roomGroup.add(hotspotLight);

    const hotspots = [hotspotWall, hotspotFurniture, hotspotLight];

    // 10. 360 Drag & Swipe Camera Interaction
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
      setShowDragTip(false);
    };

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      lon = startLon - dx * 0.14;
      lat = startLat + dy * 0.14;
      lat = Math.max(-40, Math.min(40, lat)); // Keep camera constrained
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;

      // Click/Raycast detection (only trigger if mouse moved very little)
      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);
      if (dx < 6 && dy < 6) {
        const rect = container.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(hotspots);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          if (hit === hotspotWall) {
            setModalType("specs");
          } else if (hit === hotspotFurniture) {
            setModalType("sample");
          } else if (hit === hotspotLight) {
            setLightMode((prev) => (prev === "day" ? "night" : "day"));
          }
        }
      }
    };

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startLon = lon;
      startLat = lat;
      setShowDragTip(false);
    };

    const handleTouchMoveGlobal = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      lon = startLon - dx * 0.18;
      lat = startLat + dy * 0.18;
      lat = Math.max(-40, Math.min(40, lat));
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("mouseup", handleMouseUp);

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMoveGlobal, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 11. Frame Rendering Animation Loop
    const clock = new THREE.Clock();
    let reqId: number;

    const tick = () => {
      const time = clock.getElapsedTime();

      // Pulse and spin 3D hotspots
      hotspots.forEach((hotspot, idx) => {
        hotspot.rotation.y = time * 2;
        hotspot.rotation.x = time * 0.5;
        const scale = 1.0 + Math.sin(time * 5.0 + idx) * 0.15;
        hotspot.scale.set(scale, scale, scale);
      });

      // Smooth camera looking angles
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);

      targetLookAt.x = Math.sin(phi) * Math.sin(theta);
      targetLookAt.y = Math.cos(phi);
      targetLookAt.z = Math.sin(phi) * Math.cos(theta);

      currentLookAt.x += (targetLookAt.x - currentLookAt.x) * 0.095;
      currentLookAt.y += (targetLookAt.y - currentLookAt.y) * 0.095;
      currentLookAt.z += (targetLookAt.z - currentLookAt.z) * 0.095;

      camera.lookAt(
        camera.position.x + currentLookAt.x,
        camera.position.y + currentLookAt.y,
        camera.position.z + currentLookAt.z
      );

      // Smooth Day/Night Lighting transitions
      const currentLightMode = lightModeRef.current;
      const targetSun = currentLightMode === "day" ? 2.8 : 0;
      const targetAmbient = currentLightMode === "day" ? 0.85 : 0.15;
      const targetSpot = currentLightMode === "day" ? 0 : 5.0;
      const targetLamp = currentLightMode === "day" ? 0 : 3.5;

      sunLight.intensity += (targetSun - sunLight.intensity) * 0.075;
      ambientLight.intensity += (targetAmbient - ambientLight.intensity) * 0.075;
      spotLight.intensity += (targetSpot - spotLight.intensity) * 0.075;
      lampLight.intensity += (targetLamp - lampLight.intensity) * 0.075;

      // Smooth camera FOV zooming
      const targetFov = isZoomedRef.current ? 18 : 45;
      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov += (targetFov - camera.fov) * 0.08;
        camera.updateProjectionMatrix();
      }

      // Sync active wall material texture
      const activeMatKey = materialRef.current;
      if (wallMat.map !== textures[activeMatKey]) {
        wallMat.map = textures[activeMatKey];
        wallMat.needsUpdate = true;
      }

      // Sync active room furniture meshes visibility
      const activeRoomKey = roomRef.current;
      sofaGroup.visible = activeRoomKey === "living";
      deskGroup.visible = activeRoomKey === "office";
      bedGroup.visible = activeRoomKey === "bedroom";

      // Toggle floor baseboard trim position based on bed placement
      trimBack.visible = activeRoomKey !== "bedroom";

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(tick);
    };

    tick();

    // 12. Resize Handler
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

    // 13. Disconnect Cleanup Hook
    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMoveGlobal);
      window.removeEventListener("touchend", handleTouchEnd);
      resizeObserver.disconnect();

      // Dispose resources
      floorGeo.dispose();
      wallGeo.dispose();
      ceilingMat.dispose();
      floorMat.dispose();
      wallMat.dispose();
      wallLeftMat.dispose();
      windowGeo.dispose();
      windowMat.dispose();
      frameMat.dispose();
      mirrorMat.dispose();
      floorTexture.dispose();
      hotspotTorusGeo.dispose();
      hotspotMat.dispose();
      paintFrameGeo.dispose();
      paintCanvasGeo.dispose();
      paintCanvasMat.dispose();
      pillowGeo.dispose();

      Object.values(textures).forEach((tex) => tex.dispose());

      const disposeNode = (node: any) => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach((m: any) => m.dispose());
          } else {
            node.material.dispose();
          }
        }
      };

      sofaGroup.traverse(disposeNode);
      deskGroup.traverse(disposeNode);
      bedGroup.traverse(disposeNode);

      renderer.dispose();
    };
  }, []);

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

        {/* Studio Workspace Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-1 flex flex-col gap-6 premium-glass p-8 rounded-2xl border border-primary/15 self-start z-10">
            {/* Room Style Selection */}
            <div>
              <h2 className="text-sm font-bold text-white mb-3.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>{t.visualizer.selectRoom}</span>
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {(["living", "office", "bedroom"] as RoomType[]).map((room) => (
                  <button
                    key={room}
                    onClick={() => setActiveRoom(room)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all ${
                      activeRoom === room
                        ? "bg-primary text-white font-bold"
                        : "bg-premium-charcoal text-premium-beige hover:bg-premium-charcoal/80"
                    }`}
                  >
                    {t.visualizer.roomTypes[room]}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-primary/10" />

            {/* Material Texture Selection */}
            <div>
              <h2 className="text-sm font-bold text-white mb-3.5 flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span>{t.visualizer.selectMaterial}</span>
              </h2>
              <div className="flex flex-col gap-3">
                {(["oak", "charcoal", "walnut", "white", "marble"] as MaterialType[]).map((material) => (
                  <button
                    key={material}
                    onClick={() => setActiveMaterial(material)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-sm text-left rtl:text-right font-medium transition-all ${
                      activeMaterial === material
                        ? "border-primary bg-primary/15 text-primary-light"
                        : "border-primary/10 bg-premium-charcoal hover:border-primary/45 hover:bg-premium-charcoal/85"
                    }`}
                  >
                    <span>{t.visualizer.materials[material]}</span>
                    {/* Circle Color Preview */}
                    <span
                      className={`w-5 h-5 rounded-full border border-white/20 shadow-inner ${
                        material === "oak"
                          ? "bg-[#e5d5be]"
                          : material === "charcoal"
                          ? "bg-[#212124]"
                          : material === "walnut"
                          ? "bg-[#7c5f3e]"
                          : material === "white"
                          ? "bg-[#f5f5f7]"
                          : "bg-[#f5f2eb]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-primary/10" />

            <Link
              href={`/${lang}/calculator`}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-primary text-primary hover:bg-primary/10 font-bold transition-all text-sm mt-1"
            >
              <span>{t.calculator.title}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Interactive WebGL 3D 360° Showroom Container */}
          <div
            ref={containerRef}
            className="lg:col-span-2 relative min-h-[520px] lg:min-h-[620px] rounded-2xl overflow-hidden border border-primary/20 shadow-2xl flex flex-col justify-between items-stretch bg-[#0c0c0e]"
          >
            {/* Three.js Canvas Element */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full z-0 block cursor-grab active:cursor-grabbing" 
            />

            {/* Drag instructions overlay */}
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

            {/* Quick action buttons floating on the right */}
            <div className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 flex flex-col gap-2.5">
              {/* Day / Night Toggle */}
              <button
                onClick={() => setLightMode(prev => prev === "day" ? "night" : "day")}
                className="p-3.5 rounded-xl bg-black/65 hover:bg-black/80 text-white border border-white/10 hover:border-primary/50 transition-all shadow-md"
                title={lang === "en" ? "Toggle Day/Night Lighting" : "تبديل إضاءة النهار/الليل"}
              >
                {lightMode === "day" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-primary" />}
              </button>

              {/* Zoom In / Zoom Out */}
              <button
                onClick={() => setIsZoomed(prev => !prev)}
                className="p-3.5 rounded-xl bg-black/65 hover:bg-black/80 text-white border border-white/10 hover:border-primary/50 transition-all shadow-md"
                title={lang === "en" ? "Inspect Texture Close-up" : "تقريب لمعاينة ملمس الخامة"}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5 text-primary" /> : <ZoomIn className="w-5 h-5" />}
              </button>
            </div>

            {/* Specifications Details Overlay Card (Top Left - absolute overlay) */}
            {currentProduct && (
              <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 z-20 max-w-[240px] sm:max-w-xs premium-glass p-4 rounded-xl text-left rtl:text-right text-xs shadow-lg animate-fade-in-up">
                <div 
                  onClick={() => setModalType("specs")}
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

            {/* Empty space helper */}
            <div className="h-24 pointer-events-none" />

            {/* Visual Sales CTA Bar (Bottom absolute overlay) */}
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

      {/* HTML Overlay Modals (Sleek Glassmorphic overlays) */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in-up">
          <div className="relative w-full max-w-lg premium-glass p-8 sm:p-10 rounded-2xl border border-primary/25 shadow-2xl text-right animate-scale-up">
            {/* Close Button */}
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
