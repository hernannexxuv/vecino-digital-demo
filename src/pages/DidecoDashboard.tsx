import { Target, Users, MapPin, CheckCircle2, CloudLightning, Activity, ChevronRight, FileText, BarChart3 } from 'lucide-react';

const comunalMetrics = [
  { id: 1, label: 'Juntas de Vecinos Activas', value: '142', icon: Target, color: 'text-primary', bg: 'bg-primary-light' },
  { id: 2, label: 'Vecinos Registrados', value: '18.730', icon: Users, color: 'text-secondary', bg: 'bg-secondary-light' },
  { id: 3, label: 'Proyectos Participativos', value: '15', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 4, label: 'Solicitudes en Gestión', value: '345', icon: CloudLightning, color: 'text-accent', bg: 'bg-accent-light' },
];

const recentActivity = [
  { id: 1, type: 'acta', text: 'Acta Asamblea N°47 validada - JV Amanecer', time: 'hace 5 min', details: 'Firma Ministro de Fe OK' },
  { id: 2, type: 'social', text: 'Nueva Ficha Hogar cargada - Sector Norte', time: 'hace 15 min', details: 'Dpto. Social DIDECO' },
  { id: 3, type: 'economico', text: '5 Emprendedores inscritos al programa CAPITAL', time: 'hace 22 min', details: 'Dpto. Desarrollo Económico' },
  { id: 4, type: 'deporte', text: 'Solicitud uso Multicancha - JV Sol de Temuco', time: 'hace 35 min', details: 'Dpto. Deportes' },
];

export default function DidecoDashboard() {
  return (
    <div className="flex flex-col gap-6 lg:h-full">
      
      {/* Header Panel - Aligerado */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-apple flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Aquí quitamos el slate-800 pesado y usamos el Azul Temuco */}
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-apple-md">
            D
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Centro de Mando DIDECO - Temuco</h2>
            <p className="text-sm text-slate-500 mt-0.5">Consolidado de Inteligencia Territorial GovTech.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-apple-md">
          <BarChart3 size={18} />
          <span>Generar Reporte Comunal</span>
        </button>
      </div>

      {/* Grid de Métricas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {comunalMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="bg-white rounded-3xl border border-slate-100 shadow-apple p-5 flex items-start gap-4 hover:shadow-apple-md transition-shadow">
              <div className={`w-12 h-12 rounded-2xl ${metric.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{metric.label}</p>
                <p className="text-3xl font-black text-slate-800 mt-1 leading-none">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Principal: Mapa y Actividad */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:min-h-0">
        
        {/* Mapa Territorial */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-apple flex flex-col overflow-hidden min-h-[300px] lg:min-h-0">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Mapa Comunal de Participación</h3>
            </div>
            <div className="text-[10px] text-secondary font-bold bg-secondary-light px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-pulse-subtle border border-secondary/20">
              <CheckCircle2 size={14} />
              Motor Activo
            </div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1 bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-100 relative overflow-hidden group">
              {/* Luces del mapa usando colores institucionales */}
              <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-secondary opacity-20 blur-3xl animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-primary opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s'}} />
              
              <div className="text-center z-10 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-apple">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs font-black text-primary uppercase tracking-wider">Inteligencia Territorial</p>
                <p className="text-[10px] text-slate-500 mt-1">Integración simulada Temuco SmartCity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feed de Actividad Comunal */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-apple flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Actividad Reciente</h3>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-2 scrollbar-hidden">
            {recentActivity.map((activity) => {
              const getIcon = () => activity.type === 'acta' ? FileText : MapPin;
              const Icon = getIcon();
              return (
                <div key={activity.id} className="flex gap-3.5 p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary-light transition-colors">
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0 self-center">
                    <p className="text-sm font-bold text-slate-800 leading-tight truncate">{activity.text}</p>
                    <p className="text-[10px] text-primary font-semibold mt-0.5">{activity.details}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 self-center group-hover:text-primary" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
