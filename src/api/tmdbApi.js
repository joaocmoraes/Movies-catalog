// src/api/tmdbApi.js (VERSÃO CORRIGIDA PARA RESOLVER ERROS DE IMPORTAÇÃO)

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// --- CONSTANTES DE URL DE IMAGEM ---
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; 
export const LARGE_IMAGE_URL_BASE = 'https://image.tmdb.org/t/p/w1280';
export const ACTOR_IMAGE_URL = 'https://image.tmdb.org/t/p/w185'; 
export const HERO_BACKDROP_URL = 'https://image.tmdb.org/t/p/original';
// -----------------------------------


/**
 * Função genérica para buscar dados da API do TMDB.
 * @param {string} endpoint - O caminho da API (ex: '/movie/popular').
 * @returns {Promise<Object>} Os dados JSON retornados pela API.
 */
const basicFetch = async (endpoint) => {
    try {
        if (!API_KEY) {
            console.error("ERRO TMDB: API Key não carregada. Verifique seu arquivo .env.");
            return {};
        }

        const separator = endpoint.includes('?') ? '&' : '?';
        const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=pt-BR`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Erro ao buscar ${endpoint}: Status ${response.status}`);
            return {};
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro no basicFetch:", error);
        return {};
    }
};

// Endpoints do TMDB organizados em um objeto para exportação default
const tmdb = {
    // === FUNÇÃO GENÉRICA ADICIONADA PARA O RowList (SOLUÇÃO do erro .get is not a function) ===
    /**
     * Função genérica para buscar qualquer endpoint, usada pelo RowList.
     * @param {string} url - O endpoint completo, ex: '/movie/popular'
     */
    get: async (url) => basicFetch(url),
    // =================================================

    // === Funções para a Home Page (Carrosséis) ===
    getPopularMovies: async () => basicFetch('/movie/popular'),
    getPopularTV: async () => basicFetch('/tv/popular'),
    getTopRated: async () => basicFetch('/movie/top_rated'),

    // === Funções de Busca (SOLUÇÃO do erro .searchMulti is not a function) ===
    /**
     * Busca Filmes, Séries e Pessoas simultaneamente.
     */
    searchMulti: async (query) => {
        return basicFetch(`/search/multi?query=${encodeURIComponent(query)}`);
    },


    // === Funções para a Página de Detalhes (DetailsPage) ===
    getDetails: async (mediaType, id) => basicFetch(`/${mediaType}/${id}`),
    getCredits: async (mediaType, id) => basicFetch(`/${mediaType}/${id}/credits`),
    getKeywords: async (mediaType, id) => basicFetch(`/${mediaType}/${id}/keywords`),
    getWatchProviders: async (mediaType, id) => {
        return basicFetch(`/${mediaType}/${id}/watch/providers`);
    },
    getRecommendations: async (mediaType, id) => basicFetch(`/${mediaType}/${id}/recommendations`),
    getVideos: async (mediaType, id) => basicFetch(`/${mediaType}/${id}/videos`),
};

export default tmdb;