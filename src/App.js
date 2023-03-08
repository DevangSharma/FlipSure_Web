import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./components/Product/CreateProduct";
import VerifyProduct from "./components/Product/VerifyProduct";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import AllProducts from "./components/Product/AllProducts";
import Sell from "./components/Product/Sell";

function App() {
  return (
    <div id="App">
      <Router>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/" element={<AllProducts />} />
          <Route path="/verify" element={<VerifyProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/" element={<VerifyProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
