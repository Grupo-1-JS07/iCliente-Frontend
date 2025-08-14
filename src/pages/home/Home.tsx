import { useContext, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// ...existing code...
import { AuthContext } from '../../context/AuthContext';
import { buscar } from '../../services/Services';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [usuarios, setUsuarios] = useState(0);
  const [produtos, setProdutos] = useState(0);
  const [categorias, setCategorias] = useState(0);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info');
      navigate('/');
      return;
    }

    buscar('/usuarios/all', (data) => setUsuarios(data.length || 0), {
      headers: { Authorization: token },
    }).catch((err) => {
      if (err.toString().includes('401')) handleLogout();
    });

    buscar('/produtos', (data) => setProdutos(data.length || 0), {
      headers: { Authorization: token },
    }).catch((err) => {
      if (err.toString().includes('401')) handleLogout();
    });

    buscar('/categorias', (data) => setCategorias(data.length || 0), {
      headers: { Authorization: token },
    }).catch((err) => {
      if (err.toString().includes('401')) handleLogout();
    });
  }, [token]);

  // Simulação de métricas tech
  const metrics = [
    { label: 'Leads Ativos', value: 32, color: '#22d3ee', icon: '🚀' },
    { label: 'Projetos em Andamento', value: 5, color: '#a78bfa', icon: '💻' },
    { label: 'Features Entregues', value: 12, color: '#60a5fa', icon: '🧩' },
    { label: 'Tickets Abertos', value: 3, color: '#f472b6', icon: '🎫' },
    { label: 'Clientes', value: usuarios, color: '#06b6d4', icon: '👥' },
    { label: 'Projetos', value: produtos, color: '#a3e635', icon: '📦' },
    { label: 'Squads/Areas', value: categorias, color: '#fbbf24', icon: '🏷️' },
  ];

  // Simulação de histórico para gráfico de linha
  const lineData = [
    { mes: 'Jan', clientes: 10, projetos: 2, squads: 1 },
    { mes: 'Fev', clientes: 15, projetos: 3, squads: 2 },
    { mes: 'Mar', clientes: 20, projetos: 4, squads: 2 },
    { mes: 'Abr', clientes: 25, projetos: 5, squads: 3 },
    { mes: 'Mai', clientes: usuarios, projetos: produtos, squads: categorias },
  ];

  // Cards de tendência
  const tendencia = [
    {
      label: 'Clientes',
      value: usuarios,
      trend: usuarios > 20 ? 'up' : 'down',
    },
    { label: 'Projetos', value: produtos, trend: produtos > 4 ? 'up' : 'down' },
    {
      label: 'Squads',
      value: categorias,
      trend: categorias > 2 ? 'up' : 'down',
    },
  ];

  // Busca rápida
  const [search, setSearch] = useState('');
  const filteredMetrics = metrics.filter((m) =>
    m.label.toLowerCase().includes(search.toLowerCase()),
  );

  // Ranking Top 3
  const ranking = [
    { nome: 'Cliente A', valor: 12 },
    { nome: 'Cliente B', valor: 9 },
    { nome: 'Cliente C', valor: 7 },
  ];

  // Alertas importantes
  const alertas = [
    { tipo: 'Ticket', texto: 'Ticket #123 aberto há 2 dias', critico: true },
    { tipo: 'Pendência', texto: 'Projeto X atrasado', critico: false },
  ];

  // Exportação de dados
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Métricas', 10, 10);
    doc.autoTable({
      head: [['Métrica', 'Valor']],
      body: metrics.map((m) => [m.label, m.value]),
    });
    doc.save('relatorio-metricas.pdf');
  };

  // Widget de feedback
  const [feedback, setFeedback] = useState('');
  const enviarFeedback = () => {
    ToastAlerta('Feedback enviado! Obrigado.', 'success');
    setFeedback('');
  };

  // Modo compacto/expandido
  const [compacto, setCompacto] = useState(false);
  const toggleCompacto = () => setCompacto((v) => !v);

  // Customização visual
  const [corBarra, setCorBarra] = useState('#22d3ee');

  // Dados para gráfico de pizza
  const pieData = [
    { name: 'Clientes', value: usuarios, color: '#06b6d4' },
    { name: 'Projetos', value: produtos, color: '#a3e635' },
    { name: 'Squads/Áreas', value: categorias, color: '#fbbf24' },
  ];

  // Filtro de período (simulado)
  const [period, setPeriod] = useState('atual');
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
    // Aqui você pode implementar lógica para buscar dados do período selecionado
  };

  const notifications = [
    { id: 1, text: 'Novo cliente cadastrado', time: 'Há 5 min' },
    { id: 2, text: 'Pedido #1023 foi concluído', time: 'Há 30 min' },
    { id: 3, text: 'Categoria "Promoções" atualizada', time: 'Ontem' },
  ];

  return (
    <div className="w-full flex flex-col gap-8 mt-2 md:mt-4 px-2 md:px-4">
      {/* Resumo rápido + cards de tendência */}
      <div className="flex flex-wrap gap-4 justify-center mb-2">
        {tendencia.map((t) => (
          <div
            key={t.label}
            className="flex flex-col items-center bg-cyan-900/80 rounded-lg p-4 min-w-[120px] shadow-lg"
          >
            <span className="text-2xl">
              {t.label === 'Clientes'
                ? '👥'
                : t.label === 'Projetos'
                  ? '📦'
                  : '🏷️'}
            </span>
            <span className="text-cyan-400 font-bold">{t.label}</span>
            <span className="text-cyan-200 text-xl font-bold">{t.value}</span>
            <span
              className={t.trend === 'up' ? 'text-green-400' : 'text-red-400'}
            >
              {t.trend === 'up' ? '▲' : '▼'}
            </span>
          </div>
        ))}
      </div>

      {/* Filtro de período + modo compacto/expandido + customização visual */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <label htmlFor="period" className="text-cyan-400 font-semibold">
          Período:
        </label>
        <select
          id="period"
          value={period}
          onChange={handlePeriodChange}
          className="bg-cyan-900 text-cyan-200 rounded px-2 py-1 border border-cyan-700"
        >
          <option value="atual">Mês Atual</option>
          <option value="anterior">Último Mês</option>
          <option value="ano">Ano</option>
        </select>
        <button
          onClick={toggleCompacto}
          className="bg-cyan-700 text-white px-2 py-1 rounded shadow ml-2"
        >
          {compacto ? 'Expandir' : 'Compactar'}
        </button>
        <label htmlFor="corBarra" className="text-cyan-400 font-semibold ml-2">
          Cor do Gráfico:
        </label>
        <input
          id="corBarra"
          type="color"
          value={corBarra}
          onChange={(e) => setCorBarra(e.target.value)}
          className="w-8 h-8 p-0 border-none bg-transparent"
        />
      </div>

      {/* Busca rápida */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Buscar métrica..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-cyan-900 text-cyan-200 rounded px-2 py-1 border border-cyan-700 w-full max-w-xs"
        />
      </div>

      {/* Links rápidos */}
      <div className="flex gap-4 mb-2 flex-wrap">
        <a
          href="/cadastro"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded shadow transition"
        >
          Cadastrar Cliente
        </a>
        <a
          href="/relatorios"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded shadow transition"
        >
          Ver Relatórios
        </a>
        <a
          href="/projetos"
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded shadow transition"
        >
          Projetos
        </a>
        <button
          onClick={exportarPDF}
          className="bg-cyan-700 text-white font-bold py-2 px-4 rounded shadow transition"
        >
          Exportar PDF
        </button>
      </div>

      {/* Alertas importantes */}
      <div className="flex flex-col gap-2 mb-2">
        {alertas.map((a, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${a.critico ? 'bg-red-700/30' : 'bg-yellow-700/20'}`}
          >
            <span className={a.critico ? 'text-red-400' : 'text-yellow-400'}>
              {a.critico ? '⚠️' : '🔔'}
            </span>
            <span className="text-cyan-200 text-sm">{a.texto}</span>
          </div>
        ))}
      </div>

      {/* Gráfico de barras das métricas (compacto/expandido) */}
      {!compacto && (
        <div className="bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl glass p-4 rounded-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            Métricas TechConnect
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={filteredMetrics}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barCategoryGap={20}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tick={{ fill: corBarra, fontWeight: 'bold', fontSize: 12 }}
                interval={0}
                angle={-15}
                dy={10}
              />
              <YAxis
                tick={{ fill: corBarra, fontWeight: 'bold', fontSize: 12 }}
              />
              <Tooltip
                wrapperStyle={{
                  backgroundColor: '#1a0a3c',
                  color: corBarra,
                  borderRadius: '8px',
                }}
              />
              <Legend wrapperStyle={{ color: corBarra }} />
              <Bar
                dataKey="value"
                fill={corBarra}
                radius={[8, 8, 0, 0]}
                label={{ position: 'top', fill: '#fff', fontWeight: 'bold' }}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Gráfico de linha de evolução */}
      <div className="bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl glass p-4 rounded-lg">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">
          Evolução Mensal
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={lineData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="mes"
              tick={{ fill: corBarra, fontWeight: 'bold', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: corBarra, fontWeight: 'bold', fontSize: 12 }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="clientes"
              stroke="#06b6d4"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="projetos"
              stroke="#a3e635"
              strokeWidth={3}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="squads"
              stroke="#fbbf24"
              strokeWidth={3}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de pizza de proporção */}
      <div className="bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl glass p-4 rounded-lg">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">
          Proporção Clientes/Projetos/Squads
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              isAnimationActive={true}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Ranking Top 3 */}
      <div className="bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl glass p-4 rounded-lg">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">Top 3 Clientes</h2>
        <ul className="flex flex-col gap-2">
          {ranking.map((r, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-cyan-500/5 rounded-lg px-3 py-2"
            >
              <span className="text-cyan-400 text-sm">{r.nome}</span>
              <span className="text-xs text-cyan-600 ml-2 whitespace-nowrap">
                {r.valor} pts
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Widget de feedback */}
      <div className="bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl glass p-4 rounded-lg flex flex-col gap-2">
        <h2 className="text-xl font-bold text-cyan-400 mb-2">Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Deixe sua sugestão ou reporte um problema..."
          className="bg-cyan-900 text-cyan-200 rounded px-2 py-1 border border-cyan-700 resize-none min-h-[60px]"
        />
        <button
          onClick={enviarFeedback}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded shadow transition self-end"
        >
          Enviar
        </button>
      </div>

      {/* Card de notificações */}
      <div className="dashboard-card flex flex-col gap-3 min-h-[180px] md:min-h-[260px]">
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

      {/* Widget calendário (simulado) */}
      <div className="bg-gradient-to-br from-[#0f0026]/90 via-[#1a0a3c]/90 to-[#0a0026]/90 border border-cyan-400/40 shadow-2xl backdrop-blur-xl glass p-4 rounded-lg flex flex-col gap-2">
        <h2 className="text-xl font-bold text-cyan-400 mb-2">
          Próximos Eventos
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="flex justify-between items-center bg-cyan-500/5 rounded-lg px-3 py-2">
            <span className="text-cyan-400 text-sm">Reunião de Squad</span>
            <span className="text-xs text-cyan-600 ml-2 whitespace-nowrap">
              15/08/2025
            </span>
          </li>
          <li className="flex justify-between items-center bg-cyan-500/5 rounded-lg px-3 py-2">
            <span className="text-cyan-400 text-sm">Entrega Projeto X</span>
            <span className="text-xs text-cyan-600 ml-2 whitespace-nowrap">
              20/08/2025
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
