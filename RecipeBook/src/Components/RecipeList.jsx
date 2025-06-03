import React from 'react';
import Recipe from './Recipe';

const RecipeList = ({ recipes, favorites, toggleFavorite, openRecipeId, handleToggleOpen }) => {
  return (
    <div>
      {recipes.map(recipe => (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          toggleFavorite={toggleFavorite}
          isOpen={openRecipeId === recipe.id}
          handleToggleOpen={handleToggleOpen}
        />
      ))}
    </div>
  );
};

export default RecipeList;
