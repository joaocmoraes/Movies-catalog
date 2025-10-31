

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// --- CONSTANTES DE URL DE IMAGEM ---
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; 
export const LARGE_IMAGE_URL_BASE = 'https://image.tmdb.org/t/p/w1280';
export const ACTOR_IMAGE_URL = 'https://image.tmdb.org/t/p/w185'; 
export const HERO_BACKDROP_URL = 'https://image.tmdb.org/t/p/original';
// -----------------------------------



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
    get: async (url) => basicFetch(url),
    getPopularMovies: async () => basicFetch('/movie/popular'),
    getPopularTV: async () => basicFetch('/tv/popular'),
    getTopRated: async () => basicFetch('/movie/top_rated'),
    
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
