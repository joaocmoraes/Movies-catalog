import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../api/tmdbApi';
import Thumbnail from '../components/Thumbnail';
import DetailsHero from '../components/DetailsHero'; 
import DetailsSidebar from '../components/DetailsSidebar';
import CastList from '../components/CastList';
import styles from './DetailsPage.module.css';

// Constantes globais (exportadas para DetailsHero, DetailsSidebar e CastList)
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; 
export const LARGE_IMAGE_URL_BASE = 'https://image.tmdb.org/t/p/w1280';
export const ACTOR_IMAGE_URL = 'https://image.tmdb.org/t/p/w185';
export const PROVIDER_LOGO_URL_BASE = 'https://image.tmdb.org/t/p/original';


function DetailsPage() {
    const { mediaType, id } = useParams();
    const [details, setDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [keywords, setKeywords] = useState(null);
    const [recommendations, setRecommendations] = useState(null);
    const [providers, setProviders] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllDetails() {
            try {
                setLoading(true);
                const [detailsData, creditsData, keywordsData, recommendationsData, providersData] = await Promise.all([
                    tmdb.getDetails(mediaType, id),
                    tmdb.getCredits(mediaType, id),
                    tmdb.getKeywords(mediaType, id),
                    tmdb.getRecommendations(mediaType, id),
                    tmdb.getWatchProviders(mediaType, id)
                ]);

                setDetails(detailsData);
                setCredits(creditsData);
                setKeywords(keywordsData);
                setRecommendations(recommendationsData);
                setProviders(providersData.results?.['BR'] || null); 

            } catch (error) {
                console.error("Erro ao buscar todos os detalhes:", error);
            } finally {
                setLoading(false);
            }
        }
        if (mediaType && id) {
            fetchAllDetails();
        }
    }, [mediaType, id]);

    if (loading) return <div className={styles.loading}>Carregando Detalhes...</div>;
    if (!details || !details.id) return <div className={styles.error}>Erro: Não foi possível carregar o conteúdo.</div>;

    // Formatação dos Dados para os filhos
    const cast = credits?.cast?.slice(0, 10) || [];
    const keywordsList = keywords?.keywords || keywords?.results || [];
    const recommendationsList = recommendations?.results?.map(item => ({
        ...item,
        media_type: item.media_type || mediaType
    })) || [];
    
    return (
        <div className={styles.pageContainer}>

            {/* 1. HERO SECTION */}
            <DetailsHero details={details} credits={credits} />

            {/* 2. CONTEÚDO PRINCIPAL (Layout de 2 Colunas) */}
            <div className={styles.mainLayout}>

                {/* COLUNA DA ESQUERDA (Elenco, Recomendações) */}
                <div className={styles.leftColumn}>

                    {/* Elenco Principal */}
                    <CastList cast={cast} />

                    {/* Recomendações */}
                    <section style={{ marginTop: '30px' }}>
                        <h2 className={styles.sectionTitle}>Recomendações</h2>
                        <div className={styles.horizontalList}>
                            {recommendationsList.map(item => (
                                <Thumbnail key={item.id} item={item} />
                            ))}
                        </div>
                    </section>

                </div>

                {/* COLUNA DA DIREITA */}
                <div className={styles.rightColumn}>
                    <DetailsSidebar 
                        details={details} 
                        providers={providers} 
                        keywordsList={keywordsList} 
                    />
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
