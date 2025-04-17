import { useState } from "react";
import { Product, SwipeDirection } from "../types";
import SwipeCard from "./SwipeCard";

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

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {products.length > cardIndex && (
        <SwipeCard key={products[cardIndex].id} product={products[cardIndex]} onSwipe={handleSwipe} setSwipeDirection={setSwipeDirection} swipeDirection={swipeDirection} />
      )}
    </div>
  );
}
