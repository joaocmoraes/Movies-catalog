// src/pages/BrowsePage.js
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import GridList from '../components/GridList'; // Componente a ser criado

const API_PATH_MAP = {
    // Filmes
    'movie_popular': '/movie/popular',
    'movie_top_rated': '/movie/top_rated',
    'movie_now_playing': '/movie/now_playing',
    'movie_upcoming': '/movie/upcoming',
    // Séries
    'tv_popular': '/tv/popular',
    'tv_top_rated': '/tv/top_rated',
    'tv_airing_today': '/tv/airing_today',
    'tv_on_the_air': '/tv/on_the_air',
};

function BrowsePage() {
    const [searchParams] = useSearchParams();
    
    // Lê os parâmetros da URL: /browse?type=movie&category=popular
    const mediaType = searchParams.get('type') || 'movie'; 
    const category = searchParams.get('category') || 'popular'; 
    
    const key = `${mediaType}_${category}`;
    const fetchUrl = API_PATH_MAP[key];

    if (!fetchUrl) {
        return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>
            Selecione uma categoria no menu Filmes/Séries.
        </div>;
    }

    // Título dinâmico
    const pageTitle = `${mediaType === 'movie' ? 'Filmes' : 'Séries'} - ${category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;

    return (
        <div style={{ backgroundColor: '#141414', minHeight: '100vh', padding: '20px 40px' }}>
            <h1 style={{ color: 'white', marginTop: '70px' }}>{pageTitle}</h1>
            
            {/* O GridList fará a busca, exibição (9 cards/coluna) e paginação */}
            <GridList 
                key={fetchUrl} // Usa a URL como chave para forçar a atualização
                fetchUrl={fetchUrl} 
                mediaType={mediaType} 
            />
        </div>
    );
}

export default BrowsePage;