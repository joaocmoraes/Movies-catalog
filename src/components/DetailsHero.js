import React from 'react';
import { IMAGE_URL, LARGE_IMAGE_URL_BASE } from '../api/tmdbApi';
import styles from './DetailsHero.module.css';

const getYear = (dateString) => {
    if (!dateString) return 'N/A';
    return dateString.substring(0, 4);
};

/**
 * Componente que renderiza a seção de destaque (Hero) da página de detalhes.
 * @param {Object} details - Dados principais filme / série
 * @param {Object} credits - Dados de elenco e equipe técnica
 */
function DetailsHero({ details, credits }) {
    if (!details || !credits) return null;

    // Formatação dos Dados 
    const title = details.title || details.name;
    const posterPath = details.poster_path;
    const backdropPath = details.backdrop_path;
    const releaseDate = details.release_date || details.first_air_date;
    const tagline = details.tagline;
    const overview = details.overview;

    const ratingValue = details.vote_average?.toFixed(1);
    const voteCount = details.vote_count ? `(${details.vote_count.toLocaleString()} votos)` : ''; 

    // Equipe principal
    const director = credits?.crew?.find(p => p.job === 'Director');
    const writers = credits?.crew?.filter(p => p.job === 'Screenplay' || p.job === 'Writer' || p.job === 'Story').slice(0, 3);
    

    const heroStyle = {
        backgroundImage: `linear-gradient(to right, rgba(10, 10, 10, 1) 150px, rgba(10, 10, 10, 0.7) 100%), url(${LARGE_IMAGE_URL_BASE}${backdropPath})`,
    };

    return (
        <div className={styles.heroContainer} style={heroStyle}>
            <div className={styles.heroContent}>
                {/* Pôster Esquerdo */}
                <img
                    src={`${IMAGE_URL}${posterPath}`}
                    alt={title}
                    className={styles.heroPoster}
                />
                
                {/* Informações Direita */}
                <div className={styles.heroInfo}>
                    <h1 className={styles.title}>{title} <span className={styles.year}>({getYear(releaseDate)})</span></h1>

                    {/* Bloco do Rating estilo IMDb */}
                    <div className={styles.imdbRating}>
                        <span className={styles.starIcon}>★</span>
                        <span style={{ fontWeight: 'bold' }}>{ratingValue}</span>
                        <span style={{ fontSize: '14px', opacity: 0.7 }}>{voteCount}</span>
                    </div>

                    <p className={styles.tagline}>{tagline}</p>

                    <h3 className={styles.sectionSubtitle}>Sinopse</h3>
                    <p className={styles.overview}>{overview}</p>

                    {/* Bloco do Elenco Principal (Diretor/Roteiristas) */}
                    <div className={styles.crewContainer}>
                        {director && (
                            <div>
                                <h4 className={styles.crewMemberName}>{director.name}</h4>
                                <p className={styles.crewMemberJob}>Diretor</p>
                            </div>
                        )}
                        {writers.map(writer => (
                            <div key={writer.credit_id}>
                                <h4 className={styles.crewMemberName}>{writer.name}</h4>
                                <p className={styles.crewMemberJob}>{writer.job}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsHero;