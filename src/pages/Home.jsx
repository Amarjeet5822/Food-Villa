import React, { useContext, useEffect, useState } from "react";
import RecipeContext from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";


function Home() {
  const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentPage") ? Number(localStorage.getItem("currentPage")) : 1);
  const  [totalPages, setTotalPages ] = useState(7)
  const navigate = useNavigate();
  const { recipe, loading, getAllRecipe } = useContext(RecipeContext);
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      localStorage.setItem("currentPage", newPage);
    }
  };
  useEffect(() => {
     getAllRecipe(currentPage);
  }, [currentPage]);
  if (loading) {
    return <div className="text-2xl min-h-screen text-center">Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5 rounded-2xl">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Recipes
        </h2>
        <div className="flex justify-center items-center p-3 mb-4 border-2 border-gray-100 hover:border-gray-200 rounded-lg">
          <button
            className="px-3 py-1 border border-gray-300 rounded mx-1 text-gray-700 hover:bg-gray-200"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded mx-1 text-gray-700 hover:bg-gray-200"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-3 text-gray-600">
            Page {currentPage} of { totalPages }
          </span>
          <button
            className="px-3 py-1 border border-gray-300 rounded mx-1 text-gray-700 hover:bg-gray-200"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded mx-1 text-gray-700 hover:bg-gray-200"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {Array.isArray(recipe) && recipe.length > 0 ? (
            recipe.map((item) => (
              <div
                key={item.id}
                onClick={() => handleProductClick(item.id)}
                className="w-full sm:w-72 bg-white border cursor-pointer border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg  duration-300 transition-transform  hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Price: ${item.pricePerServing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-xl text-gray-600">No data found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
