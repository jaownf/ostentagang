import { useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.has(productId);
  };

  const addToFavorites = (productId: number) => {
    setFavorites((prev) => new Set([...prev, productId]));
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(productId);
      return newFavorites;
    });
  };

  const clearFavorites = () => {
    setFavorites(new Set());
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
  };
};
