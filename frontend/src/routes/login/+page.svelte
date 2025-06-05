<script>
  import auth from '$lib/stores/authStore.js';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';

  let isLoading = false;
  let error = null;

  async function handleSubmit() {
    isLoading = true;
    error = null;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Algo salió mal al iniciar sesión.');
      }

      // Si el login es exitoso, actualizamos nuestro store de autenticación
      auth.login(data);

      // Redirigimos al usuario a la página de su perfil
      await goto('/perfil');

    } catch (err) {
      console.error('Error de login:', err);
      error = err.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Iniciar Sesión - Clínica Canina Ornelas López</title>
  <meta name="description" content="Inicia sesión en tu cuenta para agendar citas y gestionar tus pedidos." />
</svelte:head>

<div class="auth-page-container">
  <div class="auth-form-card">
    <h1 class="page-title">Iniciar Sesión</h1>
    <form on:submit|preventDefault={handleSubmit}>
      {#if error}
        <p class="error-message">{error}</p>
      {/if}

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" bind:value={email} required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" bind:value={password} required />
      </div>

      <button type="submit" class="button-primary" disabled={isLoading}>
        {#if isLoading}
          Ingresando...
        {:else}
          Iniciar Sesión
        {/if}
      </button>
    </form>
    <div class="auth-switch">
      <p>¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a>.</p>
    </div>
  </div>
</div>

<style>
  /* Estos estilos son prácticamente idénticos a los de la página de registro.
     En un proyecto más grande, se podrían abstraer a un componente o a clases globales. */
  .auth-page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: calc(var(--spacing-unit, 8px) * 4) var(--spacing-unit, 8px);
    min-height: 70vh;
  }

  .auth-form-card {
    width: 100%;
    max-width: 450px;
    padding: calc(var(--spacing-unit, 8px) * 4);
    background-color: var(--color-background-light, white);
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    border-radius: 12px;
  }

  /* Usamos la clase global .page-title de app.css */

  .error-message {
    background-color: rgba(231, 59, 55, 0.1);
    color: #c0392b;
    padding: var(--spacing-unit, 8px);
    border-radius: 4px;
    text-align: center;
    margin-bottom: var(--spacing-unit, 8px);
  }

  .form-group {
    margin-bottom: calc(var(--spacing-unit, 8px) * 2);
  }

  .form-group label {
    display: block;
    margin-bottom: calc(var(--spacing-unit, 8px) * 0.5);
    font-weight: 500;
    font-size: 0.9rem;
  }

  .form-group input {
    width: 100%;
    padding: calc(var(--spacing-unit, 8px) * 1.25);
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
  }
  .form-group input:focus {
    outline: none;
    border-color: var(--color-teal-accent, #53A69C);
    box-shadow: 0 0 0 2px rgba(83, 166, 156, 0.2);
  }

  .button-primary {
    width: 100%;
    padding: calc(var(--spacing-unit, 8px) * 1.5);
    font-size: 1.1rem;
    border: none;
    background-color: var(--color-teal-accent);
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .button-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .button-primary:not(:disabled):hover {
    opacity: 0.85;
  }

  .auth-switch {
    text-align: center;
    margin-top: calc(var(--spacing-unit, 8px) * 2);
    font-size: 0.9rem;
  }
</style>