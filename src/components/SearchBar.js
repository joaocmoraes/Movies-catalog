import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

// Importa o objeto de classes CSS
import styles from './SearchBar.module.css';

function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const trimmedSearch = searchText.trim();

        if (trimmedSearch) {
            navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
        }
    };

    return (

        <div className={styles.searchContainer}>
         
            <div className={styles.contentWrapper}>
                <h2 className={styles.title}>Bem-vindo(a).</h2>
                <p className={styles.subtitle}>Descubra Milhões de Filmes e Séries. Explore já.</p>
                
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Buscar por um Filme ou série..."
                        className={styles.input} 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit" className={styles.button}> 
                        Buscar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;
