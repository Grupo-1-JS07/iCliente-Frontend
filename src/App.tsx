import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Leads from "./pages/leads/Leads";
import Projetos from "./pages/projetos/Projetos";
import Roadmap from "./pages/roadmap/Roadmap";
import Equipe from "./pages/equipe/Equipe";
import Relatorios from "./pages/relatorios/Relatorios";
import Integracoes from "./pages/integracoes/Integracoes";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import ListaCategorias from "./components/categorias/listacategorias/listaCategorias";
import FormCategoria from "./components/categorias/formcategorias/formCategorias";
import DeletarCategoria from "./components/categorias/deletarcategorias/deletarCategorias";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";
import { AuthProvider } from "./context/AuthContext";
import Cadastro from "./pages/cadastro/Cadastro";
import ListaProdutos from "./components/produtos/listarprodutos/ListaProdutos";
import FormProduto from "./components/produtos/formprodutos/FormProduto";
import DeletarProduto from "./components/produtos/deletarprodutos/DeletarProdutos";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AtualizarPerfil from "./components/perfil/AtualizarPerfil";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <ToastContainer />
        <BrowserRouter>
          <div className="app-container min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f0026] via-[#1a0a3c] to-[#0a0026]">
            <SidebarWrapper />
            <div className="flex-1 flex flex-col min-h-screen">
              <NavbarWrapper />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/projetos" element={<Projetos />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/equipe" element={<Equipe />} />
                  <Route path="/relatorios" element={<Relatorios />} />
                  <Route path="/integracoes" element={<Integracoes />} />
                  <Route path="/categorias" element={<ListaCategorias />} />
                  <Route
                    path="/cadastrarcategorias"
                    element={<FormCategoria />}
                  />
                  <Route
                    path="/editarcategoria/:id"
                    element={<FormCategoria />}
                  />
                  <Route
                    path="/deletarcategoria/:id"
                    element={<DeletarCategoria />}
                  />
                  <Route path="/produtos" element={<ListaProdutos />} />
                  <Route path="/cadastrarproduto" element={<FormProduto />} />
                  <Route path="/editarproduto/:id" element={<FormProduto />} />
                  <Route
                    path="/deletarproduto/:id"
                    element={<DeletarProduto />}
                  />
                  <Route
                    path="/atualizarperfil"
                    element={<AtualizarPerfil />}
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </SidebarProvider>
    </AuthProvider>
  );
}

function SidebarWrapper() {
  const { usuario } = useContext(AuthContext);
  // Exibe Sidebar apenas se usuário estiver logado
  if (!usuario?.token) return null;
  return <Sidebar />;
}

function NavbarWrapper() {
  const { usuario } = useContext(AuthContext);
  if (!usuario?.token) return null;
  return <Navbar />;
}

export default App;
