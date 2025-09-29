import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet.jsx'
import { Button } from '@/components/ui/button.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { X, Minus, Plus, ShoppingCart, Truck, CreditCard } from 'lucide-react'

function Cart({ isOpen, onClose, cartItems, setCartItems }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      const updatedItems = prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      ).filter(item => item.quantity > 0)
      return updatedItems
    })
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const total = calculateTotal()
  const shippingThreshold = 200.00 // Example: Free shipping over R$200
  const freeShipping = total >= shippingThreshold
  const shippingProgress = (total / shippingThreshold) * 100

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full md:w-[400px] bg-gray-950 text-white flex flex-col">
        <SheetHeader className="border-b border-gray-800 pb-4">
          <SheetTitle className="text-2xl font-bold text-white">Seu Carrinho</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-gray-400">
            <ShoppingCart className="h-24 w-24 mb-4" />
            <p className="text-xl font-semibold">Seu carrinho está vazio.</p>
            <Button onClick={onClose} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-4">
              <div className="space-y-6 py-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 border-b border-gray-800 pb-4 last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border border-gray-800" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-purple-400">R$ {item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-7 w-7 text-gray-300 border-gray-700 hover:bg-gray-800" onClick={() => updateQuantity(item.id, -1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-medium">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7 text-gray-300 border-gray-700 hover:bg-gray-800" onClick={() => updateQuantity(item.id, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-auto text-red-500 hover:bg-gray-800" onClick={() => removeItem(item.id)}>
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-gray-800 pt-6 mt-auto">
              <div className="mb-4">
                {freeShipping ? (
                  <p className="text-green-500 font-semibold text-center flex items-center justify-center gap-2">
                    <Truck className="h-5 w-5" /> Seu pedido tem frete grátis!
                  </p>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">Faltam R$ {(shippingThreshold - total).toFixed(2)} para frete grátis!</p>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(shippingProgress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xl font-bold mb-4">
                <span>Total:</span>
                <span className="text-purple-400">R$ {total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg mb-3">
                <CreditCard className="h-5 w-5 mr-2" /> Finalizar Compra
              </Button>
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800" onClick={onClose}>
                Continuar Comprando
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart

