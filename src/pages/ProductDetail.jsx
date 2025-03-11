import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeContext from "../context/RecipeContext";

function ProductDetail() {
  const [item, setItem] = useState(null);
  const { recipe } = useContext(RecipeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (recipe && recipe.length > 0 && id) {
      const numericId = parseInt(id, 10); // Ensure id is a number
      const product = recipe.find((item) => item.id === numericId);
      setItem(product);
      console.log("product :", product);
    }
  }, [id, recipe]);

  const handleAddToCart = () => {
    console.log("Added to cart:", item);
    alert(`${item?.title} has been added to your cart!`);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="max-w-6xl flex justify-center items-center p-5 rounded-2xl">
      <div>
        {!item ? (
          <div className="w-full text-xl">Loading....</div>
        ) : (
          <div className="w-full flex flex-col gap-4 p-4 bg-gray-50 rounded-2xl">
            <div>
              <button
                onClick={handleBackToHome}
                className="bg-gray-200 text-lg py-2 px-6 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Home
              </button>
            </div>
            {/* Product Image and Title */}
            <div className="flex flex-col gap-8">
              <h1 className="text-4xl font-medium text-gray-700">
                {item.title}
              </h1>
              <div className="flex justify-center items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-2xl w-[80%] max-h-96 "
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full flex flex-col gap-4 text-gray-600">
              <p className="text-2xl font-bold">Price:</p>
              <p className="text-xl">${item.pricePerServing}</p>

              <p className="text-2xl font-bold">Summary:</p>
              <div
                dangerouslySetInnerHTML={{ __html: item.summary }}
                className="leading-6 text-xl text-gray-500"
              />

              {/* Additional details */}
              <div className="mt-4">
                <p className="text-xl font-bold">Other Details:</p>
                <ul className="list-disc list-inside text-gray-500 text-lg">
                  <li>
                    <strong>Servings:</strong> {item.servings || "N/A"}
                  </li>
                  <li>
                    <strong>Ready in Minutes:</strong>{" "}
                    {item.readyInMinutes || "N/A"}
                  </li>
                  <li>
                    <strong>Source:</strong>{" "}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {item.sourceUrl ? "View Source" : "N/A"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-around mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white text-lg py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Add to WishList
              </button>
              <button
                onClick={handleBackToHome}
                className="bg-gray-600 text-white text-lg py-2 px-6 rounded-lg hover:bg-gray-700 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
