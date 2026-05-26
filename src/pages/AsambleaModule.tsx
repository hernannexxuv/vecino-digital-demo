import { useState } from 'react';
import { Cloud, Clock, History, FileText, CheckSquare, ToggleLeft, ToggleRight, GripVertical } from 'lucide-react';

interface AgendaItem { id: number; title: string; timeEstimate: string; checked: boolean; }

const INITIAL_AGENDA: AgendaItem[] = [
  { id: 1, title: 'Lectura del acta anterior', timeEstimate: '10', checked: false },
  { id: 2, title: 'Informe de Tesorería', timeEstimate: '15', checked: false },
  { id: 3, title: 'Moción: Reparación fachada', timeEstimate: '20', checked: false },
  { id: 4, title: 'Votación cuota extraordinaria', timeEstimate: '10', checked: false },
  { id: 5, title: 'Asuntos varios', timeEstimate: '15', checked: false },
];

export default function AsambleaModule() {
  const [agenda, setAgenda] = useState<AgendaItem[]>(INITIAL_AGENDA);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [globalTimer, setGlobalTimer] = useState<string | null>(null);

  const activeItems = agenda.filter((i) => i.checked);
  const totalMinutes = activeItems.reduce((sum, i) => sum + parseInt(i.timeEstimate || '0'), 0);

  const handleCheck = (id: number) => {
    setAgenda((prev) => prev.map((item) => item.id === id ? { ...item, checked: !item.checked } : item));
    const newlyChecked = agenda.find((i) => i.id === id);
    if (newlyChecked && !newlyChecked.checked) setGlobalTimer(newlyChecked.timeEstimate + ':00');
  };

  const updateTime = (id: number, val: string) => {
    setAgenda((prev) => prev.map((i) => (i.id === id ? { ...i, timeEstimate: val } : i)));
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Main Content - Acta en Vivo */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Acta en Vivo</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Cloud className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Autoguardado en la Nube</span>
                <span className="text-xs text-slate-300 mx-1">|</span>
                <span className="text-xs text-gray-400">hace 2 min</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {globalTimer && (
              <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-2xl shadow-apple-md">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="font-mono text-sm font-semibold tracking-wider">{globalTimer}</span>
              </div>
            )}
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-gray-700 hover:bg-slate-50 transition-all shadow-apple">
              <History className="w-4 h-4" /> Historial
            </button>
          </div>
        </div>

        {/* Toggle Transmitir */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-apple p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Transmitir Acta en Vivo</p>
              <p className="text-xs text-gray-400 mt-0.5">Los vecinos verán el acta actualizándose en tiempo real</p>
            </div>
            <button onClick={() => setIsTransmitting(!isTransmitting)} className="flex items-center gap-3 group cursor-pointer">
              {isTransmitting ? <ToggleRight className="w-12 h-8 text-green-500 transition-all" /> : <ToggleLeft className="w-12 h-8 text-slate-300 transition-all" />}
              <span className={`text-xs font-semibold ${isTransmitting ? 'text-green-600' : 'text-gray-400'}`}>
                {isTransmitting ? 'EN VIVO' : 'OFF'}
              </span>
            </button>
          </div>
        </div>

        {/* Bloques del Editor */}
        <div className="flex-1 space-y-4 overflow-auto scrollbar-hidden">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-apple p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-blue-600" /></div>
              <h3 className="text-sm font-semibold text-gray-900">Temas</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <GripVertical className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Reparación de fachada del edificio principal</p>
                  <p className="text-xs text-gray-400 mt-1">Presentado por: Juan Martinez | Prioridad: Alta</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-apple p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-xl bg-green-50 flex items-center justify-center"><CheckSquare className="w-3.5 h-3.5 text-green-600" /></div>
              <h3 className="text-sm font-semibold text-gray-900">Acuerdos</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50/50 rounded-xl border border-green-100">
                <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-800 font-medium">Se aprueba presupuesto de $2.500.000 para reparación de fachada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Agenda */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-apple p-5 lg:sticky lg:top-0">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-xl bg-gray-900 flex items-center justify-center"><Clock className="w-3.5 h-3.5 text-white" /></div>
            <h3 className="text-sm font-semibold text-gray-900">Agenda</h3>
            <span className="ml-auto text-xs text-gray-400 bg-slate-50 px-2 py-0.5 rounded-lg">{totalMinutes} min total</span>
          </div>
          <div className="space-y-2">
            {agenda.map((item, idx) => (
              <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${item.checked ? 'bg-green-50 border border-green-100' : 'bg-slate-50 border border-transparent'}`}>
                <span className="text-xs font-mono text-gray-400 w-5 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)} className="w-4 h-4 rounded-md border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer" />
                <p className={`flex-1 min-w-0 text-sm font-medium truncate ${item.checked ? 'text-green-700 line-through' : 'text-gray-800'}`}>{item.title}</p>
                <div className="flex items-center gap-1 shrink-0">
                  <input type="number" value={item.timeEstimate} onChange={(e) => updateTime(item.id, e.target.value)} className="w-12 text-center text-xs bg-white border border-slate-200 rounded-lg py-1 px-1 focus:outline-none" min={1} />
                  <span className="text-[10px] text-gray-400">min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
