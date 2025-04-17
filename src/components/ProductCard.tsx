import type { Product, SwipeDirection } from "../types";

interface ProductCardProps {
  product: Product;
  swipeDirection: SwipeDirection | null;
}

export default function ProductCard({ product, swipeDirection }: ProductCardProps) {
  return (
    <div
      draggable
      className="relative bg-white rounded-3xl shadow-xl w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[50vw] max-w-md overflow-hidden transition-all duration-300 border border-gray-200 max-h-[90vh] min-h-[400px]"
    >
      {/* Top Left Badge */}
      {swipeDirection === "right" && <div className="absolute top-4 left-4 bg-green-100 text-green-700 font-semibold text-base px-4 py-1 rounded-full shadow z-10">Like</div>}

      {/* Top Right Badge */}
      {swipeDirection === "left" && <div className="absolute top-4 right-4 bg-red-100 text-red-700 font-semibold text-base px-4 py-1 rounded-full shadow z-10">Dislike</div>}

      {/* Bottom Center Badge */}
      {swipeDirection === "up" && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-700 font-semibold text-base px-4 py-1 rounded-full shadow z-10">Add to cart</div>
      )}

      <div className="relative">
        <img src={product.imageUrl} alt={product.name} loading="lazy" className="w-full h-[70vh] object-cover object-center select-none" />
        {product.discountPercentage >= 25 && <span className="absolute bottom-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-l-full animate-pulse shadow-lg">Hot deal</span>}
      </div>
      <div className="p-3 sm:p-3.5 min-h-[100px]">
        <p className="truncate text-base md:text-lg font-semibold capitalize text-gray-800 mb-1 break-words leading-snug">{product.name}</p>
        <p className="text-sm text-gray-500 mb-3 italic">
          by <span className="text-gray-700 font-medium">{product.brand}</span>
        </p>

        <div className="relative gap-x-4 flex items-center">
          {product.originalPrice > product.price && (
            <>
              <span className="text-green-700 font-semibold text-sm md:text-base bg-green-100 px-3 py-1 rounded-full">{product.discountPercentage}% OFF</span>
              <span className="text-sm sm:text-base text-gray-400 line-through">₹{product.originalPrice}</span>
            </>
          )}
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
        </div>
      </div>
    </div>
  );
}
