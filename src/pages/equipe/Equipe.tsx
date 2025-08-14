import Daniel from '../../assets/img/Daniel.jpg';
import Brenndha from '../../assets/img/Brenndha.jpg';
import Kannanda from '../../assets/img/kannanda.jpg';
import Monique from '../../assets/img/Monique.jpg';
import Rafael from '../../assets/img/rafael.jpg';
import Samara from '../../assets/img/Samara.jpeg';
import fotoSara from '../../assets/img/sara.jpg';

interface MembroEquipe {
  nome: string;
  cargo: string;
  skills: string[];
  contato: string;
  foto: string;
  bio: string;
}

const equipeFixa: MembroEquipe[] = [
  {
    nome: 'Brenndha',
    cargo: 'Dev Full Stack JavaScript',
    skills: ['Gestão de Produto', 'Scrum', 'Kanban'],
    contato: 'brenndha@icliente.com',
    foto: Brenndha,
    bio: 'Suporte ao time com foco em documentação e padrões visuais.'
  },
  {
    nome: 'Daniel',
    cargo: 'Dev Full Stack JavaScript',
    skills: ['Node.js', 'NestJS', 'SQL'],
    contato: 'daniel@icliente.com',
    foto: Daniel,
    bio: 'Focado no backend, entrega APIs escaláveis e bem estruturadas.'
  },
  {
    nome: 'Kannanda',
    cargo: 'Dev Full Stack JavaScript',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    contato: 'kannanda@icliente.com',
    foto: Kannanda,
    bio: 'Conecta visão de produto com desenvolvimento frontend.'
  },
  {
    nome: 'Monique',
    cargo: 'Dev Full Stack JavaScript',
    skills: ['Jest', 'Cypress', 'Testes Automatizados'],
    contato: 'monique@icliente.com',
    foto: Monique,
    bio: 'Apoia a qualidade com testes e documentação técnica.'
  },
  {
    nome: 'Rafael',
    cargo: 'Dev Full Stack JavaScript',
    skills: [ 'TypeScript', 'React', 'Node.js', 'SQL'],
    contato: 'rafael@icliente.com',
    foto: Rafael,
    bio: 'Integra backend e frontend com domínio da stack JS.'
  },
  {
    nome: 'Sâmara',
    cargo: 'Dev Full Stack JavaScript',
    skills: ['Scrum', 'Kanban', 'TypeScript'],
    contato: 'samara@icliente.com',
    foto: Samara,
    bio: 'Garante organização técnica e foco nas entregas backend.'
  },
  {
    nome: 'Sara',
    cargo: 'Dev Full Stack JavaScript',
    skills: ['React', 'CSS', 'HTML', 'TypeScript'],
    contato: 'sara@icliente.com',
    foto: fotoSara,
    bio: 'Focada no frontend, cria interfaces fluidas e alinhadas.'
  },
];

export default function Equipe() {
  return (
    // Este container ocupa a altura da tela menos o header e footer
    <div className="min-h-[calc(100vh-160px)] flex flex-col justify-center items-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow mb-2">
          Equipe & Squads
        </h1>
        <p className="text-cyan-200 text-lg">
          Conheça os talentos tech da sua startup!
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {equipeFixa.map((m) => (
          <div
            key={m.nome}
            className="dashboard-card glass neon-box p-6 rounded-2xl flex flex-col gap-3 shadow-2xl border border-cyan-400/30 items-center"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-300">
              <img src={m.foto} alt={m.nome} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-cyan-300 text-center">{m.nome}</h2>
            <span className="text-cyan-400 font-semibold">{m.cargo}</span>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {m.skills.map((s) => (
                <span
                  key={s}
                  className="bg-cyan-800/40 text-cyan-200 px-2 py-1 rounded-full text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="text-xs text-cyan-200 mt-2 text-center">{m.bio}</p>
            <span className="text-xs text-cyan-400 mt-2">
              Contato: {m.contato}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
