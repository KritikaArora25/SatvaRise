import PauseScreen from "./components/Pausescreen/PauseScreen.jsx";
import Signup from "./components/Signup/signup.jsx";
import Login from "./components/login/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard.jsx";
//import { AuthProvider } from "./Components/AuthContext/AuthContext";



function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/pause" element={<PauseScreen />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
