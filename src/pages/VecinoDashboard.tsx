import { CreditCard, FileText, Megaphone, AlertTriangle, QrCode, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

const avisosBarrio = [
  { id: 1, type: 'urgente', title: 'Corte de agua programado', date: 'Mañana, 15:00 hrs', desc: 'Aguas Araucanía informa corte por matriz en Sector Sur.', icon: AlertTriangle, color: 'text-accent', bg: 'bg-accent-light' },
  { id: 2, type: 'comunidad', title: 'Asamblea Ordinaria', date: 'Viernes, 19:30 hrs', desc: 'Se votará el presupuesto de fachada. Tu asistencia es vital.', icon: Megaphone, color: 'text-primary', bg: 'bg-primary-light' },
  { id: 3, type: 'municipal', title: 'Operativo Mascotas DIDECO', date: 'Sábado, 10:00 hrs', desc: 'Vacunación gratuita en la plaza central del barrio.', icon: ShieldCheck, color: 'text-secondary', bg: 'bg-secondary-light' },
];

export default function VecinoDashboard() {
  return (
    <div className="h-full flex flex-col gap-6">
      
      {/* Header Saludo */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-apple flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Hola, Hernán</h2>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
            <MapPin size={16} className="text-primary" />
            Junta de Vecinos Amanecer, Temuco
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-secondary-light text-secondary px-4 py-2.5 rounded-xl text-sm font-bold border border-secondary/20 shadow-sm">
          <ShieldCheck size={18} />
          Vecino Verificado
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Columna Izquierda: Credencial Digital Aligerada */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Credencial Digital - Ahora usa el Azul Temuco en lugar de Negro */}
          <div className="bg-gradient-to-br from-primary to-[#005582] rounded-3xl p-6 shadow-apple-lg text-white relative overflow-hidden group">
            {/* Efectos de luz en la tarjeta */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary opacity-20 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold mb-1">Credencial Digital</p>
                <p className="font-black text-lg leading-tight tracking-tight">Socio Activo</p>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/20">
                <QrCode size={24} className="text-white" />
              </div>
            </div>
            
            <div className="space-y-1 relative z-10">
              <p className="text-xl font-black tracking-tight">Hernán Millahual V.</p>
              <p className="text-sm text-white/70 font-medium">RUT: 17.XXX.XXX-X</p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/20 flex justify-between items-center relative z-10">
              <div>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-wider mb-0.5">Estado</p>
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-secondary" /> Al Día
                </p>
              </div>
              <p className="text-[10px] text-white/50 font-mono font-bold bg-black/10 px-2 py-1 rounded-lg">ID: VEC-2026</p>
            </div>
          </div>

          {/* Botones de Acción Rápida */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-apple p-4 grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-primary-light hover:border-primary/20 border border-transparent transition-all group">
              <CreditCard className="text-slate-400 group-hover:text-primary transition-colors" size={24} />
              <span className="text-xs font-bold text-slate-600 group-hover:text-primary text-center">Pagar Cuota</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-secondary-light hover:border-secondary/20 border border-transparent transition-all group">
              <FileText className="text-slate-400 group-hover:text-secondary transition-colors" size={24} />
              <span className="text-xs font-bold text-slate-600 group-hover:text-secondary text-center">Certificados</span>
            </button>
          </div>
        </div>

        {/* Columna Derecha: Muro Vecinal */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-apple flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Muro Vecinal Temuco</h3>
            <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">Ver todo</button>
          </div>
          
          <div className="flex-1 overflow-auto p-6 space-y-4 scrollbar-hidden">
            {avisosBarrio.map((aviso) => {
              const Icon = aviso.icon;
              return (
                <div key={aviso.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-apple-md transition-all bg-white group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${aviso.bg}`}>
                    <Icon className={`w-6 h-6 ${aviso.color}`} />
                  </div>
                  <div className="flex-1 min-w-0 self-center">
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="text-sm font-bold text-slate-900 truncate">{aviso.title}</p>
                      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{aviso.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{aviso.desc}</p>
                  </div>
                  <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-primary" />
                  </div>
                </div>
              );
            })}

            {/* Módulo Encuesta Rápida - Mezclando el Azul y Verde institucionales */}
            <div className="mt-6 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white shadow-apple-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 blur-2xl rounded-full" />
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-white/20 backdrop-blur-sm text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest mb-3 inline-block border border-white/20">
                      Participación DIDECO
                    </span>
                    <p className="font-bold text-base mb-1">¿Qué taller municipal prefieres este invierno?</p>
                    <p className="text-xs text-white/80 font-medium">Tu opinión ayuda a organizar los recursos comunales.</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button className="bg-white/10 hover:bg-white/20 transition-colors py-2.5 rounded-xl text-xs font-bold border border-white/20 backdrop-blur-sm shadow-sm">Deportes Indoor</button>
                  <button className="bg-white/10 hover:bg-white/20 transition-colors py-2.5 rounded-xl text-xs font-bold border border-white/20 backdrop-blur-sm shadow-sm">Computación Básica</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
