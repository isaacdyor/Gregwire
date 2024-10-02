"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface Offset {
  x: number;
  y: number;
}

interface CanvasElement {
  id: string;
  component: React.ReactNode;
  position: Offset;
}

interface CanvasProps {
  elements: CanvasElement[];
}

export const Canvas: React.FC<CanvasProps> = ({ elements }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<Offset>({ x: 0, y: 0 });

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dotSpacing = 25;
    ctx.fillStyle = "rgba(200, 200, 200, 0.5)";

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the dot grid
    for (let x = offset.x % dotSpacing; x < canvas.width; x += dotSpacing) {
      for (let y = offset.y % dotSpacing; y < canvas.height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw some text to show movement
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(
      `Offset: (${offset.x.toFixed(2)}, ${offset.y.toFixed(2)})`,
      10,
      20,
    );
  }, [offset]);

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
  }, [offset, drawCanvas]);

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
      {elements.map((element) => (
        <div
          key={element.id}
          style={{
            position: "absolute",
            left: `${element.position.x + offset.x}px`,
            top: `${element.position.y + offset.y}px`,
            pointerEvents: "auto",
          }}
        >
          {element.component}
        </div>
      ))}
    </div>
  );
};
