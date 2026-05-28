// src/components/map/LeafletMapView.tsx
// Componente de mapa Leaflet reutilizable con geolocalización de Juntas de Vecinos

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import macrosectores from '../../data/mapData';

interface LeafletMapViewProps {
  /** Altura del contenedor en píxeles. Si no se provee, usa flex-1 fill parent */
  height?: number;
  /** Zoom inicial (default 13) */
  zoom?: number;
  /** Si true, deshabilita la interacción (drag, zoom) para vistas embebidas */
  readonly?: boolean;
  /** Filtro opcional de sector ID para mostrar solo uno */
  filterSectorId?: number;
}

export default function LeafletMapView({ height, zoom = 13, readonly = false, filterSectorId }: LeafletMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Limpiar instancia previa
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      center: [-38.7359, -72.6000],
      zoom,
      zoomControl: !readonly,
      attributionControl: false,
      dragging: !readonly,
      scrollWheelZoom: !readonly,
      doubleClickZoom: !readonly,
      touchZoom: !readonly,
      keyboard: !readonly,
    });

    mapInstance.current = map;

    // Capa base CartoDB Positron
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // ====================================================================
    // 1. MARCAR CADA JUNTA DE VECINOS (puntos pequeños detallados)
    // ====================================================================
    const sectoresAMostrar = filterSectorId
      ? macrosectores.filter((s) => s.id === filterSectorId)
      : macrosectores;

    sectoresAMostrar.forEach((sector) => {
      sector.jvs.forEach((jv) => {
        const markerColor = jv.hasAlerta ? '#FF5722' : '#82BC00';
        const pulseColor = jv.hasAlerta ? 'rgba(255,87,34,0.3)' : 'rgba(130,188,0,0.25)';

        const jvIcon = L.divIcon({
          className: 'bg-transparent',
          html: `
            <div class="relative group cursor-pointer" style="width: 12px; height: 12px;">
              <div class="absolute -inset-2" style="background: ${pulseColor}; border-radius: 50%; animation: ping 3s cubic-bezier(0,0,0.2,1) infinite;"></div>
              <div style="width: 12px; height: 12px; background: ${markerColor}; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.2); position: relative; z-index: 1;"></div>
              <div style="display: none; position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); background: white; padding: 6px 10px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; white-space: nowrap; z-index: 1000; pointer-events: none;"
                   class="jv-tooltip">
                <p style="font-size: 11px; font-weight: 700; color: #0F172A; margin: 0;">${jv.name}</p>
                <p style="font-size: 9px; font-weight: 600; color: ${markerColor}; margin: 0;">${jv.socios} socios · ${jv.asambleasMes} asambleas/mes</p>
              </div>
            </div>
          `,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        const marker = L.marker(jv.coords, { icon: jvIcon }).addTo(map);

        // Popup al hacer clic
        marker.bindPopup(`
          <div style="font-family: 'Inter', system-ui, sans-serif; padding: 4px 0; max-width: 220px;">
            <p style="font-size: 13px; font-weight: 700; color: #0F172A; margin: 0 0 4px 0;">${jv.name}</p>
            <p style="font-size: 11px; color: #64748B; margin: 0 0 2px 0;"><strong>Presidente:</strong> ${jv.presidente}</p>
            <p style="font-size: 11px; color: #64748B; margin: 0 0 2px 0;"><strong>Socios:</strong> ${jv.socios}</p>
            <p style="font-size: 11px; color: #64748B; margin: 0 0 2px 0;"><strong>Asambleas (mes):</strong> ${jv.asambleasMes}</p>
            <p style="font-size: 11px; color: ${jv.hasAlerta ? '#FF5722' : '#82BC00'}; font-weight: 600; margin: 4px 0 0 0;">${jv.hasAlerta ? '⚠ Alerta de participación' : '✔ Participación activa'}</p>
          </div>
        `, { closeButton: true, maxWidth: 260, className: 'jv-popup' });
      });
    });

    // ====================================================================
    // 2. MARCAR MACROSECTORES (puntos principales de referencia)
    // ====================================================================
    sectoresAMostrar.forEach((sector) => {
      const isWarning = sector.status === 'warning';
      const isReview = sector.status === 'review';
      const bgColor = isWarning ? '#FF5722' : (isReview ? '#94A3B8' : '#82BC00');
      const pulseBg = isWarning ? 'rgba(255,87,34,0.35)' : (isReview ? 'rgba(148,163,184,0.3)' : 'rgba(130,188,0,0.3)');

      const sectorIcon = L.divIcon({
        className: 'bg-transparent',
        html: `
          <div class="relative group cursor-pointer" style="width: 20px; height: 20px;">
            <div style="position: absolute; inset: -8px; background: ${pulseBg}; border-radius: 50%; filter: blur(8px); animation: ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>
            <div style="position: absolute; inset: -2px; background: ${pulseBg}; border-radius: 50%; animation: ping 3s cubic-bezier(0,0,0.2,1) infinite; animation-delay: 1s;"></div>
            <div style="width: 20px; height: 20px; background: ${bgColor}; border: 3px solid white; border-radius: 50%; box-shadow: 0 3px 10px rgba(0,0,0,0.25); position: relative; z-index: 2; display: flex; align-items: center; justify-content: center;">
              ${isWarning ? '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>' : ''}
            </div>
            <div style="position: absolute; top: 24px; left: 50%; transform: translateX(-50%); background: white; padding: 6px 12px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; white-space: nowrap; z-index: 1000; pointer-events: none; opacity: 0; transition: opacity 0.2s;"
                 class="sector-tooltip">
              <p style="font-size: 12px; font-weight: 700; color: #0F172A; margin: 0;">${sector.name}</p>
              <p style="font-size: 10px; font-weight: 600; color: ${bgColor}; margin: 0;">${sector.jvs.length} JVs · ${sector.jvs.reduce((sum, j) => sum + j.socios, 0)} socios</p>
            </div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker(sector.centerCoords, { icon: sectorIcon }).addTo(map);
    });

    // Invalidar tamaño tras montarse
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, readonly, filterSectorId]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: height ? `${height}px` : '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#f1f5f9',
      }}
    />
  );
}
