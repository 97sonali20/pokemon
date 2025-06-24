export function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
      <div className="relative">
        <div className="absolute top-0 right-0 w-8 h-8 bg-gray-200 rounded-full"></div>

        <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full"></div>

        <div className="space-y-2 text-center">
          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export function PokemonGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-12 h-4 bg-gray-200 rounded"></div>
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-300 px-8 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-64 h-64 bg-gray-400 rounded-full"></div>
              <div className="flex-1 space-y-4">
                <div className="h-12 bg-gray-400 rounded w-3/4"></div>
                <div className="flex gap-3">
                  <div className="h-8 w-20 bg-gray-400 rounded-full"></div>
                  <div className="h-8 w-16 bg-gray-400 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-16 bg-gray-400 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-16 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, subIndex) => (
                    <div key={subIndex} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}