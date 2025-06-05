<script>
  // La ruta a tu imagen de logo.
  // Asegúrate de que el nombre del archivo y la ruta sean correctos.
  // Esto asume que tu imagen está en 'frontend/static/images/logo-principal.jpeg'
  const logoImagePath = '/images/logo-principal.jpeg';
</script>

<a href="/" class="logo-link">
  <img src={logoImagePath} alt="Logo de la Clínica Canina Ornelas López" class="logo-image" />
</a>

<style>
  .logo-link {
    display: inline-block; /* Hace que el enlace se ajuste al tamaño de la imagen */
    vertical-align: middle; /* Ayuda a alinear la imagen si hay otros elementos en línea */
  }

  .logo-image {
    max-height: 100px; /* Ajusta esta altura para que el logo encaje bien en tu header.
                         Prueba con valores como 60px, 70px, 80px, etc. */
    display: block;   /* Evita cualquier espacio extra debajo de la imagen si es un elemento en línea */
    width: auto;      /* Mantiene la proporción de la imagen */
  }
</style>