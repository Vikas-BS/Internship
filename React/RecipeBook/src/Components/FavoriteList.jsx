import React from 'react';

const FavoriteList = ({ recipes, favorites }) => {
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div>
      <h3>⭐ Favorite Recipes</h3>
      <ul>
        {favoriteRecipes.map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
        {favoriteRecipes.length === 0 && <li>No favorites yet.</li>}
      </ul>
    </div>
  );
};

export default FavoriteList;
