import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ui/ProductCard';
import { categories, products } from '../data/mockData';
import type { Product, SortOption } from '../types';

interface ProductsPageProps {
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductsPage = ({ onAddToCart, onViewDetails }: ProductsPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'preco-asc':
          return a.price - b.price;
        case 'preco-desc':
          return b.price - a.price;
        case 'popularidade':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-black tracking-tight">
            Shop
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Discover our complete streetwear collection
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-20 space-y-10">
          <div className="flex flex-wrap gap-6 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-lg ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6">
            <label className="text-sm text-black font-bold uppercase">Sort by:</label>
            <select
              className="bg-white border-2 border-black py-4 px-8 text-sm font-bold uppercase rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="relevancia">Relevance</option>
              <option value="preco-asc">Price: Low to High</option>
              <option value="preco-desc">Price: High to Low</option>
              <option value="popularidade">Popularity</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
