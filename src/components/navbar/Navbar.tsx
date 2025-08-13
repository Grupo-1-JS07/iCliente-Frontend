import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { ToastAlerta } from '../../utils/ToastAlerta';

import { useSidebar } from '../../context/SidebarContext';

function Navbar() {
  // const navigate = useNavigate();
  // const { handleLogout } = useContext(AuthContext);
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const [open, setOpen] = useState(false); // para menu mobile

  return (
    <nav className="w-full bg-gradient-to-r from-[#0f0026] via-[#1a0a3c] to-[#0a0026] text-white shadow-lg py-2 px-0 relative">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Botão para abrir/fechar sidebar (sempre visível) */}
        <button
          className="flex items-center justify-center w-10 h-10 mr-2 focus:outline-none"
          onClick={toggleSidebar}
          aria-label={
            sidebarOpen ? 'Fechar menu lateral' : 'Abrir menu lateral'
          }
        >
          {sidebarOpen ? (
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <Link to="/home" className="flex items-center gap-2 select-none">
          <img
            src="/baixados.png"
            alt="Logo TechConnect"
            className="w-10 h-10 drop-shadow-[0_2px_10px_rgba(0,255,255,0.7)]"
            draggable="false"
          />
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-widest">
            TechConnect
          </span>
        </Link>
        {/* Itens da antiga Sidebar (exceto administração/usuários) */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link to="/home" className="neon-link">
            Dashboard
          </Link>
          <Link to="/leads" className="neon-link">
            Leads
          </Link>
          <Link to="/projetos" className="neon-link">
            Projetos
          </Link>
          <Link to="/roadmap" className="neon-link">
            Roadmap
          </Link>
          <Link to="/equipe" className="neon-link">
            Equipe
          </Link>
          <Link to="/relatorios" className="neon-link">
            Relatórios
          </Link>
          <Link to="/integracoes" className="neon-link">
            Integrações
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
