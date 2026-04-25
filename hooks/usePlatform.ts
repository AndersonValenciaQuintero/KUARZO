import { Platform } from 'react-native';

/**
 * Hook centralizado para detectar en qué plataforma está corriendo la app.
 * Retorna 'web' si corre en navegador, 'movil' en iOS o Android.
 */
export function usePlatform(): 'web' | 'movil' {
    return Platform.OS === 'web' ? 'web' : 'movil';
}
