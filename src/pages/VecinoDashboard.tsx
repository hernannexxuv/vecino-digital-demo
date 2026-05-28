import { useState, useEffect, useRef } from 'react';
import { Megaphone, AlertTriangle, QrCode, ArrowRight, ShieldCheck, MapPin, Clock, Lock, CheckCircle2, X, Archive, Mail } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Componente Timer Aislado: Maneja su propio estado
function CountdownTimer({ minutes = 15 }: { minutes?: number }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const formatted = `${m}:${s.toString().padStart(2, '0')}`;

  return <>{formatted}</>;
}

// Mapa Leaflet Elegante con CartoDB Positron
function LeafletMap({ coords }: { coords: { lat: number, lon: number } }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Limpiamos cualquier instancia previa (útil para React Strict Mode)
    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    // Inicializamos el mapa
    const map = L.map(mapRef.current, {
      center: [coords.lat, coords.lon],
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
      dragging: true 
    });

    mapInstance.current = map;

    // CartoDB Positron (mapa minimalista, elegante, ideal para dashboards)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    // Marcador personalizado "Glassmorphic / Moderno" usando divIcon
    const customIcon = L.divIcon({
      className: 'bg-transparent',
      html: '<div class="w-6 h-6 bg-secondary rounded-full border-4 border-white shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([coords.lat, coords.lon], { icon: customIcon }).addTo(map);

    // Forzamos recalcular tamaño de forma repetida por si hay animaciones largas
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
  }, [coords]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, filter: 'opacity(0.8) grayscale(0.2)' }} />;
}

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
  const [password, setPassword] = useState('');
  const [gpsStatus, setGpsStatus] = useState<'pending' | 'locating' | 'verifying' | 'dropping' | 'success'>('pending');
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);

  // Simulación de captura GPS
  const handleGpsAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setGpsError(null);
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
      // Usamos enableHighAccuracy: false para evitar fallos de señal satelital en interiores (celulares).
      // Esto de igual forma forzará al navegador a pedir el permiso al usuario.
      navigator.geolocation.getCurrentPosition(
        (position) => startProcess(position.coords.latitude, position.coords.longitude),
        (error) => {
          console.warn("GPS denegado o no disponible:", error);
          setGpsStatus('pending');
          if (error.code === error.PERMISSION_DENIED) {
            setGpsError('Acceso bloqueado por el navegador. Ve a la Configuración de tu celular y otorga el permiso de ubicación a Chrome/Safari para este sitio.');
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setGpsError('Señal de ubicación no disponible. Revisa que el GPS de tu celular esté encendido.');
          } else if (error.code === error.TIMEOUT) {
            setGpsError('Tiempo de espera agotado buscando tu ubicación. Intenta de nuevo.');
          } else {
            setGpsError('Error al obtener la ubicación. Intenta nuevamente.');
          }
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 60000 }
      );
    } else {
      setGpsStatus('pending');
      setGpsError('Tu navegador no soporta geolocalización.');
    }
  };

  return (
    <div className="min-h-full flex flex-col gap-6 relative">
      
      {/* ========================================== */}
      {/* BOTÓN PARA SIMULAR EL ENVÍO DESDE DIRECTIVA */}
      {/* ========================================== */}
      <div className="bg-slate-100 p-2 rounded-xl border border-slate-200 flex justify-between items-center text-xs text-slate-500 mb-2">
        <div className="flex items-center gap-3">
          <span>Simulador de Demo:</span>
          {/* Cronometro siempre visible para la demo */}
          <div className="flex items-center gap-1.5 bg-white text-slate-700 px-2 py-1 rounded font-mono font-bold border border-slate-300">
            <Clock size={14} />
            <CountdownTimer />
          </div>
        </div>
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
          <div className="bg-gradient-to-br from-primary via-primary to-[#003d5c] rounded-3xl p-6 shadow-xl shadow-primary/20 text-white relative overflow-hidden group border border-white/20 hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary opacity-20 blur-3xl rounded-full" />
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <p className="text-[10px] text-white/80 uppercase tracking-widest font-bold mb-1">Credencial Digital</p>
                <p className="font-black text-xl leading-tight tracking-tight shadow-sm">Socio Activo</p>
              </div>
              <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-lg active:scale-95">
                <QrCode size={24} className="text-white" />
              </button>
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
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 flex flex-col overflow-hidden min-h-[500px] lg:min-h-0">
          <div className="p-6 border-b border-slate-100/80 flex items-center justify-between bg-white/50">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Muro Vecinal Temuco</h3>
            <button className="text-xs font-bold text-primary hover:text-primary-dark hover:bg-primary/5 px-3 py-1.5 rounded-full transition-colors">Ver todo</button>
          </div>
          
          <div className="flex-1 overflow-auto p-6 space-y-4 scrollbar-hidden">
            {avisosBarrio.map((aviso) => {
              const Icon = aviso.icon;
              return (
                <div key={aviso.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-300 bg-white group cursor-pointer">
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
            <div className="mt-6 bg-gradient-to-r from-primary to-[#009c7a] rounded-2xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden border border-white/10 group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 blur-2xl rounded-full group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-white/20 backdrop-blur-md text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest mb-3 inline-block border border-white/20 shadow-sm">
                      Participación DIDECO
                    </span>
                    <p className="font-bold text-lg mb-1 leading-tight">¿Qué taller municipal prefieres este invierno?</p>
                    <p className="text-xs text-white/90 font-medium">Tu opinión ayuda a organizar los recursos comunales.</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-300 py-3 rounded-xl text-xs font-bold border border-white/20 backdrop-blur-sm shadow-sm hover:shadow-md">Deportes Indoor</button>
                  <button className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-300 py-3 rounded-xl text-xs font-bold border border-white/20 backdrop-blur-sm shadow-sm hover:shadow-md">Computación Básica</button>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setVoteStep('idle')} // Cierra al pinchar fuera
        >
          {/* Botón flotante estilo iOS / Premium GovTech */}
          <button 
            onClick={(e) => { e.stopPropagation(); setVoteStep('voting'); }}
            className="bg-primary/90 hover:bg-primary border border-white/30 text-white rounded-[32px] px-8 py-5 flex items-center gap-5 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-2xl shadow-primary/30 backdrop-blur-xl"
          >
            <div className="bg-white/20 p-3 rounded-full shadow-inner border border-white/20 animate-pulse"><Megaphone size={24} /></div>
            <div className="text-left">
              <p className="text-base font-black tracking-wide drop-shadow-sm">NUEVA VOTACIÓN ABIERTA</p>
              <p className="text-sm font-medium text-white/90">Toca aquí para participar</p>
            </div>
          </button>
        </div>
      )}

      {/* PASO 2 AL 5: Panel de Votación (No cerrable pinchando fuera por seguridad) */}
      {['voting', 'confirm', 'security', 'success'].includes(voteStep) && (
        <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-lg animate-in fade-in duration-300">
          
          <div className="w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-white/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 sm:zoom-in-95 duration-500">
            
            {/* Header del Panel */}
            <div className="px-6 py-5 border-b border-slate-100/80 flex justify-between items-center bg-white/90 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="bg-primary/10 p-1.5 rounded-full"><ShieldCheck size={18} className="text-primary" /></div>
                <span className="font-black text-slate-900 text-sm tracking-tight">Votación Oficial y Vinculante</span>
              </div>
              {voteStep === 'voting' && (
                <button onClick={() => setVoteStep('idle')} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-all active:scale-95"><X size={18} className="text-slate-600"/></button>
              )}
            </div>

            <div className="p-6 sm:p-8">
              
              {/* PASO 2: Selección de Opciones */}
              {voteStep === 'voting' && (
                <div className="space-y-7 animate-in slide-in-from-right-8 duration-500">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3 tracking-tight">Aprobación Presupuesto Fachada Sede Central</h3>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Convocado por: Directiva JV Amanecer
                      </p>
                      <p className="text-xs text-slate-400 font-medium ml-3.5">Quórum requerido: 50% + 1</p>
                    </div>
                  </div>

                  {/* Temporizador */}
                  <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-600 py-3 px-4 rounded-2xl font-mono font-bold text-xl border border-amber-200/50 shadow-sm">
                    <Clock size={20} className="animate-pulse" /> <CountdownTimer />
                  </div>

                  {/* Opciones */}
                  <div className="space-y-3 pt-3">
                    {['Apruebo', 'Rechazo', 'Abstención'].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full py-4 px-6 rounded-2xl border-2 font-black transition-all duration-300 text-base flex justify-between items-center ${
                          selectedOption === opt 
                            ? 'border-primary bg-primary/5 text-primary shadow-md shadow-primary/10 scale-[1.02]' 
                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.01]'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedOption === opt && <CheckCircle2 size={20} className="text-primary animate-in zoom-in" />}
                      </button>
                    ))}
                  </div>

                  <button 
                    disabled={!selectedOption}
                    onClick={() => setVoteStep('confirm')}
                    className={`w-full py-4 rounded-2xl font-black text-white transition-all duration-300 text-lg ${
                      selectedOption 
                        ? 'bg-primary hover:bg-primary-dark shadow-xl shadow-primary/30 active:scale-95' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Continuar
                  </button>
                </div>
              )}

              {/* PASO 3: Confirmación Ciega */}
              {voteStep === 'confirm' && (
                <div className="text-center space-y-8 animate-in slide-in-from-right-8 duration-500">
                  <div className="w-20 h-20 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto shadow-inner relative">
                    <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-20"></div>
                    <AlertTriangle size={32} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Confirmación de Voto</h3>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left mb-4">
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                         <span className="font-bold text-slate-900">Hernán Millahual V.</span> (RUT: 17.XXX.XXX-X), usted está a punto de emitir su preferencia de forma inalterable. El voto es secreto y encriptado.
                       </p>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button onClick={() => setVoteStep('voting')} className="flex-1 py-4 rounded-2xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">Corregir</button>
                    <button onClick={() => setVoteStep('security')} className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 hover:bg-black transition-all active:scale-95">Sí, confirmar</button>
                  </div>
                </div>
              )}

              {/* PASO 4: Autenticación y GPS */}
              {voteStep === 'security' && (
                <div className="animate-in slide-in-from-right-8 duration-500">
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
                    <form onSubmit={handleGpsAuth} className="space-y-7">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Firma Digital</h3>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Requerido por Ley 19.799 sobre Documentos Electrónicos</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Clave Única Vecinal</label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                          <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-base font-semibold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm" 
                            placeholder="Ingresa tu clave secreta" 
                          />
                        </div>
                      </div>

                      <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
                        <div className="bg-white p-2 rounded-full shadow-sm"><MapPin className="text-secondary" size={20} /></div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 mb-1">Validación Territorial (GPS)</p>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">Se verificará mediante GPS que te encuentras dentro del radio jurisdiccional del barrio Amanecer.</p>
                        </div>
                      </div>

                      {gpsError && (
                        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3 animate-in shake">
                          <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                          <div>
                            <p className="text-sm font-bold text-red-800 mb-0.5">Ubicación Requerida</p>
                            <p className="text-xs text-red-600 font-medium">{gpsError}</p>
                          </div>
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={!password}
                        className="w-full py-4 rounded-2xl bg-secondary text-white font-black text-lg transition-all shadow-xl shadow-secondary/30 flex justify-center items-center gap-2 hover:bg-[#1f9d50] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                      >
                        <ShieldCheck size={20} />
                        Firmar y Emitir Voto
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6 text-center py-4 animate-in fade-in duration-500">
                      <div className="relative h-56 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-inner">
                        {coords ? (
                          <>
                            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none z-10" />
                            <LeafletMap coords={coords} />
                            
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
                <div className="text-center space-y-8 py-8 animate-in zoom-in-95 duration-700">
                  <div className="w-24 h-24 bg-green-50 border-4 border-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner relative">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30"></div>
                    <CheckCircle2 size={48} className="text-green-500 animate-in zoom-in duration-300 delay-150" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">¡Voto Recibido!</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-[280px] mx-auto">
                      <span className="font-bold text-slate-900">Hernán Millahual V.</span><br />
                      Tu preferencia ha sido encriptada y validada geográficamente con éxito.
                    </p>
                  </div>
                  <button onClick={() => { setVoteStep('idle'); setSelectedOption(null); setPassword(''); setGpsStatus('pending'); }} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl shadow-slate-900/20 hover:bg-black transition-all hover:scale-[1.02] active:scale-95">
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
