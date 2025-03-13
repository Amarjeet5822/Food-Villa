import { useEffect, useState } from "react";
import { api_url } from "../utils/backend_api";
import axios from "axios";
import SavedRecipeContext from "./SavedRecipeContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SavedRecipeProviderComponent = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Helper to show toast messages
  const showToast = (type, message) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    }
  };

  // DELETE Recipe
  const deleteSavedRecipe = async (recipeId) => {
    setError(null);
    setLoading(true);
    setSuccess(false);
    try {
      await axios.delete(`${api_url}/api/recipes/preference/save/${recipeId}`, { withCredentials: true });
      setLoading(false);
      setSuccess(true);
      showToast('success', 'Recipe deleted successfully!');
      getAllRecipe(); // Refresh the list after deletion
    } catch (err) {
      setError(err?.message || 'Failed to delete recipe.');
      setLoading(false);
      setSuccess(false);
      showToast('error', err?.message || 'Failed to delete recipe.');
    }
  };
  const SaveRecipeWishList = async (items) => {
    setError(null);
    setLoading(true);
    setSuccess(false);
    try {
      await axios.post(`${api_url}/api/recipes/preference/save`,{ ...items }, { withCredentials: true });
      setLoading(false);
      setSuccess(true);
      showToast('success', 'Recipe added successfully!');
      getAllRecipe(); // Refresh the list after deletion
    } catch (err) {
      setError(err?.message || 'Failed to add recipe.');
      setLoading(false);
      setSuccess(false);
      showToast('error', err?.message || 'Failed to add recipe.');
    }
  };

  // GET all recipes
  const getAllRecipe = async () => {
    setError(null);
    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.get(`${api_url}/api/recipes/preference/save`, { withCredentials: true });
      setRecipes(response.data);
      setLoading(false);
      setSuccess(true);
      showToast('success', 'Recipes loaded successfully!');
    } catch (err) {
      setError(err?.message || 'Failed to load recipes.');
      setLoading(false);
      setSuccess(false);
      showToast('error', err?.message || 'Failed to load recipes.');
    }
  };

  useEffect(() => {
    getAllRecipe();
  }, []);

  return (
    <SavedRecipeContext.Provider value={{
      recipes,
      setRecipes,
      setError,
      setSuccess,
      loading,
      error,
      success,
      deleteSavedRecipe,
      SaveRecipeWishList
    }}>
      {children}
    </SavedRecipeContext.Provider>
  );
};

export default SavedRecipeProviderComponent;
