import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import RecipeContext from "../../context/RecipeContext";
import { BsBagHeart } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import { api_url } from "../../utils/backend_api";
import axios from "axios";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const { searchedRecipe, getAllRecipe } = useContext(RecipeContext);
  // Search functionality =>
  const handlerSearch = (query) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current); // Clear previous timeout
    }
    searchRef.current = setTimeout(() => {
      searchedRecipe(query); // API call with search query
    }, 500); // Adjust the delay time as needed (500ms is common)
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${api_url}/logout`,
        {},
        { withCredentials: true } // Ensures cookies (session) are sent
      );
  
      // Ensure successful logout before proceeding
      if (response.status === 200) {
        console.log(response.data.message); // Show confirmation
        localStorage.removeItem("isLogged"); // Clear login state
        setIsLogged(false);
        window.location.href = "/"; // Redirect to homepage
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Failed to logout. Please try again.");
    }
  };
  
  useEffect(() => {

    setIsLogged(localStorage.getItem("isLogged") || false)

    if (searchQuery.trim() === "") {
      getAllRecipe(); // Fetch all notes if search query is empty
    }
  }, [searchQuery]); // Runs when searchQuery changes
  return (
    <div
      className={`max-w-6xl mx-auto w-full h-[80px] flex justify-between origin-top ease-in-out transition-all duration-300 sticky top-0 z-10 box-border bg-stone-300 text-white border-t-white rounded-xl mb-5`}
    >
      {" "}
      <div className="flex justify-center items-center pl-6 text-5xl font-serif -tracking-wider text-stone-700 ">
        <NavLink to="/"><p>Food Villa</p></NavLink>
      </div>
      <div className=" flex justify-center gap-4">
        <div className="flex justify-left items-center mt-6 mb-2 w-full  bg-gray-200 rounded-lg  text-gray-700">
          <span className="text-gray-900 pl-2 text-xl">{<CiSearch />}</span>
          <input
            value={searchQuery}
            type="text"
            placeholder={`Search recipe here...`}
            className="outline-none bg-gray-200 w-full rounded-lg pl-2 py-2"
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);
              handlerSearch(query);
            }}
          />
        </div>
        <div className="flex justify-center items-center gap-2.5 text-stone-700 pr-4 text-3xl mt-4 ">
          <div className="transition-transform duration-500 hover:scale-125">
            {isLogged ? (
              <button onClick={ handleLogout }   >{< RiLogoutCircleLine />}</button>
            ) : (
              <NavLink to="/login">
                <button 
              className="text-red-700 font-mono tracking-tighter hover:bg-stone-400 py-1 px-2 rounded-md">{<AiOutlineLogin/>}</button>
              </NavLink>
            )}
          </div>
          <div className="transition-transform duration-500 hover:scale-125">
            <NavLink to="/cart" >{isLogged ? <button>{<BsBagHeart />}</button> : ""}</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

// import React from "react";
// import { NavLink } from "react-router-dom";

// function Navbar() {
//   return (
//     <div className="text-4xl flex justify-around items-center p-5 rounded-md bg-pink-200 mb-5">

//       <NavLink
//         to="/"
//         className={({ isActive }) => (isActive ? "text-red-500" : "text-black")}
//       >
//         Home Page
//       </NavLink>
//       <NavLink
//         to="/login"
//         className={({ isActive }) => (isActive ? "text-red-500" : "text-black")}
//       >
//         Login
//       </NavLink>
//     </div>
//   );
// }

// export default Navbar;

// import { CiSearch } from "react-icons/ci";
// const [searchQuery, setSearchQuery] = useState("");
//   const searchRef = useRef(null);
//   // Search functionality =>
//   const handlerSearch = (query) => {
//     if (searchRef.current) {
//       clearTimeout(searchRef.current); // Clear previous timeout
//     }
//     searchRef.current = setTimeout(() => {
//       searchedRecipe(query); // API call with search query
//     }, 500); // Adjust the delay time as needed (500ms is common)
//   };

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       getAllRecipe(); // Fetch all notes if search query is empty
//     }
//   }, [searchQuery]); // Runs when searchQuery changes

{
  /* <div className="flex justify-left items-center my-2  w-full  bg-gray-300 rounded-lg  text-gray-700">
          <span className="text-gray-900 pl-2 text-xl">
            {<CiSearch />}
          </span>
          <input
            value={searchQuery}
            type="text"
            placeholder={`Search question here...`}
            className="outline-none bg-gray-300 w-full rounded-lg pl-2 py-2"
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);
              handlerSearch(query);
            }}
          />
        </div> */
}
