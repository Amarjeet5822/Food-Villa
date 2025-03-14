import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import RecipeContext from "../../context/RecipeContext";
import { BsBagHeart } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";

function Navbar() {
  const { LOGOUT, isAuthenticated } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const { searchedRecipe, getAllRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();

  const handlerSearch = (query) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      searchedRecipe(query);
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await LOGOUT(); // Wait for the logout request to complete
      window.location.href = `/`;
      navigate("/")
      isAuthenticated(false);
    } catch (err) {
      // console.log("error", err)
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      getAllRecipe();
    }
  }, [searchQuery, isAuthenticated]);

  return (
    <div className="max-w-6xl mx-auto w-full h-[80px] flex justify-between sticky top-0 z-10 bg-stone-300 text-white rounded-xl mb-5">
      <div className="flex justify-center items-center pl-6 text-5xl font-serif text-stone-700 it">
        <NavLink to="/">
          <p>Food Villa</p>
        </NavLink>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex justify-left items-center mt-6 mb-2 w-full bg-gray-200 rounded-lg text-gray-700">
          <span className="text-gray-900 pl-2 text-xl">
            <CiSearch />
          </span>
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
            {isAuthenticated ? (
              <button onClick={handleLogout}>
                <RiLogoutCircleLine />
              </button>
            ) : (
              <NavLink to="/login">
                <button className="text-red-700 font-mono hover:bg-stone-400 py-1 px-2 rounded-md">
                  <AiOutlineLogin />
                </button>
              </NavLink>
            )}
          </div>
          {isAuthenticated && (
            <div className="transition-transform duration-500 hover:scale-125">
              <NavLink to="/cart">
                <button>
                  <BsBagHeart />
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
