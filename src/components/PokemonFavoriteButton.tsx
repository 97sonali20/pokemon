'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface PokemonFavoriteButtonProps {
  pokemonName: string;
  variant?: 'default' | 'floating';
}

export default function PokemonFavoriteButton({ pokemonName, variant = 'default' }: PokemonFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const pokemonIsFavorite = isFavorite(pokemonName);

  const handleToggleFavorite = () => {
    toggleFavorite(pokemonName);
  };

  if (variant === 'floating') {
    return (
      <button
        onClick={handleToggleFavorite}
        className={`p-2.5 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 ${
          pokemonIsFavorite
            ? 'bg-red-500 text-white shadow-lg hover:bg-red-600'
            : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white shadow-lg'
        }`}
        title={pokemonIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          className={`w-5 h-5 sm:w-6 sm:h-6 ${pokemonIsFavorite ? 'fill-current' : ''}`} 
        />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
        pokemonIsFavorite
          ? 'bg-red-50 text-red-700 border-2 border-red-200 hover:bg-red-100'
          : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:border-red-200 hover:text-red-600'
      }`}
      title={pokemonIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`w-4 h-4 sm:w-5 sm:h-5 ${pokemonIsFavorite ? 'fill-current' : ''}`} 
      />
      <span className="hidden sm:inline">
        {pokemonIsFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </span>
      <span className="sm:hidden">
        {pokemonIsFavorite ? 'Remove' : 'Add'}
      </span>
    </button>
  );
}