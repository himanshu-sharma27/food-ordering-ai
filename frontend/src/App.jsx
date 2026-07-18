import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";

function App() {

    return (

        <>
    <Navbar />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
    </Routes>
</>

    );

}

export default App;