import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  FileCheck, 
  Map, 
  Settings, 
  Menu,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ContactRound
} from 'lucide-react';
import type { Role, DirectivaRole } from '../data/mockData';

interface SidebarProps {
  currentRole: Role;
  currentSubRole: DirectivaRole;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ currentRole, currentSubRole, isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = {
    superadmin: [
      { path: '/dideco', label: 'Consola Global', icon: ShieldCheck },
      { path: '/dideco/mapa', label: 'Mapa Comunal', icon: Map },
      { path: '/reportes', label: 'Gesti\u00f3n Ciudadana', icon: ShieldAlert },
    ],
    municipalidad: [
      { path: '/dideco', label: 'Panel DIDECO', icon: LayoutDashboard },
      { path: '/dideco/mapa', label: 'Mapa Smart City', icon: Map },
      { path: '/reportes', label: 'Gesti\u00f3n Ciudadana', icon: ShieldAlert },
    ],
    vecino: [
      { path: '/inicio', label: 'Mi Barrio', icon: LayoutDashboard },
      { path: '/reportes', label: 'Reportar Incidencia', icon: AlertTriangle },
    ]
  };

  let currentMenu: any[] = [];
  if (currentRole === 'superadmin' || currentRole === 'municipalidad' || currentRole === 'vecino') {
    currentMenu = menuItems[currentRole];
  } else if (currentRole === 'directiva') {
    if (currentSubRole === 'presidente') {
      currentMenu = [
        { path: '/directiva/dashboard', label: 'Dashboard de Gestión', icon: LayoutDashboard },
        { path: '/directiva/socios', label: 'Socios', icon: ContactRound },
        { path: '/directiva/asamblea', label: 'Asambleas', icon: Users },
      ];
    } else if (currentSubRole === 'tesorero') {
      currentMenu = [
        { path: '/directiva/tesoreria', label: 'Billetera Digital', icon: Wallet },
        { path: '/directiva/socios', label: 'Socios', icon: ContactRound },
      ];
    } else if (currentSubRole === 'secretario') {
      currentMenu = [
        { path: '/directiva/asamblea', label: 'Gestión de Actas', icon: Users },
        { path: '/directiva/firmas', label: 'Gestión de Firmas', icon: FileCheck },
        { path: '/directiva/socios', label: 'Socios', icon: ContactRound },
      ];
    }
  }

  return (
    <aside className={`
      absolute md:relative bg-white/80 backdrop-blur-xl border-r border-slate-200/60 h-full flex flex-col transition-all duration-300 ease-in-out z-40 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]
      ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:w-20 md:translate-x-0'}
    `}>
      {/* Header del Sidebar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/60 bg-transparent shrink-0">
        {isOpen ? (
          <img 
            src="/logo-muni_Teuco.webp" 
            alt="Ilustre Municipalidad de Temuco" 
            className="h-9 w-auto object-contain"
          />
        ) : (
          <img 
            src="/logo-muni_Teuco.webp" 
            alt="Muni Temuco" 
            className="h-8 w-auto object-contain mx-auto"
          />
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 md:hidden shrink-0"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hidden">
        {currentMenu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900 border border-transparent'}
              `}
            >
              <Icon size={20} className={`shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-500'}`} />
              {isOpen && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200/60 shrink-0">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
          <Settings size={20} className="text-slate-400 shrink-0" />
          {isOpen && <span className="truncate">Configuración</span>}
        </button>
      </div>
    </aside>
  );
}
