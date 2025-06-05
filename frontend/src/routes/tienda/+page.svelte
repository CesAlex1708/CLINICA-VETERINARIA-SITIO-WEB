<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // Para leer parámetros de la URL
  import ProductCard from '$lib/components/ProductCard.svelte';

  let products = [];
  let isLoading = true;
  let error = null;

  // Para paginación y filtro
  let currentPage = 1;
  let totalPages = 1;
  let limit = 9; // Productos por página (ej. para un grid de 3x3)
  let currentCategory = null; // Categoría actual filtrada

  async function fetchProducts(pageToFetch = 1, category = null) {
    isLoading = true;
    error = null;
    currentCategory = category; // Actualizar categoría actual

    let apiUrl = `/api/products?page=${pageToFetch}&limit=${limit}`;
    if (category) {
      apiUrl += `&category=${encodeURIComponent(category)}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `Error ${response.status}: No se pudieron obtener los productos`);
      }
      const data = await response.json();
      products = data.data;
      currentPage = data.currentPage;
      totalPages = data.totalPages;
    } catch (err) {
      console.error("Error al obtener productos:", err);
      error = err.message;
      products = [];
    } finally {
      isLoading = false;
    }
  }

  // Observador reactivo para cambios en los query params de la URL
  // $: significa que este bloque se re-ejecutará si $page.url cambia
  $: {
    const categoryFromUrl = $page.url.searchParams.get('category');
    // Solo volvemos a cargar si la categoría realmente cambió o si es la carga inicial sin categoría
    if (categoryFromUrl !== currentCategory || (categoryFromUrl === null && currentCategory !== null) ) {
      fetchProducts(1, categoryFromUrl); // Reiniciar a página 1 al cambiar de categoría
    }
  }

  onMount(() => {
    // En la carga inicial, tomar la categoría de la URL si existe
    const initialCategory = $page.url.searchParams.get('category');
    fetchProducts(1, initialCategory);
  });

  function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      fetchProducts(pageNumber, currentCategory);
    }
  }
</script>

<svelte:head>
  <title>Tienda Online - Clínica Canina Ornelas López</title>
  <meta name="description" content="Encuentra los mejores alimentos, accesorios, medicamentos y más para tu perro." />
</svelte:head>

<div class="store-page-container">
  <h1 class="page-title"> 
    {#if currentCategory}
      Tienda: <span class="category-highlight">{currentCategory}</span>
    {:else}
      Todos Nuestros Productos
    {/if}
  </h1>
  
  {#if isLoading}
    <p class="loading-message">Cargando productos...</p>
  {:else if error}
    <p class="error-message">Error: {error}</p>
  {:else if products.length === 0}
    <p class="empty-message">
      {#if currentCategory}
        No hay productos disponibles en la categoría "{currentCategory}".
      {:else}
        No hay productos disponibles en este momento.
      {/if}
    </p>
  {:else}
    <div class="products-grid">
      {#each products as product (product._id)}
        <ProductCard {product} />
      {/each}
    </div>

    {#if totalPages > 1}
      <div class="pagination-controls">
        <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          ❮ Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente ❯
        </button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .store-page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2) var(--spacing-unit, 8px);
  }

  /*.store-page-container h1 {
    text-align: center;
    margin-bottom: calc(var(--spacing-unit, 8px) * 3);
    font-size: 2.5rem;
    color: var(--color-dark-primary);
  }*/

  .products-grid {
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

  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-unit, 8px);
    margin-top: calc(var(--spacing-unit, 8px) * 3);
    padding-bottom: calc(var(--spacing-unit, 8px) * 2);
  }

  .pagination-controls button {
    padding: calc(var(--spacing-unit, 8px) * 1) calc(var(--spacing-unit, 8px) * 2);
    background-color: var(--color-teal-accent);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.2s;
  }
  .pagination-controls button:disabled {
    background-color: var(--color-beige-secondary);
    cursor: not-allowed;
    opacity: 0.7;
  }
  .pagination-controls button:not(:disabled):hover {
    opacity: 0.85;
  }
  .pagination-controls span {
    font-size: 0.9rem;
    color: var(--color-dark-primary);
    margin: 0 var(--spacing-unit, 8px);
  }
</style>