import { environment as ENV } from '../enviroments/enviroment';

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${ENV.apiUrl}/login/`,
    REGISTER: `${ENV.apiUrl}`,
  },

  CURRICULUM: {
    ALTA: `${ENV.apiUrl}/resume/`,
    BAJA: `${ENV.apiUrl}deleteCv/`,
    MODIFICACION: `${ENV.apiUrl}updateCv/`,
    CONSULTA: `${ENV.apiUrl}getAllCvs`,
    CONSULTAPORID: `${ENV.apiUrl}getCv/`,
  },

  EXPERIENCE: {
    ALTA: `${ENV.apiUrl}createCv`,
    BAJA: `${ENV.apiUrl}deleteCv/`,
    MODIFICACION: `${ENV.apiUrl}updateCv/`,
    CONSULTA: `${ENV.apiUrl}getAllCvs`,
    CONSULTAPORID: `${ENV.apiUrl}getCv/`,
  },

  USER: {
    CONSULTAPORID: `${ENV.apiUrl}getUser/`,
  },
};
