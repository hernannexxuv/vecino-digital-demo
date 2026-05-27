import { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, Clock, Play, StopCircle, 
  BarChart3, Megaphone, AlertCircle,
  ChevronRight
} from 'lucide-react';

type VoteStatus = 'setup' | 'active' | 'results';

export default function AsambleaModule() {
  const [status, setStatus] = useState<VoteStatus>('setup');
  const [quorumReq, setQuorumReq] = useState(50);
  const [timerSet, setTimerSet] = useState(15);
  const [votosRealizados, setVotosRealizados] = useState(0);
  const totalSocios = 142;

  // Simulación de vecinos votando en tiempo real
  useEffect(() => {
    if (status === 'active' && votosRealizados < 85) {
      const interval = setInterval(() => {
        setVotosRealizados(prev => prev + Math.floor(Math.random() * 3));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status, votosRealizados]);

  const porcentajeActual = Math.round((votosRealizados / totalSocios) * 100);
  const quorumAlcanzado = porcentajeActual >= quorumReq;

  return (
    <div className="h-full flex flex-col gap-6">
      
      {/* Header del Módulo */}
      <div className="card-apple p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary shadow-sm">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Gestión de Asambleas In Situ</h2>
            <p className="text-sm text-slate-500 font-medium">Control de quórum y votaciones vinculantes.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-500">
             Sede: Amanecer (Zona GPS Habilitada)
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* PANEL IZQUIERDO: CONFIGURACIÓN Y ESTADO */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* 1. CONFIGURACIÓN (VISTA SETUP) */}
          {status === 'setup' && (
            <div className="card-apple p-6 space-y-6 animate-in slide-in-from-left-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Play size={18} className="text-primary" /> Nueva Votación
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Tiempo de Votación</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map(m => (
                      <button 
                        key={m}
                        onClick={() => setTimerSet(m)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${timerSet === m ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
                      >
                        {m}'
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Quórum Requerido (%)</label>
                  <input 
                    type="range" min="10" max="100" value={quorumReq}
                    onChange={(e) => setQuorumReq(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between mt-2 text-xs font-bold text-primary">
                    <span>Mínimo: 10%</span>
                    <span>Objetivo: {quorumReq}%</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStatus('active')}
                className="w-full btn-apple-primary py-4 flex items-center justify-center gap-2"
              >
                Lanzar a Celulares de Socios <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* 2. PANEL ACTIVO (MONITOREO) */}
          {status === 'active' && (
            <div className="card-apple p-6 space-y-6 animate-in zoom-in-95">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-slate-900">Votación en Curso</h3>
                  <p className="text-xs text-slate-500">Los vecinos están votando in situ.</p>
                </div>
                <div className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse border border-red-100 uppercase">En Vivo</div>
              </div>

              {/* Barra de Quórum Animada */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-tighter">Progreso de Quórum</span>
                  <span className={quorumAlcanzado ? 'text-secondary' : 'text-primary'}>{porcentajeActual}% / {quorumReq}%</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${quorumAlcanzado ? 'bg-secondary' : 'bg-primary'}`}
                    style={{ width: `${porcentajeActual}%` }}
                  />
                </div>
                {!quorumAlcanzado && (
                  <p className="text-[10px] text-amber-600 font-bold flex items-center gap-1 bg-amber-50 p-2 rounded-lg">
                    <AlertCircle size={12} /> Falta quórum para validez legal.
                  </p>
                )}
              </div>

              <button 
                onClick={() => setStatus('results')}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all shadow-apple-lg"
              >
                <StopCircle size={18} /> Finalizar y Ver Resultados
              </button>
            </div>
          )}

          {/* 3. RESULTADOS FINALES */}
          {status === 'results' && (
            <div className="card-apple p-6 space-y-6 animate-in slide-in-from-bottom-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="text-secondary" />
                </div>
                <h3 className="font-black text-slate-900">Resultados Cerrados</h3>
                <p className="text-xs text-slate-500">Votación validada por GPS.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-bold text-slate-700">Apruebo</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: '75%' }} />
                    </div>
                    <span className="text-sm font-black text-slate-900">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-bold text-slate-700">Rechazo</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '20%' }} />
                    </div>
                    <span className="text-sm font-black text-slate-900">20%</span>
                  </div>
                </div>
              </div>

              <button 
                className="w-full btn-apple-secondary py-3 flex items-center justify-center gap-2"
                onClick={() => setStatus('setup')}
              >
                <Megaphone size={16} /> Notificar a todos los Socios
              </button>
            </div>
          )}
        </div>

        {/* PANEL DERECHO: LISTADO DE SOCIOS (TRANSPARENCIA) */}
        <div className="lg:col-span-2 card-apple flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800">Padrón Electoral In Situ ({totalSocios} socios)</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-[10px] font-bold text-secondary">
                <CheckCircle2 size={12} /> YA VOTÓ
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <Clock size={12} /> PENDIENTE
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Generamos una lista simulada de socios */}
              {[...Array(16)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                      S{i+1}
                    </div>
                    <p className="text-xs font-bold text-slate-700">Socio Correlativo N°{100 + i}</p>
                  </div>
                  {i < (votosRealizados / 5) ? (
                    <CheckCircle2 size={18} className="text-secondary" />
                  ) : (
                    <Clock size={18} className="text-slate-200" />
                  )}
                </div>
              ))}
              <div className="col-span-full py-4 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">... y 126 socios más registrados ...</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}