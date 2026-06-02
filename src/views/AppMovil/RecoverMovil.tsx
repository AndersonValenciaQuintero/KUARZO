import { authService } from '@/src/services/authService';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecoverMovil: React.FC = () => {
    const [correo, setCorreo] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRecover = async (): Promise<void> => {
        if (!correo) {
            Alert.alert('Error', 'Ingresa tu correo electrónico');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.forgotPassword(correo);

            if (response.testUrl) {
                Alert.alert(
                    '📧 Correo Enviado (Pruebas)',
                    'Se generó un correo de pruebas. ¿Deseas abrir la bandeja de entrada temporal para ver el correo?',
                    [
                        {
                            text: 'Cerrar',
                            onPress: () => router.replace('/login'),
                        },
                        {
                            text: 'Ver Correo',
                            onPress: () => {
                                Linking.openURL(response.testUrl!).catch((err) => {
                                    console.error('Error al abrir Ethereal Mail:', err);
                                });
                                router.replace('/login');
                            },
                        },
                    ]
                );
            } else {
                Alert.alert(
                    'Éxito',
                    'Se ha enviado un correo con instrucciones para restablecer tu contraseña.',
                    [{ text: 'Aceptar', onPress: () => router.replace('/login') }]
                );
            }
        } catch (error: any) {
            console.error('Error en RecoverMovil:', error);
            const errorMsg = error.response?.data?.error || 'No se pudo procesar la solicitud o el correo no existe';
            Alert.alert('Error', errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 24,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Botón Volver */}
                    <View style={{ width: '100%', maxWidth: 400, marginBottom: 8 }}>
                        <Pressable
                            onPress={() => router.back()}
                            disabled={isLoading}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}
                        >
                            <MaterialIcons name="arrow-back" size={20} color="#111827" />
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#111827' }}>
                                Volver
                            </Text>
                        </Pressable>
                    </View>

                    {/* Logo */}
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={{
                            width: 200,
                            height: 200,
                            marginBottom: 8,
                        }}
                        contentFit="contain"
                    />

                    {/* Card */}
                    <View style={{
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: '#fff',
                        padding: 28,
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.08,
                        shadowRadius: 16,
                        elevation: 10,
                        borderWidth: 1,
                        borderColor: '#f3f4f6',
                    }}>
                        <Text style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: 24,
                            color: '#111827',
                            marginBottom: 6,
                        }}>
                            Recuperar Contraseña
                        </Text>
                        <Text style={{
                            fontFamily: 'OpenSans-Regular',
                            fontSize: 14,
                            color: '#9ca3af',
                            marginBottom: 20,
                        }}>
                            Ingresa tu correo para recibir un enlace de recuperación
                        </Text>

                        {/* Correo */}
                        <View style={{ marginBottom: 16 }} className='mb-2'>
                            <Text style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: 13,
                                color: '#4b5563',
                                marginBottom: 6,
                            }}>
                                Correo electrónico
                            </Text>
                            <TextInput
                                placeholder="Ej: usuario@email.com"
                                placeholderTextColor="#bbb"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#e5e7eb',
                                    borderRadius: 10,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                    fontSize: 16,
                                    fontFamily: 'OpenSans-Regular',
                                    backgroundColor: '#fafbfc',
                                    color: '#111827',
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={setCorreo}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Botón Enviar */}
                        <Pressable
                            style={{
                                backgroundColor: isLoading ? '#e5e7eb' : '#f97316',
                                paddingVertical: 16,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 12,
                            }}
                            onPress={handleRecover}
                            disabled={isLoading}
                        >
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 15,
                                color: isLoading ? '#9ca3af' : '#ffffff',
                                letterSpacing: 1,
                            }}>
                                {isLoading ? 'CARGANDO...' : 'ENVIAR CORREO'}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RecoverMovil;
