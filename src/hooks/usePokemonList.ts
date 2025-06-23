'use client';

import { useEffect, useState } from 'react';
import { getPokemonList, getPokemonByType } from '@/lib/api';

export default function usePokemonList(type: string, search: string) {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            const data = type
                ? await getPokemonByType(type)
                : await getPokemonList();
            setPokemons(data);
        };
        fetchPokemons();
    }, [type]);

    return pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
}
