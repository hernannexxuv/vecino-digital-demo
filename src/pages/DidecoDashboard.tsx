import { useState } from 'react';
import { Target, Users, MapPin, CheckCircle2, CloudLightning, Activity, ChevronRight, FileText, BarChart3, Send, Megaphone, X } from 'lucide-react';
import SelectDropdown from '../components/ui/SelectDropdown';

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
  // Estado para controlar la visibilidad del Modal de Comunicados
  const [showComunicadoModal, setShowComunicadoModal] = useState(false);
  
  // Estados para los selectores del Modal
  const [alcance, setAlcance] = useState('toda_comuna');
  const [urgencia, setUrgencia] = useState('informativo');
  const [departamento, setDepartamento] = useState('social');

  return (
    <div className="flex flex-col gap-6 lg:h-full relative">
      
      {/* Header Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-apple flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-apple-md">
            D
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Centro de Mando DIDECO - Temuco</h2>
            <p className="text-sm text-slate-500 mt-0.5">Consolidado de Inteligencia Territorial GovTech.</p>
          </div>
        </div>
        
        {/* Botonera de Acción */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setShowComunicadoModal(true)}
            className="btn-apple-secondary px-6 py-3 flex-1 sm:flex-none flex items-center justify-center gap-2"
          >
            <Megaphone size={18} />
            <span>Emitir Comunicado</span>
          </button>
          
          <button className="btn-apple-primary px-6 py-3 flex-1 sm:flex-none flex items-center justify-center gap-2">
            <BarChart3 size={18} />
            <span>Generar Reporte</span>
          </button>
        </div>
      </div>

      {/* Grid de Métricas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 z-10">
        {comunalMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="card-apple p-6 flex items-start gap-4">
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
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:min-h-0 z-10">
        
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

      {/* ========================================== */}
      {/* MODAL: EMISIÓN DE COMUNICADOS (Recomendación 3) */}
      {/* ========================================== */}
      {showComunicadoModal && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setShowComunicadoModal(false)}
        >
          <div 
            className="bg-white/90 backdrop-blur-2xl border border-white/50 shadow-apple-lg w-full max-w-lg overflow-hidden flex flex-col rounded-3xl glass-apple"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header del Modal */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Redactar Comunicado</h3>
                  <p className="text-xs text-slate-500 font-medium">Push Notification Municipal</p>
                </div>
              </div>
              <button 
                onClick={() => setShowComunicadoModal(false)}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Cuerpo del Formulario */}
            <div className="p-6 space-y-5">
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Alcance Territorial</label>
                <SelectDropdown
                  value={alcance}
                  onChange={setAlcance}
                  options={[
                    { value: 'toda_comuna', label: 'Toda la Comuna de Temuco' },
                    { value: 'sector_amanecer', label: 'Solo Sector Amanecer' },
                    { value: 'sector_pedro', label: 'Solo Sector Pedro de Valdivia' },
                    { value: 'especificas', label: 'Juntas de Vecinos Específicas...' }
                  ]}
                  className="w-full bg-white/70 backdrop-blur-md border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white transition-all cursor-pointer shadow-sm"
                  dropdownClassName="bg-white/95 backdrop-blur-3xl border-slate-200 shadow-apple-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Nivel de Urgencia</label>
                  <SelectDropdown
                    value={urgencia}
                    onChange={setUrgencia}
                    options={[
                      { value: 'informativo', label: 'Informativo (Estándar)' },
                      { value: 'evento', label: 'Evento Comunitario' },
                      { value: 'alerta', label: 'Alerta Temprana (Urgente)' }
                    ]}
                    className="w-full bg-white/70 backdrop-blur-md border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white transition-all cursor-pointer shadow-sm"
                    dropdownClassName="bg-white/95 backdrop-blur-3xl border-slate-200 shadow-apple-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Departamento</label>
                  <SelectDropdown
                    value={departamento}
                    onChange={setDepartamento}
                    options={[
                      { value: 'social', label: 'Dpto. Social' },
                      { value: 'deportes', label: 'Dpto. Deportes' },
                      { value: 'desarrollo', label: 'Desarrollo Económico' },
                      { value: 'alcaldia', label: 'Gabinete Alcaldía' }
                    ]}
                    className="w-full bg-white/70 backdrop-blur-md border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white transition-all cursor-pointer shadow-sm"
                    dropdownClassName="bg-white/95 backdrop-blur-3xl border-slate-200 shadow-apple-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Mensaje a Vecinos</label>
                <textarea 
                  rows={3} 
                  placeholder="Ej: Estimados vecinos, la campaña de vacunación de mascotas comenzará mañana a las 10:00 hrs en..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

            </div>

            {/* Footer de Acción */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button 
                onClick={() => setShowComunicadoModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setShowComunicadoModal(false)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors shadow-apple"
              >
                <Send size={16} />
                <span>Enviar Notificación a 18.730 Vecinos</span>
              </button>
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
}