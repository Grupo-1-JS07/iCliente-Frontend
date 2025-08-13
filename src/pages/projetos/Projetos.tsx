import { useEffect, useState } from 'react';
import { buscar } from '../../services/Services';

interface Projeto {
  nome: string;
  status: string;
  membros: string[];
  progresso: number;
}

const statusList = ['Em planejamento', 'Em andamento', 'Concluído'];

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  useEffect(() => {
    buscar(
      '/produtos',
      (data: any[]) => {
        const projetosComStatus: Projeto[] = data.map((p) => ({
          nome: p.nome,
          status: statusList[Math.floor(Math.random() * statusList.length)],
          membros: [p.usuario?.nome || 'Equipe Tech'],
          progresso: p.disponibilidade
            ? Math.floor(Math.random() * 100) + 1
            : 100,
        }));
        setProjetos(projetosComStatus);
      },
      {},
    );
  }, []);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow mb-2">
          Projetos & Sprints
        </h1>
        <p className="text-cyan-200 text-lg">
          Gerencie os projetos tech da sua startup!
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetos.map((p) => (
          <div
            key={p.nome + p.status}
            className="glass neon-box p-6 rounded-2xl flex flex-col gap-3 shadow-2xl border border-cyan-400/30"
          >
            <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
              <span role="img" aria-label="projeto">
                💻
              </span>{' '}
              {p.nome}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-semibold">Status:</span>
              <span className="text-cyan-200">{p.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-semibold">Squad:</span>
              <span className="text-cyan-200">{p.membros.join(', ')}</span>
            </div>
            <div className="w-full bg-cyan-900/30 rounded-full h-3 mt-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full"
                style={{ width: `${p.progresso}%` }}
              ></div>
            </div>
            <span className="text-xs text-cyan-400">
              Progresso: {p.progresso}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
