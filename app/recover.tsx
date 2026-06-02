import React from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import RecoverWeb from '@/src/views/AppWeb/RecoverWeb';
import RecoverMovil from '@/src/views/AppMovil/RecoverMovil';

const RecoverRoute = () => {
    const platform = usePlatform();

    if (platform === 'movil') {
        return <RecoverMovil />;
    }

    return <RecoverWeb />;
};

export default RecoverRoute;
