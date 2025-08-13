const integracoes = [
  { nome: 'Slack', status: 'Ativa', icone: '💬' },
  { nome: 'GitHub', status: 'Ativa', icone: '🐙' },
  { nome: 'Jira', status: 'Inativa', icone: '📋' },
];

export default function Integracoes() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow mb-2">
          Integrações & Automação
        </h1>
        <p className="text-cyan-200 text-lg">
          Conecte seu CRM com Slack, GitHub, Jira e muito mais!
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integracoes.map((i) => (
          <div
            key={i.nome}
            className="glass neon-box p-6 rounded-2xl flex flex-col gap-3 shadow-2xl border border-cyan-400/30 items-center"
          >
            <span className="text-3xl">{i.icone}</span>
            <h2 className="text-lg font-bold text-cyan-200">{i.nome}</h2>
            <span
              className={`text-xs font-semibold ${i.status === 'Ativa' ? 'text-green-400' : 'text-red-400'}`}
            >
              {i.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
