import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [usuario.token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0026] via-[#1a0a3c] to-[#0a0026] animate-bg-move py-8">
      <div className="w-full max-w-xl flex flex-col items-center neon-box rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1a0a3c]/80 to-[#0a0026]/80 border border-cyan-400/40">
        <div className="w-full h-48 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center">
          <span className="text-3xl font-extrabold text-white drop-shadow">
            Perfil do Usuário
          </span>
        </div>
        <div className="relative flex flex-col items-center -mt-20">
          <img
            className="rounded-full w-40 h-40 border-8 border-cyan-300 shadow-lg object-cover bg-slate-900"
            src={usuario.foto}
            alt={`Foto de perfil de ${usuario.nome}`}
            onError={(e) =>
              (e.currentTarget.src =
                'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff')
            }
          />
          <div className="mt-6 flex flex-col items-center gap-2 w-full px-6 pb-8">
            <p className="text-cyan-200 text-xl font-bold text-center">
              {usuario.nome}
            </p>
            <p className="text-cyan-100 text-lg text-center break-all">
              {usuario.usuario}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
