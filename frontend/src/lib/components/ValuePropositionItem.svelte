<script>
  export let iconSvg = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/></svg>'; // Placeholder SVG
  export let title = "Título de la Propuesta";
  export let subtitle = "Subtítulo descriptivo corto.";
</script>

<div class="value-prop-item">
  <div class="icon-container">
    {@html iconSvg} </div>
  <div class="text-container">
    <h4>{title}</h4>
    <p>{subtitle}</p>
  </div>
</div>

<style>
  .value-prop-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-unit, 8px); /* Espacio entre ícono y texto */
    padding: var(--spacing-unit, 8px);
    background-color: var(--color-background-light, white); /* O un gris muy claro si la sección tiene fondo blanco */
    /* border: 1px solid var(--color-background-medium, #f0f2f5); */ /* Borde opcional */
    border-radius: 8px;
    width: 100%; /* Se ajustará por el grid o flex container padre */
    text-align: left; /* Alineación del texto */
  }

  .icon-container {
    flex-shrink: 0; /* Para que el ícono no se encoja */
    color: var(--color-teal-accent, #53A69C); /* Color del ícono */
    /* Si el SVG no toma el color con 'currentColor', necesitarás estilizarlo aquí o en el SVG mismo */
    background-color: rgba(83, 166, 156, 0.1); /* Fondo circular suave para el ícono, usando tu teal con opacidad */
    border-radius: 50%;
    width: 64px; /* Tamaño del círculo contenedor del ícono */
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-container :global(svg) { /* Estilo para el SVG dentro del contenedor */
    width: 32px; /* Tamaño del SVG en sí */
    height: 32px;
  }

  .text-container h4 {
    font-size: 1rem; /* Tamaño del título */
    font-weight: 600;
    color: var(--color-teal-accent, #53A69C); /* Título en color teal como en tu imagen */
    margin: 0 0 calc(var(--spacing-unit, 8px) * 0.5) 0; /* Espacio debajo del título */
    line-height: 1.3;
  }

  .text-container p {
    font-size: 0.85rem; /* Tamaño del subtítulo */
    color: var(--color-dark-primary, #1D1B1C); /* O un gris más suave */
    line-height: 1.4;
    margin: 0;
  }
</style>