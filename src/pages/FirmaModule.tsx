import { useState } from 'react';
import { CheckCircle2, XCircle, MapPin, Upload, PenTool, Shield, Radio, FileText, Smartphone } from 'lucide-react';

interface Attendee { id: number; name: string; signed: boolean; gpsValidated: boolean; }

const MOCK_ATTENDEES: Attendee[] = [
  { id: 1, name: 'Juan Martinez', signed: true, gpsValidated: true },
  { id: 2, name: 'Maria Lopez', signed: true, gpsValidated: true },
  { id: 3, name: 'Carlos Soto', signed: false, gpsValidated: true },
  { id: 4, name: 'Ana Rivera', signed: false, gpsValidated: true },
  { id: 5, name: 'Pedro Gonzalez', signed: true, gpsValidated: true },
];

export default function FirmaModule() {
  const [attendees] = useState<Attendee[]>(MOCK_ATTENDEES);
  const [hasSigned, setHasSigned] = useState(false);

  const signedCount = attendees.filter((a) => a.signed).length;
  const totalCount = attendees.length;

  return (
    <div className="h-full flex flex-col lg:flex-row gap-0 overflow-hidden rounded-2xl border border-slate-200 shadow-apple">
      {/* Left Side - Vista Secretario */}
      <div className="flex-1 bg-white border-r border-slate-200 flex flex-col min-w-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Panel de Asistentes y Firmas</h2>
              <p className="text-xs text-gray-400 mt-0.5">{signedCount} de {totalCount} han firmado</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-apple-md">
              <Upload className="w-4 h-4" /> Cargar Acta para Firma
            </button>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(signedCount / totalCount) * 100}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 scrollbar-hidden">
          <div className="space-y-2">
            {attendees.map((attendee) => (
              <div key={attendee.id} className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${attendee.signed ? 'bg-green-50/50 border-green-100' : 'bg-red-50/30 border-red-100'}`}>
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-semibold ${attendee.signed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {attendee.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{attendee.name}</p>
                    {attendee.gpsValidated && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-lg">
                        <MapPin className="w-2.5 h-2.5" /> GPS Validado
                      </span>
                    )}
                  </div>
                </div>
                {attendee.signed ? (
                  <div className="flex items-center gap-1.5 text-green-600"><CheckCircle2 className="w-5 h-5" /><span className="text-xs font-semibold">Firmado</span></div>
                ) : (
                  <div className="flex items-center gap-1.5 text-red-500"><XCircle className="w-5 h-5" /><span className="text-xs font-semibold">Falta firmar</span></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Vista Vecino (Mobile Simulation) */}
      <div className="w-full lg:w-[380px] shrink-0 flex flex-col items-center bg-slate-50 p-4 lg:p-6 overflow-hidden">
        <div className="w-full max-w-[340px] bg-white rounded-3xl shadow-apple-lg border border-slate-200 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 bg-gray-900 flex items-center justify-center gap-2">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-blink" />
            <span className="text-xs font-semibold text-white tracking-wide">Asamblea en Vivo</span>
          </div>

          <div className="flex-1 p-5 max-h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900">Acta N° 47</h3>
            </div>
            <div className="bg-green-50 rounded-xl p-3 border border-green-100 mb-4">
              <p className="text-xs text-green-800">Se aprueba presupuesto de reparación.</p>
            </div>
          </div>

          <div className="p-5 border-t border-slate-100">
            {hasSigned ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-green-700">Acta firmada digitalmente</p>
              </div>
            ) : (
              <button onClick={() => setHasSigned(true)} className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-semibold bg-gray-900 text-white hover:bg-gray-800 shadow-apple-lg transition-all active:scale-[0.97]">
                <PenTool className="w-5 h-5" /> Firmar Acta
              </button>
            )}
            <p className="text-center text-[10px] text-gray-400 mt-2">
              <Shield className="w-3 h-3 inline-block mr-0.5" /> Validez legal respaldada por certificado digital
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400">
          <Smartphone className="w-3 h-3" /> Vista simulada dispositivo vecino
        </div>
      </div>
    </div>
  );
}
