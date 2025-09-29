import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Star, Heart, ShoppingCart, X } from 'lucide-react'

function ProductModal({ isOpen, onClose, product, addToCart, toggleFavorite, isFavorite, renderStars }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  if (!product) return null

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor, selecione um tamanho e uma cor.')
      return
    }
    addToCart({ ...product, selectedSize, selectedColor })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-950 text-white p-0 border-none">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.discount && (
              <Badge variant="destructive" className="absolute top-3 left-3 bg-red-500 text-white text-lg px-3 py-1">-{product.discount}%</Badge>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'} />
            </Button>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-4xl font-bold text-white">{product.name}</DialogTitle>
                <div className="flex items-center mt-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-400 ml-2">({product.reviews} avaliações)</span>
                </div>
              </DialogHeader>

              <p className="text-gray-300 mb-6 text-lg">{product.description}</p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-bold text-purple-400">R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Tamanho:</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map(size => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'default' : 'outline'}
                        className={`rounded-full px-5 py-2 text-lg ${selectedSize === size ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Cor:</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map(color => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? 'default' : 'outline'}
                        className={`rounded-full px-5 py-2 text-lg ${selectedColor === color ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-xl"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-6 w-6 mr-3" /> Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal

