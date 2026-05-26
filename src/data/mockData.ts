// src/data/mockData.ts

export type Role = 'superadmin' | 'municipalidad' | 'directiva' | 'vecino';

export interface RoleInfoItem {
  name: string;
  badge: string;
}

export const roleInfo: Record<Role, RoleInfoItem> = {
  superadmin: { name: 'Admin Global', badge: 'SUPER_ADMIN' },
  municipalidad: { name: 'DIDECO Temuco', badge: 'MUNICIPALIDAD' },
  directiva: { name: 'Junta Vecinos Amanecer', badge: 'DIRECTIVA' },
  vecino: { name: 'Hernán Millahual', badge: 'VECINO' },
};

export const notifications = [
  { id: 1, read: false, text: 'Nueva solicitud de certificado' },
  { id: 2, read: true, text: 'Asamblea programada con éxito' }
];
