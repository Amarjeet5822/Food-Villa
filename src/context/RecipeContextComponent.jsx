import {  useEffect, useState } from "react";
import { api_url } from "../utils/backend_api";
import axios from "axios";
import RecipeContext from "./RecipeContext";

const RecipeContextProviderComponent = ( { children}) => {
  const [recipe, setRecipe ] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchedRecipe = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`${api_url}/api/recipes/search?query=${searchQuery}`, { withCredentials: true } )
      // console.log("searchedQuery Data :" , response.data);
      setLoading(false);
      setRecipe(response.data);
    } catch (error) {
      setLoading(false);
    }
  }

  const getAllRecipe = async () => {
    setLoading(true);
    try {

      const response = await axios.get(`${api_url}/api/recipes`, { withCredentials: true })
      setLoading(false)
      setRecipe(response.data);
      // console.log("getRecipes Data :" , response.data);
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllRecipe();
  }, [])

  return (
    <RecipeContext.Provider value={{ recipe, setLoading, setRecipe, searchedRecipe, loading,  getAllRecipe }}>
      { children }
    </RecipeContext.Provider>
  )
}
export default RecipeContextProviderComponent ;
 