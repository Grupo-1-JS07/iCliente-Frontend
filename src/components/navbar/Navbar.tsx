import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSidebar } from '../../context/SidebarContext';

function Navbar() {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const [open, setOpen] = useState(false); // menu mobile
  const [dark, setDark] = useState(false); // modo escuro/claro
  const [search, setSearch] = useState(''); // busca global (inicializado corretamente)
  const [showProfile, setShowProfile] = useState(false); // menu perfil
  const [online, setOnline] = useState(true); // status conexão
  const [notifications] = useState(2); // badge notificações

  // Simulação de nome/avatar
  const user = {
    avatar: 'https://ui-avatars.com/api/?name=U&background=0f0026&color=fff',
    name: '',
  };

  // Detecta status de conexão
  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);

  return (
    <nav
      className={`top-0 left-0 w-full z-40 bg-gradient-to-r from-[#0f0026] via-[#1a0a3c] to-[#0a0026] text-white shadow-lg py-2 px-0 transition duration-300 ${dark ? 'dark' : ''}`}
    >
  <div className="flex flex-row flex-nowrap items-center gap-4 px-4 min-h-[60px] w-full">
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
        {/* Busca global */}
        <div className="hidden md:flex items-center gap-2 ml-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="bg-cyan-900 text-cyan-200 rounded px-2 py-1 border border-cyan-700 w-32 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Buscar global"
          />
        </div>
        {/* Status de conexão */}
        <span
          className={`hidden md:inline-block ml-4 px-2 py-1 rounded text-xs font-bold ${online ? 'bg-green-700 text-green-300' : 'bg-red-700 text-red-300'}`}
        >
          {online ? 'Online' : 'Offline'}
        </span>
        {/* Notificações */}
        <button
          className="relative hidden md:inline-block ml-4"
          aria-label="Notificações"
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-bold animate-pulse">
              {notifications}
            </span>
          )}
        </button>
        {/* Modo escuro/claro */}
        <button
          className="ml-4 hidden md:inline-block"
          onClick={() => setDark((d) => !d)}
          aria-label="Alternar tema"
        >
          {dark ? (
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
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              />
            </svg>
          )}
        </button>
        {/* Avatar do usuário */}
        <div className="relative ml-4">
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setShowProfile((v) => !v)}
            aria-label="Abrir menu de perfil"
          >
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full border-2 border-cyan-400"
            />
            {/* Nome do usuário removido */}
          </button>
          {/* Menu de perfil */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-cyan-900 rounded shadow-lg z-50 flex flex-col">
              <Link
                to="/perfil"
                className="px-4 py-2 hover:bg-cyan-800 text-cyan-200"
                onClick={() => setShowProfile(false)}
              >
                Meu Perfil
              </Link>
              <button
                className="px-4 py-2 hover:bg-cyan-800 text-cyan-200 text-left"
                onClick={() => setShowProfile(false)}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {/* Menu desktop */}
  <div className="hidden md:flex gap-6 text-lg overflow-x-auto max-w-full">
          <Link to="/home" className="neon-link group">
            Dashboard
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link to="/projetos" className="neon-link group">
            Projetos
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link to="/equipe" className="neon-link group">
            Equipe
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link to="/relatorios" className="neon-link group">
            Relatórios
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link to="/integracoes" className="neon-link group">
            Integrações
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
        </div>
        {/* Botão menu mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 ml-2 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? (
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
      </div>
      {/* Menu mobile dropdown */}
      <div
        className={`md:hidden absolute left-0 top-full w-full bg-gradient-to-r from-[#0f0026] via-[#1a0a3c] to-[#0a0026] shadow-lg z-50 transition-all duration-300 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="flex flex-col gap-4 py-4 px-6 text-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="bg-cyan-900 text-cyan-200 rounded px-2 py-1 border border-cyan-700 w-full mb-2"
            aria-label="Buscar global"
          />
          <span
            className={`mb-2 px-2 py-1 rounded text-xs font-bold ${online ? 'bg-green-700 text-green-300' : 'bg-red-700 text-red-300'}`}
          >
            {online ? 'Online' : 'Offline'}
          </span>
          <Link
            to="/home"
            className="neon-link group"
            onClick={() => setOpen(false)}
          >
            Dashboard
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link
            to="/leads"
            className="neon-link group"
            onClick={() => setOpen(false)}
          >
            Leads
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link
            to="/projetos"
            className="neon-link group"
            onClick={() => setOpen(false)}
          >
            Projetos
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link
            to="/roadmap"
            className="neon-link group"
            onClick={() => setOpen(false)}
          >
            Roadmap
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link
            to="/equipe"
            className="neon-link group"
            onClick={() => setOpen(false)}
          >
            Equipe
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link
            to="/relatorios"
            className="neon-link group"
            onClick={() => setOpen(false)}
          >
            Relatórios
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <Link
            to="/integracoes"
            className="neon-link group"
            onClick={() => setOpen(false)}
          >
            Integrações
            <span className="block h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
          <button
            className="flex items-center gap-2 mt-2"
            onClick={() => setDark((d) => !d)}
            aria-label="Alternar tema"
          >
            {dark ? (
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
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
              </svg>
            )}
            <span>{dark ? 'Modo Escuro' : 'Modo Claro'}</span>
          </button>
          <div className="flex items-center gap-2 mt-2">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full border-2 border-cyan-400"
            />
            <span className="text-cyan-200 font-bold">{user.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
