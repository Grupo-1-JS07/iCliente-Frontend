import { useEffect, useState } from 'react';
import { buscar } from '../../services/Services';

interface MembroEquipe {
  nome: string;
  cargo: string;
  skills: string[];
  contato: string;
}

const cargos = [
  'Dev Frontend',
  'Dev Backend',
  'Product Owner',
  'UX/UI Designer',
  'QA',
  'Scrum Master',
];
const skillsList = [
  'React',
  'TypeScript',
  'Node',
  'PostgreSQL',
  'Scrum',
  'Kanban',
  'Figma',
  'Design System',
  'Jest',
  'Cypress',
];

export default function Equipe() {
  const [equipe, setEquipe] = useState<MembroEquipe[]>([]);

  useEffect(() => {
    buscar(
      '/usuarios/all',
      (data: any[]) => {
        const equipeComInfo: MembroEquipe[] = data.map((u) => ({
          nome: u.nome,
          cargo: cargos[Math.floor(Math.random() * cargos.length)],
          skills: [
            skillsList[Math.floor(Math.random() * skillsList.length)],
            skillsList[Math.floor(Math.random() * skillsList.length)],
          ],
          contato: u.usuario,
        }));
        setEquipe(equipeComInfo);
      },
      {},
    );
  }, []);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow mb-2">
          Equipe & Squads
        </h1>
        <p className="text-cyan-200 text-lg">
          Conheça os talentos tech da sua startup!
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipe.map((m) => (
          <div
            key={m.nome + m.contato}
            className="glass neon-box p-6 rounded-2xl flex flex-col gap-3 shadow-2xl border border-cyan-400/30"
          >
            <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
              <span role="img" aria-label="dev">
                👩‍💻
              </span>{' '}
              {m.nome}
            </h2>
            <span className="text-cyan-400 font-semibold">{m.cargo}</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {m.skills.map((s: string) => (
                <span
                  key={s}
                  className="bg-cyan-800/40 text-cyan-200 px-2 py-1 rounded-full text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
            <span className="text-xs text-cyan-400 mt-2">
              Contato: {m.contato}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
