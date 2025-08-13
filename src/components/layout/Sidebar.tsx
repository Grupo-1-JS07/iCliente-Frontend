import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  // Sidebar oculta em telas pequenas, controlada pelo contexto
  return (
    <aside
      className={`h-screen w-64 bg-white/10 backdrop-blur-xl border-r border-cyan-400/20 shadow-2xl flex flex-col justify-between fixed left-0 top-0 z-40 transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(0,255,255,0.15), 0 1.5px 0 0 #6d28d9',
      }}
    >
      {/* Botão de fechar sidebar, sempre visível no topo */}
      <button
        className="absolute top-4 right-4 z-50 bg-cyan-400/80 text-white rounded-full p-2 shadow-lg hover:bg-cyan-500 transition md:top-4 md:right-4"
        onClick={() => setSidebarOpen(false)}
        aria-label="Fechar menu lateral"
        type="button"
      >
        <svg
          width="24"
          height="24"
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
      </button>
      <div>
        <div className="flex items-center gap-3 px-6 py-8 animate-fade-in">
          <img
            src="/baixados.png"
            alt="Logo iCliente"
            className="w-12 h-12 drop-shadow-[0_2px_10px_rgba(0,255,255,0.7)] rounded-2xl border-2 border-cyan-400/40 bg-white/20"
            draggable="false"
          />
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-widest drop-shadow-[0_2px_10px_rgba(0,255,255,0.7)]">
            iCliente
          </span>
        </div>
        <nav className="flex flex-col gap-2 px-4 mt-4">
          <Link
            to="/produtos"
            className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
            onClick={() => setSidebarOpen(false)}
          >
            <span>Projetos</span>
          </Link>
          <Link
            to="/categorias"
            className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
            onClick={() => setSidebarOpen(false)}
          >
            <span>Squads/Areas</span>
          </Link>
          <Link
            to="/cadastrarproduto"
            className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
            onClick={() => setSidebarOpen(false)}
          >
            <span>Cadastrar Projeto</span>
          </Link>
          <Link
            to="/cadastrarcategorias"
            className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
            onClick={() => setSidebarOpen(false)}
          >
            <span>Cadastrar Squad/Area</span>
          </Link>
          <Link
            to="/perfil"
            className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
            onClick={() => setSidebarOpen(false)}
          >
            <span>Perfil</span>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              navigate('/login');
            }}
            className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10 bg-transparent border-none text-left"
          >
            <span>Sair</span>
          </button>
          {/* Administração/Usuários permanece */}
          <div className="mt-6 mb-2">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest pl-2">
              Administração
            </span>
          </div>
          <Link
            to="/perfil"
            className="sidebar-link neon-link flex items-center gap-3 py-2 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
            onClick={() => setSidebarOpen(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a7.5 7.5 0 0113 0" />
            </svg>
            <span>Usuários</span>
          </Link>
        </nav>
      </div>
      <div className="px-6 py-6 border-t border-cyan-400/20 flex flex-col gap-2 animate-fade-in">
        <div className="flex items-center gap-3">
          <img
            src={usuario.foto || '/baixados.png'}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover bg-white/20"
          />
          <span className="text-cyan-200 font-semibold text-base truncate drop-shadow">
            {usuario.nome}
          </span>
        </div>
        <span className="text-cyan-400 text-xs truncate">
          {usuario.usuario}
        </span>
      </div>
    </aside>
  );
}

export default Sidebar;
