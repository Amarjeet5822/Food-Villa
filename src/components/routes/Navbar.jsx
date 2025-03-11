import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import RecipeContext from "../../context/RecipeContext";
import { BsBagHeart } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import { api_url } from "../../utils/backend_api";
import axios from "axios";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const { searchedRecipe, getAllRecipe } = useContext(RecipeContext);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    if (token) {
      console.log('Token from URL:', token); // Log token from redirect
      localStorage.setItem('token', token);
      setIsLogged(true);
      window.history.replaceState({}, document.title, "/");
    }

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      console.log('Stored Token from localStorage:', storedToken); // Log stored token
      axios.get(`${api_url}/api/auth/status`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then(response => {
          console.log('Auth Status Response:', response.data);
          setIsLogged(response.data.isAuthenticated);
        })
        .catch(error => {
          console.error('Auth Check Error:', error);
          setIsLogged(false);
          localStorage.removeItem('token');
        });
    }
  }, [location]);

  const handlerSearch = (query) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      searchedRecipe(query);
    }, 500);
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    console.log('Logging out, clearing token:', token); // Log token before clearing
    localStorage.removeItem('token');
    setIsLogged(false);
    window.location.href = "/";
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      getAllRecipe();
    }
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto w-full h-[80px] flex justify-between sticky top-0 z-10 bg-stone-300 text-white rounded-xl mb-5">
      <div className="flex justify-center items-center pl-6 text-5xl font-serif text-stone-700 it">
        <NavLink to="/"><p>Food Villa</p></NavLink>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex justify-left items-center mt-6 mb-2 w-full bg-gray-200 rounded-lg text-gray-700">
          <span className="text-gray-900 pl-2 text-xl"><CiSearch /></span>
          <input
            value={searchQuery}
            type="text"
            placeholder="Search recipe here..."
            className="outline-none bg-gray-200 w-full rounded-lg pl-2 py-2"
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);
              handlerSearch(query);
            }}
          />
        </div>
        <div className="flex justify-center items-center gap-2.5 text-stone-700 pr-4 text-3xl mt-4">
          <div className="transition-transform duration-500 hover:scale-125">
            {isLogged ? (
              <button onClick={handleLogout}><RiLogoutCircleLine /></button>
            ) : (
              <NavLink to="/login">
                <button className="text-red-700 font-mono hover:bg-stone-400 py-1 px-2 rounded-md"><AiOutlineLogin /></button>
              </NavLink>
            )}
          </div>
          {isLogged && (
            <div className="transition-transform duration-500 hover:scale-125">
              <NavLink to="/cart"><button><BsBagHeart /></button></NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;