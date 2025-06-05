// frontend/src/lib/stores/uiStore.js
import { writable } from 'svelte/store';

export const isCartSidebarOpen = writable(false); // Por defecto, la barra está cerrada

export function toggleCartSidebar() {
    isCartSidebarOpen.update(isOpen => !isOpen);
}

export function closeCartSidebar() {
    isCartSidebarOpen.set(false);
}