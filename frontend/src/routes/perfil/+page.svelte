<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import auth from '$lib/stores/authStore.js';

  // Vista activa en el dashboard: 'info', 'direcciones', 'pedidos', 'citas'
  let activeView = 'info'; 

  // Proteger la ruta: si el usuario no está logueado, se le redirige al login.
  onMount(() => {
    const unsubscribe = auth.subscribe(authValue => {
      // El setTimeout de 0 es un pequeño truco para darle tiempo al store de inicializarse
      // desde localStorage antes de hacer la verificación, evitando un parpadeo a /login.
      setTimeout(() => {
        if (!$auth.user) {
          goto('/login?redirect=/perfil'); // Redirigir a login si no hay usuario
        }
      }, 0);
    });
    return unsubscribe; // Limpiar la suscripción cuando el componente se destruye
  });

  function handleLogout() {
    auth.logout();
    goto('/');
  }
</script>

<svelte:head>
  <title>Mi Perfil - Clínica Canina Ornelas López</title>
</svelte:head>

{#if $auth.user}
  <div class="profile-page-container">
    <h1 class="page-title">Bienvenido a tu Perfil, <span class="user-name">{$auth.user.name}</span></h1>
    
    <div class="dashboard-layout">
      <nav class="dashboard-nav">
        <button class:active={activeView === 'info'} on:click={() => activeView = 'info'}>Información de Contacto</button>
        <button class:active={activeView === 'direcciones'} on:click={() => activeView = 'direcciones'}>Direcciones Guardadas</button>
        <button class:active={activeView === 'pedidos'} on:click={() => activeView = 'pedidos'}>Historial de Pedidos</button>
        <button class:active={activeView === 'citas'} on:click={() => activeView = 'citas'}>Historial de Citas</button>
        <button class="logout-btn" on:click={handleLogout}>Cerrar Sesión</button>
      </nav>
      
      <main class="dashboard-content">
        {#if activeView === 'info'}
          <h2>Información de Contacto</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Nombre:</span>
              <span class="value">{$auth.user.name}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">{$auth.user.email}</span>
            </div>
            <div class="info-item">
              <span class="label">Rol en el sistema:</span>
              <span class="value">{$auth.user.role}</span>
            </div>
          </div>
          {:else if activeView === 'direcciones'}
          <h2>Direcciones Guardadas</h2>
          <div class="placeholder-content">
            <p>Aún no se cuenta con direcciones registradas.</p>
            <button class="button-primary" on:click={() => alert('Función "Agregar Dirección" no implementada.')}>Agregar Dirección</button>
          </div>

        {:else if activeView === 'pedidos'}
          <h2>Historial de Pedidos</h2>
          <div class="placeholder-content">
            <p>Aún no has realizado ningún pedido.</p>
            <a href="/tienda" class="button-primary">Ir a la Tienda</a>
          </div>

        {:else if activeView === 'citas'}
          <h2>Historial de Citas</h2>
          <div class="placeholder-content">
            <p>Aún no has agendado ninguna cita.</p>
            <a href="/citas" class="button-primary">Agendar una Cita</a>
          </div>
        {/if}
      </main>
    </div>

  </div>
{/if}

<style>
  .profile-page-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2);
  }
  
  /* La clase .page-title se toma de tu app.css global */
  .user-name {
    color: var(--color-teal-accent);
  }
  
  .dashboard-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: calc(var(--spacing-unit, 8px) * 4);
    margin-top: calc(var(--spacing-unit, 8px) * 2);
  }

  .dashboard-nav {
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-medium, #f0f2f5);
    border-radius: 8px;
    padding: var(--spacing-unit, 8px);
  }
  .dashboard-nav button {
    padding: calc(var(--spacing-unit, 8px) * 1.5);
    text-decoration: none;
    color: var(--color-dark-primary);
    font-weight: 500;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    font-size: 0.95rem;
  }
  .dashboard-nav button:hover {
    background-color: var(--color-beige-secondary);
  }
  .dashboard-nav button.active {
    background-color: var(--color-teal-accent);
    color: white;
    font-weight: 600;
  }
  .dashboard-nav .logout-btn {
    margin-top: auto;
    color: #c0392b;
  }
  .dashboard-nav .logout-btn:hover {
    background-color: #e74c3c;
    color: white;
  }

  .dashboard-content {
    padding: calc(var(--spacing-unit, 8px) * 3);
    border: 1px solid var(--color-background-medium);
    border-radius: 8px;
    min-height: 400px;
  }
  .dashboard-content h2 {
    margin-top: 0;
    font-size: 1.8rem;
    font-family: var(--font-headings);
    color: var(--color-dark-primary);
    padding-bottom: var(--spacing-unit);
    border-bottom: 2px solid var(--color-beige-secondary);
    margin-bottom: calc(var(--spacing-unit, 8px) * 2);
  }

  .info-grid { display: grid; grid-template-columns: 1fr; gap: var(--spacing-unit); }
  .info-item {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-unit) 0;
    border-bottom: 1px solid var(--color-background-medium);
  }
  .info-item .label { font-size: 0.8rem; color: #666; text-transform: uppercase; margin-bottom: calc(var(--spacing-unit) / 2); }
  .info-item .value { font-size: 1.1rem; font-weight: 500; }

  .placeholder-content {
    text-align: center;
    padding: calc(var(--spacing-unit, 8px) * 4) 0;
    color: #777;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 250px;
  }
  .placeholder-content p {
    margin-bottom: calc(var(--spacing-unit, 8px) * 2);
    font-size: 1.1rem;
  }
  
  .button-primary {
    display: inline-block;
    background-color: var(--color-teal-accent);
    color: white;
    padding: calc(var(--spacing-unit, 8px) * 1.25) calc(var(--spacing-unit, 8px) * 2.5);
    border: none;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .button-primary:hover { opacity: 0.85; }

  @media (max-width: 768px) {
    .dashboard-layout {
      grid-template-columns: 1fr; /* Apilar en móviles */
    }
  }
</style>