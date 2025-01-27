import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FavoriteRecipesPage from './pages/FavoriteRecipes';
import ResultRecipesPage from './pages/ResultsRecipes';
import SearchPage from './pages/SearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/FavoriteRecipes' element={<FavoriteRecipesPage />} />
          <Route path='/ResultsRecipes' element={<ResultRecipesPage />} />
          <Route path='/' element={<SearchPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>

  )
}



export default App;
