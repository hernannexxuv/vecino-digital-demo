import { ShieldCheck, Users, Wallet } from 'lucide-react';

export default function PresidenteDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard de Gestión Presidencial</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">
            Resumen de actividad y estado de la Junta de Vecinos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-apple border border-slate-100/50">
          <div className="w-12 h-12 rounded-2xl bg-primary-light/30 flex items-center justify-center mb-4">
            <Users size={24} className="text-primary" />
          </div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Vecinos</p>
          <p className="text-3xl font-black text-slate-900">124</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-apple border border-slate-100/50">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
            <Wallet size={24} className="text-secondary" />
          </div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Fondos Activos</p>
          <p className="text-3xl font-black text-slate-900">$450.000</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-apple border border-slate-100/50">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
            <ShieldCheck size={24} className="text-accent" />
          </div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Proyectos en Curso</p>
          <p className="text-3xl font-black text-slate-900">3</p>
        </div>
      </div>
    </div>
  );
}