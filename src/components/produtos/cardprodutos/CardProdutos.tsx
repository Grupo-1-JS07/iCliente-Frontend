import { Link } from 'react-router-dom';
import type Produtos from '../../../models/Produtos';

interface CardProdutosProps {
  produto: Produtos;
}

function CardProdutos({ produto }: CardProdutosProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a0a3c]/80 to-[#0a0026]/80 border border-cyan-400/40 shadow-2xl rounded-2xl flex flex-col overflow-hidden justify-between neon-box hover:scale-105 transition-transform duration-200">
      <div>
        <div className="flex w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 py-3 px-4 items-center gap-4">
          <img
            src={produto.usuario?.foto}
            className="h-12 w-12 rounded-full border-2 border-cyan-300 object-cover bg-slate-900"
            alt={produto.usuario?.nome}
          />
          <h3 className="text-lg font-bold text-white text-center uppercase drop-shadow">
            {produto.usuario?.nome}
          </h3>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h4 className="text-xl font-extrabold text-cyan-300 uppercase mb-1">
            {produto.nome}
          </h4>
          <p className="text-cyan-100 mb-1">{produto.descricao}</p>
          <p className="text-cyan-200 text-sm">
            Categoria:{' '}
            <span className="font-semibold">
              {produto.categoria?.descricao}
            </span>
          </p>
          <p className="text-cyan-200 text-sm">
            Data:{' '}
            {new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'short',
              timeStyle: 'short',
            }).format(new Date(produto.data))}
          </p>
        </div>
      </div>
      <div className="flex">
        <Link
          to={`/editarproduto/${produto.id}`}
          className="w-1/2 text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:from-cyan-300 hover:to-purple-400 font-bold flex items-center justify-center py-2 transition-all duration-200 neon-btn rounded-bl-2xl"
        >
          Editar
        </Link>
        <Link
          to={`/deletarproduto/${produto.id}`}
          className="w-1/2 text-white bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 hover:from-red-300 hover:to-purple-400 font-bold flex items-center justify-center py-2 transition-all duration-200 neon-btn rounded-br-2xl"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardProdutos;
