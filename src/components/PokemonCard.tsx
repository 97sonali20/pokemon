'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface Pokemon {
  name: string;
  url: string;
}

interface Props {
  pokemon: Pokemon;
  onUnfavorite?: (name: string) => void;
}

export default function PokemonCard({ pokemon, onUnfavorite }: Props) {
  const id = pokemon.url?.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favList = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favList.includes(pokemon.name));
  }, [pokemon.name]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();

    let favList = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favList.includes(pokemon.name)) {
      favList = favList.filter((name: string) => name !== pokemon.name);
      localStorage.setItem('favorites', JSON.stringify(favList));
      setIsFavorite(false);

      // Notify parent if passed
      onUnfavorite?.(pokemon.name);
    } else {
      favList.push(pokemon.name);
      localStorage.setItem('favorites', JSON.stringify(favList));
      setIsFavorite(true);
    }
  };

  return (
    <Link href={`/details/${pokemon.name}`}>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer text-center relative">
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-red-500 hover:scale-110 transition"
        >
          {isFavorite ? <Heart fill="currentColor" /> : <Heart />}
        </button>

        <img src={imageUrl} alt={pokemon.name} className="mx-auto w-24 h-24" />
        <p className="mt-2 capitalize font-medium">{pokemon.name}</p>
      </div>
    </Link>
  );
}
