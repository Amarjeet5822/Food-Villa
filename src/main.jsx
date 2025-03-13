import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page.jsx";
import Home from "./pages/Home.jsx";
import WishCart from "./pages/WishCart.jsx";
import RecipeContextProviderComponent from "./context/RecipeContextComponent.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import SavedRecipeProviderComponent from "./context/SavedRecipeComponent.jsx";
import GoogleCallback from "./pages/GoogleCallback.jsx";
import AuthContextComponent from "./context/AuthContextComponent.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SingupPage from "./pages/SignupPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextComponent>
        <RecipeContextProviderComponent>
          <SavedRecipeProviderComponent>
            <App />
          </SavedRecipeProviderComponent>
        </RecipeContextProviderComponent>
      </AuthContextComponent>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/login/signup", element: <SingupPage /> },
      { path: "/cart", element: <WishCart /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/googlecallback", element: <GoogleCallback /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
