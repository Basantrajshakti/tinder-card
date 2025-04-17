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

  const resetDeck = () => {
    setCardIndex(0);
    setSwipeDirection(null);
  };

  const visibleCards = products.slice(cardIndex, cardIndex + STACK_SIZE);

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {visibleCards.length > 0 ? (
        visibleCards.map((product, i) => {
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
        })
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-600 text-lg">No more products to swipe!</p>
          <button
            onClick={resetDeck}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition-all"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
