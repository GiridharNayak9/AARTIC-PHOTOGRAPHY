import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Sparkles, Sliders, RotateCcw, Volume2, VolumeX, Eye } from 'lucide-react';
import { playShutterSound, playDialClick, toggleAudioMute, getAudioMutedState } from '../utils/audioEffects';

interface ThreeCameraSceneProps {
  onShutterTrigger?: () => void;
}

export const ThreeCameraScene: React.FC<ThreeCameraSceneProps> = ({ onShutterTrigger }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive UI State
  const [aperture, setAperture] = useState<number>(1.4);
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(getAudioMutedState());
  const [colorEdition, setColorEdition] = useState<'noir-gold' | 'royal-gold' | 'monolith'>('noir-gold');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeFocalLength, setActiveFocalLength] = useState<number>(50);

  // References to 3D scene objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraGroupRef = useRef<THREE.Group | null>(null);
  const irisGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    pointLight1: THREE.PointLight;
    pointLight2: THREE.PointLight;
    rimLight: THREE.DirectionalLight;
  } | null>(null);
  const materialsRef = useRef<{
    goldMetallic: THREE.MeshStandardMaterial;
    goldSpecular: THREE.MeshStandardMaterial;
    bodyChassis: THREE.MeshStandardMaterial;
    lensGlass: THREE.MeshPhysicalMaterial;
    dialMetal: THREE.MeshStandardMaterial;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 4.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Materials
    const goldMetallic = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd4af37),
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 1.5,
    });

    const goldSpecular = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf6e594),
      metalness: 0.96,
      roughness: 0.12,
    });

    const bodyChassis = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x101010),
      metalness: 0.4,
      roughness: 0.6,
    });

    const dialMetal = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xe0b84c),
      metalness: 0.9,
      roughness: 0.35,
    });

    const lensGlass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0e141a),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 0.6,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      ior: 1.55,
    });

    materialsRef.current = {
      goldMetallic,
      goldSpecular,
      bodyChassis,
      lensGlass,
      dialMetal,
    };

    // Camera 3D Group
    const cameraGroup = new THREE.Group();
    cameraGroupRef.current = cameraGroup;

    // 1. Main Camera Chassis Body
    const bodyGeo = new THREE.BoxGeometry(2.1, 1.35, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyChassis);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    cameraGroup.add(bodyMesh);

    // 2. Gold Top Plate
    const topPlateGeo = new THREE.BoxGeometry(2.12, 0.28, 0.97);
    const topPlateMesh = new THREE.Mesh(topPlateGeo, goldMetallic);
    topPlateMesh.position.y = 0.8;
    cameraGroup.add(topPlateMesh);

    // 3. Gold Base Plate
    const basePlateGeo = new THREE.BoxGeometry(2.12, 0.14, 0.97);
    const basePlateMesh = new THREE.Mesh(basePlateGeo, goldMetallic);
    basePlateMesh.position.y = -0.73;
    cameraGroup.add(basePlateMesh);

    // 4. Viewfinder / Pentaprism Housing
    const prismGeo = new THREE.CylinderGeometry(0.35, 0.48, 0.35, 6);
    const prismMesh = new THREE.Mesh(prismGeo, goldSpecular);
    prismMesh.position.set(0, 1.06, 0.05);
    prismMesh.rotation.y = Math.PI / 6;
    cameraGroup.add(prismMesh);

    // Viewfinder optical glass window
    const vfWindowGeo = new THREE.BoxGeometry(0.3, 0.16, 0.05);
    const vfWindowMesh = new THREE.Mesh(vfWindowGeo, lensGlass);
    vfWindowMesh.position.set(0, 1.05, 0.48);
    cameraGroup.add(vfWindowMesh);

    // 5. Left & Right Handgrip Leatherette Relief
    const gripGeo = new THREE.BoxGeometry(0.48, 1.25, 0.28);
    const gripMesh = new THREE.Mesh(gripGeo, new THREE.MeshStandardMaterial({
      color: 0x070707,
      roughness: 0.85,
      metalness: 0.1,
    }));
    gripMesh.position.set(0.8, 0, 0.42);
    cameraGroup.add(gripMesh);

    // 6. Gold Dials & Knurled Switches
    // Dial 1: Shutter speed dial (top right)
    const dial1Geo = new THREE.CylinderGeometry(0.18, 0.18, 0.16, 24);
    const dial1 = new THREE.Mesh(dial1Geo, dialMetal);
    dial1.position.set(0.72, 0.98, 0);
    cameraGroup.add(dial1);

    // Dial 2: Exposure Compensation dial (top left)
    const dial2Geo = new THREE.CylinderGeometry(0.16, 0.16, 0.14, 24);
    const dial2 = new THREE.Mesh(dial2Geo, dialMetal);
    dial2.position.set(-0.72, 0.98, 0);
    cameraGroup.add(dial2);

    // Dial 3: Shutter Release Button with gold knurl ring
    const shutterCollarGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.1, 16);
    const shutterCollar = new THREE.Mesh(shutterCollarGeo, goldSpecular);
    shutterCollar.position.set(0.68, 0.98, 0.32);
    cameraGroup.add(shutterCollar);

    const shutterButtonGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16);
    const shutterButton = new THREE.Mesh(shutterButtonGeo, goldMetallic);
    shutterButton.position.set(0.68, 1.04, 0.32);
    cameraGroup.add(shutterButton);

    // 7. Gold AARTIC Brand Plaque on Front
    const badgeGeo = new THREE.BoxGeometry(0.75, 0.18, 0.04);
    const badgeMesh = new THREE.Mesh(badgeGeo, goldSpecular);
    badgeMesh.position.set(-0.45, 0.8, 0.49);
    cameraGroup.add(badgeMesh);

    // 8. Multi-Element Lens Barrel Assembly
    const lensAssembly = new THREE.Group();
    lensAssembly.position.set(0, 0.05, 0.48);

    // Mount Flange (Golden Ring)
    const mountRingGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.12, 36);
    const mountRing = new THREE.Mesh(mountRingGeo, goldSpecular);
    mountRing.rotation.x = Math.PI / 2;
    mountRing.position.z = 0.06;
    lensAssembly.add(mountRing);

    // Base Barrel (Dark Obsidian)
    const barrelBaseGeo = new THREE.CylinderGeometry(0.62, 0.65, 0.35, 36);
    const barrelBase = new THREE.Mesh(barrelBaseGeo, bodyChassis);
    barrelBase.rotation.x = Math.PI / 2;
    barrelBase.position.z = 0.28;
    lensAssembly.add(barrelBase);

    // Gold Knurled Aperture Ring
    const apertureRingGeo = new THREE.CylinderGeometry(0.63, 0.63, 0.18, 48);
    const apertureRing = new THREE.Mesh(apertureRingGeo, dialMetal);
    apertureRing.rotation.x = Math.PI / 2;
    apertureRing.position.z = 0.52;
    lensAssembly.add(apertureRing);

    // Focus Barrel (Front tube)
    const focusBarrelGeo = new THREE.CylinderGeometry(0.58, 0.61, 0.45, 36);
    const focusBarrel = new THREE.Mesh(focusBarrelGeo, bodyChassis);
    focusBarrel.rotation.x = Math.PI / 2;
    focusBarrel.position.z = 0.8;
    lensAssembly.add(focusBarrel);

    // Gold Bezel Rim Front
    const frontRimGeo = new THREE.TorusGeometry(0.56, 0.045, 16, 48);
    const frontRim = new THREE.Mesh(frontRimGeo, goldSpecular);
    frontRim.position.z = 1.02;
    lensAssembly.add(frontRim);

    // Front Glass Element (Curved Convex)
    const frontLensGeo = new THREE.SphereGeometry(0.52, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3);
    const frontLens = new THREE.Mesh(frontLensGeo, lensGlass);
    frontLens.position.set(0, 0, 0.75);
    lensAssembly.add(frontLens);

    // Internal Optical Iris Aperture Blades Group
    const irisGroup = new THREE.Group();
    irisGroup.position.z = 0.45;
    irisGroupRef.current = irisGroup;

    // Create 8 aperture blade meshes inside the barrel
    const bladeCount = 8;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(0.24, 0.08, 0.015);
      const bladeMesh = new THREE.Mesh(bladeGeo, goldMetallic);
      bladeMesh.position.set(Math.cos(angle) * 0.18, Math.sin(angle) * 0.18, 0);
      bladeMesh.rotation.z = angle + 0.4;
      irisGroup.add(bladeMesh);
    }
    lensAssembly.add(irisGroup);

    cameraGroup.add(lensAssembly);
    scene.add(cameraGroup);

    // Floating Golden Bokeh & Light Motes in 3D Space
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      scales[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe5c158,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff7e6, 0.85);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffdf88, 3.2, 10);
    pointLight1.position.set(2.5, 2.8, 3.5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xd4af37, 2.4, 8);
    pointLight2.position.set(-2.8, -1.2, 2.2);
    scene.add(pointLight2);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(0, 3.5, -3);
    scene.add(rimLight);

    lightsRef.current = { pointLight1, pointLight2, rimLight };

    // Interactive Drag / Orbit Variables
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.2;
    let targetRotationX = 0.05;
    let currentRotationY = 0.2;
    let currentRotationX = 0.05;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      setIsAutoRotating(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        // Move lights subtly with cursor for dynamic gold glint
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        pointLight1.position.x = 2.5 + normX * 1.5;
        pointLight1.position.y = 2.8 + normY * 1.2;
      }

      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      // Clamp vertical tilt
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        setIsAutoRotating(false);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const containerEl = containerRef.current;
    containerEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    containerEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation
      if (cameraGroupRef.current) {
        if (isAutoRotating && !isDragging) {
          targetRotationY += 0.004;
          targetRotationX = Math.sin(elapsedTime * 0.5) * 0.08;
        }

        // Smooth damping
        currentRotationY += (targetRotationY - currentRotationY) * 0.06;
        currentRotationX += (targetRotationX - currentRotationX) * 0.06;

        cameraGroupRef.current.rotation.y = currentRotationY;
        cameraGroupRef.current.rotation.x = currentRotationX;
        cameraGroupRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.06;
      }

      // Drift golden bokeh motes
      const positionsAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let py = positionsAttr.getY(i);
        py += 0.003;
        if (py > 3) py = -3;
        positionsAttr.setY(i, py);
      }
      positionsAttr.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width: newW, height: newH } = entries[0].contentRect;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });

    resizeObserver.observe(containerEl);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      containerEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      containerEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, [isAutoRotating]);

  // Handle Aperture Changes
  useEffect(() => {
    if (!irisGroupRef.current) return;
    // Scale the iris aperture opening: lower f-number -> wider pupil aperture
    // f/1.2 is max open (~1.3 scale), f/16 is tiny (~0.4 scale)
    const scaleFactor = Math.max(0.4, 1.4 - (aperture / 16) * 0.9);
    irisGroupRef.current.scale.set(scaleFactor, scaleFactor, 1);
  }, [aperture]);

  // Handle Color Edition Preset
  useEffect(() => {
    if (!materialsRef.current) return;
    const { bodyChassis, goldMetallic, goldSpecular } = materialsRef.current;

    if (colorEdition === 'noir-gold') {
      bodyChassis.color.setHex(0x101010);
      bodyChassis.roughness = 0.65;
      goldMetallic.color.setHex(0xd4af37);
      goldSpecular.color.setHex(0xf6e594);
    } else if (colorEdition === 'royal-gold') {
      bodyChassis.color.setHex(0xb58b29);
      bodyChassis.roughness = 0.35;
      goldMetallic.color.setHex(0xf9e498);
      goldSpecular.color.setHex(0xfffae0);
    } else if (colorEdition === 'monolith') {
      bodyChassis.color.setHex(0x080808);
      bodyChassis.roughness = 0.8;
      goldMetallic.color.setHex(0x9a7b2c);
      goldSpecular.color.setHex(0xd4af37);
    }
  }, [colorEdition]);

  // Shutter trigger action
  const handleShutterSnap = () => {
    playShutterSound();
    setIsFlashActive(true);

    // Strobe flash timeout
    setTimeout(() => {
      setIsFlashActive(false);
    }, 120);

    if (onShutterTrigger) {
      onShutterTrigger();
    }
  };

  const handleAudioToggle = () => {
    const newState = toggleAudioMute();
    setIsMuted(newState);
  };

  const resetCameraOrientation = () => {
    playDialClick();
    setIsAutoRotating(true);
  };

  return (
    <div
      id="3d-camera-viewport-container"
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[680px] rounded-2xl overflow-hidden border border-amber-900/30 bg-gradient-to-b from-[#0c0c0e] via-[#060607] to-[#040404] shadow-2xl group select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Simulated Flash Strobe Overlay */}
      {isFlashActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/90 via-white to-amber-200/90 pointer-events-none transition-opacity duration-100 z-30 mix-blend-screen" />
      )}

      {/* Atmospheric Vignette & Corner Accents */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-amber-400/50 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-amber-400/50 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-amber-400/50 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-amber-400/50 pointer-events-none" />

      {/* Top HUD Specs Overlay */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-amber-500/20 text-xs tracking-wider flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-cinzel text-amber-200 font-bold">AARTIC-3D ENGINE</span>
          <span className="text-zinc-400 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">OTUS GOLD PRIME · {activeFocalLength}MM</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            id="btn-sound-toggle"
            onClick={handleAudioToggle}
            className="p-2.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-colors"
            title={isMuted ? 'Unmute camera sound effects' : 'Mute sound effects'}
            aria-label="Toggle camera sound effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            id="btn-reset-view"
            onClick={resetCameraOrientation}
            className="p-2.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-colors"
            title="Reset 3D camera rotation"
            aria-label="Reset 3D camera view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Center Prompt Hint */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none text-center opacity-70 group-hover:opacity-100 transition-opacity">
        <p className="text-[11px] uppercase tracking-[0.25em] text-amber-200/80 font-cinzel">
          Drag in 3D Space · Rotate 360° · Optical Viewfinder
        </p>
      </div>

      {/* Bottom Interactive Control Deck */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4 pointer-events-none">
        
        {/* Left: Camera Edition Selector */}
        <div className="bg-black/80 backdrop-blur-lg p-3 rounded-xl border border-amber-500/30 pointer-events-auto flex items-center gap-2">
          <span className="text-[10px] tracking-widest text-amber-400 font-cinzel uppercase px-1">Finish</span>
          <button
            id="finish-noir-gold"
            onClick={() => {
              playDialClick();
              setColorEdition('noir-gold');
            }}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              colorEdition === 'noir-gold'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Noir & Gold
          </button>
          <button
            id="finish-royal-gold"
            onClick={() => {
              playDialClick();
              setColorEdition('royal-gold');
            }}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              colorEdition === 'royal-gold'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Royal 24K
          </button>
          <button
            id="finish-monolith"
            onClick={() => {
              playDialClick();
              setColorEdition('monolith');
            }}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              colorEdition === 'monolith'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Obsidian
          </button>
        </div>

        {/* Center: Live Optical Aperture Iris Ring */}
        <div className="bg-black/80 backdrop-blur-lg px-4 py-3 rounded-xl border border-amber-500/30 pointer-events-auto flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-cinzel font-semibold">Iris f/{aperture.toFixed(1)}</span>
          </div>

          <div className="flex items-center gap-1">
            {[1.2, 1.8, 2.8, 5.6, 11].map((fStop) => (
              <button
                key={fStop}
                id={`aperture-stop-${fStop}`}
                onClick={() => {
                  playDialClick();
                  setAperture(fStop);
                }}
                className={`px-2 py-0.5 text-xs rounded transition-all font-mono ${
                  aperture === fStop
                    ? 'bg-amber-400 text-black font-bold shadow-md'
                    : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800'
                }`}
              >
                f/{fStop}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Shutter Trigger Button */}
        <div className="pointer-events-auto">
          <button
            id="btn-trigger-shutter"
            onClick={handleShutterSnap}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#e5c158] via-[#d4af37] to-[#aa771c] text-black font-cinzel font-bold text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>EXPOSE FRAME</span>
          </button>
        </div>

      </div>
    </div>
  );
};
