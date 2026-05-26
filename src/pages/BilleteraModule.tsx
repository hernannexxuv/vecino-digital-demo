import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Receipt, Eye, Plus, X, FileImage } from 'lucide-react';

interface Transaction { id: number; description: string; amount: string; type: 'income' | 'expense'; date: string; hasReceipt: boolean; }

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 1, description: 'Reparación puerta acceso', amount: '$45.000', type: 'expense', date: '22 May', hasReceipt: true },
  { id: 2, description: 'Cuota depto 302', amount: '$25.000', type: 'income', date: '21 May', hasReceipt: false },
  { id: 3, description: 'Mantención áreas verdes', amount: '$180.000', type: 'expense', date: '18 May', hasReceipt: true },
];

export default function BilleteraModule() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col lg:h-full">
      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-apple p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-2xl bg-green-50 flex items-center justify-center"><TrendingUp className="w-4.5 h-4.5 text-green-600" /></div>
            <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">+12%</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">Ingresos Totales</p>
          <p className="text-2xl font-bold text-gray-900">$1.250.000</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-apple p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-2xl bg-red-50 flex items-center justify-center"><TrendingDown className="w-4.5 h-4.5 text-red-600" /></div>
            <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">-5%</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">Egresos Totales</p>
          <p className="text-2xl font-bold text-gray-900">$890.500</p>
        </div>
        <div className="bg-gray-900 rounded-2xl shadow-apple-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center"><Wallet className="w-4.5 h-4.5 text-green-400" /></div>
            <span className="text-[10px] font-semibold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-lg">Caja Chica</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">Saldo Actual</p>
          <p className="text-2xl font-bold text-white">$359.500</p>
        </div>
      </div>

      {/* Historial Transparencia */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-apple flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gray-900 flex items-center justify-center"><Receipt className="w-3.5 h-3.5 text-white" /></div>
            <h3 className="text-sm font-semibold text-gray-900">Transparencia Financiera</h3>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 scrollbar-hidden space-y-2">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${tx.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                {tx.type === 'income' ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{tx.description}</p>
                <p className="text-[10px] text-gray-400">{tx.date}</p>
              </div>
              <span className={`text-sm font-semibold shrink-0 ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                {tx.type === 'income' ? '+' : '-'}{tx.amount}
              </span>
              {tx.hasReceipt ? (
                <button className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center hover:bg-blue-100 text-blue-500"><FileImage className="w-3.5 h-3.5" /></button>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center"><Eye className="w-3.5 h-3.5 text-slate-300" /></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setShowModal(true)} className="fixed bottom-8 right-8 flex items-center gap-2 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-apple-lg hover:bg-gray-800 transition-all z-50">
        <Plus className="w-5 h-5" /> <span className="text-sm font-semibold">Nuevo Registro</span>
      </button>

      {/* Modal Simplificado */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-apple-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Nuevo Registro</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-xl bg-slate-50"><X size={16}/></button>
            </div>
            <p className="text-sm text-gray-500 text-center py-8">Formulario de carga estático para la demo.</p>
          </div>
        </div>
      )}
    </div>
  );
}
