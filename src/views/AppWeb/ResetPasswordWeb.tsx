import CustomButton from '@/components/CustomButton';
import { authService } from '@/src/services/authService';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

const ResetPasswordWeb: React.FC = () => {
    const params = useLocalSearchParams();
    const token = params.token as string;

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { width: windowWidth } = useWindowDimensions();
    const isSmallScreen = windowWidth < 800;

    const handleReset = async (): Promise<void> => {
        if (!token) {
            window.alert('Enlace inválido o sin token de recuperación');
            return;
        }

        if (!password || !confirmPassword) {
            window.alert('Completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            window.alert('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 8) {
            window.alert('La contraseña debe tener mínimo 8 caracteres');
            return;
        }

        setIsLoading(true);
        try {
            await authService.resetPassword(token, password);
            window.alert('Contraseña restablecida con éxito. Ya puedes iniciar sesión.');
            router.replace('/login');
        } catch (error: any) {
            console.error('Error en ResetPasswordWeb:', error);
            const errorMsg = error.response?.data?.error || 'No se pudo restablecer la contraseña. El enlace puede haber expirado o ser inválido.';
            window.alert(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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
                    <Text style={styles.title}>Restablecer Contraseña</Text>
                    <Text style={styles.subtitle}>Ingresa tu nueva contraseña para Kuarzo</Text>

                    {/* Nueva contraseña */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nueva contraseña</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Mínimo 8 caracteres"
                                placeholderTextColor="#999"
                                style={styles.inputPassword}
                                secureTextEntry={!showPassword}
                                onChangeText={setPassword}
                                value={password}
                                editable={!isLoading}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={22}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirmar contraseña */}
                    <View style={styles.inputGroup} className="mb-4">
                        <Text style={styles.label}>Confirmar contraseña</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Repite la contraseña"
                                placeholderTextColor="#999"
                                style={styles.inputPassword}
                                secureTextEntry={!showPassword2}
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                                editable={!isLoading}
                            />
                            <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)} disabled={isLoading}>
                                <Ionicons
                                    name={showPassword2 ? "eye-outline" : "eye-off-outline"}
                                    size={22}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <CustomButton
                        className='bg-primary rounded-md font-roboto-bold w-full h-12 mt-6 justify-center items-center'
                        onPress={handleReset}
                        disabled={isLoading}
                    >
                        {isLoading ? 'CARGANDO...' : 'RESTABLECER CONTRASEÑA'}
                    </CustomButton>
                </View>
            </View>
        </ScrollView>
    );
};

export default ResetPasswordWeb;

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
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fafafa',
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
    },
});
