import { useEffect, useState } from "react";
import { api_url } from "../utils/backend_api";
import axios from "axios";
import SavedRecipeContext from "./SavedRecipeContext";
import "react-toastify/dist/ReactToastify.css";

const SavedRecipeProviderComponent = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  // Helper to show toast messages

  // DELETE Recipe
  const deleteSavedRecipe = async (recipeId) => {
    setError(null);
    setMessage(null);
    try {
      const res = await axios.delete(`${api_url}/api/recipes/preference/save/${recipeId}`, {
        withCredentials: true,
      });
      setMessage(res.data.message || "Product Deleted Successfully");
      setError(null);
      getAllRecipe(); // Refresh the list after deletion
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to Delete");
      setMessage(null);
    }
  };
  const SaveRecipeWishList = async (items) => {
    console.log("item(saveRecipeComponent)", items)
    setError(null);
    setMessage(null);
    try {
      const res = await axios.post(
        `${api_url}/api/recipes/preference/save`,
        { ...items },
        { withCredentials: true }
      );
      setError(null);
      setMessage("Product Added SuccessFully");
      getAllRecipe(); // Refresh the list after add product
    } catch (err) {
      // console.log("err.response.data.message(savedRecipeContext)lineNo.43", err.response.data.message)
      setError(err?.response?.data?.message || "Unable to add Product");
      setMessage(null);
    }
  };

  // GET all recipes
  const getAllRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api_url}/api/recipes/preference/save`,
        { withCredentials: true }
      );
      setRecipes(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("error to loading recipe");
    }
  };

  useEffect(() => {
    getAllRecipe();
  }, []);

  return (
    <SavedRecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        deleteSavedRecipe,
        SaveRecipeWishList,
        loading,
        error,
        message,
        setMessage,
        setError,
      }}
    >
      {children}
    </SavedRecipeContext.Provider>
  );
};

export default SavedRecipeProviderComponent;
