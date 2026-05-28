import React, { useEffect } from "react";
import CheckoutWeb from "@/src/views/AppWeb/CheckoutWeb";
import { useLocalSearchParams } from "expo-router";
import { useCartStore } from "@/src/store/useCartStore";

/**
 * Checkout route - Always renders CheckoutWeb.
 * When opened from the mobile app browser redirect, it hydrates the cart store
 * from the `cartItems` URL query parameter so CheckoutWeb can read the items.
 */
const CheckoutRoute = () => {
  const { cartItems: cartItemsParam } = useLocalSearchParams<{ cartItems?: string }>();
  const { items, addItem, clearCart } = useCartStore();

  useEffect(() => {
    // Only hydrate from URL params if the store is empty AND params exist
    if (cartItemsParam && items.length === 0) {
      try {
        const parsedItems = JSON.parse(decodeURIComponent(cartItemsParam));
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          // Clear any stale data first
          clearCart();
          // Add each item from the URL params
          parsedItems.forEach((item: any) => {
            addItem({
              id: item.id,
              nombre: item.nombre,
              precio: item.precio,
              imagen: item.imagen,
              cantidad: item.cantidad,
            });
          });
        }
      } catch (e) {
        console.error('Error parsing cartItems from URL:', e);
      }
    }
  }, [cartItemsParam]);

  return <CheckoutWeb />;
};

export default CheckoutRoute;
