import React from "react";
const Recipe = ({
  recipe,
  isFavorite,
  toggleFavorite,
  isOpen,
  handleToggleOpen,
}) => {
  return (
    <div style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => handleToggleOpen(recipe.id)}
      >
        <h3>{recipe.title}</h3>
        <span>{isOpen ? " " : " "}</span>
      </div>
      {isOpen && (
        <div>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
        </div>
      )}
      <button
        onClick={() => toggleFavorite(recipe.id)}
        style={{ marginTop: "10px" }}
      >
        {isFavorite ? "💔 Remove Favorite" : "❤️ Add to Favorites"}
      </button>
    </div>
  );
};
export default Recipe;
