// src/pages/SociosModule.tsx
// Directorio de Socios con fichas personales y financieras

import { useState } from 'react';
import { ContactRound, X, ArrowLeft, FileText, CreditCard, CheckCircle2, AlertCircle, Phone, Mail, MapPin, User, ChevronRight } from 'lucide-react';

// ============================================================
// TIPOS
// ============================================================
interface Cuota {
  numero: number;
  fechaEmision: string;
  fechaPago: string | null;
  monto: number;
  pagada: boolean;
}

interface Socio {
  id: number;
  numero: number;
  nombre: string;
  rut: string;
  domicilio: string;
  telefono: string;
  email: string;
  telEmergencia: string;
  parentesco: string;
  cuotasPagadas: number;
  cuotasImpagas: number;
  cuotas: Cuota[];
}

// ============================================================
// MOCK DATA — 20 SOCIOS
// ============================================================
const generarCuotas = (pagadas: number, impagas: number): Cuota[] => {
  const cuotas: Cuota[] = [];
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const anio = 2026;
  let idx = 1;

  for (let i = 0; i < pagadas; i++) {
    const mesIdx = (anio - 2026) * 12 + i;
    cuotas.push({
      numero: idx++,
      fechaEmision: `01-${meses[mesIdx % 12]}-${anio + Math.floor(mesIdx / 12)}`,
      fechaPago: `${10 + (mesIdx % 15)}-${meses[mesIdx % 12]}-${anio + Math.floor(mesIdx / 12)}`,
      monto: 5000 + (i * 500),
      pagada: true,
    });
  }
  for (let i = 0; i < impagas; i++) {
    const mesIdx = (anio - 2026) * 12 + pagadas + i;
    cuotas.push({
      numero: idx++,
      fechaEmision: `01-${meses[mesIdx % 12]}-${anio + Math.floor(mesIdx / 12)}`,
      fechaPago: null,
      monto: 5000 + ((pagadas + i) * 500),
      pagada: false,
    });
  }
  return cuotas;
};

const SOCIOS_MOCK: Socio[] = [
  { id: 1, numero: 1, nombre: 'María González Huaiquil', rut: '12.345.678-9', domicilio: 'Av. Alemania 1420', telefono: '+56 9 8123 4567', email: 'maria.gonzalez@email.com', telEmergencia: '+56 9 9876 5432', parentesco: 'Hija', cuotasPagadas: 6, cuotasImpagas: 2, cuotas: generarCuotas(6, 2) },
  { id: 2, numero: 2, nombre: 'Juan Cárdenas Lefián', rut: '13.456.789-0', domicilio: 'Calle Los Carrera 845', telefono: '+56 9 7234 5678', email: 'juan.cardenas@email.com', telEmergencia: '+56 9 8765 4321', parentesco: 'Esposa', cuotasPagadas: 8, cuotasImpagas: 0, cuotas: generarCuotas(8, 0) },
  { id: 3, numero: 3, nombre: 'Rosa Huilipán Antileo', rut: '14.567.890-1', domicilio: 'Pasaje Los Álamos 321', telefono: '+56 9 6345 6789', email: 'rosa.huilipan@email.com', telEmergencia: '+56 9 7654 3210', parentesco: 'Hermano', cuotasPagadas: 4, cuotasImpagas: 4, cuotas: generarCuotas(4, 4) },
  { id: 4, numero: 4, nombre: 'Pedro Lefián Marileo', rut: '15.678.901-2', domicilio: 'Av. Pedro de Valdivia 2100', telefono: '+56 9 5456 7890', email: 'pedro.lefian@email.com', telEmergencia: '+56 9 6543 2109', parentesco: 'Madre', cuotasPagadas: 7, cuotasImpagas: 1, cuotas: generarCuotas(7, 1) },
  { id: 5, numero: 5, nombre: 'Carmen Huaiquil Paillalef', rut: '16.789.012-3', domicilio: 'Calle Manuel Bulnes 567', telefono: '+56 9 4567 8901', email: 'carmen.huaiquil@email.com', telEmergencia: '+56 9 5432 1098', parentesco: 'Hijo', cuotasPagadas: 5, cuotasImpagas: 3, cuotas: generarCuotas(5, 3) },
  { id: 6, numero: 6, nombre: 'Luis Antilef Huenchullán', rut: '17.890.123-4', domicilio: 'Av. República 334', telefono: '+56 9 3678 9012', email: 'luis.antilef@email.com', telEmergencia: '+56 9 4321 0987', parentesco: 'Hermana', cuotasPagadas: 9, cuotasImpagas: 0, cuotas: generarCuotas(9, 0) },
  { id: 7, numero: 7, nombre: 'Ana Marileo Carillanca', rut: '18.901.234-5', domicilio: 'Pasaje Los Sauces 123', telefono: '+56 9 2789 0123', email: 'ana.marileo@email.com', telEmergencia: '+56 9 3210 9876', parentesco: 'Padre', cuotasPagadas: 3, cuotasImpagas: 5, cuotas: generarCuotas(3, 5) },
  { id: 8, numero: 8, nombre: 'Miguel Paillalef Colihuinca', rut: '19.012.345-6', domicilio: 'Calle Lautaro 890', telefono: '+56 9 1890 1234', email: 'miguel.paillalef@email.com', telEmergencia: '+56 9 2109 8765', parentesco: 'Esposo', cuotasPagadas: 6, cuotasImpagas: 2, cuotas: generarCuotas(6, 2) },
  { id: 9, numero: 9, nombre: 'Sofía Melinao Nahuelpán', rut: '20.123.456-7', domicilio: 'Av. Costanera 450', telefono: '+56 9 0901 2345', email: 'sofia.melinao@email.com', telEmergencia: '+56 9 1098 7654', parentesco: 'Hija', cuotasPagadas: 2, cuotasImpagas: 6, cuotas: generarCuotas(2, 6) },
  { id: 10, numero: 10, nombre: 'Carlos Huenchullán Llancaleo', rut: '21.234.567-8', domicilio: 'Calle Barros Arana 1560', telefono: '+56 9 9012 3456', email: 'carlos.huenchullan@email.com', telEmergencia: '+56 9 0987 6543', parentesco: 'Madre', cuotasPagadas: 7, cuotasImpagas: 1, cuotas: generarCuotas(7, 1) },
  { id: 11, numero: 11, nombre: 'Elena Carillanca Huenul', rut: '22.345.678-9', domicilio: 'Pasaje Nahuelbuta 789', telefono: '+56 9 8123 4567', email: 'elena.carillanca@email.com', telEmergencia: '+56 9 9876 5432', parentesco: 'Hermano', cuotasPagadas: 4, cuotasImpagas: 4, cuotas: generarCuotas(4, 4) },
  { id: 12, numero: 12, nombre: 'Ricardo Huenul Antinao', rut: '23.456.789-0', domicilio: 'Calle Claro Solar 234', telefono: '+56 9 7234 5678', email: 'ricardo.huenul@email.com', telEmergencia: '+56 9 8765 4321', parentesco: 'Esposa', cuotasPagadas: 8, cuotasImpagas: 0, cuotas: generarCuotas(8, 0) },
  { id: 13, numero: 13, nombre: 'Patricia Llancaleo Huircán', rut: '24.567.890-1', domicilio: 'Av. Pinto 1120', telefono: '+56 9 6345 6789', email: 'patricia.llancaleo@email.com', telEmergencia: '+56 9 7654 3210', parentesco: 'Hijo', cuotasPagadas: 5, cuotasImpagas: 3, cuotas: generarCuotas(5, 3) },
  { id: 14, numero: 14, nombre: 'Héctor Nahuelpán Marileo', rut: '25.678.901-2', domicilio: 'Calle Vicuña Mackenna 670', telefono: '+56 9 5456 7890', email: 'hector.nahuelpan@email.com', telEmergencia: '+56 9 6543 2109', parentesco: 'Padre', cuotasPagadas: 6, cuotasImpagas: 2, cuotas: generarCuotas(6, 2) },
  { id: 15, numero: 15, nombre: 'Marta Colihuinca Lefián', rut: '26.789.012-3', domicilio: 'Pasaje Los Lingues 456', telefono: '+56 9 4567 8901', email: 'marta.colihuinca@email.com', telEmergencia: '+56 9 5432 1098', parentesco: 'Hermana', cuotasPagadas: 3, cuotasImpagas: 5, cuotas: generarCuotas(3, 5) },
  { id: 16, numero: 16, nombre: 'Gabriel Marileo Huenchullán', rut: '27.890.123-4', domicilio: 'Calle San Martín 890', telefono: '+56 9 3678 9012', email: 'gabriel.marileo@email.com', telEmergencia: '+56 9 4321 0987', parentesco: 'Hija', cuotasPagadas: 9, cuotasImpagas: 0, cuotas: generarCuotas(9, 0) },
  { id: 17, numero: 17, nombre: 'Isabel Lefián Carillanca', rut: '28.901.234-5', domicilio: 'Av. Alemania 2100', telefono: '+56 9 2789 0123', email: 'isabel.lefian@email.com', telEmergencia: '+56 9 3210 9876', parentesco: 'Esposo', cuotasPagadas: 2, cuotasImpagas: 6, cuotas: generarCuotas(2, 6) },
  { id: 18, numero: 18, nombre: 'Francisco Huircán Melinao', rut: '29.012.345-6', domicilio: 'Calle Blanco Encalada 345', telefono: '+56 9 1890 1234', email: 'francisco.huircan@email.com', telEmergencia: '+56 9 2109 8765', parentesco: 'Madre', cuotasPagadas: 5, cuotasImpagas: 3, cuotas: generarCuotas(5, 3) },
  { id: 19, numero: 19, nombre: 'Verónica Antinao Paillalef', rut: '30.123.456-7', domicilio: 'Pasaje Los Robles 567', telefono: '+56 9 0901 2345', email: 'veronica.antinao@email.com', telEmergencia: '+56 9 1098 7654', parentesco: 'Hermano', cuotasPagadas: 7, cuotasImpagas: 1, cuotas: generarCuotas(7, 1) },
  { id: 20, numero: 20, nombre: 'Hernán Millahual Millahual', rut: '31.234.567-8', domicilio: 'Av. Pedro de Valdivia 1850', telefono: '+56 9 9012 3456', email: 'hernan.millahual@email.com', telEmergencia: '+56 9 0987 6543', parentesco: 'Esposa', cuotasPagadas: 8, cuotasImpagas: 0, cuotas: generarCuotas(8, 0) },
];

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
export default function SociosModule() {
  const [selectedSocio, setSelectedSocio] = useState<Socio | null>(null);
  const [showFinanzas, setShowFinanzas] = useState(false);

  const socio = selectedSocio;

  return (
    <div className="flex flex-col gap-6 min-h-full">

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-apple flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
          <ContactRound className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Directorio de Socios</h2>
          <p className="text-sm text-slate-500 mt-0.5">Junta de Vecinos Amanecer · {SOCIOS_MOCK.length} socios registrados.</p>
        </div>
      </div>

      {/* ========================================== */}
      {/* LISTA DE SOCIOS */}
      {/* ========================================== */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-apple flex flex-col overflow-hidden flex-1">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-primary-light flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-primary" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Nómina de Socios</h3>
          </div>
          <span className="text-[10px] font-bold text-secondary bg-secondary-light px-3 py-1.5 rounded-xl border border-secondary/20">
            {SOCIOS_MOCK.filter(s => s.cuotasImpagas === 0).length} al día · {SOCIOS_MOCK.filter(s => s.cuotasImpagas > 0).length} morosos
          </span>
        </div>

        <div className="flex-1 overflow-auto p-4 scrollbar-hidden">
          <div className="space-y-1">
            {SOCIOS_MOCK.map((socio) => (
              <button
                key={socio.id}
                onClick={() => { setSelectedSocio(socio); setShowFinanzas(false); }}
                className="w-full flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left group"
              >
                {/* Número de socio */}
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary-light transition-colors">
                  <span className="text-sm font-black text-slate-500 group-hover:text-primary transition-colors">{String(socio.numero).padStart(2, '0')}</span>
                </div>

                {/* Info principal */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{socio.nombre}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{socio.rut} · {socio.domicilio}</p>
                </div>

                {/* Estado cuotas */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-2">
                    {socio.cuotasImpagas === 0 ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-secondary bg-secondary-light px-2.5 py-1 rounded-lg border border-secondary/20">
                        <CheckCircle2 size={10} /> Al día
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-accent bg-accent-light px-2.5 py-1 rounded-lg border border-accent/20">
                        <AlertCircle size={10} /> {socio.cuotasImpagas} impagas
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{socio.cuotasPagadas} cuotas pagadas</p>
                </div>

                <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL APPLE — FICHA DEL SOCIO */}
      {/* ========================================== */}
      {selectedSocio && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => { setSelectedSocio(null); setShowFinanzas(false); }}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-apple-lg w-full max-w-xl my-8 overflow-hidden border border-white/50 glass-apple"
            onClick={(e) => e.stopPropagation()}>

            {/* HEADER DEL MODAL */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                {showFinanzas && (
                  <button onClick={() => setShowFinanzas(false)}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                    <ArrowLeft size={18} />
                  </button>
                )}
                <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center">
                  {showFinanzas ? <CreditCard className="w-4.5 h-4.5 text-primary" /> : <User className="w-4.5 h-4.5 text-primary" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {showFinanzas ? 'Historial Financiero' : 'Ficha del Socio'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">{showFinanzas ? socio?.nombre : `#${String(socio?.numero).padStart(2, '0')} · ${socio?.rut}`}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedSocio(null); setShowFinanzas(false); }}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* CUERPO DEL MODAL */}
            <div className="p-5 max-h-[65vh] overflow-y-auto scrollbar-hidden">
              {!showFinanzas ? (
                /* -------- VISTA: DATOS PERSONALES -------- */
                <div className="space-y-6">
                  {/* Avatar y nombre grande */}
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-black text-xl shadow-apple-md">
                      {socio!.nombre.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{socio!.nombre}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${socio!.cuotasImpagas === 0 ? 'text-secondary bg-secondary-light border-secondary/20' : 'text-accent bg-accent-light border-accent/20'}`}>
                          {socio!.cuotasImpagas === 0 ? 'Al día' : `${socio!.cuotasImpagas} cuotas impagas`}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">Socio N° {String(socio!.numero).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Datos personales en grilla */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <User size={14} className="text-primary" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RUT</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{socio!.rut}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={14} className="text-primary" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Domicilio</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{socio!.domicilio}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Phone size={14} className="text-primary" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teléfono</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{socio!.telefono}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Mail size={14} className="text-primary" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-mail</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 truncate">{socio!.email}</p>
                    </div>
                  </div>

                  {/* Contacto de emergencia */}
                  <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle size={14} className="text-amber-600" />
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Contacto de Emergencia</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-amber-500 font-bold uppercase">Nombre / Parentesco</p>
                        <p className="text-sm font-bold text-slate-800">{socio!.telEmergencia} <span className="text-xs font-medium text-slate-400">({socio!.parentesco})</span></p>
                      </div>
                      <div>
                        <p className="text-[10px] text-amber-500 font-bold uppercase">Teléfono Emergencia</p>
                        <p className="text-sm font-bold text-slate-800">{socio!.telEmergencia}</p>
                      </div>
                    </div>
                  </div>

                  {/* Resumen de cuotas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary-light/50 rounded-2xl p-4 border border-secondary/20">
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Cuotas Pagadas</p>
                      <p className="text-2xl font-black text-secondary">{socio!.cuotasPagadas}</p>
                    </div>
                    <div className="bg-accent-light/50 rounded-2xl p-4 border border-accent/20">
                      <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">Cuotas Impagas</p>
                      <p className="text-2xl font-black text-accent">{socio!.cuotasImpagas}</p>
                    </div>
                  </div>

                  {/* Botón para ver finanzas */}
                  <button onClick={() => setShowFinanzas(true)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white text-sm font-bold rounded-2xl shadow-apple hover:bg-primary-dark transition-all active:scale-[0.98]">
                    <CreditCard size={16} />
                    Ver historial financiero completo
                  </button>
                </div>
              ) : (
                /* -------- VISTA: HISTORIAL FINANCIERO -------- */
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-medium bg-slate-50 rounded-xl p-3 border border-slate-100">
                    Detalle de cuotas sociales de <strong className="text-slate-800">{socio!.nombre}</strong>
                  </p>

                  {/* Totales compactos */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-secondary-light/50 rounded-xl p-3 text-center border border-secondary/20">
                      <p className="text-[9px] font-bold text-secondary uppercase">Pagadas</p>
                      <p className="text-lg font-black text-secondary">{socio!.cuotasPagadas}</p>
                    </div>
                    <div className="bg-accent-light/50 rounded-xl p-3 text-center border border-accent/20">
                      <p className="text-[9px] font-bold text-accent uppercase">Impagas</p>
                      <p className="text-lg font-black text-accent">{socio!.cuotasImpagas}</p>
                    </div>
                    <div className="bg-primary-light rounded-xl p-3 text-center border border-primary/20">
                      <p className="text-[9px] font-bold text-primary uppercase">Total</p>
                      <p className="text-lg font-black text-primary">{socio!.cuotas.length}</p>
                    </div>
                  </div>

                  {/* Tabla de cuotas */}
                  <div className="border border-slate-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">N°</th>
                          <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Emisión</th>
                          <th className="text-left py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Pago</th>
                          <th className="text-right py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Monto</th>
                          <th className="text-center py-3 px-4 font-bold text-slate-400 uppercase tracking-wider">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {socio!.cuotas.map((cuota) => (
                          <tr key={cuota.numero} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-700">#{String(cuota.numero).padStart(2, '0')}</td>
                            <td className="py-3 px-4 font-medium text-slate-600">{cuota.fechaEmision}</td>
                            <td className="py-3 px-4 font-medium text-slate-600">{cuota.fechaPago ?? '—'}</td>
                            <td className="py-3 px-4 text-right font-bold text-slate-700">${cuota.monto.toLocaleString('es-CL')}</td>
                            <td className="py-3 px-4 text-center">
                              {cuota.pagada ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary bg-secondary-light px-2 py-1 rounded-lg border border-secondary/20">
                                  <CheckCircle2 size={9} /> Pagada
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent bg-accent-light px-2 py-1 rounded-lg border border-accent/20">
                                  <AlertCircle size={9} /> Adeuda
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Total acumulado */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total adeudado</span>
                    <span className="text-lg font-black text-accent">
                      ${socio!.cuotas.filter(c => !c.pagada).reduce((sum, c) => sum + c.monto, 0).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
