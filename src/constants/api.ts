import { config } from '@/lib/config';

export const API_CONFIG = {
  BASE_URL: config.api.baseUrl,
  DEFAULT_LIMIT: config.api.defaultLimit,
  SPRITE_BASE_URL: config.api.spriteBaseUrl,
} as const;

export const ENDPOINTS = {
  POKEMON: '/pokemon',
  TYPES: '/type',
} as const;