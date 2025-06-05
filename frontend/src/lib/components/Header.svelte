<script>
  import SearchBar from './SearchBar.svelte';
  import Logo from './Logo.svelte';
  import DropdownLink from './DropdownLink.svelte';
  import { cartTotalItems } from '$lib/stores/cartStore.js';
  import { toggleCartSidebar } from '$lib/stores/uiStore.js';
  import auth from '$lib/stores/authStore.js';
  import { goto } from '$app/navigation';

  // Variable reactiva que se actualiza automáticamente cuando el estado de auth cambia
  $: isLoggedIn = !!$auth.user;

  function handleLogout() {
    auth.logout(); // Llama a la función logout de nuestro store
    goto('/');      // Redirige al usuario a la página de inicio
  }
</script>

<header class="site-header">
  <div class="top-bar">
    <div class="logo-container">
      <Logo />
    </div>
    <div class="search-container">
      <SearchBar />
    </div>

    <div class="user-actions-container">
      <a href="/citas" class="user-action-button appointment-action-button">
        <svg width="28" height="28" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M716 190.9v-67.8h-44v67.8H352v-67.8h-44v67.8H92v710h840v-710H716z m-580 44h172v69.2h44v-69.2h320v69.2h44v-69.2h172v151.3H136V234.9z m752 622H136V402.2h752v454.7z" fill="currentColor" />
          <path d="M319 565.7m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="currentColor" />
          <path d="M510 565.7m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="currentColor" />
          <path d="M701.1 565.7m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="currentColor" />
          <path d="M319 693.4m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="currentColor" />
          <path d="M510 693.4m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="currentColor" />
          <path d="M701.1 693.4m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="currentColor" />
        </svg>
        <span>Agendar Cita</span>
      </a>

      {#if isLoggedIn}
        <a href="/perfil" class="user-action-button account-button" title="Mi Perfil">
          <svg width="30" height="30" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M512 616.2m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="currentColor" /><path d="M511.6 656.9m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="currentColor" /><path d="M512.4 697.7m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="currentColor" /><path d="M512 130.8c42.1 0 81.7 16.4 111.5 46.2s46.2 69.4 46.2 111.5-16.4 81.7-46.2 111.5c-29.8 29.8-69.4 46.2-111.5 46.2s-81.7-16.4-111.5-46.2c-29.8-29.8-46.2-69.4-46.2-111.5s16.4-81.7 46.2-111.5 69.4-46.2 111.5-46.2m0-44c-111.4 0-201.6 90.3-201.6 201.6C310.4 399.8 400.7 490 512 490c111.4 0 201.6-90.3 201.6-201.6S623.3 86.8 512 86.8zM512.3 523.5L84 681.4v255.7h856V681.4L512.3 523.5zM896 893.1H128V712.6l384.3-142.4L896 712.6v180.5z" fill="currentColor" /><path d="M555.4 585.3l-1.4-0.5v159.9c0 11.7-4.8 22.3-12.4 30-7.7 7.7-18.3 12.4-30 12.4-23.4 0-42.4-19-42.4-42.4V585.3l-1.4 0.5-14.6 5.2v153.8c0 32.2 26.2 58.4 58.4 58.4S570 777 570 744.8V590.5l-14.6-5.2z" fill="currentColor" />
          </svg>
          <span>Mi Cuenta</span>
        </a>
        <button type="button" class="user-action-button logout-button" on:click={handleLogout}>Logout</button>
      {:else}
        <a href="/login" class="user-action-button login-button" title="Iniciar Sesión">
          <svg width="30" height="30" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M512 616.2m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="currentColor" /><path d="M511.6 656.9m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="currentColor" /><path d="M512.4 697.7m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" fill="currentColor" /><path d="M512 130.8c42.1 0 81.7 16.4 111.5 46.2s46.2 69.4 46.2 111.5-16.4 81.7-46.2 111.5c-29.8 29.8-69.4 46.2-111.5 46.2s-81.7-16.4-111.5-46.2c-29.8-29.8-46.2-69.4-46.2-111.5s16.4-81.7 46.2-111.5 69.4-46.2 111.5-46.2m0-44c-111.4 0-201.6 90.3-201.6 201.6C310.4 399.8 400.7 490 512 490c111.4 0 201.6-90.3 201.6-201.6S623.3 86.8 512 86.8zM512.3 523.5L84 681.4v255.7h856V681.4L512.3 523.5zM896 893.1H128V712.6l384.3-142.4L896 712.6v180.5z" fill="currentColor" /><path d="M555.4 585.3l-1.4-0.5v159.9c0 11.7-4.8 22.3-12.4 30-7.7 7.7-18.3 12.4-30 12.4-23.4 0-42.4-19-42.4-42.4V585.3l-1.4 0.5-14.6 5.2v153.8c0 32.2 26.2 58.4 58.4 58.4S570 777 570 744.8V590.5l-14.6-5.2z" fill="currentColor" />
          </svg>
          <span>Login</span>
        </a>
      {/if}

      <button type="button" class="user-action-button cart-button" on:click={toggleCartSidebar} title="Ver Carrito">
        <svg width="30" height="30" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path d="M960.1 258.4H245.8l-36.1-169H63.9v44h110.2l26.7 125 100.3 469.9 530 0.4v-44l-494.4-0.3-22.6-105.9H832l128.1-320.1z m-65 44L855.6 401H276.3l-21.1-98.6h639.9zM304.8 534.5L279.7 417h569.5l-47 117.5H304.8z" fill="currentColor" /><path d="M375.6 810.6c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52m0-20c-39.7 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.3-72-72-72zM732 810.6c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52m0-20c-39.7 0-72 32.2-72 72s32.2 72 72 72c39.7 0 72-32.2 72-72s-32.3-72-72-72zM447.5 302.4h16v232.1h-16zM652 302.4h16v232.1h-16z" fill="currentColor" /><path d="M276.3 401l3.4 16-3.4-16z" fill="currentColor" />
        </svg>
        <span>Carrito</span>
        {#if $cartTotalItems > 0}
          <span class="cart-count">{$cartTotalItems}</span>
        {/if}
      </button>
    </div>
  </div>

  <nav class="access-bar">
    <a href="/servicios" class="access-link">Servicios</a>
    <DropdownLink label="Tienda en Línea" mainHref="/tienda" sublinks={[ { href: '/tienda?category=Alimentos', text: 'Alimentos' }, { href: '/tienda?category=Accesorios', text: 'Accesorios' }, { href: '/tienda?category=Medicamentos', text: 'Farmacia PET' }, { href: '/tienda?category=Juguetes', text: 'Juguetes' }, { href: '/tienda?category=Otros', text: 'Otros' } ]} />
    <a href="/promociones" class="access-link">Promociones</a>
    <DropdownLink label="Guías de Cuidado" mainHref="/guias" sublinks={[ { href: '/guias#cuidado-cachorros', text: 'Cuidado de Cachorros' }, { href: '/guias#alimentacion-saludable', text: 'Alimentación Saludable' }, { href: '/guias#viajar-con-mascota', text: 'Viajar con tu Mascota' } ]} />
    <DropdownLink label="Planes de Salud" mainHref="/planes-de-salud" sublinks={[ { href: '/planes-de-salud#plan-cachorro', text: 'Plan Bienestar Cachorro' }, { href: '/planes-de-salud#plan-adulto', text: 'Plan Adulto Activo' }, { href: '/planes-de-salud#plan-senior', text: 'Plan Cuidado Senior' } ]} />
    <a href="/urgencias" class="access-link emergency-link">URGENCIAS</a>
  </nav>
</header>

<style>
  .site-header {
    background-color: var(--color-background-light, white);
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(var(--spacing-unit, 8px) * 1) calc(var(--spacing-unit, 8px) * 3);
    min-height: 100px;
    flex-wrap: nowrap;
  }
  .logo-container {
    flex-shrink: 0;
  }
  .search-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    padding: 0 calc(var(--spacing-unit, 8px) * 3);
    min-width: 200px;
    margin: 0 calc(var(--spacing-unit, 8px) * 2);
  }
  .user-actions-container {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: var(--spacing-unit, 8px);
  }
  .user-action-button {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--spacing-unit, 8px) * 0.75);
    padding: calc(var(--spacing-unit, 8px) * 1) calc(var(--spacing-unit, 8px) * 1.75);
    background-color: transparent;
    color: var(--color-dark-primary, #1D1B1C);
    border: 2px solid var(--color-beige-secondary, #B2A991);
    border-radius: 50px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.85rem;
    transition: all 0.2s ease-in-out;
    min-height: 40px;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
  }
  .user-action-button:hover {
    background-color: var(--color-teal-accent, #53A69C);
    border-color: var(--color-teal-accent, #53A69C);
    color: var(--color-text-light, white);
  }
  
  /* ESTILO PARA EL NUEVO BOTÓN DE LOGOUT */
  .user-action-button.logout-button {
    background-color: transparent;
    color: #c0392b; /* Rojo para la acción de salir */
    border-color: #c0392b;
  }
  .user-action-button.logout-button:hover {
    background-color: #c0392b;
    border-color: #c0392b;
    color: white;
  }

  .cart-button {
    position: relative;
  }
  .cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--color-dark-primary);
    color: white;
    border-radius: 50%;
    padding: 1px 5px;
    font-size: 0.7rem;
    font-weight: bold;
    line-height: 1;
    min-width: 16px;
    text-align: center;
    border: 1px solid var(--color-background-light);
  }
  .access-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: calc(var(--spacing-unit, 8px) * 1.5) calc(var(--spacing-unit, 8px) * 2);
    background-color: var(--color-dark-primary, #1D1B1C);
    gap: var(--spacing-unit, 8px);
    border-top: 1px solid rgba(255,255,255,0.1);
    flex-wrap: wrap;
  }
  :global(.access-bar .dropdown-container .main-link),
  .access-bar > a.access-link {
    padding: calc(var(--spacing-unit, 8px) * 1) calc(var(--spacing-unit, 8px) * 2.5);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    border-radius: 50px;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    line-height: 1;
    cursor: pointer;
    background-color: var(--color-background-light, white);
    color: var(--color-dark-primary, #1D1B1C);
    border: 2px solid var(--color-background-light, white);
  }
  :global(.access-bar .dropdown-container:hover .main-link):not(.emergency-link),
  .access-bar > a.access-link:not(.emergency-link):hover {
    background-color: var(--color-teal-accent, #53A69C);
    border-color: var(--color-teal-accent, #53A69C);
    color: var(--color-text-light, white);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  .access-bar .emergency-link {
    background-color: #E73B37;
    border-color: #E73B37;
    color: var(--color-text-light, white);
    font-weight: bold;
  }
  .access-bar .emergency-link:hover {
    background-color: #c0392b;
    border-color: #c0392b;
    color: var(--color-text-light, white);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  :global(.access-bar .dropdown-menu) {
    background-color: var(--color-background-light, white);
    border-color: var(--color-background-medium, #f0f2f5);
    box-shadow: 0 6px 12px rgba(0,0,0,0.175);
  }
  :global(.access-bar .dropdown-menu li a) {
    color: var(--color-dark-primary, #1D1B1C);
  }
  :global(.access-bar .dropdown-menu li a:hover) {
    background-color: var(--color-teal-accent, #53A69C);
    color: var(--color-text-light, white);
  }
</style>