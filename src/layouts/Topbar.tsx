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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-6 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 hidden sm:block tracking-tighter">
          Plataforma GovTech · Ilustre Municipalidad de Temuco
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Selector de Simulación teñido de Primary (Azul Temuco) */}
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5 gap-2 shadow-inner">
          <Shield size={16} className="text-primary animate-blink" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:inline">Demo:</span>
          <select
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value as Role)}
            className="bg-transparent text-sm font-semibold text-slate-900 focus:outline-none pr-2 cursor-pointer"
          >
            <option value="municipalidad">DIDECO (Muni)</option>
            <option value="directiva">Junta de Vecinos</option>
            <option value="vecino">Vecino Ciudadano</option>
          </select>
          <ChevronDown size={14} className="text-slate-400 absolute right-2 pointer-events-none" />
        </div>

        {/* Notificaciones */}
        <button className="p-2.5 rounded-2xl hover:bg-slate-100 text-slate-500 relative transition-colors">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white animate-blink" />
          )}
        </button>

        {/* Perfil teñido sutilmente del Secondary (Verde Temuco) */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="w-9 h-9 rounded-2xl bg-secondary flex items-center justify-center text-white font-black text-sm shadow-apple-md">
            {info.name.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{info.name}</p>
            <p className="text-[11px] font-bold text-secondary bg-secondary-light px-2 py-0.5 rounded-lg border border-secondary/10 uppercase tracking-wider">{info.badge}</p>
          </div>
        </div>
      </div>
    </header>
  );
}