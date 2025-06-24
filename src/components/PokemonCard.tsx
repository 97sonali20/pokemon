'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ExternalLink } from 'lucide-react';
import { Pokemon } from '@/types/pokemon';
import { API_CONFIG } from '@/constants/api';
import { useFavorites } from '@/hooks/useFavorites';

interface Props {
  pokemon: Pokemon;
  onUnfavorite?: (name: string) => void;
  variant?: 'default' | 'compact';
}

export default function PokemonCard({ pokemon, onUnfavorite, variant = 'default' }: Props) {
  const id = pokemon.url?.split('/').filter(Boolean).pop();
  const imageUrl = `${API_CONFIG.SPRITE_BASE_URL}/${id}.png`;
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const { isFavorite, toggleFavorite } = useFavorites();
  const pokemonIsFavorite = isFavorite(pokemon.name);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemon.name);

    if (pokemonIsFavorite) {
      onUnfavorite?.(pokemon.name);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  if (variant === 'compact') {
    return (
      <Link href={`/details/${pokemon.name}`}>
        <div className="group bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200 cursor-pointer overflow-hidden card-shadow hover:card-shadow-lg">
          <div className="flex items-center p-4 gap-4">
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg">
              {imageLoading && (
                <div className="absolute inset-0 skeleton rounded-lg" />
              )}
              {!imageError ? (
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className="w-full h-full object-contain"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                  N/A
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 capitalize truncate">
                {pokemon.name}
              </h3>
              <p className="text-sm text-gray-500">
                #{id?.padStart(3, '0')}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-lg transition-colors ${pokemonIsFavorite
                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                aria-label={pokemonIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={16} fill={pokemonIsFavorite ? 'currentColor' : 'none'} />
              </button>

              <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/details/${pokemon.name}`}>
      <article className="group bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200 cursor-pointer overflow-hidden card-shadow hover:card-shadow-lg hover:-translate-y-1">
        <div className="relative">
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${pokemonIsFavorite
                ? 'text-red-500 bg-white/90 shadow-sm hover:scale-110'
                : 'text-gray-400 bg-white/70 hover:text-red-500 hover:bg-white/90 hover:scale-110'
              }`}
            aria-label={pokemonIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={18} fill={pokemonIsFavorite ? 'currentColor' : 'none'} />
          </button>

          <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            {imageLoading && (
              <div className="absolute inset-0 skeleton" />
            )}
            {!imageError ? (
              <img
                src={imageUrl}
                alt={pokemon.name}
                className="w-32 h-32 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}

            <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600">
              #{id?.padStart(3, '0')}
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 capitalize mb-1 group-hover:text-blue-600 transition-colors">
            {pokemon.name}
          </h3>
          <p className="text-sm text-gray-500">
            Click to view details
          </p>
        </div>

        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </article>
    </Link>
  );
}
