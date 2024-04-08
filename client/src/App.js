import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Login />
      <Sidebar />
    </div>
  );
}

export default App;
