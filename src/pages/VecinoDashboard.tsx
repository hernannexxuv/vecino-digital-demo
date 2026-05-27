import { useState, useEffect } from 'react';
import { Megaphone, AlertTriangle, QrCode, ArrowRight, ShieldCheck, MapPin, Clock, Lock, CheckCircle2, X, Archive, Mail } from 'lucide-react';

const avisosBarrio = [
  { id: 1, type: 'urgente', title: 'Corte de agua programado', date: 'Mañana, 15:00 hrs', desc: 'Aguas Araucanía informa corte por matriz en Sector Sur.', icon: AlertTriangle, color: 'text-accent', bg: 'bg-accent-light' },
  { id: 2, type: 'comunidad', title: 'Asamblea Ordinaria', date: 'Viernes, 19:30 hrs', desc: 'Se votará el presupuesto de fachada. Tu asistencia es vital.', icon: Megaphone, color: 'text-primary', bg: 'bg-primary-light' },
  { id: 3, type: 'municipal', title: 'Operativo Mascotas DIDECO', date: 'Sábado, 10:00 hrs', desc: 'Vacunación gratuita en la plaza central del barrio.', icon: ShieldCheck, color: 'text-secondary', bg: 'bg-secondary-light' },
];

// Estados del flujo de votación
type VoteStep = 'idle' | 'alert' | 'voting' | 'confirm' | 'security' | 'success';

export default function VecinoDashboard() {
  const [voteStep, setVoteStep] = useState<VoteStep>('idle');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos en segundos
  const [password, setPassword] = useState('');
  const [gpsStatus, setGpsStatus] = useState<'pending' | 'locating' | 'verifying' | 'dropping' | 'success'>('pending');
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);

  // Temporizador real: un solo intervalo al montar el componente, sin dependencias externas
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Simulación de captura GPS
  const handleGpsAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setGpsStatus('locating');
    
    const startProcess = (lat: number, lon: number) => {
      setCoords({ lat, lon });
      setTimeout(() => {
        setGpsStatus('verifying');
        setTimeout(() => {
          setGpsStatus('dropping');
          setTimeout(() => {
            setGpsStatus('success');
            setTimeout(() => setVoteStep('success'), 800);
          }, 1500);
        }, 1500);
      }, 1500);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => startProcess(position.coords.latitude, position.coords.longitude),
        () => startProcess(-38.73965, -72.59842)
      );
    } else {
      startProcess(-38.73965, -72.59842);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 relative">
      
      {/* ========================================== */}
      {/* BOTÓN PARA SIMULAR EL ENVÍO DESDE DIRECTIVA */}
      {/* ========================================== */}
      <div className="bg-slate-100 p-2 rounded-xl border border-slate-200 flex justify-between items-center text-xs text-slate-500 mb-2">
        <span>Simulador de Demo:</span>
        <button onClick={() => setVoteStep('alert')} className="bg-white border border-slate-300 px-3 py-1 rounded-lg hover:bg-slate-50 font-bold text-slate-700">
          Simular Alerta de Votación
        </button>
      </div>

      {/* Header Saludo y resto del Dashboard... (Mantenido igual) */}
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
        {/* Columna Izquierda: Credencial Digital */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-primary to-[#005582] rounded-3xl p-6 shadow-apple-lg text-white relative overflow-hidden group">
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
                <p className="text-sm font-bold text-white flex items-center gap-1.5"><ShieldCheck size={14} className="text-secondary" /> Al Día</p>
              </div>
              <p className="text-[10px] text-white/50 font-mono font-bold bg-black/10 px-2 py-1 rounded-lg">ID: VEC-2026</p>
            </div>
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

      {/* ========================================== */}
      {/* FLUJO DE VOTACIÓN (OVERLAYS Y MODALES) */}
      {/* ========================================== */}

      {/* PASO 1: Alerta Glassmorphic (Cerrable si se pincha fuera) */}
      {voteStep === 'alert' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm animate-in fade-in"
          onClick={() => setVoteStep('idle')} // Cierra al pinchar fuera
        >
          {/* Botón flotante estilo iOS */}
          <button 
            onClick={(e) => { e.stopPropagation(); setVoteStep('voting'); }}
            className="glass-apple bg-primary/80 hover:bg-primary border-white/40 text-white rounded-[40px] px-8 py-5 flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-apple-lg"
          >
            <div className="bg-white/20 p-2 rounded-full"><Megaphone size={24} /></div>
            <div className="text-left">
              <p className="text-sm font-black tracking-wide">NUEVA VOTACIÓN ABIERTA</p>
              <p className="text-xs font-medium text-white/80">Toca aquí para participar</p>
            </div>
          </button>
        </div>
      )}

      {/* PASO 2 AL 5: Panel de Votación (No cerrable pinchando fuera por seguridad) */}
      {['voting', 'confirm', 'security', 'success'].includes(voteStep) && (
        <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
          
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-4 duration-300">
            
            {/* Header del Panel */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-primary" />
                <span className="font-bold text-slate-900 text-sm">Votación Oficial y Vinculante</span>
              </div>
              {voteStep === 'voting' && (
                <button onClick={() => setVoteStep('idle')} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={18} className="text-slate-500"/></button>
              )}
            </div>

            <div className="p-6">
              
              {/* PASO 2: Selección de Opciones */}
              {voteStep === 'voting' && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">Aprobación Presupuesto Fachada Sede Central</h3>
                    <p className="text-sm text-slate-500 font-medium">Convocado por: Directiva JV Amanecer</p>
                    <p className="text-xs text-slate-400 mt-1">Quórum requerido: 50% + 1</p>
                  </div>

                  {/* Temporizador */}
                  <div className="flex items-center justify-center gap-2 bg-accent-light text-accent py-2 px-4 rounded-xl font-mono font-bold text-lg border border-accent/20">
                    <Clock size={18} /> {formatTime(timeLeft)}
                  </div>

                  {/* Opciones */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    {['Apruebo', 'Rechazo', 'Abstención'].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full py-4 rounded-2xl border-2 font-bold transition-all text-sm ${
                          selectedOption === opt 
                            ? 'border-primary bg-primary-light text-primary' 
                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button 
                    disabled={!selectedOption}
                    onClick={() => setVoteStep('confirm')}
                    className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${selectedOption ? 'bg-primary hover:bg-primary-dark shadow-apple' : 'bg-slate-300 cursor-not-allowed'}`}
                  >
                    Continuar
                  </button>
                </div>
              )}

              {/* PASO 3: Confirmación Ciega */}
              {voteStep === 'confirm' && (
                <div className="text-center space-y-6 animate-in slide-in-from-right-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle size={24} className="text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">Confirmación de Voto</h3>
                    <p className="text-sm text-slate-500">Hernán Millahual V. (RUT: 17.XXX.XXX-X), usted está a punto de emitir su preferencia de forma inalterable. El voto es secreto.</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setVoteStep('voting')} className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Corregir</button>
                    <button onClick={() => setVoteStep('security')} className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-apple hover:bg-black">Sí, confirmar</button>
                  </div>
                </div>
              )}

              {/* PASO 4: Autenticación y GPS */}
              {voteStep === 'security' && (
                <div className="animate-in slide-in-from-right-4">
                  <style>{`
                    @keyframes spin-reverse {
                      from { transform: rotate(360deg); }
                      to { transform: rotate(0deg); }
                    }
                    @keyframes drop-in {
                      0% { transform: translateY(-100px) scale(0.5); opacity: 0; }
                      50% { transform: translateY(10px) scale(1.1); opacity: 1; }
                      100% { transform: translateY(0) scale(1); opacity: 1; }
                    }
                    @keyframes urna-pulse {
                      0%, 100% { transform: scale(1); }
                      50% { transform: scale(1.05); border-color: #22c55e; }
                    }
                  `}</style>
                  
                  {gpsStatus === 'pending' ? (
                    <form onSubmit={handleGpsAuth} className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-black text-slate-900">Validación de Identidad</h3>
                        <p className="text-xs text-slate-500 mt-1">Requerido por Ley 19.799 de Firma Electrónica</p>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Contraseña de acceso</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                          <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary" 
                            placeholder="Ingresa tu clave secreta" 
                          />
                        </div>
                      </div>

                      <div className="bg-secondary-light border border-secondary/20 p-4 rounded-xl flex items-start gap-3">
                        <MapPin className="text-secondary shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-bold text-secondary-dark">Validación Territorial (GPS)</p>
                          <p className="text-xs text-secondary/80 mt-1">La plataforma verificará que te encuentras dentro del radio del barrio Amanecer.</p>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={!password}
                        className="w-full py-4 rounded-2xl bg-secondary text-white font-bold transition-all shadow-apple flex justify-center items-center gap-2 hover:bg-[#72A600] disabled:opacity-70"
                      >
                        Emitir Voto Legalmente
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6 text-center py-4">
                      <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                        {coords ? (
                          <>
                            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none z-10" />
                            <iframe 
                              width="100%" 
                              height="100%" 
                              frameBorder="0" 
                              scrolling="no" 
                              marginHeight={0} 
                              marginWidth={0} 
                              src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon-0.005},${coords.lat-0.005},${coords.lon+0.005},${coords.lat+0.005}&layer=mapnik&marker=${coords.lat},${coords.lon}`}
                              className="opacity-70 grayscale"
                            ></iframe>
                            
                            {/* Animación sobre el mapa */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-[2px]">
                              {gpsStatus === 'locating' && (
                                <div className="flex flex-col items-center">
                                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                                  <p className="text-sm font-bold text-slate-900 bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-md">Localizando dispositivo...</p>
                                </div>
                              )}
                              
                              {gpsStatus === 'verifying' && (
                                <div className="flex flex-col items-center">
                                  <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                                    <div className="absolute inset-0 border-4 border-dashed border-secondary rounded-full" style={{ animation: 'spin-reverse 3s linear infinite' }}></div>
                                    <MapPin size={32} className="text-secondary animate-pulse" />
                                  </div>
                                  <p className="text-sm font-bold text-slate-900 bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-md">Verificando polígono vecinal...</p>
                                </div>
                              )}

                              {(gpsStatus === 'dropping' || gpsStatus === 'success') && (
                                <div className="flex flex-col items-center">
                                  <div className="relative w-24 h-24 flex items-center justify-center">
                                    <Archive 
                                      size={48} 
                                      className="text-slate-700 absolute bottom-2" 
                                      style={{ animation: gpsStatus === 'dropping' ? 'urna-pulse 1s ease-in-out infinite' : 'none' }} 
                                    />
                                    {gpsStatus === 'dropping' && (
                                      <Mail 
                                        size={32} 
                                        className="text-primary absolute" 
                                        style={{ animation: 'drop-in 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }} 
                                      />
                                    )}
                                    {gpsStatus === 'success' && (
                                      <CheckCircle2 size={32} className="text-green-500 absolute bottom-4 z-10" />
                                    )}
                                  </div>
                                  <p className="text-sm font-bold text-slate-900 bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-md mt-2">
                                    {gpsStatus === 'dropping' ? 'Depositando voto encriptado...' : 'Voto sellado'}
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="h-full flex items-center justify-center bg-slate-100">
                            <span className="text-slate-400 font-medium text-sm">Preparando conexión segura...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PASO 5: Éxito */}
              {voteStep === 'success' && (
                <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-50 border-4 border-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Voto Recibido</h3>
                    <p className="text-sm text-slate-500">Hernán Millahual V. (RUT: 17.XXX.XXX-X), tu preferencia ha sido encriptada y validada geográficamente con éxito.</p>
                  </div>
                  <button onClick={() => { setVoteStep('idle'); setSelectedOption(null); setPassword(''); setGpsStatus('pending'); }} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-apple hover:bg-black">
                    Volver al Inicio
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
} 
