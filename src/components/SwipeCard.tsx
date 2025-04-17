import React, { useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import gsap from "gsap";
import { SwipeableCardProps } from "../types";

const SwipeCard: React.FC<SwipeableCardProps> = ({ product, onSwipe, setSwipeDirection }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const start = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      start.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      pos.current = {
        x: touch.clientX - start.current.x,
        y: touch.clientY - start.current.y,
      };

      const { x, y } = pos.current;
      gsap.to(card, { x, y, rotation: x / 10 });

      if (x > 40) setSwipeDirection("right");
      else if (x < -40) setSwipeDirection("left");
      else if (y < -40) setSwipeDirection("up");
      else setSwipeDirection(null);
    };

    const handleTouchEnd = () => {
      const { x, y } = pos.current;
      const threshold = 150;

      if (x > threshold) {
        gsap.to(card, {
          x: window.innerWidth,
          opacity: 0,
          duration: 0.3,
          scale: 0.7,
          onComplete: () => onSwipe("right", product.id),
        });
      } else if (x < -threshold) {
        gsap.to(card, {
          x: -window.innerWidth,
          opacity: 0,
          duration: 0.3,
          scale: 0.7,
          onComplete: () => onSwipe("left", product.id),
        });
      } else if (y < -threshold) {
        gsap.to(card, {
          y: -window.innerHeight / 2,
          opacity: 0,
          duration: 0.3,
          scale: 0.7,
          onComplete: () => onSwipe("up", product.id),
        });
      } else {
        gsap.to(card, { x: 0, y: 0, rotation: 0 });
        setSwipeDirection(null);
      }
    };

    card.addEventListener("touchstart", handleTouchStart);
    card.addEventListener("touchmove", handleTouchMove);
    card.addEventListener("touchend", handleTouchEnd);

    return () => {
      card.removeEventListener("touchstart", handleTouchStart);
      card.removeEventListener("touchmove", handleTouchMove);
      card.removeEventListener("touchend", handleTouchEnd);
    };
  }, [product, onSwipe, setSwipeDirection]);

  return (
    <div ref={cardRef} className="absolute cursor-grab touch-none select-none">
      <ProductCard product={product} />
    </div>
  );
};

export default SwipeCard;
