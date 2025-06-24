import { Pokemon, PokemonType, ApiResponse, TypeResponse } from '@/types/pokemon';
import { API_CONFIG, ENDPOINTS } from '@/constants/api';

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new ApiError(`Failed to fetch: ${res.statusText}`, res.status);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred');
  }
}

export async function getAllTypes(): Promise<PokemonType[]> {
  const data = await fetchWithErrorHandling<ApiResponse<PokemonType>>(
    `${API_CONFIG.BASE_URL}${ENDPOINTS.TYPES}`
  );
  return data.results;
}

export async function getPokemonList(limit = API_CONFIG.DEFAULT_LIMIT): Promise<Pokemon[]> {
  const data = await fetchWithErrorHandling<ApiResponse<Pokemon>>(
    `${API_CONFIG.BASE_URL}${ENDPOINTS.POKEMON}?limit=${limit}`
  );
  return data.results;
}

export async function getPokemonByType(type: string): Promise<Pokemon[]> {
  const data = await fetchWithErrorHandling<TypeResponse>(
    `${API_CONFIG.BASE_URL}${ENDPOINTS.TYPES}/${type}`
  );
  return data.pokemon.map((p) => p.pokemon);
}
