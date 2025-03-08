import { useEffect, useState } from "react";

function Login() {
  const [ isField, setIsField] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8082/auth/google";
    localStorage.setItem("isLogged", true);
  };
  useEffect(() => {
    if(password.length>4 && email) {
      setIsField(false)
    }
  }, [email, password])
  
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white pt-3 pb-8 px-8  rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
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
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
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
            className={`w-full ${ !isField ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-100"} text-white py-2 rounded-lg  transition duration-300` }
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-2xl">OR</p>
          <button
            className="mt-4 w-full text-red-700 font-bold text-xl hover:bg-gray-200 py-2 rounded-lg  transition duration-300"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;