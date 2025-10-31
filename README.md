The Movie Catalog 

Este projeto é uma aplicação web moderna e responsiva de catálogo de filmes e séries de TV, desenvolvida em React. Ele permite a busca por títulos e exibe detalhes completos do conteúdo, como elenco, sinopse, e recomendações, consumindo dados diretamente da API do TMDB (The Movie Database).


<img width="1892" height="952" alt="image" src="https://github.com/user-attachments/assets/a5b47eaa-004b-4614-abf8-c3fdcb05cc18" />


## ✨ Funcionalidades Principais

* **Navegação Dinâmica:** Menu principal com links para Início, Séries e Filmes.
* **Dropdown Responsivo:** Submenus (Populares, Mais bem avaliados) no desktop, que se tornam clicáveis no mobile.
* **Menu Hamburger Avançado:**
    * Transição suave de slide lateral.
    * Fundo semi-transparente com efeito **Blur** (`backdrop-filter`) para maior usabilidade em dispositivos móveis.
* **Página de Busca (`SearchPage`):** Busca instantânea por filmes e séries com layout em grid otimizado.
    * **Responsividade do Grid:** Exibe 4-5 colunas no desktop e **exatamente 2 colunas** no mobile.
* **Página de Detalhes (`DetailsPage`):**
    * Visualização de sinopse e elenco principal.
    * Lista de **Recomendações** com rolagem horizontal no desktop.
    * Layout responsivo onde o **Sidebar de Detalhes** se move abaixo do Hero principal no mobile para melhor UX.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React.js
* **Estilização:** CSS Modules (`.module.css`)
* **Roteamento:** React Router DOM
* **Dados:** The Movie Database (TMDB) API
* **Gerenciamento de Estado:** React Hooks (`useState`, `useEffect`, `useCallback`)


