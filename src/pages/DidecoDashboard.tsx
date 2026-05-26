import { Target, Users, MapPin, CheckCircle2, CloudLightning, Activity, ChevronRight, FileText, BarChart3 } from 'lucide-react';

// ==========================================
// MOCK DATA ESPECÍFICA PARA DIDECO
// (Simulando gestión comunal)
// ==========================================
const comunalMetrics = [
  { id: 1, label: 'Juntas de Vecinos Activas', value: '142', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, label: 'Vecinos Registrados', value: '18.730', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 3, label: 'Proyectos Participativos', value: '15', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 4, label: 'Solicitudes en Gestión', value: '345', icon: CloudLightning, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const recentActivity = [
  { id: 1, type: 'acta', text: 'Acta Asamblea N°47 validada - JV Amanecer', time: 'hace 5 min', details: 'Firma Ministro de Fe OK' },
  { id: 2, type: 'social', text: 'Nueva Ficha Hogar cargada - Sector Norte', time: 'hace 15 min', details: 'Dpto. Social DIDECO' },
  { id: 3, type: 'economico', text: '5 Emprendedores inscritos al programa CAPITAL', time: 'hace 22 min', details: 'Dpto. Desarrollo Económico' },
  { id: 4, type: 'deporte', text: 'Solicitud uso Multicancha - JV Sol de Temuco', time: 'hace 35 min', details: 'Dpto. Deportes' },
];

const territorialHeatmap = [
  { sector: 'Sector Amanecer', color: 'bg-green-100', text: 'Alta participación', count: 45 },
  { sector: 'Sector Pedro de Valdivia', color: 'bg-green-100', text: 'Alta participación', count: 39 },
  { sector: 'Sector Fundo el Carmen', color: 'bg-yellow-100', text: 'Media participación', count: 22 },
  { sector: 'Sector Pueblo Nuevo', color: 'bg-slate-100', text: 'Baja participación', count: 12 },
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function DidecoDashboard() {
  return (
    <div className="h-full flex flex-col gap-6">
      
      {/* Header Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-apple flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-inner">
            D
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-950 tracking-tighter">Centro de Mando DIDECO - Ilustre Municipalidad de Temuco</h2>
            <p className="text-sm text-gray-500 mt-1">Consolidado de Inteligencia Territorial GovTech.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-apple-md">
          <BarChart3 size={18} />
          <span>Generar Reporte Comunal</span>
        </button>
      </div>

      {/* Grid de Métricas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {comunalMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="bg-white rounded-3xl border border-slate-100 shadow-apple p-5 flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full ${metric.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{metric.label}</p>
                <p className="text-3xl font-extrabold text-gray-950 mt-1 leading-none">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Principal: Mapa y Actividad */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Columna 1 & 2: Mapa Territorial (El "Smart City") */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-apple flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-950">Mapa Comunal de Participación Ciudadana</h3>
            </div>
            <div className="text-[10px] text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-100 flex items-center gap-1.5 animate-pulse-subtle">
              <CheckCircle2 size={12} />
              En Vivo
            </div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col">
            {/* Simulación visual del mapa (Aquí iría Mapbox/Leaflet) */}
            <div className="flex-1 bg-slate-100 rounded-2xl p-4 flex items-center justify-center border border-slate-200 relative overflow-hidden group">
              {/* Círculos simulando puntos de datos/calor */}
              <div className="absolute top-1/4 left-1/3 w-20 h-20 rounded-full bg-green-400 opacity-60 blur-2xl animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-green-300 opacity-50 blur-xl animate-pulse" style={{ animationDelay: '1s'}} />
              <div className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full bg-yellow-300 opacity-40 blur-lg animate-pulse" style={{ animationDelay: '0.5s'}} />
              
              <div className="text-center z-10 p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-blue-900 uppercase">Motor de Inteligencia Territorial</p>
                <p className="text-[10px] text-blue-700 mt-0.5">Integración simulada de Mapbox v3 Comunal</p>
              </div>
              
              <div className="absolute bottom-2 left-2 right-2 bg-white p-2.5 rounded-xl border border-slate-100 shadow-lg text-xs flex gap-3">
                {territorialHeatmap.slice(0, 3).map(item => (
                  <div key={item.sector} className={`flex-1 ${item.color} p-2 rounded-lg`}>
                    <p className="font-bold text-slate-800 truncate">{item.sector}</p>
                    <p className="text-[10px] text-slate-600">{item.count} Asambleas Registradas</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Columna 3: Feed de Actividad Comunal */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-apple flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Actividad GovTech en Tiempo Real</h3>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-2.5 scrollbar-hidden">
            {recentActivity.map((activity) => {
              const getIcon = () => {
                if (activity.type === 'acta') return FileText;
                return MapPin;
              };
              const Icon = getIcon();
              return (
                <div key={activity.id} className="flex gap-3.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-inner flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-tight truncate">{activity.text}</p>
                    <p className="text-[11px] text-blue-600 font-semibold">{activity.details}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{activity.time}</p>
                  </div>
                  <button className="self-center p-1 rounded-lg hover:bg-white text-gray-400"><ChevronRight size={16} /></button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}