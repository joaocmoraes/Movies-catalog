import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const HERO_BACKDROP_URL = 'https://image.tmdb.org/t/p/original'; 


function Hero({ item }) {
    if (!item) return null;

  
    const title = item.title || item.name;
    const backdropPath = item.backdrop_path;
    const overview = item.overview;
    
  
    const mediaType = item.media_type || (item.title ? 'movie' : 'tv'); 
    const detailsPath = `/details/${mediaType}/${item.id}`;

    const formatOverview = (text, maxLength) => {
        if (!text) return 'Sinopse não disponível.';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    
  
    const dynamicBackgroundStyle = {
        backgroundImage: `linear-gradient(to top, #141414 10%, transparent 90%), url(${HERO_BACKDROP_URL}${backdropPath})`,
    };

    return (
        <header className={styles.hero} style={dynamicBackgroundStyle}>
            <div className={styles.infoContainer}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.overview}>
                    {formatOverview(overview, 250)}
                </p>
                <div className={styles.buttonsContainer}>
                    {/* Botão de Play */}
                    <button 
                        className={`${styles.button} ${styles.playButton}`} 
                        onClick={() => alert(`Iniciando ${title}`)}
                    >
                        Assistir
                    </button>
                    
                    {/* Botão para Detalhes usando <Link> */}
                    <Link 
                        to={detailsPath}
                        className={`${styles.button} ${styles.infoButton}`}
                    >
                        Mais Informações
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Hero;