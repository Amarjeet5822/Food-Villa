import {  useEffect, useState } from "react";
import { api_url } from "../utils/backend_api";
import axios from "axios";
import RecipeContext from "./RecipeContext";

const RecipeContextProviderComponent = ( { children}) => {
  const [recipe, setRecipe ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const searchedRecipe = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.get(`${api_url}/api/recipes/search?query=${searchQuery}` )
      console.log("searchedQuery Data :" , response.data);
      setLoading(false);
      setRecipe(response.data);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(error?.message);
      console.log(error, error?.message)
    }
  }

  const getAllRecipe = async () => {

    setError(null);
    setLoading(true);
    setSuccess(false);
    try {

      const response = await axios.get(`${api_url}/api/recipes`)
      setLoading(false)
      setError(null);
      setSuccess(true);
      setRecipe(response.data);
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
    <RecipeContext.Provider value={{ recipe, setLoading, setRecipe, setError, setSuccess , searchedRecipe, loading, error, success, getAllRecipe }}>
      { children }
    </RecipeContext.Provider>
  )
}
export default RecipeContextProviderComponent ;
 