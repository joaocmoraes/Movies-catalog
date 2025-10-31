import React, { useState, useEffect } from 'react';
import tmdb from '../api/tmdbApi';
import Hero from '../components/Hero'; 
import RowList from '../components/RowList';
import SearchBar from '../components/SearchBar'; 

function Home() {
  const [movieLists, setMovieLists] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //  NOVOS ESTADOS PARA A TRANSIÇÃO 
  const [heroList, setHeroList] = useState([]); 
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0); 
  // -------------------------------------
  
  // 1. Função para carregar todos os dados 
  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        
        // listas de filmes/séries buscar
        const fetches = [
          { title: "Filmes Populares", fetcher: tmdb.getPopularMovies, media_type: 'movie' },
          { title: "Séries Populares", fetcher: tmdb.getPopularTV, media_type: 'tv' },
          { title: "Top Avaliados ★", fetcher: tmdb.getTopRated, media_type: 'movie' },
        ];

        // Executa todas as buscas em paralelo
        const results = await Promise.all(
          fetches.map(async (f) => {
            const data = await f.fetcher();
            
            // Injeta o media_type (movie ou tv) em CADA item
            const itemsWithMediaType = (data.results || []).map(item => ({
              ...item,
              media_type: f.media_type 
            }));
            
            return {
              title: f.title,
              items: itemsWithMediaType
            };
          })
        );
        
        setMovieLists(results);
        
        // Define a lista de itens que o Hero irá transicionar (usando os primeiros 5 de Tendência)
        if (results[0] && results[0].items.length > 0) {
          const topItems = results[0].items.slice(0, 5); 
          setHeroList(topItems);
        }
        
      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  useEffect(() => {
    if (heroList.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex(prevIndex => 
          (prevIndex + 1) % heroList.length
        );
      }, 8000); 

      // Limpeza: interrompe o timer quando o componente é desmontado ou heroList muda
      return () => clearInterval(interval); 
    }
  }, [heroList]); // Roda quando a lista de heróis (heroList) é carregada
  
  const currentHeroItem = heroList[currentHeroIndex];

  if (loading) {
    return (
      <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
        Carregando...
      </div>
    );
  }

  // Conteúdo principal da página
  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
      
      {/* 1. Hero Section - Passa o item que corresponde ao índice atual */}
      {currentHeroItem && <Hero item={currentHeroItem} />} 

      {/* 2. Search Bar */}
      <SearchBar /> 

      {/* 3. Movie Rows */}
      <section style={{ marginTop: '50px' }}>
        {movieLists.map((list) => (
          <RowList key={list.title} title={list.title} items={list.items} />
        ))}
      </section>
      
      <footer style={{ color: '#999', textAlign: 'center', padding: '20px', marginTop: '50px' }}>
        Dados obtidos do The Movie Database (TMDB).
      </footer>
      
    </div>
  );
}

export default Home;
