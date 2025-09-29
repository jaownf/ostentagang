import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { X, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react'

export default function ProductModal({ product, isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Preto')
  const [quantity, setQuantity] = useState(1)

  if (!isOpen || !product) return null

  const sizes = ['PP', 'P', 'M', 'G', 'GG', 'XG']
  const colors = ['Preto', 'Branco', 'Cinza', 'Azul']

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Detalhes do Produto</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <Badge className="absolute top-4 left-4 bg-green-500">
                    Novo
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-red-500">
                    -{product.discount}%
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-16 bg-black/50 hover:bg-black/70"
                  onClick={() => onToggleFavorite(product.id)}
                >
                  <Heart 
                    className={`h-5 w-5 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                    }`} 
                  />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-600'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400 ml-2">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-purple-400">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-3">Tamanho</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`${
                        selectedSize === size 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : "border-gray-600 text-gray-300 hover:bg-gray-800"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Cor</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      className={`${
                        selectedColor === color 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : "border-gray-600 text-gray-300 hover:bg-gray-800"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantidade</h3>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho - R$ {(product.price * quantity).toFixed(2)}
              </Button>

              {/* Product Features */}
              <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-800">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Frete grátis para todo o Brasil</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Troca grátis em até 30 dias</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <span className="text-sm">Compra 100% segura e protegida</span>
                </div>
              </div>

              {/* Product Description */}
              <div className="pt-6 border-t border-gray-800">
                <h3 className="font-semibold mb-3">Descrição</h3>
                <p className="text-gray-300 leading-relaxed">
                  Peça exclusiva da coleção OstentaGang, confeccionada com materiais de alta qualidade 
                  para garantir conforto e durabilidade. Design moderno e urbano que combina com qualquer 
                  ocasião. Ideal para quem busca estilo e personalidade no guarda-roupa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
