<script>
  export let category = {
    name: 'Nombre de Raza',
    imageSrc: '/images/placeholder-product.png', // Imagen por defecto
    link: '#'
  };
</script>

<a href={category.link} class="category-card">
  <div class="image-container">
    <img src={category.imageSrc} alt={`Categoría de perros: ${category.name}`} />
  </div>
  <span class="category-name">{category.name}</span>
</a>

<style>
  .category-card {
    display: block;
    text-decoration: none;
    color: var(--color-dark-primary);
    text-align: center;
    border-radius: 16px; /* Bordes redondeados */
    overflow: hidden; /* Para que la imagen se ajuste a los bordes */
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  .category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }

  .image-container {
    width: 100%;
    aspect-ratio: 1 / 1; /* Imagen cuadrada */
    background-color: var(--color-background-medium);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .category-name {
    display: block;
    padding: calc(var(--spacing-unit, 8px) * 1.5) var(--spacing-unit, 8px);
    font-weight: 600;
    background-color: var(--color-beige-secondary, #B2A991); /* CAMBIADO AQUÍ */
    color: var(--color-dark-primary, #1D1B1C); /* Texto oscuro sobre fondo beige debería tener buen contraste */
    font-size: 1.1rem;
  }
</style>