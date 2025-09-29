import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { X, Plus, Minus, ShoppingBag, Trash2, Truck, Shield, CreditCard } from 'lucide-react'

export default function Cart({ isOpen, onClose, items, onUpdateQuantity }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const freeShippingThreshold = 199
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simular processo de checkout
    setTimeout(() => {
      setIsCheckingOut(false)
      alert('Pedido realizado com sucesso! 🎉')
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 p-6">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Carrinho</h2>
              {totalItems > 0 && (
                <Badge className="bg-purple-600">{totalItems}</Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Carrinho vazio</h3>
                <p className="text-gray-400 mb-6">
                  Adicione alguns produtos incríveis ao seu carrinho
                </p>
                <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-2 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-purple-400 font-semibold">
                            R$ {item.price.toFixed(2)}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-gray-600"
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-gray-600"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              onClick={() => onUpdateQuantity(item.id, 0)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-800 p-6 space-y-4">
              {/* Free Shipping Progress */}
              {remainingForFreeShipping > 0 ? (
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">
                      Faltam R$ {remainingForFreeShipping.toFixed(2)} para frete grátis
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/20 p-3 rounded-lg">
                  <Truck className="h-4 w-4" />
                  <span>Parabéns! Você ganhou frete grátis!</span>
                </div>
              )}
              
              {/* Security Info */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="h-4 w-4 text-blue-400" />
                <span>Compra 100% segura e protegida</span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between text-lg font-semibold border-t border-gray-800 pt-4">
                <span>Total:</span>
                <span className="text-purple-400">R$ {total.toFixed(2)}</span>
              </div>
              
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {isCheckingOut ? 'Processando...' : 'Finalizar Compra'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={onClose}
              >
                Continuar Comprando
              </Button>

              {/* Payment Methods */}
              <div className="text-center pt-2">
                <p className="text-xs text-gray-500 mb-2">Formas de pagamento</p>
                <div className="flex justify-center gap-2">
                  <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-xs text-white flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-red-700 rounded text-xs text-white flex items-center justify-center font-bold">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-gradient-to-r from-green-600 to-green-700 rounded text-xs text-white flex items-center justify-center font-bold">
                    PIX
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
