'use client';

import { useEffect, useState } from 'react';
import { getPokemonList, getPokemonByType } from '@/lib/api';
import { Pokemon } from '@/types/pokemon';
import { useDebounce } from './useDebounce';

interface UsePokemonListReturn {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

export default function usePokemonList(type: string, search: string): UsePokemonListReturn {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = type
          ? await getPokemonByType(type)
          : await getPokemonList();
        setAllPokemons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemons();
  }, [type]);

  const filteredPokemons = allPokemons.filter(p => 
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return {
    pokemons: filteredPokemons,
    loading,
    error,
  };
}
