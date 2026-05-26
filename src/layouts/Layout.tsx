import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type { Role } from '../data/mockData';

export function Layout() {
  const [currentRole, setCurrentRole] = useState<Role>('municipalidad');
  // Iniciar cerrado en celulares, abierto en desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const location = useLocation();

  // Cierra el menú al cambiar de página en móviles
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Manejar el redimensionamiento de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden font-sans text-gray-900 antialiased relative">
      
      {/* OVERLAY: Capa oscura para móviles (solo visible si el menú está abierto) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Barra Lateral (Navegación) */}
      <Sidebar 
        currentRole={currentRole} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* Contenedor Principal (con min-w-0 para evitar desbordamientos flex) */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        {/* Barra Superior (Selector de Roles, Notificaciones, Perfil) */}
        <Topbar 
          currentRole={currentRole} 
          setCurrentRole={setCurrentRole} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Contenido Dinámico de la Ruta Actual */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 scrollbar-hidden relative">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet context={{ currentRole }} />
          </div>
        </main>
      </div>
    </div>
  );
}
