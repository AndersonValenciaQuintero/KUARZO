import { usePlatform } from '@/hooks/usePlatform';
import { router } from "expo-router";
import React from 'react';
import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import { useCart } from '../context/CartContext';

export const CardProduct = ({ producto }: { producto: any }) => {
    const { addItem } = useCart();
    const platform = usePlatform();
    const { width } = useWindowDimensions();
    const isMobile = platform === 'movil' || width < 760;
import { Image, Pressable, Text, View } from "react-native";
import { useCartStore } from '@/src/store/useCartStore';

export const CardProduct = ({ producto }: { producto: any }) => {
    const { addItem } = useCartStore();

    const { id, nombre, descripcion, precio, imagen, categoria } = producto;

    return (
        <View className="w-full overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
            <Pressable onPress={() => router.push({ pathname: '/detalleProd', params: { id: id || nombre, nombre, descripcion, precio, imagen, categoria } })}>
                {/* Sección superior con fondo gris */}
                <View className="bg-transparent w-full h-44 flex justify-center items-center">
                    <Image
                        source={{ uri: imagen }}
                        className="w-full h-44"
                        resizeMode="contain"
                    />
                </View>

                {/* Sección de textos */}
                <View className={`${isMobile ? 'p-3 pb-2' : 'p-4 pb-2 h-24'} justify-center`}>
                    <Text className={`${isMobile ? 'text-sm' : 'text-lg'} font-roboto-bold text-black text-center`} numberOfLines={2}>
                        {nombre}
                    </Text>
                    <Text className={`${isMobile ? 'text-xs' : 'text-sm'} font-opensans-regular text-gray-800 mt-1 text-center`} numberOfLines={2}>
                        {descripcion}
                    </Text>
                </View>
            </Pressable>

            {/* Barra inferior: Precio y Botón amarillo */}
            <View className={`${isMobile ? 'flex-col gap-3 w-full' : 'flex-row items-stretch'} mt-4`}>

                <Pressable
                    className={`${isMobile ? 'w-full py-4 px-4' : 'flex-1 py-3'} bg-primary justify-center items-center rounded-md`}
                    style={isMobile ? { minWidth: 0, width: '100%' } : undefined}
                    onPress={() => addItem({
                        id: nombre,
                        nombre: nombre,
                        precio: precio,
                        imagen: imagen,
                        cantidad: 1
                    })}

                >
                    <Text
                        className={`${isMobile ? 'text-sm' : 'text-base'} font-roboto-medium text-black uppercase text-center leading-5`}
                    >
                        Comprar
                    </Text>
                </Pressable>

                <View
                    className={`${isMobile ? 'w-full' : 'flex-1'} justify-center items-center py-4 px-4 bg-white rounded-md`}
                    style={isMobile ? { minWidth: 0, width: '100%' } : undefined}
                >
                    <Text
                        className={`${isMobile ? 'text-sm' : 'text-xl'} font-roboto-bold text-black text-center leading-5`}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {'$' + new Intl.NumberFormat("es-CO").format(precio)}
                    </Text>
                </View>
            </View>
        </View>
    );
};
