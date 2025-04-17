import gsap from "gsap";
import { useEffect, useRef } from "react";
import { SwipeableCardProps } from "../types";
import ProductCard from "./ProductCard";

const SwipeCard: React.FC<SwipeableCardProps> = ({ product, onSwipe, setSwipeDirection, swipeDirection, isTop, index }) => {

  const cardRef = useRef<HTMLDivElement | null>(null);
  const start = useRef<{ x: number; y: number; id: number | null }>({
    x: 0,
    y: 0,
    id: null,
  });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isTop) return;

    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      start.current = { x: touch.clientX, y: touch.clientY, id: product.id };
    };

    const handleDragStart = (e: DragEvent) => {
      start.current.id = product.id;
      start.current = { x: e.clientX, y: e.clientY, id: product.id };
      e.dataTransfer?.setDragImage(new Image(), 0, 0);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (start.current.id !== product.id) return;

      const touch = e.touches[0];
      if (touch.clientX === 0 && touch.clientY === 0) return;

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

    const handleDrag = async (e: DragEvent) => {
      if (e.clientX === 0 && e.clientY === 0) return;
      if (start.current.id !== product.id) return;

      pos.current = {
        x: e.clientX - start.current.x,
        y: e.clientY - start.current.y,
      };

      const { x, y } = pos.current;
      gsap.to(card, { x, y, rotation: x / 20 });

      if (x > 40) setSwipeDirection("right");
      else if (x < -40) setSwipeDirection("left");
      else if (y < -40) setSwipeDirection("up");
      else setSwipeDirection(null);
    };

    const handleTouchEnd = async () => {
      const { x, y } = pos.current;
      const threshold = 80;

      if (x > threshold) {
        gsap.to(card, {
          x: 300,
          opacity: 0,
          duration: 0.3,
          scale: 0.7,
          onComplete: () => onSwipe("right", product.id),
        });
      } else if (x < -threshold) {
        gsap.to(card, {
          x: -300,
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

    const handleDragEnd = () => {
      handleTouchEnd();
    };

    card.addEventListener("touchstart", handleTouchStart);
    card.addEventListener("touchmove", handleTouchMove);
    card.addEventListener("touchend", handleTouchEnd);

    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("drag", handleDrag);
    card.addEventListener("dragend", handleDragEnd);

    return () => {
      card.removeEventListener("touchstart", handleTouchStart);
      card.removeEventListener("touchmove", handleTouchMove);
      card.removeEventListener("touchend", handleTouchEnd);

      card.removeEventListener("dragstart", handleDragStart);
      card.removeEventListener("drag", handleDrag);
      card.removeEventListener("dragend", handleDragEnd);
    };
  }, [isTop, product, onSwipe, setSwipeDirection]);

  return (
    <div
      ref={cardRef}
      className={`absolute cursor-grab touch-none select-none`}
      style={{
        zIndex: 100 - index,
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
      }}
      draggable={isTop}
    >
      <ProductCard product={product} swipeDirection={swipeDirection} />
    </div>
  );
};

export default SwipeCard;
