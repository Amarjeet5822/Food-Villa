import {  useEffect, useState } from "react";
import { api_url } from "../utils/backend_api";
import axios from "axios";
import SavedRecipeContext from "./SavedRecipeContext";

const SavedRecipeProviderComponent = ( { children}) => {
  const [recipes, setRecipes ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const deleteSavedRecipe = async (recipeId) => {
    setError(null);
    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.delete(`${api_url}/api/recipes/preference/save/${recipeId}`)
      setLoading(false)
      setError(null);
      setSuccess(true);
      getAllRecipe();
    } catch (error) {
      setError(error?.message);
      setLoading(false);
      setSuccess(false);
      console.log(error, error.message);
    }
  }
  const getAllRecipe = async () => {
    setError(null);
    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.get(`${api_url}/api/recipes/preference/save`)
      setLoading(false)
      setError(null);
      setSuccess(true);
      setRecipes(response.data);
      console.log("getRecipes Data :" , response.data);
    } catch (error) {
      setError(error?.message);
      setLoading(false);
      setSuccess(false);
      console.log(error, error.message);
    }
  }
  useEffect(() => {
    getAllRecipe();
  }, [])

  return (
    <SavedRecipeContext.Provider value={{ recipes,  setRecipes, setError, setSuccess ,  loading, error, success, deleteSavedRecipe }}>
      { children }
    </SavedRecipeContext.Provider>
  )
}
export default SavedRecipeProviderComponent ;
 