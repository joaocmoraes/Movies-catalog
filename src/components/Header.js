import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
   
    const [openMenu, setOpenMenu] = useState(null); 

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);
        if (newState === false) {
            setOpenMenu(null); 
        }
    };

    const handleFilterClick = (mediaType, category) => {
        setOpenMenu(null); 
        setIsMobileMenuOpen(false); // Fecha tudo ao navegar
        navigate(`/browse?type=${mediaType}&category=${category}`);
    };
    
    // Dados de Filtro 
    const seriesFilters = [
        { label: 'Populares', category: 'popular', mediaType: 'tv' },
        { label: 'Mais bem avaliados', category: 'top_rated', mediaType: 'tv' },
        { label: 'No ar hoje', category: 'airing_today', mediaType: 'tv' },
    ];
    
    const movieFilters = [
        { label: 'Populares', category: 'popular', mediaType: 'movie' },
        { label: 'Mais bem avaliados', category: 'top_rated', mediaType: 'movie' },
        { label: 'Em cartaz', category: 'now_playing', mediaType: 'movie' },
        { label: 'Próximos Lançamentos', category: 'upcoming', mediaType: 'movie' },
    ];

    // Componente de Dropdown Reutilizável
    const DropdownMenu = ({ title, filters, type }) => {
        const isMenuOpen = openMenu === type;

        // Lógica de Interação: HOVER no Desktop, CLICK no Mobile
        const handleTitleInteraction = (event) => {
            if (isMobileMenuOpen) {
                setOpenMenu(isMenuOpen ? null : type);
            }
        };

        return (
            <div 
                className={styles.dropdownContainer} 
                // DESKTOP: Controla o dropdown por HOVER 
                onMouseEnter={!isMobileMenuOpen ? () => setOpenMenu(type) : undefined} 
                onMouseLeave={!isMobileMenuOpen ? () => setOpenMenu(null) : undefined} 
                // MOBILE: Usa o CLIQUE para abrir/fechar o submenu
                onClick={handleTitleInteraction}
            >
                {/* O link se transforma no título que abre o submenu no mobile */}
                <span className={styles.link}>
                    {title}
                </span>
                
                <div className={`${styles.dropdownMenu} ${isMenuOpen ? styles.visible : ''}`}> 
                    {filters.map((filter) => (
                        <button 
                            key={filter.category}
                            onClick={() => handleFilterClick(filter.mediaType, filter.category)} 
                            className={styles.dropdownItem}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    };


    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
                TheMovieList
            </Link>
            
            {/* ÍCONE HAMBURGER */}
            <button 
                className={styles.hamburger} 
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="nav-links"
            >
                <span className={styles.hamburgerIcon}></span> 
            </button>


            {/* NAV PRINCIPAL - Oculta no mobile até o hamburger ser clicado */}
            <nav 
                id="nav-links"
                className={`${styles.nav} ${isMobileMenuOpen ? styles.navMobileOpen : ''}`}
            >
                {/* Link Início */}
                <Link to="/" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>Início</Link>

                {/* MENU SÉRIES */}
                <DropdownMenu title="Séries" filters={seriesFilters} type="tv" />
                
                {/* MENU FILMES */}
                <DropdownMenu title="Filmes" filters={movieFilters} type="movie" />

            </nav>
        </header>
    );
}

export default Header;