import { useEffect, useState } from 'react';
import { buscar } from '../../services/Services';

function Home() {
  // Métricas mockadas para visual TechConnect
  const [clientes, setClientes] = useState(0);
  const [produtos, setProdutos] = useState(0);
  const [categorias, setCategorias] = useState(0);

  // Simulação de métricas tech
  const metrics = [
    { label: 'Leads Ativos', value: 32, color: '#22d3ee', icon: '🚀' },
    { label: 'Projetos em Andamento', value: 5, color: '#a78bfa', icon: '💻' },
    { label: 'Features Entregues', value: 12, color: '#60a5fa', icon: '🧩' },
    { label: 'Tickets Abertos', value: 3, color: '#f472b6', icon: '🎫' },
    { label: 'Clientes', value: clientes, color: '#06b6d4', icon: '👥' },
    { label: 'Produtos', value: produtos, color: '#a3e635', icon: '📦' },
    { label: 'Categorias', value: categorias, color: '#fbbf24', icon: '🏷️' },
  ];

  // Notificações mockadas
  const notifications = [
    { id: 1, text: 'Novo lead: Startup X', time: 'há 2 min' },
    { id: 2, text: 'Projeto "App Mobile" atualizado', time: 'há 10 min' },
    { id: 3, text: 'Feature "Login Social" entregue', time: 'há 1h' },
    { id: 4, text: 'Ticket #123 aberto', time: 'há 2h' },
  ];

  // Buscar dados reais do backend para clientes, produtos, categorias
  useEffect(() => {
    buscar('/usuarios/all', (data) => setClientes(data.length || 0), {});
    buscar('/produtos', (data) => setProdutos(data.length || 0), {});
    buscar('/categorias', (data) => setCategorias(data.length || 0), {});
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-2 md:mt-4 px-2 md:px-4">
      {/* Cards de métricas TechConnect */}
      {metrics.map((m) => (
        <div
          key={m.label}
          className="dashboard-card flex flex-col items-center justify-center gap-2 min-h-[120px] bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl glass"
        >
          <span className="text-3xl">{m.icon}</span>
          <span className="text-cyan-500 font-semibold">{m.label}</span>
          <span className="text-cyan-200 text-2xl font-bold">{m.value}</span>
        </div>
      ))}

      {/* Card de notificações */}
      <div className="dashboard-card flex flex-col gap-3 min-h-[180px] md:min-h-[260px] col-span-1 md:col-span-2 lg:col-span-3">
        <h2 className="text-xl font-bold text-cyan-400 mb-2">Notificações</h2>
        <ul className="flex-1 flex flex-col gap-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="flex justify-between items-center bg-cyan-500/5 rounded-lg px-3 py-2"
            >
              <span className="text-cyan-400 text-sm">{n.text}</span>
              <span className="text-xs text-cyan-600 ml-2 whitespace-nowrap">
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
