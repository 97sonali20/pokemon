function getEnvVar(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

function getEnvVarNumber(key: string, fallback: number): number {
  const value = process.env[key];
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

function getEnvVarBoolean(key: string, fallback: boolean): boolean {
  const value = process.env[key];
  if (!value) return fallback;
  return value.toLowerCase() === 'true';
}

export const config = {
  api: {
    baseUrl: getEnvVar('NEXT_PUBLIC_POKEMON_API_BASE_URL', 'https://pokeapi.co/api/v2'),
    spriteBaseUrl: getEnvVar('NEXT_PUBLIC_POKEMON_SPRITE_BASE_URL', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'),
    defaultLimit: getEnvVarNumber('NEXT_PUBLIC_DEFAULT_POKEMON_LIMIT', 151),
    cacheDuration: getEnvVarNumber('NEXT_PUBLIC_CACHE_DURATION', 3600),
  },

  app: {
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Pokemon Explorer'),
    version: getEnvVar('NEXT_PUBLIC_APP_VERSION', '1.0.0'),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
  },

  features: {
    analytics: getEnvVarBoolean('NEXT_PUBLIC_ENABLE_ANALYTICS', false),
    errorReporting: getEnvVarBoolean('NEXT_PUBLIC_ENABLE_ERROR_REPORTING', false),
    debugMode: getEnvVarBoolean('NEXT_PUBLIC_DEBUG_MODE', false),
    verboseLogging: getEnvVarBoolean('NEXT_PUBLIC_VERBOSE_LOGGING', false),
  },

  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

export type Config = typeof config;
export type ApiConfig = typeof config.api;
export type AppConfig = typeof config.app;
export type FeatureFlags = typeof config.features;