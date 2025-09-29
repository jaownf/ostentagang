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
import logo from './assets/logo.svg'
import heroImage from './assets/hero-streetwear.jpg'
import product1 from './assets/camiseta-premium-1.jpg'
import product2 from './assets/camiseta-premium-2.jpg'
import product3 from './assets/hoodie-streetwear-1.jpg'
import product4 from './assets/calca-cargo-1.jpg'
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
          <p className="text-gray-400 text-lg">Descubra nossa coleção completa de streetwear premium</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`rounded-full px-5 py-2 ${selectedCategory === category.id ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="bg-gray-900 border-gray-800 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isNew && (
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-green-500 text-white">Novo</Badge>
                )}
                {product.discount && (
                  <Badge variant="destructive" className="absolute top-3 right-3 bg-red-500 text-white">-{product.discount}%</Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-3 right-12 text-gray-300 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(product.id)
                  }}
                >
                  <Heart className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-300'} />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-400 ml-2">({product.reviews})</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-purple-400">R$ {product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Adicionar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      openProductModal(product)
                    }}
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

  const AboutPage = () => (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Nossa História</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-gray-300 mb-4">
              A OstentaGang nasceu da paixão pelo streetwear e da vontade de criar algo único no cenário brasileiro. 
              Acreditamos que a moda é uma forma de expressão pessoal e queremos empoderar nossos clientes a 
              mostrarem sua personalidade através do que vestem. Cada peça é cuidadosamente desenvolvida 
              pensando no jovem brasileiro que busca se destacar com autenticidade e atitude.
            </p>
            <p className="text-lg text-gray-300">
              Desde 2020, temos construído uma comunidade forte e leal, sempre buscando inovar e oferecer 
              produtos de alta qualidade que reflitam as últimas tendências globais do streetwear, adaptadas 
              para o estilo e a cultura do Brasil.
            </p>
          </div>
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg shadow-purple">
            <img 
              src={heroImage} 
              alt="Nossa História OstentaGang"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Play className="h-16 w-16 text-white/80 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-8 text-center">Nossa Missão</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-900 border-gray-800 p-6 text-center glass-dark">
            <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comunidade</h3>
            <p className="text-gray-300">Construir uma comunidade onde a paixão pelo streetwear une as pessoas.</p>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-6 text-center glass-dark">
            <Target className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Qualidade</h3>
            <p className="text-gray-300">Oferecer produtos com excelência em materiais e acabamento.</p>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-6 text-center glass-dark">
            <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Inovação</h3>
            <p className="text-gray-300">Estar sempre à frente, trazendo as últimas tendências e designs exclusivos.</p>
          </Card>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center glass-dark">
          <h2 className="text-4xl font-bold mb-4">Nossos Números</h2>
          <p className="text-gray-400 text-lg mb-8">Conheça um pouco mais sobre o nosso impacto</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-5xl font-bold text-purple-400">10K+</p>
              <p className="text-gray-300">Clientes Satisfeitos</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-pink-400">150+</p>
              <p className="text-gray-300">Produtos Únicos</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-yellow-400">5</p>
              <p className="text-gray-300">Anos de Experiência</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-green-400">4.8★</p>
              <p className="text-gray-300">Avaliação Média</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ContactPage = () => (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Fale Conosco</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-300 mb-6">
              Tem alguma dúvida, sugestão ou precisa de ajuda? Entre em contato conosco! 
              Nossa equipe está pronta para te atender e garantir a melhor experiência OstentaGang.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-purple-400 mr-4" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-300">contato@ostentagang.com.br</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-pink-400 mr-4" />
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-gray-300">(11) 98765-4321</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-yellow-400 mr-4" />
                <div>
                  <p className="font-semibold">Endereço</p>
                  <p className="text-gray-300">Rua do Estilo, 123 - São Paulo, SP</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">Siga-nos nas Redes Sociais</h3>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Instagram className="h-8 w-8" /></a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors"><Twitter className="h-8 w-8" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Facebook className="h-8 w-8" /></a>
              </div>
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800 p-8 glass-dark">
            <h3 className="text-2xl font-bold mb-6">Envie sua Mensagem</h3>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Nome Completo</label>
                <Input 
                  id="name" 
                  placeholder="Seu nome"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu.email@example.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Mensagem</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  placeholder="Sua mensagem..."
                  className="flex h-24 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="OstentaGang Logo" className="h-8 mr-3" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">OstentaGang</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Button variant="link" className="text-white hover:text-purple-400" onClick={() => setCurrentPage('home')}>Início</Button>
            <Button variant="link" className="text-white hover:text-purple-400" onClick={() => setCurrentPage('produtos')}>Produtos</Button>
            <Button variant="link" className="text-white hover:text-purple-400" onClick={() => setCurrentPage('sobre')}>Sobre</Button>
            <Button variant="link" className="text-white hover:text-purple-400" onClick={() => setCurrentPage('contato')}>Contato</Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Input 
                placeholder="Buscar produtos..." 
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentPage('produtos')
                  }
                }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItems.length}</span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <User className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg py-4 px-4">
            <div className="flex flex-col gap-3">
              <Button variant="link" className="text-white hover:text-purple-400" onClick={() => { setCurrentPage('home'); setIsMenuOpen(false) }}>Início</Button>
              <Button variant="link" className="text-white hover:text-purple-400" onClick={() => { setCurrentPage('produtos'); setIsMenuOpen(false) }}>Produtos</Button>
              <Button variant="link" className="text-white hover:text-purple-400" onClick={() => { setCurrentPage('sobre'); setIsMenuOpen(false) }}>Sobre</Button>
              <Button variant="link" className="text-white hover:text-purple-400" onClick={() => { setCurrentPage('contato'); setIsMenuOpen(false) }}>Contato</Button>
              <div className="relative">
                <Input 
                  placeholder="Buscar produtos..." 
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setCurrentPage('produtos')
                      setIsMenuOpen(false)
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="pt-16">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'produtos' && <ProdutosPage />}
        {currentPage === 'sobre' && <AboutPage />}
        {currentPage === 'contato' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={logo} alt="OstentaGang Logo" className="h-7 mr-2" />
              <span className="text-xl font-bold text-white">OstentaGang</span>
            </div>
            <p className="text-sm">A revolução do streetwear brasileiro. Estilo, qualidade e atitude em cada peça.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-6 w-6" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><a href="#" onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#" onClick={() => setCurrentPage('produtos')} className="hover:text-white transition-colors">Produtos</a></li>
              <li><a href="#" onClick={() => setCurrentPage('sobre')} className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#" onClick={() => setCurrentPage('contato')} className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2">
              <li>Email: contato@ostentagang.com.br</li>
              <li>Telefone: (11) 98765-4321</li>
              <li>Endereço: Rua do Estilo, 123 - São Paulo, SP</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10 text-sm">
          &copy; {new Date().getFullYear()} OstentaGang. Todos os direitos reservados.
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        setCartItems={setCartItems}
      />

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        addToCart={addToCart}
        toggleFavorite={toggleFavorite}
        isFavorite={selectedProduct ? favorites.has(selectedProduct.id) : false}
        renderStars={renderStars}
      />
    </div>
  )
}

export default App

