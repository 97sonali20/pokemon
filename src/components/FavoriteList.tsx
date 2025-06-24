'use client';

import { useEffect, useState, useCallback } from 'react';
import { getPokemonList } from '@/lib/api';
import { Pokemon } from '@/types/pokemon';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, Grid, List, SortAsc, SortDesc, HeartCrack, Lightbulb, Search } from 'lucide-react';
import PokemonCard from './PokemonCard';
import { PokemonGridSkeleton } from './LoadingSkeleton';

interface Props {
  search?: string;
}

export default function FavoritesList({ search = '' }: Props) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const { favorites } = useFavorites();

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const all = await getPokemonList();
      const favData = all.filter((p) => favorites.includes(p.name));
      setPokemons(favData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    if (favorites.length > 0) {
      loadFavorites();
    } else {
      setPokemons([]);
      setLoading(false);
    }
  }, [favorites, loadFavorites]);

  const handleUnfavorite = (name: string) => {
    setPokemons((prev) => prev.filter((p) => p.name !== name));
  };

  const filtered = pokemons
    .filter((p) => search ? p.name.toLowerCase().includes(search.toLowerCase()) : true)
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });


  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Loading your favorites</h3>
            <p className="text-gray-500">Gathering your Pokemon collection...</p>
          </div>
        </div>
        <PokemonGridSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <span className="text-2xl text-red-500"><HeartCrack /></span>
        </div>
        <h3 className="text-lg font-semibold text-red-600 mb-2">Failed to load favorites</h3>
        <p className="text-gray-600 mb-4 max-w-md mx-auto">{error}</p>
        <button 
          onClick={loadFavorites}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
          <Heart className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No favorites yet</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Start building your collection by clicking the heart icon on Pokemon you love!
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <span className="text-yellow-500"><Lightbulb /></span>
          <span>Tip: Browse all Pokemon to find your favorites</span>
        </div>
      </div>
    );
  }

  if (filtered.length === 0 && search) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <span className="text-2xl"><Search/></span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No matching favorites</h3>
        <p className="text-gray-600 mb-4">
          No favorites match your search for &ldquo;{search}&rdquo;
        </p>
        <p className="text-sm text-gray-500">
          You have {favorites.length} favorite{favorites.length !== 1 ? 's' : ''} total
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 min-h-[400px]">
      <div className="p-6 space-y-6">
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {filtered.length} favorite{filtered.length !== 1 ? 's' : ''}
              </h2>
              {search && (
                <p className="text-sm text-gray-500">
                  Filtered from {pokemons.length} total favoritesz``
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Grid view"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="List view"
              >
                <List size={16} />
              </button>
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="inline-flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
              A-Z
            </button>
          </div>
          </div>
        </div>

      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
          : "space-y-3"
      }>
        {filtered.map((pokemon, index) => (
          <div
            key={pokemon.name}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            <PokemonCard
              pokemon={pokemon}
              onUnfavorite={handleUnfavorite}
              variant={viewMode === 'list' ? 'compact' : 'default'}
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
