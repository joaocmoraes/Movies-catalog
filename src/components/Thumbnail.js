// src/components/Thumbnail.js (Clean Code)

import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../api/tmdbApi'; 
import styles from './Thumbnail.module.css'; // ⬅️ Importação chave

function Thumbnail({ item }) {
    
    const [isHovered, setIsHovered] = useState(false);

    // Desestruturamos media_type e id
    const { media_type, id } = item; 
    
    const imagePath = item.poster_path || item.backdrop_path;
    const title = item.title || item.name; 
    const rating = item.vote_average?.toFixed(1) || 'N/A';
    
    const API_IMAGE_URL = IMAGE_URL || 'https://image.tmdb.org/t/p/w200';
    
    // Verifica se temos todos os dados essenciais
    if (!imagePath || !media_type || !id) return null; 

    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    const fullImageUrl = `${API_IMAGE_URL}${path}`;
    const linkPath = `/details/${media_type}/${id}`; 

    // Classes dinâmicas baseadas no estado
    const thumbnailClasses = `${styles.thumbnail} ${isHovered ? styles.hovered : ''}`;
    const ratingClasses = `${styles.rating} 
                            ${rating >= 7.0 ? styles.high : ''} 
                            ${isHovered ? styles.hiddenOnHover : ''}`;
    
    // --- RENDERIZAÇÃO ---
    return (
        // Aplica a classe base e a classe dinâmica 'hovered'
        <div 
            className={thumbnailClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Usa a classe linkWrapper para os estilos de bloco */}
            <Link to={linkPath} className={styles.linkWrapper}>
                <img 
                    src={fullImageUrl} 
                    alt={title} 
                    className={styles.image} // Aplica a classe da imagem
                    onError={(e) => { 
                        // Lógica de fallback para imagem, mantida no JS
                        e.target.onerror = null; 
                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" style="background:#444;border-radius:4px;"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#888" font-size="20">Sem Imagem</text></svg>'; 
                        e.target.style.objectFit = 'contain';
                    }}
                />
            </Link>
            
            {rating !== 'N/A' && (
                // Aplica as classes de rating
                <div className={ratingClasses}>
                    ★ {rating}
                </div>
            )}
            
        </div>
    );
}

export default Thumbnail;