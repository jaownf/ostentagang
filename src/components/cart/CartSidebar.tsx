import { X, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cartItems, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-96 bg-white z-50 border-l-2 border-black">
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-black uppercase">Cart</h2>
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 flex-1 flex flex-col items-center justify-center">
              <ShoppingCart className="h-20 w-20 text-gray-300 mb-6" />
              <p className="text-gray-600 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-8 mb-10">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-2 border-black p-5 flex gap-5 rounded-xl">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="w-20 h-20 object-cover grayscale rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-black mb-2 text-sm uppercase">{item.name}</h3>
                      <p className="text-black font-bold mb-1">R$ {item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-black pt-8">
                <div className="flex justify-between mb-8">
                  <span className="text-xl font-bold text-black uppercase">Total:</span>
                  <span className="text-2xl font-black text-black">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button className="w-full bg-black text-white py-6 font-bold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 rounded-lg">
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
