'use client';

import PokemonCard from '@/components/PokemonCard';
import SearchForm from '@/components/SearchForm';
import usePokemonList from '@/hooks/usePokemonList';
import { getAllTypes } from '@/lib/api';
import { PokemonType } from '@/types/pokemon';
import { useEffect, useState } from 'react';
import { Grid, List, Search, SortAsc, SortDesc, Squirrel, TriangleAlert } from 'lucide-react';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [typesError, setTypesError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const primaryType = selectedTypes.length > 0 ? selectedTypes[0] : '';
  const { pokemons: rawPokemons, loading, error } = usePokemonList(primaryType, search);

  const pokemons = rawPokemons.sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const fetchTypes = async () => {
    try {
      setTypesError(null);
      const data = await getAllTypes();
      setTypes(data);
    } catch (error) {
      setTypesError(error instanceof Error ? error.message : 'Failed to fetch types');
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">

      <div className="mb-8">
        {typesError ? (
          <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl"><TriangleAlert /></span>
            </div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Failed to load filters</h3>
            <p className="text-gray-600 mb-4">Unable to load Pokemon types for filtering</p>
            <button
              onClick={fetchTypes}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        ) : (
          <SearchForm
            types={types}
            search={search}
            onSearchChange={setSearch}
            selectedTypes={selectedTypes}
            onTypesChange={setSelectedTypes}
          />
        )}
      </div>

      {!loading && !error && (
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{pokemons.length}</div>
                  <div className="text-sm text-gray-500">Pokemon Found</div>
                </div>
                {selectedTypes.length > 0 && (
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {selectedTypes.length === 1
                        ? selectedTypes[0]
                        : `${selectedTypes.length} types`
                      }
                    </div>
                    <div className="text-sm text-gray-500">Type Filter{selectedTypes.length > 1 ? 's' : ''}</div>
                  </div>
                )}
                {search && (
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">&ldquo;{search}&rdquo;</div>
                    <div className="text-sm text-gray-500">Search Query</div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">

                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    title="Grid view"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    title="List view"
                  >
                    <List size={16} />
                  </button>
                </div>

                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="inline-flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                  A-Z
                </button>

                {(selectedTypes.length > 0 || search) && (
                  <button
                    onClick={() => {
                      setSelectedTypes([]);
                      setSearch('');
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 min-h-[400px]">
        {loading && (
          <div className="p-6">
            <div className="text-center py-8 mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Loading Pokemon</h3>
              <p className="text-gray-500">Discovering amazing creatures...</p>
            </div>

            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                : "space-y-3"
            }>
              {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  {viewMode === 'grid' ? (
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="flex items-center p-4 gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-red-600 text-2xl"><Squirrel /></span>
            </div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Failed to load Pokemon</h3>
            <p className="text-gray-600 text-center max-w-md mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="p-6">
            {pokemons.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl"><Search /></span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Pokemon found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                  : "space-y-3"
              }>
                {pokemons.map((pokemon, index) => (
                  <div
                    key={pokemon.name}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 0.02}s` }}
                  >
                    <PokemonCard
                      pokemon={pokemon}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
