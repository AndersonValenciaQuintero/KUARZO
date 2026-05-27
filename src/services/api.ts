import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/**
 * URL base de tu backend Express.
 * - En simuladores de Android, 'localhost' no funciona, se debe usar '10.0.2.2'.
 * - En iOS o Web, funciona con 'localhost'.
 * - Si pruebas en un dispositivo físico, debes cambiarlo por la IP local de tu PC (ej: 'http://192.168.1.50:3000/api').
 */
const getBaseUrl = (): string => {
  // En dispositivo físico Android usa la IP local (ej: http://192.168.1.8:3000/api)
  // En iOS/Web usa localhost
  return 'http://localhost:3000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor de petición para agregar el token JWT de manera automática
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al recuperar el token desde AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores globales (ej: token expirado)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Acceso no autorizado o token expirado. Limpiando sesión...');
      await AsyncStorage.removeItem('user_token');
    }
    return Promise.reject(error);
  }
);

export default api;
