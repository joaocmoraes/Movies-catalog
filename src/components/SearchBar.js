// src/components/SearchBar.js (Clean Code)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

// Importa o objeto de classes CSS
import styles from './SearchBar.module.css';

function SearchBar() {
    // 1. Estado para capturar o que o usuário digita
    const [searchText, setSearchText] = useState('');
    // 2. Hook para navegação programática
    const navigate = useNavigate();

    /**
     * Lógica principal de submissão do formulário.
     * Redireciona para a SearchPage com a query na URL.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const trimmedSearch = searchText.trim();

        if (trimmedSearch) {
            // Navega para a rota de busca, passando o termo como parâmetro de URL (?q=termo)
            navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
            // Opcional: Limpar o campo após a busca
            // setSearchText(''); 
        }
    };

    return (
        // Aplica a classe do container
        <div className={styles.searchContainer}>
            {/* Aplica a classe do wrapper */}
            <div className={styles.contentWrapper}>
                <h2 className={styles.title}>Bem-vindo(a).</h2>
                <p className={styles.subtitle}>Descubra Milhões de Filmes e Séries. Explore já.</p>
                
                {/* Aplica a classe do formulário */}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Buscar por um Filme ou série..."
                        className={styles.input} // Aplica a classe do input
                        // 3. Captura a mudança de valor
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit" className={styles.button}> {/* Aplica a classe do botão */}
                        Buscar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;