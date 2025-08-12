function Home() {
  const metrics = [
    { label: 'Clientes', value: 1280, color: '#22d3ee' },
    { label: 'Produtos', value: 342, color: '#a78bfa' },
    { label: 'Categorias', value: 12, color: '#60a5fa' },
  ];
  const notifications = [
    { id: 1, text: 'Novo cliente cadastrado: Maria Silva', time: 'há 2 min' },
    { id: 2, text: 'Produto "Notebook X" atualizado', time: 'há 10 min' },
    { id: 3, text: 'Categoria "Eletrônicos" removida', time: 'há 1h' },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-2 md:mt-4 px-2 md:px-4">
      {/* Card principal com gráfico */}
      <div className="dashboard-card col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-4 min-h-[220px] md:min-h-[260px] bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-cyan-200">Visão Geral</h2>
          <span className="text-xs text-cyan-400">Atualizado agora</span>
        </div>
        {/* Gráfico de pizza */}
        <div className="flex-1 flex items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 40 40">
            <circle r="16" cx="20" cy="20" fill="#181028" />
            <circle
              r="16"
              cx="20"
              cy="20"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="6"
              strokeDasharray="100 100"
              strokeDashoffset="0"
            />
            <circle
              r="16"
              cx="20"
              cy="20"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="6"
              strokeDasharray="27 100"
              strokeDashoffset="-100"
            />
            <circle
              r="16"
              cx="20"
              cy="20"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="6"
              strokeDasharray="8 100"
              strokeDashoffset="-127"
            />
          </svg>
          <div className="ml-8 flex flex-col gap-2">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ background: m.color }}
                ></span>
                <span className="text-cyan-100 font-semibold">{m.label}</span>
                <span className="text-cyan-300 font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card de notificações */}
      <div className="dashboard-card flex flex-col gap-3 min-h-[180px] md:min-h-[260px] bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-cyan-200 mb-2">Notificações</h2>
        <ul className="flex-1 flex flex-col gap-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="flex justify-between items-center bg-cyan-400/5 rounded-lg px-3 py-2"
            >
              <span className="text-cyan-100 text-sm">{n.text}</span>
              <span className="text-xs text-cyan-400 ml-2 whitespace-nowrap">
                {n.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
