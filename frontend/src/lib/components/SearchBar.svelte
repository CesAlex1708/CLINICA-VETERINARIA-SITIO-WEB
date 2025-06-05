<div class="search-bar pill-shape">
  <input type="search" placeholder="¿Qué buscas para tu mascota?" />
  <button type="submit" aria-label="Buscar">
    <svg 
      width="22"  height="22" viewBox="0 0 1024 1024" 
      class="icon"  
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" 
      focusable="false"
    >
      <path d="M492.5 917.7c-247 0-447.9-200.9-447.9-447.9s200.9-448 447.9-448 447.9 200.9 447.9 447.9-200.9 448-447.9 448z m0-810.6c-200 0-362.6 162.7-362.6 362.6s162.7 362.6 362.6 362.6 362.6-162.7 362.6-362.6-162.6-362.6-362.6-362.6z" fill="currentColor" />
      <path d="M951.1 971c-10.9 0-21.8-4.2-30.2-12.5l-96-96c-16.7-16.7-16.7-43.7 0-60.3 16.6-16.7 43.7-16.7 60.3 0l96 96c16.7 16.7 16.7 43.7 0 60.3-8.2 8.4-19.2 12.5-30.1 12.5z" fill="currentColor" />
    </svg>
  </button>
</div>

<style>
  .search-bar {
    display: flex;
    align-items: stretch; /* Para que el input y el botón ocupen toda la altura */
    width: 100%;
    max-width: 500px; /* O el ancho que prefieras */
    border: 2px solid var(--color-dark-primary, #1D1B1C);
    border-radius: 50px; /* Muy redondeado para forma de píldora */
    overflow: hidden; /* Para que el contenido interno no se salga de los bordes redondeados */
    height: 48px; /* Altura deseada, asegúrate que el header tenga espacio para esto */
    background-color: white; /* Fondo para la barra completa */
  }

  .pill-shape input[type="search"] {
    flex-grow: 1;
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    border: none; 
    outline: none;
    background-color: transparent; /* Hereda del contenedor .search-bar */
    height: 100%; 
    color: var(--color-dark-primary);
  }

  .pill-shape input[type="search"]::placeholder {
    color: #777;
  }

  .pill-shape button[type="submit"] {
    padding: 0 1.2rem; /* Ajusta este padding para centrar bien tu ícono */
    border: none;
    background-color: var(--color-dark-primary, #1D1B1C); /* Botón con color de fondo oscuro */
    color: var(--color-text-light, white); /* El SVG usará este color por 'fill="currentColor"' */
    cursor: pointer;
    outline: none;
    height: 100%; 
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
  }

  .pill-shape button[type="submit"]:hover {
    background-color: var(--color-teal-accent, #53A69C); /* Cambio de color al hacer hover */
  }

  /* No necesitamos .search-svg-icon si estilizamos directamente el tag svg o si sus atributos son suficientes */
  .pill-shape button[type="submit"] svg {
    /* Si necesitas más ajustes específicos para el SVG, puedes ponerlos aquí.
       Por ejemplo, si el width/height en el SVG no es suficiente,
       puedes intentar forzarlo aquí, aunque es mejor en el propio SVG.
       width: 22px; 
       height: 22px; 
    */
  }
</style>