"use client";

import { adjustHSLOpacity, getCSSColor } from "@/utils/colors";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Offset {
  x: number;
  y: number;
}

export const Canvas: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<Offset>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dotSpacing = 25 * zoom;

    const color = getCSSColor("--muted-foreground");
    const adjustedColor = adjustHSLOpacity(color, 0.3);
    ctx.fillStyle = adjustedColor;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const dotRadius = 1.5 * zoom;
    const scaleFactor = 2;

    for (let x = offset.x % dotSpacing; x < canvas.width; x += dotSpacing) {
      for (let y = offset.y % dotSpacing; y < canvas.height; y += dotSpacing) {
        const pixelX = Math.round(x);
        const pixelY = Math.round(y);

        ctx.save();
        ctx.translate(pixelX, pixelY);
        ctx.scale(scaleFactor, scaleFactor);

        ctx.beginPath();
        ctx.arc(0, 0, dotRadius / scaleFactor, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }
  }, [offset, zoom]);

  const handleResize = useCallback(() => {
    if (canvasRef.current && containerRef.current) {
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
      drawCanvas();
    }
  }, [drawCanvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    drawCanvas();
  }, [offset, zoom, drawCanvas]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDragging(true);
    setDragStart({ x: x - offset.x, y: y - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setOffset({
      x: x - dragStart.x,
      y: y - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey) {
      // Zoom
      const zoomFactor = 1 - e.deltaY * 0.001;
      setZoom((prevZoom) => Math.max(0.1, Math.min(5, prevZoom * zoomFactor)));
    } else {
      // Scroll
      setOffset((prevOffset) => ({
        x: prevOffset.x - e.deltaX,
        y: prevOffset.y - e.deltaY,
      }));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${offset.x}px`,
          top: `${offset.y}px`,
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          pointerEvents: "auto",
        }}
        className="w-full"
      >
        {children}
      </div>
    </div>
  );
};
