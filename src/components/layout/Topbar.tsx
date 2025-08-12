import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Topbar() {
  const { usuario } = useContext(AuthContext);
  return (
    <header
      className="fixed left-64 top-0 right-0 h-20 glass flex items-center px-10 z-30 shadow-lg border-b border-cyan-400/20 animate-fade-in"
      style={{
        backdropFilter: 'blur(18px) saturate(180%)',
        background: 'rgba(16, 0, 38, 0.75)',
      }}
    >
      <div className="flex-1 flex items-center gap-4">
        <span className="text-2xl font-extrabold text-cyan-300 tracking-wide drop-shadow">
          Bem-vindo, {usuario.nome || 'Usuário'}!
        </span>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={usuario.foto || '/baixados.png'}
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover bg-white/20"
        />
        <span className="text-cyan-200 font-semibold text-base truncate drop-shadow">
          {usuario.usuario}
        </span>
      </div>
    </header>
  );
}

export default Topbar;
