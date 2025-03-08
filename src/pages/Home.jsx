import React, { useContext } from "react";
import RecipeContext from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const { recipe, loading } = useContext(RecipeContext);
  const handleProductClick = (id) => {
    navigate(`/product/${id}`)
  }
  loading ? (
    <div className="text-2xl text-center">Loading...</div>
  ) : (
    <div>{""}</div>
  );
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5 rounded-2xl">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Recipes
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {recipe.lenght ===0? <div>NO DATA FOUND</div>:recipe?.map((item) => (
            <div
            onClick={() => handleProductClick(item.id)}
              key={item.id}
              className="w-full sm:w-72 bg-white border cursor-pointer border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
