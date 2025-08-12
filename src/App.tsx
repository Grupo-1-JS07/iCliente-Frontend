import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ListaCategorias from "./components/categorias/listacategorias/listaCategorias";
import FormCategoria from "./components/categorias/formcategorias/formCategorias";
import DeletarCategoria from "./components/categorias/deletarcategorias/deletarCategorias";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";
import { AuthProvider } from "./context/AuthContext";
import Cadastro from "./pages/cadastro/Cadastro";


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categorias" element={<ListaCategorias />} />
        <Route path="/cadastrarcategorias" element={<FormCategoria />} />
        <Route path="/editarcategoria/:id" element={<FormCategoria />} />
        <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
