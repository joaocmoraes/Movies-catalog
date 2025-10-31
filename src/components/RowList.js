import React, { useRef } from 'react'; 
import Thumbnail from './Thumbnail'; 
import styles from './RowList.module.css'; // ⬅️ Importa o CSS Module

function RowList({ title, items }) {
    
    const listRef = useRef(null); 
    const scrollDistance = 500; 

    // Função para rolar para a esquerda
    const handleScrollLeft = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth'
            });
        }
    };

    // Função para rolar para a direita
    const handleScrollRight = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
        }
    };
    
    // Se o array de itens estiver vazio, não renderiza a linha
    if (!items || items.length === 0) {
        return null; 
    }

    return (
        <div className={styles.rowContainer}>
            <h2 className={styles.rowTitle}>{title}</h2>
        
            <div className={styles.listWrapper}>
                
                {/* Botão Esquerdo */}
                <button 
                    className={`${styles.scrollButton} ${styles.leftButton}`}
                    onClick={handleScrollLeft}
                >
                    &#10094; {/* Caractere Unicode para seta */}
                </button>

                {/* Lista de Filmes/Séries */}
                <div className={styles.listArea} ref={listRef}> 
                    {items.map(item => (
                        // Item Wrapper para manter a dimensão do card
                        <div 
                            key={`${item.media_type || 'movie'}-${item.id}`} 
                            className={styles.itemWrapper}
                        >
                            <Thumbnail item={item} />
                        </div>
                    ))}
                </div>

                {/* Botão Direito */}
                <button 
                    className={`${styles.scrollButton} ${styles.rightButton}`}
                    onClick={handleScrollRight}
                >
                    &#10095; {/* Caractere Unicode para seta */}
                </button>
            </div>
        </div>
    );
}

export default RowList;