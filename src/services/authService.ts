import api from './api';

export interface LoginCredentials {
  correo: string;
  contrasena: string; // Nota: El backend espera 'contrasena'
}

export interface RegisterCredentials {
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  correo: string;
  contrasena: string;
  telefono?: string;
  rolId: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  usuario: {
    id: number;
    primerNombre: string;
    primerApellido: string;
    correo: string;
    rol: string;
  };
}

export const authService = {
  /**
   * Envía las credenciales al backend para iniciar sesión.
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Registra un nuevo usuario en la base de datos a través de la API.
   */
  register: async (credentials: RegisterCredentials): Promise<{ message: string; userId: number }> => {
    const response = await api.post<{ message: string; userId: number }>('/auth/register', credentials);
    return response.data;
  },
};
