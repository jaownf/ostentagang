import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Product } from '../../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-black rounded-xl">
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-black text-black uppercase">{product.name}</h2>
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-80 object-cover grayscale mb-8 rounded-xl"
          />
          <p className="text-gray-700 mb-8 leading-relaxed text-lg font-light">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-black text-black">R$ {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            className="w-full bg-black text-white py-6 font-bold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 rounded-lg"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
