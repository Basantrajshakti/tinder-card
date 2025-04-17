export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
}

export type SwipeDirection = "left" | "right" | "up";

export interface SwipeableCardProps {
  product: Product;
  onSwipe: (dir: SwipeDirection, id: number) => void;
  setSwipeDirection: Dispatch<SetStateAction<SwipeDirection | null>>;
  swipeDirection: SwipeDirection | null;
}
