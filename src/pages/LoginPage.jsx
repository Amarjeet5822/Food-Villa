import { useContext, useEffect, useState } from "react";
import { api_url } from "../utils/backend_api";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LoginPage() {
  const [isField, setIsField] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {LOGIN } = useContext(AuthContext);
  const handleGoogleLogin = () => {
    window.location.href = `${api_url}/auth/google`;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    LOGIN(email, password);
    setEmail("");
    setPassword("")
    isFisetIsFieldeld(true)
  };

  useEffect(() => {

    if (password.length > 3 && email) {
      setIsField(false);
    }
  }, [email, password, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white pt-3 pb-8 px-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login Please</h2>
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isField}
            className={`w-full ${!isField ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-100"} text-white py-2 rounded-lg transition duration-300`}
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-2xl">OR</p>
          <button
            className="mt-4 w-full text-red-700 font-bold text-xl hover:bg-gray-200 py-2 rounded-lg transition duration-300"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
        </div>
        <div className="flex gap-1 justify-center items-center">
          <p>{`Don't have Account? `} </p>
          <NavLink className={"text-red-500 font-bold"} to="/login/signup">Signup</NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;