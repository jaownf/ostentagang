import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartSidebar } from './components/cart/CartSidebar';
import { ProductModal } from './components/product/ProductModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { useCart } from './hooks/useCart';
import type { Page, Product } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const { addToCart } = useCart();

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleProductModalClose = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'produtos':
        return (
          <ProductsPage
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProduct}
          />
        );
      case 'sobre':
        return <AboutPage />;
      case 'contato':
        return <ContactPage />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-body">
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onCartOpen={handleCartOpen}
      />

      <main className="pt-24">{renderPage()}</main>

      <Footer onPageChange={handlePageChange} />

      <CartSidebar isOpen={isCartOpen} onClose={handleCartClose} />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleProductModalClose}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
