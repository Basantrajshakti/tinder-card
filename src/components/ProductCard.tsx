import { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[50vw] max-w-md overflow-hidden transition-all duration-300 border border-gray-200">
      <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover" />
      <div className="p-5">
        <h2 className="text-2xl font-semibold capitalize text-gray-800 mb-1 break-words">{product.name}</h2>
        <p className="text-sm text-gray-500 mb-3">By {product.brand}</p>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-black">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-green-600 font-semibold text-base">{product.discountPercentage}% off</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
