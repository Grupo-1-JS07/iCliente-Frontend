import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  function logout() {
    handleLogout();
    alert('O usuário foi desconectado com sucesso!');
    navigate('/');
  }

  return (
    <nav className="w-full bg-gradient-to-r from-[#0f0026] via-[#1a0a3c] to-[#0a0026] text-white shadow-lg py-2 px-0">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/home" className="flex items-center gap-2 select-none">
          <img
            src="/baixados.png"
            alt="Logo iCliente"
            className="w-10 h-10 drop-shadow-[0_2px_10px_rgba(0,255,255,0.7)]"
            draggable="false"
          />
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-widest">
            iCLIENTE
          </span>
        </Link>
        {/* Menu desktop */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link to="/produtos" className="neon-link">
            Produtos
          </Link>
          <Link to="/categorias" className="neon-link">
            Categorias
          </Link>
          <Link to="/cadastrarproduto" className="neon-link">
            Cadastrar Produto
          </Link>
          <Link to="/cadastrarcategorias" className="neon-link">
            Cadastrar Categoria
          </Link>
          <Link to="/perfil" className="neon-link">
            Perfil
          </Link>
          <button
            onClick={logout}
            className="neon-link focus:outline-none bg-transparent border-none"
          >
            Sair
          </button>
        </div>
        {/* Menu mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <span className="block w-7 h-1 bg-cyan-400 rounded mb-1"></span>
          <span className="block w-7 h-1 bg-cyan-400 rounded mb-1"></span>
          <span className="block w-7 h-1 bg-cyan-400 rounded"></span>
        </button>
        {open && (
          <div className="absolute top-16 left-0 w-full bg-gradient-to-b from-[#0f0026] via-[#1a0a3c] to-[#0a0026] flex flex-col items-center gap-4 py-6 z-50 md:hidden animate-fade-in">
            <Link
              to="/produtos"
              className="neon-link text-lg"
              onClick={() => setOpen(false)}
            >
              Produtos
            </Link>
            <Link
              to="/categorias"
              className="neon-link text-lg"
              onClick={() => setOpen(false)}
            >
              Categorias
            </Link>
            <Link
              to="/cadastrarproduto"
              className="neon-link text-lg"
              onClick={() => setOpen(false)}
            >
              Cadastrar Produto
            </Link>
            <Link
              to="/cadastrarcategorias"
              className="neon-link text-lg"
              onClick={() => setOpen(false)}
            >
              Cadastrar Categoria
            </Link>
            <Link
              to="/perfil"
              className="neon-link text-lg"
              onClick={() => setOpen(false)}
            >
              Perfil
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="neon-link text-lg focus:outline-none bg-transparent border-none"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
