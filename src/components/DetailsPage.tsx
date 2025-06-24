import Breadcrumb from "./BreadCrumb";
import PokemonFavoriteButton from "./PokemonFavoriteButton";
import { PokemonDetails } from "@/types/pokemon";
import { API_CONFIG, ENDPOINTS } from "@/constants/api";

async function getPokemon(name: string): Promise<PokemonDetails> {
  const res = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.POKEMON}/${name}`);
  if (!res.ok) throw new Error('Failed to fetch Pokemon data');
  return res.json();
}

interface DetailPageProps {
  params: { name: string };
}

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  return colors[type] || 'bg-gray-400';
};



export default async function DetailPage({ params }: DetailPageProps) {
  const pokemon = await getPokemon(params.name);
  const pokemonId = pokemon.id.toString().padStart(3, '0');

  const formatStat = (name: string) => {
    const map: { [key: string]: string } = {
      hp: "HP", attack: "Attack", defense: "Defense", speed: "Speed"
    };
    return map[name] || name;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: pokemon.name }
          ]}
        />
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <PokemonFavoriteButton pokemonName={pokemon.name} variant="floating" />
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              <div className="relative flex-shrink-0">
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-white/20 rounded-full p-3 sm:p-4 backdrop-blur-sm">
                  <img
                    src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 text-yellow-900 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                  #{pokemonId}
                </div>
              </div>

              <div className="text-center lg:text-left flex-1 w-full">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold capitalize mb-3 sm:mb-4 drop-shadow-lg">
                  {pokemon.name}
                </h1>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-4 sm:mb-6">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base lg:text-lg capitalize ${getTypeColor(type.type.name)} shadow-lg`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Stats</h2>
          <div className="space-y-2">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex justify-between">
                <span>{formatStat(stat.stat.name)}</span>
                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Abilities</h2>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name} className="capitalize">{a.ability.name.replace("-", " ")}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Moves (First 10)</h2>
          <ul className="list-disc list-inside">
            {pokemon.moves.slice(0, 10).map((m) => (
              <li key={m.move.name} className="capitalize">{m.move.name.replace("-", " ")}</li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  );
}
