import { Heart, Info } from 'lucide-react';
import { Button } from './Button';
import { StarRating } from './StarRating';
import { useFavorites } from '../../hooks/useFavorites';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="group">
      <div className="relative mb-6 overflow-hidden bg-gray-100 rounded-lg">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white px-4 py-2 text-xs font-bold uppercase rounded-md">
              New
            </span>
          )}
          {product.discount && (
            <span className="bg-white text-black px-4 py-2 text-xs font-bold uppercase rounded-md">
              -{product.discount}%
            </span>
          )}
        </div>

        <button
          className="absolute top-4 right-4 h-12 w-12 bg-white flex items-center justify-center transition-all duration-300 hover:bg-black hover:text-white rounded-lg"
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-black' : ''}`} />
        </button>
      </div>

      <div>
        <h3 className="font-bold text-black mb-3 uppercase text-sm tracking-wide">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-xl font-bold text-black">
            R$ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 bg-black text-white py-4 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 rounded-lg"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-2 border-black px-5 hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
            onClick={() => onViewDetails(product)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
