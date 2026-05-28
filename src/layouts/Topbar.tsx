import { Menu, Bell, Shield } from 'lucide-react';
import { roleInfo, notifications } from '../data/mockData';
import type { Role, DirectivaRole } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import SelectDropdown from '../components/ui/SelectDropdown';

interface TopbarProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentSubRole: DirectivaRole;
  setCurrentSubRole: (role: DirectivaRole) => void;
  toggleSidebar: () => void;
}

export default function Topbar({ currentRole, setCurrentRole, currentSubRole, setCurrentSubRole, toggleSidebar }: TopbarProps) {
  const navigate = useNavigate();
  const info = roleInfo[currentRole];

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    if (role === 'municipalidad' || role === 'superadmin') {
      navigate('/dideco');
    } else if (role === 'directiva') {
      if (currentSubRole === 'presidente') navigate('/directiva/dashboard');
      else if (currentSubRole === 'tesorero') navigate('/directiva/tesoreria');
      else if (currentSubRole === 'secretario') navigate('/directiva/asamblea');
    } else {
      navigate('/inicio');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 md:px-6 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>
        <img 
          src="/logo-muni_Teuco.webp" 
          alt="Ilustre Municipalidad de Temuco" 
          className="h-8 w-auto object-contain shrink-0" 
        />
        <h1 className="text-lg font-bold text-slate-900 hidden sm:block tracking-tighter">
          Plataforma GovTech · Ilustre Municipalidad de Temuco
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Selector de Roles con estética Glassmorphic */}
        <SelectDropdown
          value={currentRole}
          onChange={(val) => handleRoleChange(val as Role)}
          options={[
            { value: 'municipalidad', label: 'DIDECO (Muni)' },
            { value: 'directiva', label: 'Junta de Vecinos' },
            { value: 'vecino', label: 'Vecino Ciudadano' }
          ]}
          className="flex items-center bg-white/60 backdrop-blur-md border border-slate-200/80 shadow-sm rounded-xl px-3 py-2 md:py-1.5 cursor-pointer hover:bg-white/90 hover:border-slate-300 transition-all w-40 md:w-auto text-sm font-medium text-slate-700"
          icon={<Shield size={16} className="text-primary animate-pulse md:w-4 md:h-4" />}
          prefix="Entorno:"
        />

        {currentRole === 'directiva' && (
          <SelectDropdown
            value={currentSubRole}
            onChange={(val) => {
              setCurrentSubRole(val as DirectivaRole);
              if (val === 'presidente') navigate('/directiva/dashboard');
              else if (val === 'tesorero') navigate('/directiva/tesoreria');
              else if (val === 'secretario') navigate('/directiva/asamblea');
            }}
            options={[
              { value: 'presidente', label: 'Presidente' },
              { value: 'secretario', label: 'Secretario' },
              { value: 'tesorero', label: 'Tesorero' }
            ]}
            className="flex items-center bg-white/60 backdrop-blur-md border border-slate-200/80 shadow-sm rounded-xl px-3 py-2 md:py-1.5 cursor-pointer hover:bg-white/90 hover:border-slate-300 transition-all w-32 md:w-auto text-sm font-medium text-slate-700"
            prefix="Cargo:"
          />
        )}

        {/* Notificaciones */}
        <button className="p-2 md:p-2.5 rounded-xl hover:bg-slate-100/80 text-slate-500 relative transition-colors shrink-0 border border-transparent hover:border-slate-200/60">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 md:top-2.5 md:right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-accent rounded-full border-2 border-white animate-blink" />
          )}
        </button>

        {/* Perfil teñido sutilmente del Secondary (Verde Temuco) */}
        <div className="flex items-center gap-3 border-l border-slate-200/60 pl-2 md:pl-4 shrink-0">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-secondary flex items-center justify-center text-white font-bold text-sm shadow-md shadow-secondary/20 ring-1 ring-secondary/20">
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