import CustomButton from '@/components/CustomButton';
import { authService } from '@/src/services/authService';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions
} from 'react-native';

const RecoverWeb: React.FC = () => {
    const [correo, setCorreo] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { width: windowWidth } = useWindowDimensions();
    const isSmallScreen = windowWidth < 800;

    const handleRecover = async (): Promise<void> => {
        if (!correo) {
            window.alert('Ingresa tu correo electrónico');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.forgotPassword(correo);

            if (response.testUrl) {
                if (window.confirm('Correo enviado con éxito (entorno de pruebas). ¿Deseas abrir la bandeja de correo temporal para ver el correo?')) {
                    window.open(response.testUrl, '_blank');
                }
            } else {
                window.alert('Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
            }
            router.replace('/login');
        } catch (error: any) {
            console.error('Error en RecoverWeb:', error);
            const errorMsg = error.response?.data?.error || 'No se pudo procesar la solicitud o el correo no existe';
            window.alert(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View className="px-5 pt-6 bg-white w-full">
                <Pressable className="flex-row items-center gap-2 self-start" onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={20} color="#111827" />
                    <Text className="font-roboto-bold text-sm text-[#111827]">
                        Volver
                    </Text>
                </Pressable>
            </View>

            <View
                style={{
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isSmallScreen ? 20 : 60,
                    width: '100%',
                    maxWidth: 1100
                }}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={[styles.logo, isSmallScreen && { width: 200, height: 200 }]}
                    />
                </View>

                {/* Right Side: Form */}
                <View style={styles.card}>
                    <Text style={styles.title}>Recuperar Contraseña</Text>
                    <Text style={styles.subtitle}>Ingresa tu correo para recibir un enlace de recuperación</Text>

                    <View style={styles.inputGroup} className='mb-6'>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <TextInput
                            placeholder="Ej: usuario@email.com"
                            placeholderTextColor="#999"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setCorreo}
                            editable={!isLoading}
                        />
                    </View>

                    <CustomButton
                        className='bg-primary rounded-md font-roboto-bold w-full h-12 mt-6 justify-center items-center'
                        onPress={handleRecover}
                        disabled={isLoading}
                    >
                        {isLoading ? 'CARGANDO...' : 'ENVIAR CORREO'}
                    </CustomButton>
                </View>
            </View>
        </ScrollView>
    );
};

export default RecoverWeb;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    logo: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 20,
    },
    inputGroup: {
        marginTop: 15,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
});
