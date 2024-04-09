import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { useSidebar } from "./store/toggle-sidebar";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";

function App() {
  const { isOpen } = useSidebar((state) => state);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      {isOpen && <Sidebar />}
    </div>
  );
}

export default App;
