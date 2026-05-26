import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Upload, Plus, MapPin, Filter } from 'lucide-react';
import SelectDropdown from '../components/ui/SelectDropdown';

// Tipos básicos
type Role = 'superadmin' | 'municipalidad' | 'directiva' | 'vecino';

export default function IncidenciasModule() {
  const { currentRole } = useOutletContext<{ currentRole: Role }>();
  const [showForm, setShowForm] = useState(false);
  const [categoria, setCategoria] = useState('Limpieza y Ornato');

  // Datos simulados
  const reportes = [
    { id: 'INC-001', titulo: 'Bache peligroso en Av. Alemania', estado: 'Pendiente', sector: 'Centro', fecha: '26 May' },
    { id: 'INC-002', titulo: 'Luminaria apagada', estado: 'En Proceso', sector: 'Amanecer', fecha: '25 May' },
    { id: 'INC-003', titulo: 'Basural clandestino', estado: 'Resuelto', sector: 'Pueblo Nuevo', fecha: '24 May' },
  ];

  // VISTA MUNICIPAL (DIDECO)
  if (currentRole === 'municipalidad' || currentRole === 'superadmin') {
    return (
      <div className="h-full flex flex-col gap-6">
        <div className="card-apple p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-900">Mesa de Incidencias Ciudadanas</h2>
            <p className="text-sm text-slate-500">Gesti&oacute;n y despacho de reportes territoriales.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-apple-secondary px-4 py-2"><Filter size={18}/></button>
          </div>
        </div>

        <div className="card-apple overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Incidencia</th>
                <th className="p-4">Sector</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportes.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-primary">{r.id}</td>
                  <td className="p-4 font-semibold text-slate-900">{r.titulo}</td>
                  <td className="p-4 text-slate-500">{r.sector}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${r.estado === 'Resuelto' ? 'bg-green-50 text-green-600' : 'bg-accent-light text-accent'}`}>
                      {r.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // VISTA VECINO
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="card-apple p-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-slate-900">Reportar Incidencia</h2>
          <p className="text-sm text-slate-500">¿Viste algo en tu barrio? Inf&oacute;rmalo aqu&iacute;.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-apple-primary flex items-center gap-2 px-5 py-2.5">
          <Plus size={18}/> Nuevo Reporte
        </button>
      </div>

      {showForm && (
        <div className="card-apple p-6 animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-slate-900 mb-4">Detalle del Reporte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold" placeholder="Título del problema" />
            <SelectDropdown
              value={categoria}
              onChange={setCategoria}
              options={[
                { value: 'Limpieza y Ornato', label: 'Limpieza y Ornato' },
                { value: 'Seguridad Pública', label: 'Seguridad Pública' },
                { value: 'Infraestructura Vial', label: 'Infraestructura Vial' }
              ]}
              className="w-full bg-white/70 backdrop-blur-md border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white transition-all cursor-pointer shadow-sm"
              dropdownClassName="bg-white/95 backdrop-blur-3xl border-slate-200 shadow-apple-lg"
            />
          </div>
          <textarea className="w-full mt-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold" rows={3} placeholder="Describe qué sucede..." />
          <div className="mt-4 flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"><Upload size={14}/> Adjuntar Foto</button>
             <button className="btn-apple-primary px-6 py-2 ml-auto">Enviar Reporte</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {reportes.map(r => (
           <div key={r.id} className="card-apple p-5">
              <div className="flex justify-between mb-3">
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-1 rounded-lg">{r.id}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${r.estado === 'Resuelto' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'}`}>{r.estado}</span>
              </div>
              <p className="font-bold text-slate-800 text-sm mb-1">{r.titulo}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={12}/> {r.sector} · {r.fecha}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
