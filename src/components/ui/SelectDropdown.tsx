import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  className?: string; // Estilos para el contenedor trigger
  icon?: React.ReactNode;
  prefix?: string;
  dropdownClassName?: string; // Estilos adicionales para el menú desplegable
}

export default function SelectDropdown({ 
  value, 
  onChange, 
  options, 
  className = '', 
  icon, 
  prefix,
  dropdownClassName = 'glass-apple'
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className} ${isOpen ? 'z-50' : 'z-10'}`} ref={ref}>
      {/* NATIVE SELECT FOR MOBILE - Se superpone invisible para atrapar el tap en celulares */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer md:hidden z-10"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* CUSTOM TRIGGER FOR DESKTOP & MOBILE (Visible UI) */}
      <div 
        className="flex items-center gap-2 cursor-pointer w-full h-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <div className="shrink-0">{icon}</div>}
        {prefix && <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest hidden lg:inline shrink-0">{prefix}</span>}
        <span className="flex-1 text-xs md:text-sm font-semibold text-slate-900 truncate pr-5">
          {selectedOption?.label}
        </span>
        <ChevronDown size={14} className="text-slate-400 absolute right-3 pointer-events-none" />
      </div>

      {/* CUSTOM DROPDOWN LIST FOR DESKTOP */}
      {isOpen && (
        <div className={`absolute top-full mt-2 left-0 min-w-full w-max rounded-2xl overflow-hidden z-50 hidden md:block shadow-apple-lg border border-white/40 ${dropdownClassName} animate-in fade-in slide-in-from-top-2 duration-200`}>
          <ul className="py-1">
            {options.map(opt => (
              <li 
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`px-4 py-3 text-sm font-semibold cursor-pointer transition-colors ${
                  opt.value === value 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
