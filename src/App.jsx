import { Outlet } from "react-router-dom";
import Navbar from "./components/routes/Navbar";
import FooterPage from "./components/routes/FooterPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <main className="max-w-6xl ">
          <Outlet />
        </main>
        <div className="max-w-6xl p-8 " >
          <FooterPage />
        </div>
      </div>
    </>
  );
}

export default App;
