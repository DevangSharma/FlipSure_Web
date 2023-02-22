import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./components/Product/CreateProduct";
import VerifyProduct from "./components/Product/VerifyProduct";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";

function App() {
  return (
    <div id="App">
      <Router>
        <Routes>
          <Route path="/" element={<VerifyProduct />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
