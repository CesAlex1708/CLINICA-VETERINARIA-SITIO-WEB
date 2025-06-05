<script>
  export let label = 'Link';
  export let mainHref = '#'; // Enlace si se hace clic en el principal, '#' si solo abre menú
  export let sublinks = []; // Array de { href: '/ruta', text: 'Sub Enlace' }
  
  let showDropdown = false; // Controlado por JS para montar/desmontar el menú
  let containerElement; // Para detectar clics fuera (opcional, más avanzado)

  function handleMouseEnter() {
    showDropdown = true;
  }

  function handleMouseLeave() {
    showDropdown = false;
  }

  // Para accesibilidad con teclado:
  // on:focusin se activa cuando el contenedor o cualquiera de sus hijos recibe foco.
  // on:focusout se activa cuando el foco sale del contenedor y todos sus hijos.
</script>

<div 
  class="dropdown-container" 
  on:mouseenter={handleMouseEnter} 
  on:mouseleave={handleMouseLeave}
  on:focusin={handleMouseEnter}
  on:focusout={handleMouseLeave}
  bind:this={containerElement}
>
  <a href={mainHref} class="main-link">
    {label}
    {#if sublinks.length > 0}
      <span class="arrow" class:rotated={showDropdown}>▼</span>
    {/if}
  </a>

  {#if showDropdown && sublinks.length > 0}
    <ul class="dropdown-menu">
      {#each sublinks as sublink (sublink.href)}
        <li><a href={sublink.href} on:click={() => showDropdown = false}>{sublink.text}</a></li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .dropdown-container {
    position: relative; /* Para el posicionamiento absoluto del menú */
    display: inline-block; /* Para que se alinee con otros links */
  }

  .main-link {
    /* Estilos para que se vea como los otros .access-link en Header.svelte */
    display: inline-flex; /* Para alinear el texto y la flecha */
    align-items: center;
    padding: calc(var(--spacing-unit, 8px) * 0.75) calc(var(--spacing-unit, 8px) * 1.5);
    color: var(--color-text-dark, #1D1B1C);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem; /* Coincidir con .access-bar font-size o .access-link en Header */
    border-radius: 20px; /* Estilo píldora */
    transition: background-color 0.2s ease, color 0.2s ease;
    cursor: pointer; /* O 'default' si mainHref es solo '#' */
  }


  .arrow {
    font-size: 0.65em; /* Un poco más pequeño */
    margin-left: 8px;
    display: inline-block;
    transition: transform 0.2s ease-in-out;
  }

  .arrow.rotated { /* Clase para rotar la flecha cuando el menú está visible */
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 5px); /* Justo debajo del enlace principal, con un pequeño espacio */
    left: 50%; /* Centrar el menú debajo del enlace */
    transform: translateX(-50%); /* Ajuste fino para centrar */
    background-color: var(--color-background-light, white);
    border: 1px solid var(--color-background-medium, #f0f2f5);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    border-radius: 6px; /* Bordes redondeados para el menú */
    list-style: none;
    margin: 0;
    padding: calc(var(--spacing-unit, 8px) * 0.5) 0; /* Padding vertical reducido */
    z-index: 1010; 
    min-width: 200px; /* Ancho mínimo del desplegable */
    
    /* Animación de aparición/desaparición (manejada por #if showDropdown en Svelte) */
    /* Si quisiéramos transiciones CSS, necesitaríamos no quitarlo del DOM con #if,
       sino jugar con opacity y visibility, y un display: none inicial */
  }

  .dropdown-menu li a {
    display: block;
    padding: calc(var(--spacing-unit, 8px) * 1) calc(var(--spacing-unit, 8px) * 2); /* 8px 16px */
    color: var(--color-text-dark, #1D1B1C);
    text-decoration: none;
    font-size: 0.85rem; /* Un poco más pequeño que el enlace principal */
    white-space: nowrap;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .dropdown-menu li a:hover {
    background-color: var(--color-teal-accent, #53A69C);
    color: var(--color-text-light, white);
  }
</style>