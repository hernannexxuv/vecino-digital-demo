import { Map, Search, Filter } from 'lucide-react';
import LeafletMapView from '../components/map/LeafletMapView';
import macrosectores from '../data/mapData';

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
            {macrosectores.map((sector) => {
              const totalSocios = sector.jvs.reduce((sum, jv) => sum + jv.socios, 0);
              const totalAsambleas = sector.jvs.reduce((sum, jv) => sum + jv.asambleasMes, 0);
              const sectorColor = sector.status === 'warning' ? 'bg-accent' : sector.status === 'review' ? 'bg-slate-400' : 'bg-secondary';
              return (
                <div key={sector.id} className="p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-sm transition-all bg-white cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors">{sector.name}</h4>
                    <div className={`w-2.5 h-2.5 rounded-full ${sectorColor} shadow-sm`} />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center min-w-[60px]">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">JVs</p>
                      <p className="text-sm font-black text-slate-700">{sector.jvs.length}</p>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center min-w-[60px]">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Socios</p>
                      <p className="text-sm font-black text-slate-700">{totalSocios}</p>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center min-w-[60px]">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Asambleas</p>
                      <p className="text-sm font-black text-slate-700">{totalAsambleas}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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

          {/* Canvas del Mapa (Leaflet con Juntas de Vecinos) */}
          <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-100">
            <LeafletMapView />
          </div>
        </div>
      </div>
    </div>
  );
}