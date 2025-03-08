import { Outlet } from "react-router-dom";
import Navbar from "./components/routes/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <main className="max-w-6xl ">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
