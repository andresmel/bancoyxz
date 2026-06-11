import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";  // ← NavLink no Link

export const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-slate-700 text-white font-semibold"  // ← activo
        : "hover:bg-slate-800 text-gray-300"       // ← inactivo
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Menu /> Operaciones
      </h2>

      <nav>
        <ul className="space-y-3">
          <li>
            <NavLink to="/dashboard" end className={linkClass}>
              Saldo Atual
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/transfers" className={linkClass}>
              Transferências Bancárias
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/scheduled-transfers" className={linkClass}>
              Transferências Agendadas
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/transfer-history" className={linkClass}>
              Histórico de Transferências
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/tests" className={linkClass}>
              Testes Unitários
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};