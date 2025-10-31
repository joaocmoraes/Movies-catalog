import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdb from '../api/tmdbApi';
import Thumbnail from '../components/Thumbnail';
import styles from './SearchPage.module.css'; 

// Função Pura: Extrai a lógica complexa de filtragem e mapeamento
const processResults = (dataResults) => {
    if (!dataResults) return [];

    return dataResults
        .filter(item => {
            const isValidType = item.media_type === 'movie' || item.media_type === 'tv';
            const hasPoster = item.poster_path;

            return isValidType && hasPoster;
        })
        .map(item => ({
            ...item,
            title: item.title || item.name
        }));
};


function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Usa useCallback para otimizar e ter certeza que não muda a cada render
    const fetchResults = useCallback(async () => {
        if (!query) {
            setResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const data = await tmdb.searchMulti(query);
            
            // Chama a função pura para processar os dados
            const filteredResults = processResults(data.results); 

            setResults(filteredResults);
        } catch (error) {
            console.error("Erro ao buscar resultados:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        fetchResults();
    }, [fetchResults]); // Chama quando a função fetchResults muda 


    // Renderização 
    const renderContent = () => {
        if (loading) {
            return <p className={styles.loadingMessage}>Carregando resultados...</p>;
        }

        if (results.length === 0 && query) {
            return (
                <p className={styles.noResultsMessage}>
                    Não encontramos filmes ou séries que correspondam à sua busca.
                </p>
            );
        }

        if (results.length > 0) {
            return (
                <div className={styles.resultsGrid}>
                    {results.map(item => (
                        <Thumbnail
                            key={`${item.media_type}-${item.id}`}
                            item={item}
                        />
                    ))}
                </div>
            );
        }
        return null; // Não renderiza nada se não houver query
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>
                Resultados para "{query || ''}"
            </h1>

            {renderContent()}
        </div>
    );
}

export default SearchPage;
