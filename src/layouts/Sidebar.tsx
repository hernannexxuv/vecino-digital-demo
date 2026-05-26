import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  FileCheck, 
  Map, 
  Settings, 
  Menu,
  ShieldCheck
} from 'lucide-react';
import type { Role } from '../data/mockData';

interface SidebarProps {
  currentRole: Role;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ currentRole, isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = {
    superadmin: [
      { path: '/dideco', label: 'Consola Global', icon: ShieldCheck },
      { path: '/dideco/mapa', label: 'Mapa Comunal', icon: Map },
    ],
    municipalidad: [
      { path: '/dideco', label: 'Panel DIDECO', icon: LayoutDashboard },
      { path: '/dideco/mapa', label: 'Mapa Smart City', icon: Map },
    ],
    directiva: [
      { path: '/directiva/asamblea', label: 'Asambleas', icon: Users },
      { path: '/directiva/tesoreria', label: 'Billetera Digital', icon: Wallet },
      { path: '/directiva/firmas', label: 'Gestión de Firmas', icon: FileCheck },
    ],
    vecino: [
      { path: '/inicio', label: 'Mi Barrio', icon: LayoutDashboard },
    ]
  };

  const currentMenu = menuItems[currentRole] || [];

  return (
    <aside className={`
      absolute md:relative bg-white border-r border-slate-100 h-full flex flex-col transition-all duration-300 ease-in-out z-40 shadow-apple
      ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:w-20 md:translate-x-0'}
    `}>
      {/* Header del Sidebar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 bg-gradient-to-tr from-white to-primary-light/50 shrink-0">
        {isOpen ? (
          <span className="font-extrabold text-xl tracking-tighter text-slate-900 truncate">
            SmartCity<span className="text-primary font-black">Temuco</span>
          </span>
        ) : (
          <span className="font-black text-xl text-primary mx-auto">ST</span>
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
                flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150
                ${isActive 
                  ? 'bg-primary text-white shadow-apple-md hover:bg-primary-dark' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
              `}
            >
              <Icon size={20} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {isOpen && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 shrink-0">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
          <Settings size={20} className="text-slate-400 shrink-0" />
          {isOpen && <span className="truncate">Configuración</span>}
        </button>
      </div>
    </aside>
  );
}
