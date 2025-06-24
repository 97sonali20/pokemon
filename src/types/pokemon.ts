export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  sprites: {
    front_default: string;
    back_default?: string;
    front_shiny?: string;
    back_shiny?: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny?: string;
      };
      dream_world?: {
        front_default?: string;
      };
      home?: {
        front_default?: string;
        front_shiny?: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
}

export interface ApiResponse<T> {
  results: T[];
  count?: number;
  next?: string;
  previous?: string;
}

export interface TypeResponse {
  pokemon: Array<{
    pokemon: Pokemon;
  }>;
}