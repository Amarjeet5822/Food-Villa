import React, { useContext } from "react";
import SavedRecipeContext from "../context/SavedRecipeContext";

function WishCart() {
  const { recipes, loading, success, error, deleteSavedRecipe } = useContext(SavedRecipeContext);
  console.log("Saved Recipes", recipes);
  const deleteSavedRecipeHandler = (recipeId) => {
    deleteSavedRecipe(recipeId)
  }
  if(loading) {
    return <div className="text-center text-2xl">Loading...</div>
  }
  return (
    <div className="bg-gray-100 p-8 rounded-xl shadow-lg max-w-3xl mx-auto mt-10">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <span role="img" aria-label="fork and knife">
            🍽️
          </span>
          Your Saved Recipes
        </h2>
      </div>

      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="flex items-center bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {recipe.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
                </span>
                <span className="text-sm text-gray-600 flex items-center">
                  ⏳ {recipe.readyInMinutes}
                </span>
              </div>
            </div>
            <button onClick={() => deleteSavedRecipeHandler(recipe._id)}
            className="text-red-500 text-xl font-bold hover:text-red-700">
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishCart;
