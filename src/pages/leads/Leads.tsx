import { useEffect, useState } from 'react';
import { buscar } from '../../services/Services';

interface Lead {
  nome: string;
  contato: string;
  status: string;
}

const statusList = ['Lead', 'Proposta', 'Fechado', 'Pós-venda'];
const statusColors: Record<string, string> = {
  Lead: 'bg-cyan-700/40',
  Proposta: 'bg-purple-700/40',
  Fechado: 'bg-green-700/40',
  'Pós-venda': 'bg-yellow-700/40',
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    buscar(
      '/usuarios/all',
      (data: any[]) => {
        const leadsComStatus: Lead[] = data.map((u) => ({
          nome: u.nome,
          contato: u.usuario,
          status: statusList[Math.floor(Math.random() * statusList.length)],
        }));
        setLeads(leadsComStatus);
      },
      {},
    );
  }, []);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow mb-2">
          Leads & Clientes
        </h1>
        <p className="text-cyan-200 text-lg">
          Acompanhe o funil de vendas da sua startup tech!
        </p>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((l) => (
          <div
            key={l.nome + l.contato}
            className={`glass neon-box p-6 rounded-2xl flex flex-col gap-3 shadow-2xl border border-cyan-400/30 ${statusColors[l.status]}`}
          >
            <h2 className="text-lg font-bold text-cyan-200 flex items-center gap-2">
              <span role="img" aria-label="lead">
                🚀
              </span>{' '}
              {l.nome}
            </h2>
            <span className="text-cyan-400 font-semibold">{l.status}</span>
            <span className="text-xs text-cyan-400 mt-2">
              Contato: {l.contato}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
