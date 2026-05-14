
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // LOCK pixel ratio to 1 (Dramatic iPhone performance boost)
    const deviceRatio = 1;

    // Optimization flags
    const isMobile = window.innerWidth < 768;

    // A realistic number for smooth animation
    const particleCount = isMobile ? 12 : 70;

    // NO connections on mobile (huge performance win)
    const enableConnections = !isMobile;
    const connectionDist = 120;
    const connectionDistSq = connectionDist * connectionDist;

    // Pre-cached colors
    const colors = [
      "rgba(67,81,81,0.05)",
      "rgba(77,145,124,0.4)",
      "rgba(19,75,72,0.4)",
    ];

    let particles: Particle[] = [];
    let animationFrameId: number;
    let lastTimestamp = 0;

    // Avoid animation when tab not visible
    let isTabActive = true;
    document.addEventListener("visibilitychange", () => {
      isTabActive = !document.hidden;
    });

    const setCanvasSize = () => {
      canvas.width = window.innerWidth * deviceRatio;
      canvas.height = window.innerHeight * deviceRatio;
      ctx.scale(deviceRatio, deviceRatio);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (isMobile ? 1.5 : 3) + 1.5,
          speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6),
          speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6),
          opacity: Math.random() * 0.4 + 0.3,
          color: colors[(Math.random() * colors.length) | 0],
        });
      }
    };

    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();

    const animate = (timestamp: number) => {
      // Skip frames when inactive or throttling
      if (!isTabActive || timestamp - lastTimestamp < (isMobile ? 50 : 16)) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTimestamp = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // MAIN LOOP
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap safely (no if/else chain)
        if (p.x > canvas.width) p.x = 0;
        else if (p.x < 0) p.x = canvas.width;

        if (p.y > canvas.height) p.y = 0;
        else if (p.y < 0) p.y = canvas.height;

        // Draw particle
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Skip connections on mobile
        if (!enableConnections) continue;

        // Draw lines — optimized
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const alpha = 0.15 * (1 - distSq / connectionDistSq);

            ctx.strokeStyle = `rgba(34,193,195,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
