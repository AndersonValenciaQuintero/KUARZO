import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import CartSidebar from '../components/CartSidebar';
import { useAuthStore } from '@/src/store/useAuthStore';

import "./global.css";

SplashScreen.preventAutoHideAsync();


const RootLayout = () => {

    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    const [fontsLoaded, error] = useFonts({
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Light': require('../assets/fonts/OpenSans-Light.ttf'),
    });

    useEffect(() => {
        initializeAuth();
    }, []);

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null;

    return (
        <>
            <Slot />
            <CartSidebar />
        </>
    )

}

export default RootLayout