import { environment as ENV } from '../enviroments/enviroment';

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${ENV.apiUrl}`,
    REGISTER: `${ENV.apiUrl}`,
  },

  CURRICULUM: {
    ALTA: `${ENV.apiUrl}curriculum`,
    BAJA: `${ENV.apiUrl}curriculum/`,
    MODIFICACION: `${ENV.apiUrl}curriculum/`,
    CONSULTA: `${ENV.apiUrl}curriculum`,
    CONSULTAPORID: `${ENV.apiUrl}curriculum/`,
  },
};
