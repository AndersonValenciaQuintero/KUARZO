import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import { CardProduct } from "../components/CardProduct";
import Carrusel from "../components/Carrusel";
import { usePlatform } from "../hooks/usePlatform";

// ─── Datos compartidos entre plataformas ────────────────────────────────────

const sampleProducts = [
  {
    nombre: "Pulsera Piedra Volcánica",
    descripcion: "Pulsera elaborada con piedras volcanicas y dijes de acero inoxidable.",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
  },
  {
    nombre: "Pulsera Premium",
    descripcion: "Elegante pulsera con acabados premium para cualquier ocasión.",
    precio: 55000,
    imagen: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop",
  },
  {
    nombre: "Pulsera Clásica",
    descripcion: "Diseño minimalista ideal para el uso diario.",
    precio: 35000,
    imagen: "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop",
  },
  {
    nombre: "Pulsera Clásica",
    descripcion: "Diseño minimalista ideal para el uso diario.",
    precio: 35000,
    imagen: "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop",
  },
  {
    nombre: "Pulsera Piedra Volcánica",
    descripcion: "Pulsera elaborada con piedras volcanicas y dijes de acero inoxidable.",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
  },
  {
    nombre: "Pulsera Premium",
    descripcion: "Elegante pulsera con acabados premium para cualquier ocasión.",
    precio: 55000,
    imagen: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop",
  },
  {
    nombre: "Pulsera Clásica",
    descripcion: "Diseño minimalista ideal para el uso diario.",
    precio: 35000,
    imagen: "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop",
  },
  {
    nombre: "Pulsera Tejida",
    descripcion: "Diseño sencillo y moderno para el uso diario.",
    precio: 25000,
    imagen: "https://images.unsplash.com/photo-1573408301145-b98c46544405?q=80&w=1169&auto=format&fit=crop",
  },
];

const sampleProducts2 = [
  {
    nombre: "Pulsera Piedra Volcánica",
    descripcion: "Pulsera elaborada con piedras volcanicas y dijes de acero inoxidable.",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1170&auto=format&fit=crop",
  },
  {
    nombre: "Pulsera Premium",
    descripcion: "Elegante pulsera con acabados premium para cualquier ocasión.",
    precio: 55000,
    imagen: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop",
  },
];

const promoBanners = [
  {
    id: 1,
    imagen: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
  },
];

// ─── Helpers de navegación al detalle ───────────────────────────────────────

const goToDetail = (item: any) =>
  router.push({
    pathname: "/detalleProd",
    params: {
      id: item.id || item.nombre,
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
      imagen: item.imagen,
      categoria: item.categoria || "",
    },
  });

// ─── Layout WEB ─────────────────────────────────────────────────────────────

const WebLayout = () => (
  <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="flex-1 bg-white">
      {/* 1. HEADER WEB */}
      <AppHeader platform="web" />

      {/* 2. BANNER PROMOCIONAL */}
      <View>
        <Carrusel
          type="images"
          images={promoBanners.map((b) => b.imagen)}
          showDots={true}
          autoPlay={true}
        />
      </View>

      {/* 3. PRODUCTOS DESTACADOS */}
      <View className="items-center px-4 py-10">
        <Text className="text-gray-500 font-roboto-bold px-4 mb-3 text-xl uppercase tracking-widest">
          PRODUCTOS DESTACADOS
        </Text>
      </View>
      <View className="mb-8 mx-80 px-8 py-10">
        <Carrusel
          type="products"
          products={sampleProducts}
          onProductPress={goToDetail}
        />
      </View>

      {/* 4. SEGUNDA SECCIÓN DE PRODUCTOS */}
      <View className="mb-20 mx-80 px-8 flex flex-row">
        <Carrusel
          type="products"
          products={sampleProducts2}
          onProductPress={goToDetail}
        />
        <View className="bg-quaternary-950 w-full">
          <Text className="text-quaternary-500 font-roboto-bold text-3xl ml-10 mt-20">MAS</Text>
          <Text className="text-quaternary-500 font-roboto-bold text-5xl ml-10">PRODUCTOS</Text>
          <CustomButton
            children="Ver mas"
            className="bg-primary rounded-md font-roboto-bold w-60 h-10 ml-10 mt-10 justify-center items-center"
            onPress={() => router.push("/catalogo")}
          />
        </View>
      </View>

      {/* 5. FOOTER WEB */}
      <AppFooter platform="web" />
    </ScrollView>
  </SafeAreaView>
);

// ─── Layout MÓVIL ───────────────────────────────────────────────────────────

const MovilLayout = () => (
  <SafeAreaView className="flex-1 bg-white">
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "white", paddingBottom: 100 }}
    >
      {/* 1. HEADER MÓVIL */}
      <AppHeader platform="movil" />

      {/* 2. BANNER PROMOCIONAL */}
      <View className="mb-8">
        <Text className="text-gray-500 font-bold px-4 mb-3 text-xs uppercase tracking-widest">
          Ofertas y Promociones
        </Text>
        <Carrusel
          type="images"
          images={promoBanners.map((b) => b.imagen)}
          showDots={true}
          autoPlay={true}
        />
      </View>

      {/* 3. PRODUCTOS DESTACADOS EN GRID 2 COLUMNAS */}
      <View className="mb-8">
        <Text className="text-gray-500 font-bold px-4 mb-3 text-xs uppercase tracking-widest">
          Productos Destacados
        </Text>
        <View className="flex-row flex-wrap justify-between px-4">
          {sampleProducts.map((prod, index) => (
            <View key={index} className="w-[48%] mb-4 rounded-2xl">
              <CardProduct producto={prod} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>

    {/* 4. FOOTER MÓVIL (barra flotante) */}
    <AppFooter platform="movil" />
  </SafeAreaView>
);

// ─── Punto de entrada unificado ──────────────────────────────────────────────

const App = () => {
  const platform = usePlatform();

  if (platform === 'movil') {
    return <MovilLayout />;
  }

  return <WebLayout />;
};

export default App;
