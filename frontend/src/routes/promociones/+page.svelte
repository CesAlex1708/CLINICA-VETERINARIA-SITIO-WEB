<script>
  import { onMount } from 'svelte';
  import ProductCard from '$lib/components/ProductCard.svelte'; // ¡Reutilizaremos la tarjeta de producto!

  let promoProducts = [];
  let isLoading = true;
  let error = null;

  async function fetchPromotions() {
    isLoading = true;
    error = null;
    try {
      // Llamamos a la API de productos pero filtrando por la categoría "Promociones"
      const response = await fetch('/api/products?category=Promociones');
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'No se pudieron obtener las promociones');
      }
      const data = await response.json();
      // La API de productos devuelve un objeto con { data, currentPage, etc. }
      // así que tomamos el array de la propiedad 'data'.
      promoProducts = data.data; 
    } catch (err) {
      console.error("Error al obtener promociones:", err);
      error = err.message;
      promoProducts = [];
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchPromotions();
  });
</script>

<svelte:head>
  <title>Promociones y Ofertas - Clínica Canina Ornelas López</title>
  <meta name="description" content="Aprovecha nuestras ofertas especiales en productos y servicios para el cuidado de tu mascota." />
</svelte:head>

<div class="promotions-page-container">
  <h1 class="page-title">Promociones Especiales</h1>

  {#if isLoading}
    <p class="loading-message">Cargando ofertas...</p>
  {:else if error}
    <p class="error-message">Error: {error}</p>
  {:else if promoProducts.length === 0}
    <p class="empty-message">No hay promociones disponibles en este momento. ¡Vuelve pronto!</p>
  {:else}
    <div class="promotions-grid">
      {#each promoProducts as product (product._id)}
        <ProductCard {product} /> 
      {/each}
    </div>
  {/if}
</div>

<style>
  .promotions-page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2) var(--spacing-unit, 8px);
  }

  /* La clase .page-title ya debería estar definida en tu app.css global */

  .promotions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: calc(var(--spacing-unit, 8px) * 2.5);
    margin-bottom: calc(var(--spacing-unit, 8px) * 3);
  }

  .loading-message, .error-message, .empty-message {
    text-align: center;
    font-size: 1.2rem;
    padding: calc(var(--spacing-unit, 8px) * 3) 0;
  }
  .error-message {
    color: #e74c3c;
  }
</style>