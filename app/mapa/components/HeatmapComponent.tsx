'use client';

import { useEffect, useRef, memo } from 'react';
import { PokemonLocation } from '../types';

interface HeatmapComponentProps {
  data: PokemonLocation[];
}

function HeatmapComponent({ data }: HeatmapComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpa o canvas de forma mais eficiente
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Log for debugging
    console.log('HeatmapComponent rendered with data:', data);

    // Usa requestAnimationFrame para melhor performance
    const drawHeatmap = () => {
      // Desenha o heatmap para cada localização
      data.forEach(pokemon => {
        pokemon.locations.forEach(loc => {
          const gradient = ctx.createRadialGradient(loc.x, loc.y, 0, loc.x, loc.y, 10);
          gradient.addColorStop(0, 'rgba(255, 20, 147, 0.5)'); // Pink com 50% de opacidade
          gradient.addColorStop(1, 'rgba(255, 20, 147, 0)'); // Pink transparente

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(loc.x, loc.y, 10, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    };

    requestAnimationFrame(drawHeatmap);
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={1680}
      height={3815}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }} // Melhora performance
    />
  );
}

// Memoize o componente para evitar re-renders desnecessários
export default memo(HeatmapComponent);
