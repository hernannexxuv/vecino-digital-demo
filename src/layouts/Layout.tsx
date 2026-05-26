import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type { Role } from '../data/mockData';

export function Layout() {
  // Estado local para simular el cambio de rol en tiempo real durante la presentación
  const [currentRole, setCurrentRole] = useState<Role>('municipalidad');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden font-sans text-gray-900 antialiased">
      {/* Barra Lateral (Navegación) */}
      <Sidebar 
        currentRole={currentRole} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* Contenedor Principal */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Barra Superior (Selector de Roles, Notificaciones, Perfil) */}
        <Topbar 
          currentRole={currentRole} 
          setCurrentRole={setCurrentRole} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Contenido Dinámico de la Ruta Actual */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 scrollbar-hidden">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet context={{ currentRole }} />
          </div>
        </main>
      </div>
    </div>
  );
}
