'use client';

import FavoritesList from '@/components/FavoriteList';
import PokemonCard from '@/components/PokemonCard';
import SearchForm from '@/components/SearchForm';
import usePokemonList from '@/hooks/usePokemonList';
import { getAllTypes } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Star, ArrowLeft } from 'lucide-react'; 
export default function HomePage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const pokemons = usePokemonList(type, search);

  const fetchTypes = async () => {
    try {
      const data = await getAllTypes();
      setTypes(data);
    } catch (error) {
      console.error('Failed to fetch Pokémon types:', error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Pokémon Explorer
        </h1>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition shadow"
        >
          {showFavorites ? (
            <>
              <ArrowLeft className="w-5 h-5" />
              Back to All
            </>
          ) : (
            <>
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-500" />
              View Favorites
            </>
          )}
        </button>
      </div>

      <div className="mb-6">
        <SearchForm
          types={types}
          search={search}
          onSearchChange={setSearch}
          selectedType={type}
          onTypeChange={setType}
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {showFavorites ? '⭐ Your Favorite Pokémon' : '🎯 All Pokémon'}
      </h2>

      {!showFavorites ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <FavoritesList search={search} type={type} />
      )}
    </div>
  );
}
