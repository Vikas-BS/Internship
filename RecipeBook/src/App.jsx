import { useState } from 'react'
import recipes from './data/recipes'
import SearchBar from './Components/SearchBar';
import FavoriteList from './Components/FavoriteList';
import RecipeList from './Components/RecipeList';
import './App.css'

const App = () => {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const toggleFavorite = (id) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(fid => fid !== id) 
        : [...prevFavorites, id] 
    );
  };

  const handleToggleOpen = (id) => {
    setOpenRecipeId(prevId => (prevId === id ? null : id));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>🍽️ Recipe Book</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <RecipeList
        recipes={filteredRecipes}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        openRecipeId={openRecipeId}
        handleToggleOpen={handleToggleOpen}
      />
      <FavoriteList recipes={recipes} favorites={favorites} />
    </div>
  );
};


export default App
