export async function getAllTypes() {
    const res = await fetch('https://pokeapi.co/api/v2/type');
    const data = await res.json();
    return data.results;
}

export async function getPokemonList(limit = 151) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await res.json();
    return data.results;
}

export async function getPokemonByType(type: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();
    return data.pokemon.map((p: any) => p.pokemon);
}
