// frontend/src/lib/stores/authStore.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const AUTH_STORAGE_KEY = 'svelte_clinic_auth';

// Función para obtener el estado inicial desde localStorage
function getInitialAuth() {
    if (!browser) return { user: null, token: null }; // Si está en el servidor, no hay sesión

    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
        try {
            // Aquí podrías añadir una verificación de expiración del token si quisieras
            return JSON.parse(storedAuth);
        } catch (e) {
            console.error("Error al parsear auth desde localStorage", e);
            return { user: null, token: null };
        }
    }
    return { user: null, token: null };
}

// Creamos un store writable con el estado inicial
const auth = writable(getInitialAuth());

// Funciones para manejar el login y logout que actualizan el store y localStorage
function login(authData) {
    const dataToStore = {
        user: authData.user || { // Asegurarnos de que user no sea null o undefined
            _id: authData._id,
            name: authData.name,
            email: authData.email,
            role: authData.role
        },
        token: authData.token
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(dataToStore));
    auth.set(dataToStore);
}

function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    auth.set({ user: null, token: null });
}

// Exportamos el store y las funciones de login/logout
export default {
    subscribe: auth.subscribe,
    login,
    logout
};