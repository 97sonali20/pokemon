'use client';

import { useEffect, useState } from 'react';
import { getPokemonList } from '@/lib/api';
import PokemonCard from './PokemonCard';

interface Props {
  search: string;
  type: string;
}

export default function FavoritesList({ search }: Props) {
  const [pokemons, setPokemons] = useState<any[]>([]);

  const loadFavorites = async () => {
    const favNames = JSON.parse(localStorage.getItem('favorites') || '[]');
    const all = await getPokemonList();
    const favData = all.filter((p) => favNames.includes(p.name));
    setPokemons(favData);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleUnfavorite = (name: string) => {
    setPokemons((prev) => prev.filter((p) => p.name !== name));

    const updated = JSON.parse(localStorage.getItem('favorites') || '[]').filter(
      (fav: string) => fav !== name
    );
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {filtered.length === 0 ? (
        <p className="text-gray-600 mt-6">No matching favorites found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {filtered.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              onUnfavorite={handleUnfavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}
