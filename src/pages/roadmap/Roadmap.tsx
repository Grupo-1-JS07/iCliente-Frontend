const features = [
  { nome: 'Login Social', status: 'Planejada', icone: '🛠️' },
  { nome: 'Integração Slack', status: 'Em desenvolvimento', icone: '💬' },
  { nome: 'Relatórios Dinâmicos', status: 'Entregue', icone: '📊' },
  { nome: 'Kanban Visual', status: 'Em desenvolvimento', icone: '🗂️' },
];

const statusColors: Record<string, string> = {
  Planejada: 'bg-cyan-700/40',
  'Em desenvolvimento': 'bg-purple-700/40',
  Entregue: 'bg-green-700/40',
};

export default function Roadmap() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow mb-2">
          Roadmap de Produto
        </h1>
        <p className="text-cyan-200 text-lg">
          Visualize as features planejadas, em desenvolvimento e entregues!
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.nome}
            className={`glass neon-box p-6 rounded-2xl flex flex-col gap-3 shadow-2xl border border-cyan-400/30 items-center ${statusColors[f.status]}`}
          >
            <span className="text-3xl mb-2">{f.icone}</span>
            <h2 className="text-lg font-bold text-cyan-200">{f.nome}</h2>
            <span className="text-cyan-400 font-semibold">{f.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
