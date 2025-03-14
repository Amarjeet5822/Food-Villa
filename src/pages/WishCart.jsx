import React, { useCallback, useContext, useEffect, useState } from "react";
import SavedRecipeContext from "../context/SavedRecipeContext";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import AuthContext from "../context/AuthContext";

function WishCart() {
  const {
    recipes,
    loading,
    error,
    message,
    setError,
    setMessage,
    deleteSavedRecipe,
  } = useContext(SavedRecipeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [delLoading, setDelLoading] = useState(false);
  const NotifyError = (data) => toast.error(data);
  const NotifyMessage = (data) => toast.success(data);

  const deleteSavedRecipeHandler = useCallback(
    async (recipeId) => {
      if (delLoading) return; // Prevent duplicate clicks
      setDelLoading(true);
      try {
        await deleteSavedRecipe(recipeId);
      } catch (err) {
        // console.log("line 30(wishCart):err= ", err)
        NotifyError("Something went wrong!!");
      }finally{
        setDelLoading(false);
      }
    },
    [isAuthenticated, deleteSavedRecipe, delLoading]
  );

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };
  useEffect(() => {
    // console.log("re-fetch");
  }, [recipes]);

  // Handle notifications
  useEffect(() => {
    if (message) {
      NotifyMessage(message);
      setMessage(null);
    } else if (error) {
      NotifyError(error);
      setError(null);
    }
  }, [message, error]);
  if (loading) {
    return <div className="text-center min-h-screen text-2xl">Loading...</div>;
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

      <div className="space-y-4 flex items-center flex-col ">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="flex w-4/5 items-center cursor-pointer bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />
            <div
              className="flex-1"
              onClick={() => handleProductClick(recipe.imageId)}
            >
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
            <button
              disabled={delLoading}
              onClick={() => deleteSavedRecipeHandler(recipe._id)}
              className={`transition-transform duration-500 hover:scale-150 ${
                delLoading
                  ? "opecity-50 cursor-not-allowed hover:scale-110"
                  : ""
              }`}
            >
              {delLoading ? "❌..." : "❌"}
            </button>
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default WishCart;
