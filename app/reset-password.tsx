import React from 'react';
import { usePlatform } from '@/hooks/usePlatform';
import { View, Text } from 'react-native';
import ResetPasswordWeb from '@/src/views/AppWeb/ResetPasswordWeb';

const ResetPasswordRoute = () => {
    const platform = usePlatform();

    if (platform === 'movil') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 }}>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#111827', textAlign: 'center' }}>
                    Esta acción debe realizarse desde el navegador web a través del enlace enviado a tu correo.
                </Text>
            </View>
        );
    }

    return <ResetPasswordWeb />;
};

export default ResetPasswordRoute;
