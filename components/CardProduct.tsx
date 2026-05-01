import { router } from "expo-router";
import React from 'react';
import { Image, Pressable, Text, View } from "react-native";
import { useCartStore } from '@/src/store/useCartStore';

export const CardProduct = ({ producto }: { producto: any }) => {
    const { addItem } = useCartStore();

    const { id, nombre, descripcion, precio, imagen, categoria } = producto;

    return (
        <View className="w-full bg-transparent">
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
                <View className="p-4 pb-2 h-24 justify-center">
                    <Text className="text-lg font-roboto-bold text-black text-center" numberOfLines={1}>
                        {nombre}
                    </Text>
                    <Text className="text-sm font-opensans-regular text-gray-800 mt-2 text-center" numberOfLines={2}>
                        {descripcion}
                    </Text>
                </View>
            </Pressable>

            {/* Barra inferior: Precio y Botón amarillo */}
            <View className="flex-row items-stretch mt-4">

                {/* Este es el botón amarillo de la imagen que toca los bordes */}
                <Pressable
                    className="flex-1 bg-primary justify-center items-center py-3 rounded-md"
                    onPress={() => addItem({
                        id: nombre, // Usamos el nombre como ID temporal
                        nombre: nombre,
                        precio: precio,
                        imagen: imagen,
                        cantidad: 1
                    })}

                >
                    <Text className="text-base font-roboto-medium text-black uppercase">
                        Comprar
                    </Text>
                </Pressable>

                <View className="flex-1 justify-center items-center py-4 bg-white">
                    <Text className="text-xl font-roboto-bold text-black">
                        {'$' + new Intl.NumberFormat("es-CO").format(precio)}
                    </Text>
                </View>
            </View>
        </View>
    );
};
