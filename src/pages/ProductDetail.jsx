import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeContext from "../context/RecipeContext";

function ProductDetail() {
  const [item, setItem] = useState(null);
  const { recipe } = useContext(RecipeContext);
  const { id } = useParams();

  console.log("recipe", recipe);
  useEffect(() => {
    if (recipe && recipe.length > 0 && id) {  // Ensure id is valid
      console.log("Raw id:", id);
      const numericId = parseInt(id, 10); // Safer number conversion
      console.log("Converted id:", numericId);
      
      const product = recipe.find((item) => {
        console.log("Comparing:", numericId, "with", item.id);
        return item.id === numericId;
      });
  
      console.log("Matched product:", product);
      setItem(product);
    }
  }, [id, recipe]);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5 rounded-2xl">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Recipes
        </h2>
        {item ? (
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="w-full sm:w-72 bg-white border cursor-pointer border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
