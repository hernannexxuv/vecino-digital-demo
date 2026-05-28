import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, Receipt, Eye, Plus, X, FileImage, Camera } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

interface Transaction { id: number; description: string; amount: string; type: 'income' | 'expense'; date: string; hasReceipt: boolean; }

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 1, description: 'Reparación puerta acceso', amount: '$45.000', type: 'expense', date: '22 May', hasReceipt: true },
  { id: 2, description: 'Cuota depto 302', amount: '$25.000', type: 'income', date: '21 May', hasReceipt: false },
  { id: 3, description: 'Mantención áreas verdes', amount: '$180.000', type: 'expense', date: '18 May', hasReceipt: true },
];

export default function BilleteraModule() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  
  // Form State
  const [txType, setTxType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [folio, setFolio] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!isScanning) return;
    
    let isMounted = true;
    const html5QrCode = new Html5Qrcode("reader");
    
    // Pequeño retraso para asegurar que el div 'reader' ya exista en el DOM
    const timer = setTimeout(() => {
      if (!isMounted) return;
      html5QrCode.start(
        { facingMode: "environment" }, 
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (isMounted) {
            setFolio(decodedText);
            setIsScanning(false);
          }
        },
        () => { /* ignorar fallos de frame */ }
      ).catch((err) => {
        console.warn("Error al iniciar la cámara automáticamente (quizás faltan permisos): ", err);
      });
    }, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
      try {
        html5QrCode.stop().then(() => html5QrCode.clear()).catch(() => {});
      } catch (e) {
        // Ignorar si tira error al intentar detener algo que no había empezado
      }
    };
  }, [isScanning]);

  const handleSave = () => {
    if (!description || !amount || !date) return;
    
    let formattedAmount = amount;
    if (!formattedAmount.startsWith('$')) {
      formattedAmount = `$${formattedAmount}`;
    }

    const newTx: Transaction = {
      id: Date.now(),
      description,
      amount: formattedAmount,
      type: txType,
      date,
      hasReceipt: folio.length > 0
    };
    
    setTransactions([newTx, ...transactions]);
    setShowModal(false);
    
    // Reset form
    setTxType('expense');
    setAmount('');
    setDescription('');
    setDate('');
    setFolio('');
    setIsScanning(false);
  };

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
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl shadow-apple-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm"><Wallet className="w-4.5 h-4.5 text-white" /></div>
            <span className="text-[10px] font-semibold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-lg">Caja Chica</span>
          </div>
          <p className="text-xs text-emerald-100 mb-1">Saldo Actual</p>
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
          {transactions.map((tx) => (
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

      <button onClick={() => setShowModal(true)} className="fixed bottom-8 right-8 flex items-center gap-2 bg-primary text-white px-5 py-3.5 rounded-2xl shadow-apple-lg hover:bg-primary-dark transition-all z-50">
        <Plus className="w-5 h-5" /> <span className="text-sm font-semibold">Nuevo Registro</span>
      </button>

      {/* Modal Simplificado */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => { setShowModal(false); setIsScanning(false); }}
        >
          <div 
            className={`rounded-3xl shadow-apple-lg w-full max-w-md p-6 my-8 transition-colors duration-500 border ${
              txType === 'income' ? 'bg-emerald-50/95 border-emerald-200/50' : 'bg-orange-50/95 border-orange-200/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Nuevo Registro</h3>
              <button onClick={() => { setShowModal(false); setIsScanning(false); }} className={`p-2 rounded-xl transition-colors ${
                txType === 'income' ? 'bg-emerald-100/50 hover:bg-emerald-200/50 text-emerald-700' : 'bg-orange-100/50 hover:bg-orange-200/50 text-orange-700'
              }`}><X size={18}/></button>
            </div>
            
            <div className="space-y-5">
              {/* Selector de Tipo */}
              <div className={`flex p-1 rounded-xl transition-colors ${txType === 'income' ? 'bg-emerald-100/50' : 'bg-orange-100/50'}`}>
                <button
                  onClick={() => setTxType('income')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${txType === 'income' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Ingreso
                </button>
                <button
                  onClick={() => setTxType('expense')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${txType === 'expense' ? 'bg-white text-orange-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Egreso
                </button>
              </div>

              {/* Campos Básicos */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Monto ($)</label>
                  <input 
                    type="text" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ej. 45000" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Descripción / Concepto</label>
                  <input 
                    type="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ej. Reparación de..." 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Fecha</label>
                  <input 
                    type="text" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Ej. 24 May" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Sección Respaldo Legal SII */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Respaldo Legal SII</label>
                
                {!isScanning ? (
                  <button 
                    onClick={() => setIsScanning(true)}
                    className="w-full flex flex-col items-center justify-center gap-2 py-6 px-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all group mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">Escanear Boleta</p>
                      <p className="text-xs text-gray-500">(QR / Código de Barras)</p>
                    </div>
                  </button>
                ) : (
                  <div className="mb-4">
                    <div id="reader" className="w-full bg-slate-900 rounded-xl overflow-hidden mb-2"></div>
                    <button 
                      onClick={() => setIsScanning(false)}
                      className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      Cancelar Escaneo
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">O ingresar manualmente N° de Boleta o Folio</label>
                  <input 
                    type="text" 
                    value={folio}
                    onChange={(e) => setFolio(e.target.value)}
                    placeholder="Ej. 123456789" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Botón Guardar */}
              <button 
                onClick={handleSave}
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow-apple transition-colors mt-6"
              >
                Guardar Registro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
