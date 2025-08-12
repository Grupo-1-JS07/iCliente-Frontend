import { Link } from 'react-router-dom';
import type Categoria from '../../../models/Categorias';

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategorias({ categoria }: CardCategoriasProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a0a3c]/80 to-[#0a0026]/80 border border-cyan-400/40 shadow-2xl rounded-2xl flex flex-col overflow-hidden justify-between neon-box hover:scale-105 transition-transform duration-200">
      <header className="py-3 px-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-bold text-2xl text-center drop-shadow">
        Categoria
      </header>
      <p className="p-8 text-2xl text-cyan-100 bg-transparent h-full text-center font-semibold">
        {categoria.descricao}
      </p>
      <div className="flex">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-1/2 text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:from-cyan-300 hover:to-purple-400 font-bold flex items-center justify-center py-2 transition-all duration-200 neon-btn rounded-bl-2xl"
        >
          Editar
        </Link>
        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="w-1/2 text-white bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 hover:from-red-300 hover:to-purple-400 font-bold flex items-center justify-center py-2 transition-all duration-200 neon-btn rounded-br-2xl"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardCategorias;
