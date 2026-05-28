import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import AsambleaModule from './pages/AsambleaModule';
import BilleteraModule from './pages/BilleteraModule';
import FirmaModule from './pages/FirmaModule';
import DidecoDashboard from './pages/DidecoDashboard';
import VecinoDashboard from './pages/VecinoDashboard';
import MapaComunal from './pages/MapaComunal';
import IncidenciasModule from './pages/IncidenciasModule';
import PresidenteDashboard from './pages/PresidenteDashboard';
import SociosModule from './pages/SociosModule';

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
          <Route path="/reportes" element={<IncidenciasModule />} />

          {/* Rutas de Rol: Junta de Vecinos (Directiva) */}
          <Route path="/directiva/dashboard" element={<PresidenteDashboard />} />
          <Route path="/directiva/socios" element={<SociosModule />} />
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
