const relatorios = [
  {
    titulo: 'Progresso dos Projetos',
    valor: '70%',
    cor: '#22d3ee',
    icone: '📈',
  },
  { titulo: 'Vendas do Mês', valor: 'R$ 12.500', cor: '#a78bfa', icone: '💸' },
  { titulo: 'Tickets Fechados', valor: '18', cor: '#60a5fa', icone: '🎫' },
];

export default function Relatorios() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow mb-2">
          Relatórios Dinâmicos
        </h1>
        <p className="text-cyan-200 text-lg">
          Acompanhe os KPIs e resultados da sua startup tech!
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatorios.map((r) => (
          <div
            key={r.titulo}
            className="glass neon-box p-6 rounded-2xl flex flex-col gap-3 shadow-2xl border border-cyan-400/30 items-center"
          >
            <span className="text-3xl mb-2">{r.icone}</span>
            <h2 className="text-lg font-bold text-cyan-200">{r.titulo}</h2>
            <span
              className="text-cyan-400 font-semibold text-2xl"
              style={{ color: r.cor }}
            >
              {r.valor}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
