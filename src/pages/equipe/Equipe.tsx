import Daniel from '../../assets/img/Daniel.jpg';
import Brenndha from '../../assets/img/Brenndha.jpg';
import Kannanda from '../../assets/img/kannanda.jpg';
import Monique from '../../assets/img/Monique.jpg';
import Rafael from '../../assets/img/Rafael.jpg';
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
    nome: 'Daniel',
    cargo: 'Desenvolvedor Backend',
    skills: ['Node.js', 'NestJS', 'SQL'],
    contato: 'daniel@icliente.com',
    foto: Daniel,
    bio: 'Cria APIs robustas e escaláveis para dar vida às funcionalidades.'
  },
  {
    nome: 'Brenndha',
    cargo: 'Desenvolvedora Frontend',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    contato: 'brenndha@icliente.com',
    foto: Brenndha,
    bio: 'Transforma requisitos em interfaces funcionais e responsivas.'
  },
  {
    nome: 'Kannanda',
    cargo: 'Product Owner',
    skills: ['Gestão de Produto', 'Scrum', 'Kanban'],
    contato: 'kannanda@icliente.com',
    foto: Kannanda,
    bio: 'Traduz necessidades de negócio em soluções claras para o time.'
  },
  {
    nome: 'Monique',
    cargo: 'QA Engineer',
    skills: ['Jest', 'Cypress', 'Testes Automatizados'],
    contato: 'monique@icliente.com',
    foto: Monique,
    bio: 'Garante que cada entrega seja funcional, estável e livre de bugs.'
  },
  {
    nome: 'Rafael',
    cargo: 'Desenvolvedor Full Stack',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL'],
    contato: 'rafael@icliente.com',
    foto: Rafael,
    bio: 'Integra backend e frontend para entregar soluções completas.'
  },
  {
    nome: 'Sâmara',
    cargo: 'Scrum Master',
    skills: ['Scrum', 'Kanban', 'Facilitação de Times'],
    contato: 'samara@icliente.com',
    foto: Samara,
    bio: 'Mantém o time focado, organizado e colaborando de forma eficiente.'
  },
  {
    nome: 'Sara',
    cargo: 'Desenvolvedora Frontend',
    skills: ['React', 'CSS', 'HTML', 'TypeScript'],
    contato: 'sara@icliente.com',
    foto: fotoSara,
    bio: 'Cria experiências visuais fluidas e alinhadas à identidade do produto.'
  }
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
