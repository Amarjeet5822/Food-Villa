import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import WishCart from "./pages/WishCart.jsx";
import RecipeContextProviderComponent from "./context/RecipeContextComponent.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import SavedRecipeProviderComponent from "./context/SavedRecipeComponent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/cart", element: <WishCart /> },
      { path: "/product/:id", element: <ProductDetail /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SavedRecipeProviderComponent>
      <RecipeContextProviderComponent>
        <RouterProvider router={router} />
      </RecipeContextProviderComponent>
    </SavedRecipeProviderComponent>
  </StrictMode>
);
