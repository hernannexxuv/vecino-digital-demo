// src/data/mapData.ts
// Datos geo-referenciados de Temuco para el mapa de participación vecinal

export interface JuntaVecino {
  id: number;
  name: string;
  sectorId: number;
  coords: [number, number];
  socios: number;
  asambleasMes: number;
  presidente: string;
  hasAlerta: boolean;
}

export interface Macrosector {
  id: number;
  name: string;
  centerCoords: [number, number];
  status: 'optimal' | 'warning' | 'review';
  jvs: JuntaVecino[];
}

const macrosectores: Macrosector[] = [
  {
    id: 1,
    name: 'Amanecer',
    centerCoords: [-38.7513, -72.6105],
    status: 'optimal',
    jvs: [
      { id: 101, name: 'JV Villa Amanecer Norte', sectorId: 1, coords: [-38.7480, -72.6085], socios: 32, asambleasMes: 2, presidente: 'María González', hasAlerta: false },
      { id: 102, name: 'JV Amanecer Sur', sectorId: 1, coords: [-38.7535, -72.6118], socios: 28, asambleasMes: 1, presidente: 'Juan Cárdenas', hasAlerta: false },
      { id: 103, name: 'JV Los Laureles', sectorId: 1, coords: [-38.7500, -72.6150], socios: 18, asambleasMes: 1, presidente: 'Rosa Huilipán', hasAlerta: false },
      { id: 104, name: 'JV El Mirador', sectorId: 1, coords: [-38.7548, -72.6070], socios: 24, asambleasMes: 3, presidente: 'Pedro Lefián', hasAlerta: false },
    ],
  },
  {
    id: 2,
    name: 'Pedro de Valdivia',
    centerCoords: [-38.7366, -72.6186],
    status: 'optimal',
    jvs: [
      { id: 201, name: 'JV PdV Centro', sectorId: 2, coords: [-38.7352, -72.6170], socios: 35, asambleasMes: 2, presidente: 'Carmen Huaiquil', hasAlerta: false },
      { id: 202, name: 'JV PdV Oriente', sectorId: 2, coords: [-38.7340, -72.6145], socios: 22, asambleasMes: 1, presidente: 'Luis Antilef', hasAlerta: false },
      { id: 203, name: 'JV PdV Poniente', sectorId: 2, coords: [-38.7385, -72.6210], socios: 19, asambleasMes: 1, presidente: 'Ana Marileo', hasAlerta: true },
      { id: 204, name: 'JV Los Arrayanes', sectorId: 2, coords: [-38.7378, -72.6165], socios: 15, asambleasMes: 0, presidente: 'Miguel Paillalef', hasAlerta: false },
    ],
  },
  {
    id: 3,
    name: 'Pueblo Nuevo',
    centerCoords: [-38.7285, -72.5780],
    status: 'warning',
    jvs: [
      { id: 301, name: 'JV Pueblo Nuevo Alto', sectorId: 3, coords: [-38.7265, -72.5785], socios: 12, asambleasMes: 0, presidente: 'Sofía Melinao', hasAlerta: true },
      { id: 302, name: 'JV Pueblo Nuevo Bajo', sectorId: 3, coords: [-38.7310, -72.5760], socios: 14, asambleasMes: 1, presidente: 'Carlos Huenchullán', hasAlerta: false },
      { id: 303, name: 'JV El Carmen de Ñielol', sectorId: 3, coords: [-38.7290, -72.5795], socios: 8, asambleasMes: 0, presidente: 'Elena Carillanca', hasAlerta: true },
    ],
  },
  {
    id: 4,
    name: 'Fundo el Carmen',
    centerCoords: [-38.7291, -72.6384],
    status: 'optimal',
    jvs: [
      { id: 401, name: 'JV Fundo el Carmen Este', sectorId: 4, coords: [-38.7275, -72.6360], socios: 30, asambleasMes: 2, presidente: 'Ricardo Huenul', hasAlerta: false },
      { id: 402, name: 'JV Fundo el Carmen Oeste', sectorId: 4, coords: [-38.7310, -72.6405], socios: 26, asambleasMes: 2, presidente: 'Patricia Llancaleo', hasAlerta: false },
      { id: 403, name: 'JV Los Robles', sectorId: 4, coords: [-38.7280, -72.6345], socios: 20, asambleasMes: 1, presidente: 'Héctor Nahuelpán', hasAlerta: false },
      { id: 404, name: 'JV Santa Rosa', sectorId: 4, coords: [-38.7325, -72.6420], socios: 17, asambleasMes: 1, presidente: 'Marta Colihuinca', hasAlerta: false },
      { id: 405, name: 'JV Los Ñires', sectorId: 4, coords: [-38.7262, -72.6390], socios: 22, asambleasMes: 3, presidente: 'Gabriel Marileo', hasAlerta: false },
    ],
  },
  {
    id: 5,
    name: 'Centro',
    centerCoords: [-38.7359, -72.5904],
    status: 'review',
    jvs: [
      { id: 501, name: 'JV Centro Histórico', sectorId: 5, coords: [-38.7345, -72.5890], socios: 11, asambleasMes: 0, presidente: 'Isabel Lefián', hasAlerta: true },
      { id: 502, name: 'JV Estación', sectorId: 5, coords: [-38.7375, -72.5925], socios: 9, asambleasMes: 0, presidente: 'Francisco Huircán', hasAlerta: true },
      { id: 503, name: 'JV Cerro Ñielol', sectorId: 5, coords: [-38.7332, -72.5880], socios: 14, asambleasMes: 1, presidente: 'Verónica Antinao', hasAlerta: false },
    ],
  },
];

export default macrosectores;
