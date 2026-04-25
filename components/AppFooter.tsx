import React from 'react';
import BarrNaveg from './BarrNaveg';
import FlutterComponent from './Flutter';

interface AppFooterProps {
    platform: 'web' | 'movil';
}

/**
 * Footer unificado con variantes por plataforma.
 * - web   → FlutterComponent (footer oscuro con links, redes sociales y copyright)
 * - movil → BarrNaveg (barra de navegación flotante en la parte inferior)
 */
const AppFooter = ({ platform }: AppFooterProps) => {
    if (platform === 'movil') {
        return <BarrNaveg />;
    }

    return <FlutterComponent />;
};

export default AppFooter;
