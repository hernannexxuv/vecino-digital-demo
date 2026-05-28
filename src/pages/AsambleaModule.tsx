import { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, Clock, Play, StopCircle, 
  BarChart3, Megaphone, AlertCircle, AlertTriangle, Scale,
  ChevronRight, Sparkles, FileText, Lock
} from 'lucide-react';

type VoteStatus = 'setup' | 'active' | 'results';
type RightTab = 'padron' | 'acta';
type ActaStatus = 'redactando' | 'esperando_firmas' | 'firmada';

const tiposVotacion = [
  { id: 'ordinaria', label: 'Asamblea Ordinaria', quorum: 10 },
  { id: 'estatutos', label: 'Aprobación de Estatutos', quorum: 50 },
  { id: 'censura', label: 'Censura del Directorio', quorum: 66 },
  { id: 'disolucion', label: 'Disolución de la Junta', quorum: 75 },
];

export default function AsambleaModule() {
  const [status, setStatus] = useState<VoteStatus>('setup');
  const [tipoVotacion, setTipoVotacion] = useState(tiposVotacion[0]);
  const [timerSet, setTimerSet] = useState(15);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [votosRealizados, setVotosRealizados] = useState(0);
  
  // Estado para el Acta y Secretario
  const [rightTab, setRightTab] = useState<RightTab>('padron');
  const [actaText, setActaText] = useState('En la ciudad, a la fecha, se inicia la asamblea ordinaria...\n\nTemas a tratar:\n1. ');
  const [actaStatus, setActaStatus] = useState<ActaStatus>('redactando');
  const [showSignModal, setShowSignModal] = useState(false);
  const [password, setPassword] = useState('');

  const totalSocios = 142;
  const sociosPresentes = 45;
  const quorumReq = tipoVotacion.quorum;
  const quorumRequeridoPersonas = Math.ceil((totalSocios * quorumReq) / 100);
  const cumpleQuorum = sociosPresentes >= quorumRequeridoPersonas;

  // Simulación de vecinos votando en tiempo real
  useEffect(() => {
    if (status === 'active' && votosRealizados < 85) {
      const interval = setInterval(() => {
        setVotosRealizados(prev => prev + Math.floor(Math.random() * 3));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status, votosRealizados]);

  // Manejo del temporizador
  useEffect(() => {
    if (status === 'active') {
      setTimeLeft(timerSet * 60);
    } else {
      setTimeLeft(null);
    }
  }, [status, timerSet]);

  useEffect(() => {
    if (status === 'active' && timeLeft !== null && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    } else if (status === 'active' && timeLeft === 0) {
      setStatus('results');
    }
  }, [status, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const porcentajeActual = Math.round((votosRealizados / totalSocios) * 100);
  const quorumAlcanzado = porcentajeActual >= quorumReq;

  return (
    <div className="min-h-full flex flex-col gap-6">
      
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
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                    Tipo de Votación (Ley 19.418)
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {tiposVotacion.map(tv => (
                      <button 
                        key={tv.id}
                        onClick={() => setTipoVotacion(tv)}
                        className={`p-3 rounded-xl text-left text-xs font-bold border transition-all flex justify-between items-center ${tipoVotacion.id === tv.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
                      >
                        <span className="flex items-center gap-2">
                          <Scale size={14} /> {tv.label}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-[10px] ${tipoVotacion.id === tv.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {tv.quorum}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Asistencia Actual</h4>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-3xl font-black text-slate-900">{sociosPresentes}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Presentes</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-500">{totalSocios}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Total Socios</div>
                    </div>
                  </div>
                  
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(sociosPresentes / totalSocios) * 100}%` }} />
                  </div>
                </div>

                {cumpleQuorum ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3 text-emerald-700">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold">Procede: Quórum legal alcanzado</p>
                      <p className="text-[10px] mt-1 opacity-80">Se requieren {quorumRequeridoPersonas} socios ({tipoVotacion.quorum}%) y hay {sociosPresentes} presentes.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold">No procede: Quórum insuficiente según Ley 19.418</p>
                      <p className="text-[10px] mt-1 opacity-80">Se requieren {quorumRequeridoPersonas} socios ({tipoVotacion.quorum}%) y solo hay {sociosPresentes} presentes.</p>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setStatus('active')}
                disabled={!cumpleQuorum}
                className="w-full btn-apple-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar VOTACIÓN <ChevronRight size={18} />
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
                <div className="flex items-center gap-2">
                  {timeLeft !== null && (
                    <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-black border border-slate-200 flex items-center gap-1">
                      <Clock size={12} className={timeLeft <= 60 ? "text-red-500 animate-pulse" : "text-slate-400"} /> 
                      <span className={timeLeft <= 60 ? "text-red-500" : ""}>{formatTime(timeLeft)}</span>
                    </div>
                  )}
                  <div className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse border border-red-100 uppercase">En Vivo</div>
                </div>
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

        {/* PANEL DERECHO: LISTADO DE SOCIOS (TRANSPARENCIA) Y ACTA */}
        <div className="lg:col-span-2 card-apple flex flex-col overflow-hidden min-h-[500px] lg:min-h-0">
          <div className="p-0 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div className="flex w-full">
              <button 
                onClick={() => setRightTab('padron')}
                className={`flex-1 p-4 text-sm font-bold border-b-2 transition-all ${rightTab === 'padron' ? 'border-primary text-primary bg-white' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
              >
                Padrón Electoral ({totalSocios} socios)
              </button>
              <button 
                onClick={() => setRightTab('acta')}
                className={`flex-1 p-4 text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2 ${rightTab === 'acta' ? 'border-primary text-primary bg-white' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
              >
                <FileText size={16} /> Acta Oficial (Secretario)
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hidden bg-slate-50">
            {rightTab === 'padron' ? (
              <>
                <div className="flex justify-end mb-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-secondary">
                      <CheckCircle2 size={12} /> YA VOTÓ
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Clock size={12} /> PENDIENTE
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Generamos una lista simulada de socios */}
                  {[...Array(16)].map((_, i) => {
                    // Secuencia pseudoaleatoria fija para evitar parpadeos al actualizar el estado
                    const ordenVoto = [7, 2, 14, 5, 11, 0, 9, 15, 3, 12, 8, 1, 10, 6, 13, 4];
                    // Calculamos si este socio ya votó basado en el progreso global
                    const yaVoto = ordenVoto[i] < (votosRealizados / totalSocios) * 16;
                    
                    return (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                            S{i+1}
                          </div>
                          <p className="text-xs font-bold text-slate-700">Socio Correlativo N°{100 + i}</p>
                        </div>
                        {yaVoto ? (
                          <CheckCircle2 size={18} className="text-secondary" />
                        ) : (
                          <Clock size={18} className="text-slate-200" />
                        )}
                      </div>
                    );
                  })}
                  <div className="col-span-full py-4 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">... y 126 socios más registrados ...</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-3 bg-slate-900 text-white flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14} /> Libro de Actas Digital
                  </span>
                  <span className="text-[10px] px-2 py-1 bg-slate-800 rounded-lg text-slate-300 border border-slate-700">
                    {actaStatus === 'redactando' ? 'En Redacción' : 'Esperando Firmas'}
                  </span>
                </div>
                <textarea 
                  className="flex-1 w-full p-6 outline-none resize-none text-sm text-slate-700 font-serif leading-relaxed"
                  value={actaText}
                  onChange={(e) => setActaText(e.target.value)}
                  disabled={actaStatus !== 'redactando'}
                  placeholder="Redacte aquí el acta de la asamblea..."
                  spellCheck={false}
                />
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                  {actaStatus === 'redactando' ? (
                    <button 
                      onClick={() => setShowSignModal(true)}
                      className="w-full btn-apple-primary py-3 flex items-center justify-center gap-2"
                    >
                      <Lock size={18} /> Cerrar Acta y Solicitar Firmas
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center gap-3 text-amber-700">
                      <Clock className="animate-pulse" size={20} />
                      <span className="font-bold text-sm">Acta cerrada. Esperando firmas de los vecinos.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Botón Flotante: Asistente Legal IA */}
      <button className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-apple-lg flex items-center gap-3 hover:scale-105 transition-all z-40 group hover:pr-6 cursor-pointer border-2 border-white/20">
        <div className="bg-white/20 p-2 rounded-full">
          <Sparkles size={24} className="animate-pulse" />
        </div>
        <span className="font-black text-sm w-0 overflow-hidden group-hover:w-auto transition-all whitespace-nowrap opacity-0 group-hover:opacity-100 delay-75">
          Asistente Legal IA (Ley 19.418)
        </span>
      </button>

      {/* Modal de Firma del Secretario */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-primary-light text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Lock size={32} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black text-slate-900">Firma del Secretario</h3>
              <p className="text-sm text-slate-500 mt-2">Ingrese su contraseña de acceso para firmar digitalmente el acta y enviarla a los vecinos.</p>
            </div>
            
            <input 
              type="password" 
              placeholder="Contraseña de Acceso" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-primary outline-none text-center tracking-widest font-bold"
            />
            
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => { setShowSignModal(false); setPassword(''); }}
                className="flex-1 py-3 font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  if(password.trim() !== '') {
                    setActaStatus('esperando_firmas');
                    setShowSignModal(false);
                    setPassword('');
                  }
                }}
                className="flex-1 py-3 font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-apple transition-colors"
              >
                Firmar Acta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}