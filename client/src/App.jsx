import { useEffect } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Profile from "./components/Profile";

import { Routes, Route } from "react-router-dom";
import { useAddItemModal } from "./store/toggle-modal";
import AddItemModal from "./components/AddItemModal";

function App() {
  const { isAddItemOpen } = useAddItemModal((state) => state);
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
        <Route
          path="/u/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      {isAddItemOpen && <AddItemModal />}
    </div>
  );
}

export default App;
