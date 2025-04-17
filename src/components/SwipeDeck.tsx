import { useState } from "react";
import { Product, SwipeDirection } from "../types";
import SwipeCard from "./SwipeCard";

const STACK_SIZE = 3;

export default function SwipeDeck({ products }: { products: Product[] }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null);

  const handleSwipe = (dir: SwipeDirection, id: number) => {
    if (dir === "right") console.log("Liked Product ID:", id);
    else if (dir === "left") console.log("Passed Product ID:", id);
    else if (dir === "up") console.log("Add to cart Product ID:", id);
    setSwipeDirection(null);
    setCardIndex((prev) => prev + 1);
  };

  const visibleCards = products.slice(cardIndex, cardIndex + STACK_SIZE);

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {visibleCards.map((product, i) => {
        const isTop = i === 0;

        return (
          <SwipeCard
            key={product.id}
            product={product}
            onSwipe={handleSwipe}
            setSwipeDirection={setSwipeDirection}
            swipeDirection={isTop ? swipeDirection : null}
            isTop={isTop}
            index={i}
          />
        );
      })}
    </div>
  );
}
