import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

// Ícones do Heroicons (SVG inline para evitar dependências)
const icons = {
  dashboard: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z"
      />
    </svg>
  ),
  produtos: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4"
      />
    </svg>
  ),
  categorias: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  ),
  add: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  perfil: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
      />
    </svg>
  ),
};

function Sidebar() {
  const { usuario } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // Sidebar oculta em telas pequenas, botão para abrir
  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-cyan-400/80 text-white rounded-full p-2 shadow-lg md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menu lateral"
        style={{ display: open ? 'none' : 'block' }}
      >
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
      </button>
      <aside
        className={`h-screen w-64 bg-white/10 backdrop-blur-xl border-r border-cyan-400/20 shadow-2xl flex flex-col justify-between fixed left-0 top-0 z-40 transition-all duration-300
        ${open ? 'block' : 'hidden'} md:block`}
        style={{
          boxShadow: '0 8px 32px 0 rgba(0,255,255,0.15), 0 1.5px 0 0 #6d28d9',
        }}
      >
        <div>
          <div className="flex items-center gap-3 px-6 py-8 animate-fade-in">
            <img
              src="/baixados.png"
              alt="Logo iCliente"
              className="w-12 h-12 drop-shadow-[0_2px_10px_rgba(0,255,255,0.7)] rounded-2xl border-2 border-cyan-400/40 bg-white/20"
              draggable="false"
            />
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-widest drop-shadow-[0_2px_10px_rgba(0,255,255,0.7)]">
              iCLIENTE
            </span>
          </div>
          <nav className="flex flex-col gap-2 px-4 mt-4">
            <Link
              to="/home"
              className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
              onClick={() => setOpen(false)}
            >
              {icons.dashboard}
              <span>Dashboard</span>
            </Link>
            <Link
              to="/produtos"
              className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
              onClick={() => setOpen(false)}
            >
              {icons.produtos}
              <span>Produtos</span>
            </Link>
            <Link
              to="/categorias"
              className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
              onClick={() => setOpen(false)}
            >
              {icons.categorias}
              <span>Categorias</span>
            </Link>
            <Link
              to="/cadastrarproduto"
              className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
              onClick={() => setOpen(false)}
            >
              {icons.add}
              <span>Novo Produto</span>
            </Link>
            <Link
              to="/cadastrarcategorias"
              className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
              onClick={() => setOpen(false)}
            >
              {icons.add}
              <span>Nova Categoria</span>
            </Link>
            <Link
              to="/perfil"
              className="sidebar-link neon-link flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-cyan-400/10"
              onClick={() => setOpen(false)}
            >
              {icons.perfil}
              <span>Perfil</span>
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
    </>
  );
}

export default Sidebar;
