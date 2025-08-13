import { Link } from 'react-router-dom';
import type Categoria from '../../../models/Categorias';

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategorias({ categoria }: CardCategoriasProps) {
  const projetos = categoria.produto || [];
  return (
    <li className="border-b border-cyan-400/40 py-4 px-2 flex flex-col md:flex-row md:items-center justify-between hover:bg-[#1a0a3c]/40 transition-all">
      <div>
        <strong className="text-cyan-300 text-lg">{categoria.descricao}</strong>
        <span className="text-cyan-400 ml-2">Projetos: {projetos.length}</span>
        {projetos.length > 0 && (
          <ul className="text-cyan-200 text-xs pl-4 list-disc mt-2">
            {projetos.map((p) => (
              <li key={p.id}>{p.nome}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="text-white bg-cyan-500 hover:bg-cyan-400 font-bold py-1 px-3 rounded transition-all"
        >
          Editar
        </Link>
        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="text-white bg-pink-500 hover:bg-pink-400 font-bold py-1 px-3 rounded transition-all"
        >
          Deletar
        </Link>
      </div>
    </li>
  );
}

export default CardCategorias;
