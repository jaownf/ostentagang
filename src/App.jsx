import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Search, ShoppingCart, User, Menu, X, Star, Heart, Filter, 
  Zap, TrendingUp, Award, ArrowRight, ChevronDown, Instagram, 
  Twitter, Facebook, Mail, Phone, MapPin, Truck, Shield, 
  RotateCcw, CreditCard, Play, Users, Target, Sparkles
} from 'lucide-react'
import Cart from './components/Cart.jsx'
import ProductModal from './components/ProductModal.jsx'
import './App.css'

// Import new assets
import logo from './assets/bannerinicial.png'
import heroImage from './assets/bannerinicial.png'
import product1 from './assets/Banner-foto-desert.png'
import product2 from './assets/Banner-foto-desert.png'
import product3 from './assets/Banner-foto-desert.png'
import product4 from './assets/Banner-foto-desert.png'
import product5 from './assets/jaqueta-bomber-1.jpg'
import product6 from './assets/tenis-streetwear-1.jpg'
import product7 from './assets/bone-streetwear-1.jpg'
import product8 from './assets/camiseta-oversized-1.jpg'
import product9 from './assets/moletom-streetwear-1.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState('home')

  const categories = [
    { id: 'todos', name: 'Todos', count: 150 },
    { id: 'camisetas', name: 'Camisetas', count: 65 },
    { id: 'hoodies', name: 'Hoodies', count: 42 },
    { id: 'calcas', name: 'Calças', count: 28 },
    { id: 'jaquetas', name: 'Jaquetas', count: 15 }
  ]

  const products = [
    {
      id: 1,
      name: 'Camiseta Minimalista Premium',
      price: 89.90,
      originalPrice: 129.90,
      image: product1,
      category: 'camisetas',
      rating: 4.8,
      reviews: 124,
      isNew: true,
      discount: 31,
      description: 'Camiseta oversized com design minimalista e tecido premium de alta qualidade.',
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Preto', 'Branco', 'Cinza']
    },
    {
      id: 2,
      name: 'Camiseta Gradient Purple',
      price: 99.90,
      originalPrice: 149.90,
      image: product2,
      category: 'camisetas',
      rating: 4.9,
      reviews: 89,
      isNew: false,
      discount: 33,
      description: 'Camiseta com estampa gradient exclusiva em tons de roxo.',
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Branco', 'Off-White']
    },
    {
      id: 3,
      name: 'Hoodie Streetwear Premium',
      price: 199.90,
      originalPrice: 299.90,
      image: product3,
      category: 'hoodies',
      rating: 4.7,
      reviews: 156,
      isNew: false,
      discount: 33,
      description: 'Moletom com capuz oversized, perfeito para o estilo urbano.',
      sizes: ['P', 'M', 'G', 'GG', 'XG'],
      colors: ['Roxo', 'Preto', 'Cinza']
    },
    {
      id: 4,
      name: 'Calça Cargo Tactical',
      price: 159.90,
      originalPrice: 219.90,
      image: product4,
      category: 'calcas',
      rating: 4.6,
      reviews: 92,
      isNew: true,
      discount: 27,
      description: 'Calça cargo com múltiplos bolsos e design funcional.',
      sizes: ['36', '38', '40', '42', '44'],
      colors: ['Preto', 'Verde Militar', 'Bege']
    },
    {
      id: 5,
      name: 'Jaqueta Bomber Purple',
      price: 249.90,
      originalPrice: 349.90,
      image: product5,
      category: 'jaquetas',
      rating: 4.8,
      reviews: 67,
      isNew: false,
      discount: 29,
      description: 'Jaqueta bomber com detalhes em roxo e acabamento premium.',
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Preto/Roxo', 'Preto/Branco']
    },
    {
      id: 6,
      name: 'Tênis Streetwear Elite',
      price: 299.90,
      originalPrice: 399.90,
      image: product6,
      category: 'calcados',
      rating: 4.9,
      reviews: 203,
      isNew: true,
      discount: 25,
      description: 'Tênis premium com design exclusivo e máximo conforto.',
      sizes: ['37', '38', '39', '40', '41', '42', '43'],
      colors: ['Preto/Roxo', 'Branco/Roxo']
    },
    {
      id: 7,
      name: 'Boné Snapback Premium',
      price: 79.90,
      originalPrice: 99.90,
      image: product7,
      category: 'acessorios',
      rating: 4.5,
      reviews: 78,
      isNew: false,
      discount: 20,
      description: 'Boné snapback com logo bordado e ajuste perfeito.',
      sizes: ['Único'],
      colors: ['Preto', 'Branco', 'Cinza']
    },
    {
      id: 8,
      name: 'Camiseta Urban Purple',
      price: 109.90,
      originalPrice: 159.90,
      image: product8,
      category: 'camisetas',
      rating: 4.7,
      reviews: 134,
      isNew: true,
      discount: 31,
      description: 'Camiseta oversized com estampa urbana exclusiva.',
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Roxo', 'Preto']
    },
    {
      id: 9,
      name: 'Moletom Essential Gray',
      price: 179.90,
      originalPrice: 249.90,
      image: product9,
      category: 'hoodies',
      rating: 4.8,
      reviews: 167,
      isNew: false,
      discount: 28,
      description: 'Moletom básico premium com corte moderno.',
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Cinza', 'Preto', 'Branco']
    }
  ]

  const collections = [
    {
      id: 1,
      name: 'Urban Essentials',
      description: 'Peças básicas com design moderno para o dia a dia urbano',
      image: product1,
      itemCount: 24
    },
    {
      id: 2,
      name: 'Purple Dreams',
      description: 'Coleção exclusiva em tons de roxo e gradientes',
      image: product2,
      itemCount: 18
    },
    {
      id: 3,
      name: 'Street Elite',
      description: 'Peças premium para quem busca exclusividade',
      image: product3,
      itemCount: 32
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Carlos Silva',
      avatar: '👨🏻',
      rating: 5,
      comment: 'Qualidade excepcional! As roupas são exatamente como nas fotos e o tecido é premium.',
      product: 'Hoodie Streetwear Premium'
    },
    {
      id: 2,
      name: 'Ana Costa',
      avatar: '👩🏻',
      rating: 5,
      comment: 'Entrega super rápida e produto perfeito. Já é minha segunda compra!',
      product: 'Camiseta Gradient Purple'
    },
    {
      id: 3,
      name: 'Pedro Santos',
      avatar: '👨🏽',
      rating: 5,
      comment: 'Design incrível e caimento perfeito. Recomendo demais!',
      product: 'Jaqueta Bomber Purple'
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  const HomePage = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            OSTENTA GANG
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            A revolução do streetwear brasileiro. Estilo, qualidade e atitude em cada peça.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              onClick={() => setCurrentPage('produtos')}
            >
              <Zap className="h-5 w-5 mr-2" />
              Explorar Coleção
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
              onClick={() => setCurrentPage('sobre')}
            >
              Nossa História
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por que escolher a OstentaGang?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Mais que roupas, oferecemos uma experiência completa de estilo e qualidade
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tendências Exclusivas</h3>
              <p className="text-gray-400">
                Sempre à frente das tendências com designs únicos e inovadores que definem o streetwear brasileiro
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Qualidade Premium</h3>
              <p className="text-gray-400">
                Materiais selecionados e acabamento impecável em cada peça, garantindo durabilidade e conforto
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Entrega Rápida</h3>
              <p className="text-gray-400">
                Receba seus produtos com agilidade e segurança em todo o Brasil
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nossas Coleções</h2>
            <p className="text-gray-400 text-lg">
              Descubra as coleções que definem o streetwear moderno
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map(collection => (
              <Card key={collection.id} className="bg-gray-900 border-gray-800 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                    <p className="text-gray-300 text-sm mb-2">{collection.description}</p>
                    <p className="text-purple-400 text-sm">{collection.itemCount} peças</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-gray-400 text-lg">
              Mais de 10.000 clientes satisfeitos em todo o Brasil
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="bg-gray-800 border-gray-700 p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">"{testimonial.comment}"</p>
                  <p className="text-purple-400 text-sm">{testimonial.product}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Fique por Dentro</h2>
          <p className="text-xl mb-8 text-purple-100">
            Receba as últimas novidades, lançamentos exclusivos e ofertas especiais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Seu melhor e-mail" 
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="bg-white text-purple-900 hover:bg-gray-100">
              <Mail className="h-4 w-4 mr-2" />
              Inscrever
            </Button>
          </div>
        </div>
      </section>
    </div>
  )

  const ProdutosPage = () => (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Nossos Produtos</h1>
          <p className="text-gray-400 text-lg">
            Descubra nossa coleção completa de streetwear premium
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-600 hover:bg-green-700">Novo</Badge>
                  )}
                  {product.discount && (
                    <Badge className="bg-red-600 hover:bg-red-700">-{product.discount}%</Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-3 right-3 h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                  />
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-purple-400">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => openProductModal(product)}
                  >
                    Ver
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const SobrePage = () => (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nossa História
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            A OstentaGang nasceu da paixão pelo streetwear e da vontade de criar algo único no cenário brasileiro
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Nossa Missão</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Democratizar o acesso ao streetwear de qualidade no Brasil, oferecendo peças exclusivas 
                que combinam estilo urbano, conforto e durabilidade. Acreditamos que a moda é uma forma 
                de expressão pessoal e queremos empoderar nossos clientes a mostrarem sua personalidade 
                através do que vestem.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Cada peça é cuidadosamente desenvolvida pensando no jovem brasileiro que busca se destacar 
                com autenticidade e atitude.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">10K+</div>
                  <div className="text-purple-200">Clientes Satisfeitos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">150+</div>
                  <div className="text-purple-200">Produtos Únicos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">5</div>
                  <div className="text-purple-200">Anos de Experiência</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">4.8★</div>
                  <div className="text-purple-200">Avaliação Média</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Comunidade</h3>
              <p className="text-gray-400">
                Mais que uma marca, somos uma comunidade de pessoas que compartilham a paixão pelo streetwear
              </p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <Target className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Qualidade</h3>
              <p className="text-gray-400">
                Compromisso com a excelência em cada detalhe, desde a escolha dos tecidos até o acabamento final
              </p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Inovação</h3>
              <p className="text-gray-400">
                Sempre buscando novas formas de surpreender com designs únicos e tendências exclusivas
              </p>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Autenticidade</h3>
                <p className="text-gray-300 mb-4">
                  Acreditamos na importância de ser verdadeiro consigo mesmo. Nossas peças são criadas 
                  para pessoas que não têm medo de se expressar.
                </p>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Sustentabilidade</h3>
                <p className="text-gray-300">
                  Comprometidos com práticas responsáveis, buscamos sempre materiais e processos 
                  que respeitem o meio ambiente.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Inclusividade</h3>
                <p className="text-gray-300 mb-4">
                  Moda para todos, sem distinção. Nossos produtos são pensados para celebrar 
                  a diversidade e a individualidade de cada pessoa.
                </p>
                <h3 className="text-xl font-bold mb-3 text-purple-400">Excelência</h3>
                <p className="text-gray-300">
                  Nunca nos contentamos com o mediano. Buscamos constantemente superar expectativas 
                  e entregar o melhor para nossos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ContatoPage = () => (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Fale Conosco
          </h1>
          <p className="text-xl text-gray-300">
            Estamos aqui para ajudar você. Entre em contato conosco!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
              <p className="text-gray-300 mb-8">
                Nossa equipe está sempre pronta para atender você da melhor forma possível. 
                Escolha o canal que preferir para falar conosco.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-gray-400">(11) 99999-9999</p>
                  <p className="text-sm text-gray-500">Segunda a Sexta, 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">E-mail</h3>
                  <p className="text-gray-400">contato@ostentagang.com.br</p>
                  <p className="text-sm text-gray-500">Resposta em até 24h</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p className="text-gray-400">Rua da Moda, 123 - Vila Madalena</p>
                  <p className="text-gray-400">São Paulo - SP, 05433-000</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Siga-nos nas Redes Sociais</h3>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-800">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-800">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-800">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <Input 
                    placeholder="Seu nome completo"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <Input 
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Assunto</label>
                <Input 
                  placeholder="Como podemos ajudar?"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mensagem</label>
                <textarea 
                  rows={5}
                  placeholder="Descreva sua dúvida ou sugestão..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="font-bold mb-3 text-purple-400">Como funciona a troca e devolução?</h3>
                <p className="text-gray-300 text-sm">
                  Você tem até 30 dias para trocar ou devolver produtos em perfeito estado. 
                  O frete de devolução é por nossa conta.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="font-bold mb-3 text-purple-400">Qual o prazo de entrega?</h3>
                <p className="text-gray-300 text-sm">
                  Entregamos em todo o Brasil. O prazo varia de 3 a 10 dias úteis, 
                  dependendo da sua localização.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="font-bold mb-3 text-purple-400">Como escolher o tamanho certo?</h3>
                <p className="text-gray-300 text-sm">
                  Temos uma tabela de medidas detalhada em cada produto. 
                  Em caso de dúvida, nossa equipe pode ajudar.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="font-bold mb-3 text-purple-400">Quais formas de pagamento aceitas?</h3>
                <p className="text-gray-300 text-sm">
                  Aceitamos cartão de crédito, débito, PIX e boleto bancário. 
                  Parcelamos em até 12x sem juros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch(currentPage) {
      case 'produtos':
        return <ProdutosPage />
      case 'sobre':
        return <SobrePage />
      case 'contato':
        return <ContatoPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img src={logo} alt="OstentaGang" className="h-8 w-auto mr-3" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                OstentaGang
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`hover:text-purple-400 transition-colors ${currentPage === 'home' ? 'text-purple-400' : 'text-white'}`}
              >
                Início
              </button>
              <button 
                onClick={() => setCurrentPage('produtos')}
                className={`hover:text-purple-400 transition-colors ${currentPage === 'produtos' ? 'text-purple-400' : 'text-white'}`}
              >
                Produtos
              </button>
              <button 
                onClick={() => setCurrentPage('sobre')}
                className={`hover:text-purple-400 transition-colors ${currentPage === 'sobre' ? 'text-purple-400' : 'text-white'}`}
              >
                Sobre
              </button>
              <button 
                onClick={() => setCurrentPage('contato')}
                className={`hover:text-purple-400 transition-colors ${currentPage === 'contato' ? 'text-purple-400' : 'text-white'}`}
              >
                Contato
              </button>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {currentPage === 'produtos' && (
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="relative text-white hover:text-purple-400"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-purple-600 to-pink-600">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-purple-400"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-800 py-4">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => { setCurrentPage('home'); setIsMenuOpen(false) }}
                  className="text-left hover:text-purple-400 transition-colors"
                >
                  Início
                </button>
                <button 
                  onClick={() => { setCurrentPage('produtos'); setIsMenuOpen(false) }}
                  className="text-left hover:text-purple-400 transition-colors"
                >
                  Produtos
                </button>
                <button 
                  onClick={() => { setCurrentPage('sobre'); setIsMenuOpen(false) }}
                  className="text-left hover:text-purple-400 transition-colors"
                >
                  Sobre
                </button>
                <button 
                  onClick={() => { setCurrentPage('contato'); setIsMenuOpen(false) }}
                  className="text-left hover:text-purple-400 transition-colors"
                >
                  Contato
                </button>
                {currentPage === 'produtos' && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar produtos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      {renderPage()}

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src={logo} alt="OstentaGang" className="h-8 w-auto mr-3" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  OstentaGang
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                A revolução do streetwear brasileiro. Estilo, qualidade e atitude em cada peça.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setCurrentPage('produtos')} className="hover:text-white">Camisetas</button></li>
                <li><button onClick={() => setCurrentPage('produtos')} className="hover:text-white">Hoodies</button></li>
                <li><button onClick={() => setCurrentPage('produtos')} className="hover:text-white">Calças</button></li>
                <li><button onClick={() => setCurrentPage('produtos')} className="hover:text-white">Jaquetas</button></li>
                <li><button onClick={() => setCurrentPage('produtos')} className="hover:text-white">Acessórios</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setCurrentPage('sobre')} className="hover:text-white">Sobre Nós</button></li>
                <li><button onClick={() => setCurrentPage('contato')} className="hover:text-white">Contato</button></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
                <li><a href="#" className="hover:text-white">Imprensa</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-white">Guia de Tamanhos</a></li>
                <li><a href="#" className="hover:text-white">Rastreamento</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 OstentaGang. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Truck className="h-4 w-4" />
                <span>Frete Grátis</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <RotateCcw className="h-4 w-4" />
                <span>30 Dias para Troca</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Component */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, quantity) => {
          if (quantity === 0) {
            setCartItems(prev => prev.filter(item => item.id !== id))
          } else {
            setCartItems(prev => prev.map(item => 
              item.id === id ? { ...item, quantity } : item
            ))
          }
        }}
      />

      {/* Product Modal */}
      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
      />
    </div>
  )
}

export default App
