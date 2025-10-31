import React, { useState, useEffect } from 'react';
import tmdb from '../api/tmdbApi';
import Thumbnail from './Thumbnail';
import styles from './GridList.module.css'; // ⬅️ Importação chave

// Componente de Paginação 
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
    // Lógica para determinar quais botões de página mostrar (Max 5 visíveis)
    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;
        const halfVisible = Math.floor(maxVisible / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (totalPages - currentPage < halfVisible) {
            startPage = Math.max(1, totalPages - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };
    
    const pageNumbers = getVisiblePages();

    if (totalPages <= 1) return null;

    return (
        <div className={styles.paginationContainer}>
            
            {/* Botão Anterior */}
            <button 
                onClick={() => onPageChange(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1} 
                className={styles.pageButton}
            >
                &lt;
            </button>

            {/* Botões da Página */}
            {pageNumbers.map(number => (
                <button 
                    key={number} 
                    onClick={() => onPageChange(number)}
                    // Aplica a classe 'active' se for a página atual
                    className={`${styles.pageButton} ${number === currentPage ? styles.active : ''}`}
                >
                    {number}
                </button>
            ))}

            {/* Botão Próximo */}
            <button 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} 
                disabled={currentPage === totalPages}
                className={styles.pageButton}
            >
                &gt;
            </button>
            
            {/* Botão Última Página (Aparece se houver espaço e não estiver perto do final) */}
            {totalPages > 5 && !pageNumbers.includes(totalPages) && (
                <button 
                    onClick={() => onPageChange(totalPages)}
                    className={`${styles.pageButton} ${styles.link}`}
                >
                    Última
                </button>
            )}
        </div>
    );
};

// Componente GridList
const GridList = ({ fetchUrl, mediaType }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGrid() {
            setLoading(true);
            try {
                // Adiciona o número da página na URL de busca
                const urlWithPage = `${fetchUrl}?page=${page}`;
                
                const response = await tmdb.get(urlWithPage); 
                
                const dataWithMedia = (response.results || []).map(item => ({
                    ...item,
                    media_type: item.media_type || mediaType 
                }));
                
                setItems(dataWithMedia);
                setTotalPages(response.total_pages || 1);
                
            } catch (error) {
                console.error("Erro ao buscar GridList:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGrid();
        window.scrollTo(0, 0); 

    }, [fetchUrl, page, mediaType]); // Dependências

    if (loading) {
        return <div className={styles.statusMessage}>Carregando...</div>;
    }

    if (items.length === 0) {
        return <div className={styles.statusMessage}>Nenhum resultado encontrado.</div>;
    }

    return (
        <div>
            {/* Aplica a classe de grid */}
            <div className={styles.grid}>
                {items.map(item => (
                    // O Thumbnail já foi refatorado e está pronto para receber o item
                    <Thumbnail key={item.id} item={item} />
                ))}
            </div>

            {/* Componente de Paginação */}
            <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={setPage} 
            />
        </div>
    );
};

export default GridList;