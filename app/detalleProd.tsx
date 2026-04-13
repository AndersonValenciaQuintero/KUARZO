import CustomButton from '@/components/CustomButton';
import Header from '@/components/header';
import React, { useMemo, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Imagenes base usadas en la vista grande y en las miniaturas del producto.
const productImages = [
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
];

// Opciones visuales de color; cada una cambia el estado activo y la imagen principal.
const colorOptions = [
    { id: 'gold', label: 'Dorado', image: productImages[0] },
    { id: 'black', label: 'Negro', image: productImages[1] },
    { id: 'mix', label: 'Mixto', image: productImages[2] },
];

// Categorias mostradas en la barra horizontal debajo del header.
const categories = ['Cadenas y Collares', 'Aretes y Pendientes', 'Anillos', 'Pulseras', 'Broches', 'Accesorios'];

const DetalleProdLayout = () => {
    // Lee el ancho disponible para cambiar la distribucion entre modo escritorio y compacto.
    const { width } = useWindowDimensions();
    const isCompact = width < 1100;

    // Guarda la imagen actualmente seleccionada en la galeria.
    const [selectedImage, setSelectedImage] = useState(productImages[0]);

    // Guarda el color activo para resaltar la miniatura correspondiente.
    const [selectedColor, setSelectedColor] = useState(colorOptions[0].id);

    // Guarda la cantidad de unidades elegidas por el usuario.
    const [quantity, setQuantity] = useState(1);

    // Genera las clases del contenedor principal segun el tamano de pantalla.
    const detailContainerClass = useMemo(
        () =>
            isCompact
                ? 'w-full flex-col gap-10 px-5 py-8'
                : 'w-full max-w-6xl flex-row gap-14 px-8 py-14',
        [isCompact]
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
                {/* Header reutilizable de la tienda. */}
                <Header />

                {/* Barra de categorias que replica la navegacion superior de la referencia. */}
                <View className="border-y border-zinc-200 bg-white">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 24 }}
                    >
                        <View className="mx-auto flex-row items-center justify-center py-5">
                            {categories.map((category, index) => (
                                // Renderiza cada categoria y agrega un separador excepto en el ultimo item.
                                <View key={`${category}-${index}`} className="flex-row items-center">
                                    <Text className="px-6 font-opensans-regular text-base text-zinc-800">
                                        {category}
                                    </Text>
                                    {index < categories.length - 1 ? (
                                        <Text className="text-zinc-400">|</Text>
                                    ) : null}
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Contenedor general del detalle del producto. */}
                <View className="items-center">
                    <View className={detailContainerClass}>
                        {/* Columna izquierda: imagen principal y galeria de miniaturas. */}
                        <View className={isCompact ? 'w-full' : 'max-w-[470px] flex-1'}>
                            <View className="border border-zinc-300 bg-white p-4">
                                <Image
                                    source={{ uri: selectedImage }}
                                    className="h-[320px] w-full"
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Miniaturas que permiten cambiar la imagen principal del producto. */}
                            <View className="mt-2 flex-row gap-2">
                                {productImages.map((image, index) => {
                                    const active = image === selectedImage;
                                    return (
                                        <Pressable
                                            key={`${image}-${index}`}
                                            onPress={() => setSelectedImage(image)}
                                            className={`flex-1 border p-2 ${active ? 'border-secondary' : 'border-zinc-300'}`}
                                        >
                                            {/* Muestra una version reducida de cada imagen disponible. */}
                                            <Image
                                                source={{ uri: image }}
                                                className="h-24 w-full"
                                                resizeMode="contain"
                                            />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        {/* Columna derecha: datos del producto y acciones de compra. */}
                        <View className={isCompact ? 'w-full' : 'max-w-[520px] flex-1'}>
                            {/* Titulo del producto. */}
                            <Text className="font-roboto-bold text-5xl text-tertiary">
                                Pulsera volcanica
                            </Text>

                            {/* Descripcion del producto. */}
                            <Text className="mt-3 max-w-[500px] font-opensans-light text-sm leading-6 text-zinc-600">
                                Pulseras realizadas en piedra volcanica natural,
                                ideales para favorecer el equilibrio emocional.
                            </Text>

                            {/* Bloque que muestra el precio y el inventario disponible. */}
                            <View className="mt-6 flex-row items-stretch border border-zinc-500 self-start">
                                <View className="justify-center px-5 py-4">
                                    <Text className="font-roboto-bold text-5xl text-secondary">$45.000</Text>
                                </View>
                                <View className="justify-center border-l border-zinc-400 px-4">
                                    <Text className="font-opensans-regular text-sm leading-5 text-zinc-700">
                                        20 und{'\n'}disponibles
                                    </Text>
                                </View>
                            </View>

                            {/* Seccion informativa de categoria. */}
                            <View className="mt-8 border-t border-zinc-200 pt-5">
                                <Text className="font-roboto-medium text-2xl text-tertiary">Categoria:</Text>
                                <Text className="mt-1 font-opensans-regular text-base text-zinc-700">Pulsera</Text>
                            </View>

                            {/* Seccion informativa de material. */}
                            <View className="mt-7 border-t border-zinc-200 pt-5">
                                <Text className="font-roboto-medium text-2xl text-tertiary">Material:</Text>
                                <Text className="mt-1 font-opensans-regular text-base text-zinc-700">
                                    Roca volcanica
                                </Text>
                            </View>

                            {/* Selector de color basado en miniaturas; tambien cambia la imagen principal. */}
                            <View className="mt-7 border-t border-zinc-200 pt-5">
                                <Text className="font-roboto-medium text-2xl text-tertiary">Color:</Text>
                                <View className="mt-3 flex-row gap-2">
                                    {colorOptions.map((option) => {
                                        const active = option.id === selectedColor;
                                        return (
                                            <Pressable
                                                key={option.id}
                                                onPress={() => {
                                                    // Sincroniza el color activo con la imagen mostrada.
                                                    setSelectedColor(option.id);
                                                    setSelectedImage(option.image);
                                                }}
                                                className={`h-16 w-16 items-center justify-center border bg-white p-1 ${
                                                    active ? 'border-secondary' : 'border-zinc-400'
                                                }`}
                                            >
                                                <Image
                                                    source={{ uri: option.image }}
                                                    className="h-full w-full"
                                                    resizeMode="contain"
                                                />
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Controles de cantidad y boton principal de agregar al carrito. */}
                            <View className="mt-7">
                                <Text className="font-roboto-medium text-2xl text-tertiary">Cantidad</Text>
                                <View className={`mt-3 ${isCompact ? 'flex-col gap-4' : 'flex-row items-center gap-4'}`}>
                                    <View className="flex-row self-start border border-zinc-400">
                                        <Pressable
                                            className="px-4 py-3"
                                            // Resta una unidad, pero nunca permite bajar de 1.
                                            onPress={() => setQuantity((current) => Math.max(1, current - 1))}
                                        >
                                            <Text className="font-roboto-medium text-xl text-zinc-800">-</Text>
                                        </Pressable>
                                        <View className="justify-center px-3">
                                            <Text className="font-opensans-regular text-lg text-zinc-800">
                                                {quantity}
                                            </Text>
                                        </View>
                                        <Pressable
                                            className="px-4 py-3"
                                            // Suma una unidad cada vez que el usuario presiona "+".
                                            onPress={() => setQuantity((current) => current + 1)}
                                        >
                                            <Text className="font-roboto-medium text-xl text-zinc-800">+</Text>
                                        </Pressable>
                                    </View>

                                    {/* Boton reutilizable del proyecto para la accion principal de compra. */}
                                    <CustomButton
                                        color="primary"
                                        className="min-w-[220px] rounded-none px-6 py-4"
                                    >
                                        AGREGAR AL CARRITO
                                    </CustomButton>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetalleProdLayout;
