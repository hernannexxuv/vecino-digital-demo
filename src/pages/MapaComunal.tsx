import { useEffect, useRef } from 'react';
import { Map, Search, Filter } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const sectoresTemuco = [
  { id: 1, name: 'Amanecer', status: 'optimal', jvActivas: 12, asambleas: 4, color: 'bg-secondary', coords: [-38.7513, -72.6105] },
  { id: 2, name: 'Pedro de Valdivia', status: 'optimal', jvActivas: 18, asambleas: 5, color: 'bg-secondary', coords: [-38.7366, -72.6186] },
  { id: 3, name: 'Pueblo Nuevo', status: 'warning', jvActivas: 8, asambleas: 1, color: 'bg-accent', coords: [-38.7183, -72.5833] },
  { id: 4, name: 'Fundo el Carmen', status: 'optimal', jvActivas: 22, asambleas: 8, color: 'bg-secondary', coords: [-38.7291, -72.6384] },
  { id: 5, name: 'Centro', status: 'review', jvActivas: 5, asambleas: 0, color: 'bg-slate-400', coords: [-38.7359, -72.5904] },
];

function LeafletMapComunal() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    const map = L.map(mapRef.current, {
      center: [-38.7359, -72.6000],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
      dragging: true 
    });

    mapInstance.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    sectoresTemuco.forEach(sector => {
      const isWarning = sector.status === 'warning';
      const textSecondary = sector.status === 'review' ? 'text-slate-500' : (isWarning ? 'text-accent' : 'text-secondary');
      
      const alertSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;

      const customIcon = L.divIcon({
        className: 'bg-transparent',
        html: `
          <div class="relative group cursor-pointer" style="width: 16px; height: 16px;">
            <div class="absolute -inset-4 ${sector.color}/20 rounded-full blur-md animate-pulse"></div>
            <div class="absolute -inset-1 ${sector.color}/40 rounded-full animate-ping" style="animation-duration: ${isWarning ? '2s' : '3s'}"></div>
            <div class="relative w-4 h-4 ${sector.color} border-2 border-white rounded-full shadow-lg flex items-center justify-center">
              ${isWarning ? alertSvg : ''}
            </div>
            <div class="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-apple border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[1000] pointer-events-none">
              <p class="text-xs font-bold text-slate-800">${sector.name}</p>
              <p class="text-[10px] ${textSecondary} font-bold">${isWarning ? `Baja Participación (${sector.jvActivas} JVs)` : `${sector.jvActivas} JVs Activas`}</p>
            </div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      L.marker(sector.coords as [number, number], { icon: customIcon }).addTo(map);
    });

    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 500);
    const t3 = setTimeout(() => map.invalidateSize(), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, filter: 'opacity(0.8) grayscale(0.2)' }} />;
}

export default function MapaComunal() {
  return (
    <div className="flex flex-col gap-6 lg:h-full">
      
      {/* Header del Mapa */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-apple flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
            <Map className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Mapa Inteligente de Participación</h2>
            <p className="text-sm text-slate-500 font-medium">Monitoreo territorial en tiempo real de Temuco.</p>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar sector o Junta de Vecinos..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
            />
          </div>
          <button className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:min-h-0">
        
        {/* Sidebar de Sectores (Panel Izquierdo) */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-100 shadow-apple flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-800">Estado por Macrosectores</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hidden">
            {sectoresTemuco.map((sector) => (
              <div key={sector.id} className="p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-sm transition-all bg-white cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors">{sector.name}</h4>
                  <div className={`w-2.5 h-2.5 rounded-full ${sector.color} shadow-sm`} />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Juntas Activas</p>
                    <p className="text-sm font-black text-slate-700">{sector.jvActivas}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Asambleas (Mes)</p>
                    <p className="text-sm font-black text-slate-700">{sector.asambleas}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Viewport del Mapa Simulado (Panel Derecho) */}
        <div className="lg:col-span-3 bg-slate-100 rounded-3xl border border-slate-200 shadow-inner flex flex-col overflow-hidden relative min-h-[400px] lg:min-h-0">
          
          {/* Overlay de Herramientas del Mapa */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 border border-slate-200 shadow-apple-md flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold">Calor de Participación</button>
              <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors">Alertas de Seguridad</button>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-apple-md">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Simbología</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary" /><span className="text-xs font-semibold text-slate-700">Óptimo (&gt;50% part.)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /><span className="text-xs font-semibold text-slate-700">Atención (Baja part.)</span></div>
              </div>
            </div>
          </div>

          {/* Canvas del Mapa (Leaflet) */}
          <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-100">
            <LeafletMapComunal />
          </div>
        </div>
      </div>
    </div>
  );
}