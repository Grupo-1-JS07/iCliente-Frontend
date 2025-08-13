/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { buscar } from '../../../services/Services';
import CardCategorias from '../cardcategorias/cardCategorias';
import type Categoria from '../../../models/Categorias';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function ListaCategorias() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategoria() {
    try {
      await buscar('/categorias', setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarCategoria();
  }, [categorias.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#0f0026] via-[#1a0a3c] to-[#0a0026] animate-bg-move py-8">
      <div className="w-full max-w-6xl flex flex-col items-center mb-8">
        <h1 className="text-cyan-300 text-4xl font-extrabold text-center mb-2 drop-shadow-[0_2px_20px_rgba(0,255,255,0.7)]">
          Squads & Áreas
        </h1>
        <p className="text-cyan-200 text-lg text-center mb-4">
          Organize as squads, áreas e especialidades tech da sua startup!
        </p>
      </div>
      {categorias.length === 0 ? (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      ) : (
        <ul className="w-full max-w-4xl mx-auto bg-[#1a0a3c]/40 rounded-lg shadow-lg divide-y divide-cyan-400/20 px-4 py-2">
          {categorias.map((categoria) => (
            <CardCategorias key={categoria.id} categoria={categoria} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaCategorias;
