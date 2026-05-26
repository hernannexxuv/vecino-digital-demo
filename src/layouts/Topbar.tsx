import { Menu, Bell, Shield, ChevronDown } from 'lucide-react';
import { roleInfo, notifications } from '../data/mockData';
import type { Role } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  toggleSidebar: () => void;
}

export default function Topbar({ currentRole, setCurrentRole, toggleSidebar }: TopbarProps) {
  const navigate = useNavigate();
  const info = roleInfo[currentRole];

  // Manejar el cambio de rol en vivo y redirigir a la ruta adecuada
  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    if (role === 'municipalidad' || role === 'superadmin') {
      navigate('/dideco');
    } else if (role === 'directiva') {
      navigate('/directiva/asamblea');
    } else {
      navigate('/inicio');
    }
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <header className="h-16 bg-white border-b border-gray-200/80 flex items-center justify-between px-4 md:px-6 z-20 shadow-sm">
      {/* Botón menú móvil */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
          Plataforma de Gestión GovTech
        </h1>
      </div>

      {/* Controles de la Demo */}
      <div className="flex items-center gap-4">
        {/* Selector de Simulación de Roles */}
        <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 gap-2 shadow-sm">
          <Shield size={16} className="text-indigo-500 animate-blink" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:inline">Demo Mode:</span>
          <select
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value as Role)}
            className="bg-transparent text-sm font-semibold text-gray-700 focus:outline-none pr-2 cursor-pointer"
          >
            <option value="municipalidad">Municipalidad (DIDECO)</option>
            <option value="directiva">Junta de Vecinos (Directiva)</option>
            <option value="vecino">Vista Vecino Común</option>
            <option value="superadmin">Super Admin Global</option>
          </select>
          <ChevronDown size={14} className="text-gray-400 pointer-events-none absolute right-2" />
        </div>

        {/* Notificaciones */}
        <button className="p-2 rounded-xl hover:bg-gray-50 text-gray-500 relative transition-colors">
          <Bell size={20} />
          {hasUnread && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>

        {/* Perfil de Usuario */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{info.name}</p>
            <p className="text-xs font-medium text-gray-400">{info.badge}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {info.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
