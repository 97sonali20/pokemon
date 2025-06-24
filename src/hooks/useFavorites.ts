'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const addFavorite = (name: string) => {
    const newFavorites = [...favorites, name];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const removeFavorite = (name: string) => {
    const newFavorites = favorites.filter(fav => fav !== name);
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const toggleFavorite = (name: string) => {
    if (favorites.includes(name)) {
      removeFavorite(name);
    } else {
      addFavorite(name);
    }
  };

  const isFavorite = (name: string) => favorites.includes(name);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}