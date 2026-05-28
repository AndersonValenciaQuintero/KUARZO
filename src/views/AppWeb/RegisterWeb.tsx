import CustomButton from '@/components/CustomButton';
import { authService } from '@/src/services/authService';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

const RegisterScreen: React.FC = () => {

    const [primerNombre, setPrimerNombre] = useState<string>('');
    const [segundoNombre, setSegundoNombre] = useState<string>('');
    const [primerApellido, setPrimerApellido] = useState<string>('');
    const [segundoApellido, setSegundoApellido] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const { width: windowWidth } = useWindowDimensions();
    const isSmallScreen = windowWidth < 900;

    const handleRegister = async (): Promise<void> => {
        if (!primerNombre || !primerApellido || !correo || !password) {
            window.alert('Completa los campos obligatorios');
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
            const response = await authService.register({
                primerNombre,
                segundoNombre: segundoNombre || undefined,
                primerApellido,
                segundoApellido: segundoApellido || undefined,
                correo,
                contrasena: password,
                telefono: telefono || undefined,
                rolId: 1, // Por defecto rol de COMPRADOR
            });

            window.alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            router.push('/login'); // Redirigir al inicio de sesión
        } catch (error: any) {
            console.error('Error en RegisterWeb:', error);
            const errorMsg = error.response?.data?.error || 'No se pudo completar el registro';
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
                        style={[styles.logo, isSmallScreen && { width: 180, height: 180 }]}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Crea tu cuenta</Text>

                    {/* Primer Nombre */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Primer nombre</Text>
                        <TextInput
                            placeholder="Ej: Juan"
                            placeholderTextColor="#999"
                            style={styles.input}
                            onChangeText={setPrimerNombre}
                        />
                    </View>

                    {/* Segundo Nombre */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Segundo nombre</Text>
                        <TextInput
                            placeholder="Ej: David"
                            placeholderTextColor="#999"
                            style={styles.input}
                            onChangeText={setSegundoNombre}
                        />
                    </View>

                    {/* Primer Apellido */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Primer apellido</Text>
                        <TextInput
                            placeholder="Ej: Pérez"
                            placeholderTextColor="#999"
                            style={styles.input}
                            onChangeText={setPrimerApellido}
                        />
                    </View>

                    {/* Segundo Apellido */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Segundo apellido</Text>
                        <TextInput
                            placeholder="Ej: Gómez"
                            placeholderTextColor="#999"
                            style={styles.input}
                            onChangeText={setSegundoApellido}
                        />
                    </View>

                    {/* Correo */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Correo electrónico</Text>
                        <TextInput
                            placeholder="Ej: usuario@email.com"
                            placeholderTextColor="#999"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setCorreo}
                        />
                    </View>

                    {/* Teléfono */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            placeholder="Ej: 3001234567"
                            placeholderTextColor="#999"
                            style={styles.input}
                            keyboardType="phone-pad"
                            onChangeText={setTelefono}
                        />
                    </View>

                    {/* Contraseña */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contraseña</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Mínimo 8 caracteres"
                                placeholderTextColor="#999"
                                style={styles.inputPassword}
                                secureTextEntry={!showPassword}
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={22}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirmar contraseña */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirmar contraseña</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Repite tu contraseña"
                                placeholderTextColor="#999"
                                style={styles.inputPassword}
                                secureTextEntry={!showPassword2}
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                                <Ionicons
                                    name={showPassword2 ? "eye-outline" : "eye-off-outline"}
                                    size={22}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Validación */}
                    <View style={styles.requirementRow} className='mb-2'>
                        <View style={[
                            styles.circle,
                            password.length >= 8 && { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
                        ]} />
                        <Text style={styles.requirementText}>Mínimo 8 caracteres</Text>
                    </View>

                    {/* Botón */}
                    <CustomButton
                        className='bg-primary rounded-md font-roboto-bold w-full h-12 mt-6 justify-center items-center'
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? 'CARGANDO...' : 'CREA TU CUENTA'}
                    </CustomButton>
                    <Pressable
                        onPress={() => router.push('/login')}
                        disabled={isLoading}
                        style={{ alignItems: 'center', marginTop: 20 }}
                    >
                        <Text style={{
                            fontFamily: 'OpenSans-Regular',
                            fontSize: 14,
                            color: '#f97316',
                        }}>
                            ¿Ya tienes cuenta? <Text style={{ fontFamily: 'Roboto-Bold' }}>Inicia sesión</Text>
                        </Text>
                    </Pressable>

                </View>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    card: {
        width: '100%',
        maxWidth: 400, // 👈 LIMITE PARA WEB
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
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
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 12,
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    requirementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    circle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: '#999',
        marginRight: 8,
    },
    requirementText: {
        fontSize: 13,
        color: '#666',
    },
    button: {
        backgroundColor: '#FFD100',
        paddingVertical: 15,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        fontWeight: 'bold',
    },
});