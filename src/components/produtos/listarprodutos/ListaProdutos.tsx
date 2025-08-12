/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { DNA } from 'react-loader-spinner';
import type Produtos from '../../../models/Produtos';
import { AuthContext } from '../../../context/AuthContext';
import { buscar } from '../../../services/Services';
import CardProdutos from '../cardprodutos/CardProdutos';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function ListaProdutos() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produtos[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutos() {
    try {
      await buscar('/produtos', setProdutos, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
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
    buscarProdutos();
  }, [produtos.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#0f0026] via-[#1a0a3c] to-[#0a0026] animate-bg-move py-8">
      <div className="w-full max-w-6xl flex flex-col items-center mb-8">
        <h1 className="text-cyan-300 text-4xl font-extrabold text-center mb-2 drop-shadow-[0_2px_20px_rgba(0,255,255,0.7)]">
          Produtos
        </h1>
        <p className="text-cyan-200 text-lg text-center mb-4">
          Veja, edite ou adicione produtos do seu sistema.
        </p>
        <Link
          to="/cadastrarproduto"
          className="rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg hover:from-cyan-300 hover:to-purple-400 text-white font-bold py-2 px-8 text-lg transition-all duration-200 neon-btn mb-6"
        >
          + Adicionar Produto
        </Link>
      </div>
      {produtos.length === 0 ? (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {produtos.map((produto) => (
            <CardProdutos key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaProdutos;
