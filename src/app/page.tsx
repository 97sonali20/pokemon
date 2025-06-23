'use client';

import FavoritesList from '@/components/FavoriteList';
import PokemonCard from '@/components/PokemonCard';
import SearchForm from '@/components/SearchForm';
import usePokemonList from '@/hooks/usePokemonList';
import { getAllTypes } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const pokemons = usePokemonList(type, search);

  useEffect(() => {
    getAllTypes().then(setTypes);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Pokémon Explorer</h1>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          {showFavorites ? 'Back to All' : 'View Favorites ⭐'}
        </button>
      </div>

      <SearchForm
        types={types}
        search={search}
        onSearchChange={setSearch}
        selectedType={type}
        onTypeChange={setType}
      />

      {!showFavorites ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
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
