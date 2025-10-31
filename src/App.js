// src/App.js (Verifique se a ROTA /search existe)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import SearchPage from './pages/SearchPage'; // Certifique-se de importar
import Header from './components/Header';
import BrowsePage from './pages/BrowsePage';
// ...

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ROTA ÚNICA PARA LISTAGEM E FILTROS */}
        <Route path="/browse" element={<BrowsePage />} />

        {/* Mantenha as outras rotas */}
        <Route path="/details/:mediaType/:id" element={<DetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;