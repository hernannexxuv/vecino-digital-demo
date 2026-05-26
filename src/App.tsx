import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import AsambleaModule from './pages/AsambleaModule';
import BilleteraModule from './pages/BilleteraModule';
import FirmaModule from './pages/FirmaModule';
import DidecoDashboard from './pages/DidecoDashboard'; // Importamos la vista real
import VecinoDashboard from './pages/VecinoDashboard';

// ==========================================
// PLACEHOLDERS TEMPORALES PARA LA DEMO
// (Evitan errores de compilación mientras creamos las páginas)
// ==========================================
const MapaComunal = () => (
  <div className="h-64 flex items-center justify-center bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 shadow-apple">
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Mapa Territorial Inteligente</h2>
      <p className="text-sm text-gray-400">Visualización de Juntas de Vecinos activas en la comuna.</p>
    </div>
  </div>
);

// ==========================================
// ENRUTADOR PRINCIPAL
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas las vistas renderizan la carcasa del Layout */}
        <Route element={<Layout />}>
          
          {/* Al entrar al sitio, redirige por defecto al panel de la Muni */}
          <Route path="/" element={<Navigate to="/dideco" replace />} />
          
          {/* Rutas de Rol: Municipalidad / DIDECO */}
          <Route path="/dideco" element={<DidecoDashboard />} />
          <Route path="/dideco/mapa" element={<MapaComunal />} />

          {/* Rutas de Rol: Junta de Vecinos (Directiva) */}
          <Route path="/directiva/asamblea" element={<AsambleaModule />} />
          <Route path="/directiva/tesoreria" element={<BilleteraModule />} />
          <Route path="/directiva/firmas" element={<FirmaModule />} />
          
          {/* Rutas de Rol: Vecino Ciudadano */}
          <Route path="/inicio" element={<VecinoDashboard />} />

          {/* Comodín por si se ingresa una URL rota */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
