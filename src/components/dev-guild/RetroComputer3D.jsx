import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * RetroComputer3D
 * 
 * 3D retro CRT workstation rendered with Three.js using the supplied `retro_computer.glb`.
 * Features:
 * - Direct CanvasTexture rendering onto the CRT screen with authentic retro resolution and curvature
 * - Full interactive boot sequence and terminal command display
 * - Subtle pointer-responsive parallax tilt
 * - Cinematic lighting: warm key light, cool fill light, dual crimson backlights
 * - IntersectionObserver to pause rendering when offscreen
 * - Touch & mouse interactive command execution
 * - Clean disposal of WebGL resources on unmount
 */
export default function RetroComputer3D({
  activeCommand = 'run guild.exe',
  onSelectCommand,
  bootState = 'ready', // 'standby' | 'booting' | 'ready'
  onBootComplete,
  className = '',
}) {
  const mountRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // References to keep Three.js state across renders
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    computerModel: null,
    atlasTex: null,
    atlasCanvas: null,
    atlasCtx: null,
    baseImg: null,
    reqId: null,
    targetRotY: -0.32,
    targetRotX: 0.04,
    currentRotY: -0.32,
    currentRotX: 0.04,
    mouseTargetX: 0,
    mouseTargetY: 0,
    isVisible: true,
  });

  // Screen texture bounds in 2048x2048 atlas
  const SCREEN_BOUNDS = {
    sx: 985,
    sy: 1205,
    sw: 300,
    sh: 390,
  };

  // Helper to render the live CRT screen onto the atlas
  const drawScreenToAtlas = useCallback((state, activeCmd, bootProgress = 1.0) => {
    const { atlasCtx, atlasCanvas, atlasTex, baseImg, computerModel, renderer, scene, camera } = threeRef.current;
    if (!atlasCtx || !baseImg || !baseImg.complete) return;

    // Reset base texture
    atlasCtx.drawImage(baseImg, 0, 0, 2048, 2048);

    const { sx, sy, sw, sh } = SCREEN_BOUNDS;

    // Fill screen area with deep cathode black
    atlasCtx.fillStyle = '#070608';
    atlasCtx.fillRect(sx, sy, sw, sh);

    // Render screen buffer (800x600 virtual resolution)
    const scr = document.createElement('canvas');
    scr.width = 800;
    scr.height = 600;
    const sctx = scr.getContext('2d');

    // Cathode radial gradient
    const rad = sctx.createRadialGradient(400, 300, 80, 400, 300, 460);
    rad.addColorStop(0, '#151014');
    rad.addColorStop(1, '#050406');
    sctx.fillStyle = rad;
    sctx.fillRect(0, 0, 800, 600);

    // CRT Scanlines
    sctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    for (let y = 0; y < 600; y += 4) {
      sctx.fillRect(0, y, 800, 2);
    }

    if (state === 'standby') {
      // Standby state: Idle blinking cursor and minimal energy pulse
      sctx.fillStyle = '#4ade80';
      sctx.font = 'bold 28px monospace';
      sctx.fillText('>', 60, 100);
      sctx.fillRect(85, 80, 16, 26);

      sctx.fillStyle = '#a7a09a';
      sctx.font = '18px monospace';
      sctx.fillText('[STANDBY · CLICK COMPUTER TO INITIALISE]', 60, 540);
    } else if (state === 'booting') {
      // Boot Sequence
      sctx.fillStyle = '#c8102e';
      sctx.fillRect(30, 25, 740, 48);
      sctx.fillStyle = '#ffffff';
      sctx.font = 'bold 24px monospace';
      sctx.fillText('FCIT SYSTEM BIOS v2.6.4 (1998–2026)', 50, 58);

      sctx.fillStyle = '#c49a58';
      sctx.font = 'bold 20px monospace';
      sctx.fillText('CHECKING HARDWARE SUBSYSTEMS...', 45, 120);

      const bootLines = [
        '[OK] CPU INSTRUCTION SET VERIFIED (x86_64)',
        '[OK] SYSTEM MEMORY: 64MB BUFFER ALLOCATED',
        '[OK] REPOSITORY TOPOLOGY LOADED',
        '[OK] NETWORKING MESH ROUTING STABLE',
        '[OK] DEV\'S GUILD TERMINAL SHELL READY',
      ];

      const visibleLines = Math.floor(bootProgress * (bootLines.length + 1));
      sctx.fillStyle = '#4ade80';
      sctx.font = '18px monospace';
      bootLines.slice(0, visibleLines).forEach((line, i) => {
        sctx.fillText(line, 45, 165 + i * 36);
      });

      // Progress bar
      const barY = 400;
      sctx.strokeStyle = '#c8102e';
      sctx.lineWidth = 2;
      sctx.strokeRect(45, barY, 710, 28);
      sctx.fillStyle = '#c8102e';
      sctx.fillRect(48, barY + 3, Math.min(704, 704 * bootProgress), 22);

      sctx.fillStyle = '#f5f0e8';
      sctx.font = 'bold 16px monospace';
      sctx.fillText(`INITIALISING: ${Math.round(bootProgress * 100)}%`, 50, barY + 60);
    } else {
      // Ready State (Full Interactive Terminal)
      // 1. Red Header
      sctx.fillStyle = '#c8102e';
      sctx.fillRect(30, 24, 740, 48);
      sctx.fillStyle = '#ffffff';
      sctx.font = 'bold 22px monospace';
      sctx.fillText('FCIT SYSTEMS // DEV\'S GUILD TERMINAL v2.6', 48, 56);

      // 2. Status banner
      sctx.fillStyle = '#c49a58';
      sctx.font = 'bold 18px monospace';
      sctx.fillText('SYSTEM INITIALISED // ALL CORES NOMINAL', 45, 108);

      sctx.fillStyle = '#4ade80';
      sctx.font = '16px monospace';
      sctx.fillText('[OK] ARCHITECTURE STACK MOUNTED', 45, 138);
      sctx.fillText('[OK] INFRASTRUCTURE PIPELINE ONLINE', 45, 164);

      // 3. Shell prompt
      sctx.fillStyle = '#f5f0e8';
      sctx.font = 'bold 24px monospace';
      sctx.fillText('FCIT@devs-guild:~$', 45, 215);

      // Blinking cursor
      sctx.fillStyle = '#4ade80';
      sctx.fillRect(320, 195, 14, 24);

      // 4. Commands list with active highlight
      const commands = [
        { key: 'run guild.exe', label: '> run guild.exe', desc: 'Execute Guild Overview' },
        { key: 'init systems', label: '> init systems', desc: 'Inspect Technical Domains' },
        { key: 'build projects', label: '> build projects', desc: 'Explore Featured Builds' },
        { key: 'deploy', label: '> deploy', desc: 'View Engineering Pipeline' },
        { key: 'scale', label: '> scale', desc: 'Jump to Scale & Leadership' },
      ];

      commands.forEach((cmd, idx) => {
        const cy = 265 + idx * 56;
        const isCurrent = activeCmd === cmd.key || activeCmd === cmd.label;

        if (isCurrent) {
          sctx.fillStyle = '#c8102e';
          sctx.fillRect(38, cy - 30, 480, 44);
          sctx.fillStyle = '#ffffff';
        } else {
          sctx.fillStyle = '#e5e7eb';
        }
        sctx.font = 'bold 22px monospace';
        sctx.fillText(cmd.label, 52, cy);

        // Subtle description
        if (isCurrent) {
          sctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          sctx.font = '14px monospace';
          sctx.fillText(`[ACTIVE]`, 420, cy);
        }
      });

      // Bottom hint
      sctx.fillStyle = '#a7a09a';
      sctx.font = '15px monospace';
      sctx.fillText('SELECT COMMAND OR USE TERMINAL HUD BELOW', 45, 560);
    }

    // Phosphor glow vignetting
    const edge = sctx.createRadialGradient(400, 300, 220, 400, 300, 440);
    edge.addColorStop(0, 'rgba(200, 16, 46, 0)');
    edge.addColorStop(1, 'rgba(200, 16, 46, 0.16)');
    sctx.fillStyle = edge;
    sctx.fillRect(0, 0, 800, 600);

    // Rotate -90 deg and scale(-1, 1) to match GLB monitor UV mapping
    atlasCtx.save();
    atlasCtx.translate(sx + sw / 2, sy + sh / 2);
    atlasCtx.rotate(-Math.PI / 2);
    atlasCtx.scale(-1, 1);
    atlasCtx.drawImage(scr, -sh / 2, -sw / 2, sh, sw);
    atlasCtx.restore();

    if (atlasTex) {
      atlasTex.needsUpdate = true;
    }
  }, []);

  // Update screen when activeCommand or bootState changes
  useEffect(() => {
    drawScreenToAtlas(bootState, activeCommand);
  }, [activeCommand, bootState, drawScreenToAtlas]);

  // Handle Boot Sequence Animation
  useEffect(() => {
    if (bootState !== 'booting') return;

    let frame = 0;
    const totalFrames = 50;
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(1.0, frame / totalFrames);
      drawScreenToAtlas('booting', activeCommand, progress);

      if (frame >= totalFrames) {
        clearInterval(interval);
        if (onBootComplete) onBootComplete();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [bootState, activeCommand, drawScreenToAtlas, onBootComplete]);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background for seamless blending

    // 2. Camera - positioned to showcase entire CRT workstation including full keyboard & cables
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0.14, 0.28, 1.05);
    camera.lookAt(0, 0.01, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.6);
    keyLight.position.set(2.2, 3.2, 2.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xddf0ff, 1.1);
    fillLight.position.set(-2.0, 1.5, 2.0);
    scene.add(fillLight);

    const redRim1 = new THREE.PointLight(0xc8102e, 6.5, 8);
    redRim1.position.set(-1.8, 1.2, -1.2);
    scene.add(redRim1);

    const redRim2 = new THREE.PointLight(0x9a0d24, 4.5, 8);
    redRim2.position.set(1.5, -0.2, -1.0);
    scene.add(redRim2);

    // 5. Atlas Canvas Texture Setup
    const atlasCanvas = document.createElement('canvas');
    atlasCanvas.width = 2048;
    atlasCanvas.height = 2048;
    const atlasCtx = atlasCanvas.getContext('2d');

    const atlasTex = new THREE.CanvasTexture(atlasCanvas);
    atlasTex.colorSpace = THREE.SRGBColorSpace;
    atlasTex.flipY = false;
    atlasTex.minFilter = THREE.LinearMipmapLinearFilter;
    atlasTex.magFilter = THREE.LinearFilter;

    // Load Base Texture
    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = '/assets/dev-guild/images/devs_diffuse.png';
    baseImg.onload = () => {
      threeRef.current.baseImg = baseImg;
      drawScreenToAtlas(bootState, activeCommand);
    };

    threeRef.current.scene = scene;
    threeRef.current.camera = camera;
    threeRef.current.renderer = renderer;
    threeRef.current.atlasCanvas = atlasCanvas;
    threeRef.current.atlasCtx = atlasCtx;
    threeRef.current.atlasTex = atlasTex;

    // 6. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/assets/dev-guild/models/retro_computer.glb',
      (gltf) => {
        const computerModel = gltf.scene;

        computerModel.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              map: atlasTex,
              roughness: 0.68,
              metalness: 0.12,
            });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Center model in coordinate space
        const box = new THREE.Box3().setFromObject(computerModel);
        const center = box.getCenter(new THREE.Vector3());
        computerModel.position.x = -center.x;
        computerModel.position.y = -center.y;
        computerModel.position.z = -center.z;

        // Default rotation
        computerModel.rotation.y = -0.32;
        computerModel.rotation.x = 0.04;

        scene.add(computerModel);
        threeRef.current.computerModel = computerModel;
        setLoading(false);

        // Trigger initial draw
        drawScreenToAtlas(bootState, activeCommand);
      },
      undefined,
      (err) => {
        console.error('Error loading retro computer GLB:', err);
        setLoadError(err.message);
        setLoading(false);
      }
    );

    // 7. Mouse Parallax Movement
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      threeRef.current.mouseTargetX = x * 0.12; // subtle +/- ~7 deg tilt
      threeRef.current.mouseTargetY = y * 0.08;
    };

    const handleMouseLeave = () => {
      threeRef.current.mouseTargetX = 0;
      threeRef.current.mouseTargetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 8. Animation Loop
    let lastTime = performance.now();
    const animate = (time) => {
      threeRef.current.reqId = requestAnimationFrame(animate);

      if (!threeRef.current.isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const model = threeRef.current.computerModel;
      if (model) {
        // Smooth lerp towards mouse parallax target
        const targetY = -0.32 + threeRef.current.mouseTargetX;
        const targetX = 0.04 - threeRef.current.mouseTargetY;

        model.rotation.y += (targetY - model.rotation.y) * (delta * 4);
        model.rotation.x += (targetX - model.rotation.x) * (delta * 4);
      }

      renderer.render(scene, camera);
    };

    threeRef.current.reqId = requestAnimationFrame(animate);

    // 9. Resize Observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    ro.observe(container);

    // 10. Intersection Observer (Pause rendering when offscreen)
    const io = new IntersectionObserver(([entry]) => {
      threeRef.current.isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    io.observe(container);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(threeRef.current.reqId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      ro.disconnect();
      io.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      atlasTex.dispose();
      scene.clear();
    };
  }, [drawScreenToAtlas]);

  // Click computer to cycle through commands or boot
  const handleContainerClick = () => {
    if (bootState === 'standby') {
      if (onSelectCommand) onSelectCommand('boot');
      return;
    }

    const commandOrder = [
      'run guild.exe',
      'init systems',
      'build projects',
      'deploy',
      'scale',
    ];
    const currentIndex = commandOrder.indexOf(activeCommand);
    const nextCommand = commandOrder[(currentIndex + 1) % commandOrder.length];
    if (onSelectCommand) {
      onSelectCommand(nextCommand);
    }
  };

  return (
    <div
      ref={mountRef}
      className={`retro-computer-3d-wrapper ${className}`}
      onClick={handleContainerClick}
      title="Click retro computer to interact"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '440px',
        cursor: 'pointer',
      }}
    >
      {/* Loading state indicator */}
      {loading && (
        <div className="computer-3d-loader">
          <div className="loader-spinner" />
          <span className="loader-text">INITIALISING 3D WORKSTATION...</span>
        </div>
      )}

      {/* Fallback image if WebGL fails */}
      {loadError && (
        <div className="computer-3d-fallback">
          <img
            src="/assets/dev-guild/images/retro-crt-computer-hero.png"
            alt="Dev's Guild Retro CRT Workstation"
            className="fallback-img"
          />
        </div>
      )}

      {/* Atmospheric Workbench Glow underneath */}
      <div className="computer-shadow-plane" />
    </div>
  );
}
