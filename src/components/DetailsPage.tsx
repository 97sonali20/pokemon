import Breadcrumb from "./BreadCrumb";

async function getPokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.json();
}

export default async function DetailPage({ params }: { params: { name: string } }) {
  const pokemon = await getPokemon(params.name);

  return (
    <div className="space-y-4">
      <Breadcrumb name={pokemon.name} />
      <h1 className="text-4xl capitalize font-bold">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-40 h-40"
      />
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Types:</strong> {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
    </div>
  );
}
