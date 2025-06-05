// frontend/src/lib/stores/cartStore.js
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment'; // Para verificar si estamos en el navegador

// Clave para localStorage
const CART_STORAGE_KEY = 'svelte_clinic_cart';

// Función para obtener el carrito inicial desde localStorage (solo en el navegador)
function getInitialCart() {
    if (browser) { // 'browser' es true solo cuando se ejecuta en el cliente
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            try {
                return JSON.parse(storedCart);
            } catch (e) {
                console.error("Error al parsear el carrito desde localStorage", e);
                return []; // Retornar carrito vacío en caso de error
            }
        }
    }
    return []; // Carrito vacío por defecto o si está en el servidor
}

// Store principal para los ítems del carrito
const items = writable(getInitialCart());

// Suscribirse a los cambios en 'items' y guardarlos en localStorage
if (browser) {
    items.subscribe(value => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(value));
    });
}

// Funciones personalizadas para manipular el carrito
function addItem(productToAdd, quantity = 1) {
    items.update(currentItems => {
        const existingItemIndex = currentItems.findIndex(item => item._id === productToAdd._id);

        if (existingItemIndex > -1) {
            // El producto ya está en el carrito, incrementar cantidad
            const updatedItems = [...currentItems];
            updatedItems[existingItemIndex].quantity += quantity;
            return updatedItems;
        } else {
            // Añadir nuevo producto al carrito
            return [...currentItems, { ...productToAdd, quantity }];
        }
    });
}

function removeItem(productId) {
    items.update(currentItems => {
        return currentItems.filter(item => item._id !== productId);
    });
}

function updateItemQuantity(productId, newQuantity) {
    items.update(currentItems => {
        if (newQuantity <= 0) {
            return currentItems.filter(item => item._id !== productId); // Eliminar si la cantidad es 0 o menos
        }
        return currentItems.map(item =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
        );
    });
}

function clearCart() {
    items.set([]);
}

// Stores derivados para cálculos útiles
const cartTotalItems = derived(items, $items => {
    return $items.reduce((sum, item) => sum + item.quantity, 0);
});

const cartTotalPrice = derived(items, $items => {
    return $items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

// Exportar el store y las funciones
export const cart = {
    subscribe: items.subscribe, // Para poder usar $cart en componentes
    set: items.set,             // No se usa mucho directamente, pero es parte del contrato de writable
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
};

export { cartTotalItems, cartTotalPrice }; // Exportar los stores derivados