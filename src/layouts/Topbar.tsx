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

      <div className="flex items-center gap-2 md:gap-4">
        {/* Selector de Simulación teñido de Primary (Azul Temuco) */}
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-2 md:px-3 py-1.5 gap-1 md:gap-2 shadow-inner shrink-0">
          <Shield size={14} className="text-primary animate-blink shrink-0 md:w-4 md:h-4" />
          <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest hidden lg:inline shrink-0">Demo:</span>
          <select
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value as Role)}
            className="bg-transparent text-xs md:text-sm font-semibold text-slate-900 focus:outline-none pr-5 md:pr-6 cursor-pointer appearance-none"
          >
            <option value="municipalidad">DIDECO</option>
            <option value="directiva">Directiva</option>
            <option value="vecino">Vecino</option>
          </select>
          <ChevronDown size={14} className="text-slate-400 absolute right-2 pointer-events-none" />
        </div>

        {/* Notificaciones */}
        <button className="p-2 md:p-2.5 rounded-2xl hover:bg-slate-100 text-slate-500 relative transition-colors shrink-0">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 md:top-2.5 md:right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-accent rounded-full border-2 border-white animate-blink" />
          )}
        </button>

        {/* Perfil teñido sutilmente del Secondary (Verde Temuco) */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-2 md:pl-4 shrink-0">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-2xl bg-secondary flex items-center justify-center text-white font-black text-sm shadow-apple-md">
            {info.name.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs md:text-sm font-semibold text-slate-900">{info.name}</p>
            <p className="text-[10px] md:text-[11px] font-bold text-secondary bg-secondary-light px-2 py-0.5 rounded-lg border border-secondary/10 uppercase tracking-wider">{info.badge}</p>
          </div>
        </div>
      </div>
    </header>
  );
}