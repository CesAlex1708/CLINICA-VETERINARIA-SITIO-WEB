<script>
  import { isCartSidebarOpen, closeCartSidebar } from '$lib/stores/uiStore.js';
  import { cart, cartTotalItems, cartTotalPrice } from '$lib/stores/cartStore.js';
  import { X } from 'lucide-svelte'; // Ícono para cerrar
  import { quintOut } from 'svelte/easing'; // Para la transición
  import { fly } from 'svelte/transition'; // Transición de Svelte

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeCartSidebar();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $isCartSidebarOpen}
  <div 
    class="sidebar-backdrop" 
    on:click={closeCartSidebar} 
    transition:fly={{ duration: 300, opacity: 0, x: 0 }}
    role="button"
    tabindex="-1"
    aria-label="Cerrar vista rápida del carrito"
  ></div>

  <aside class="cart-sidebar" transition:fly={{ duration: 300, x: '100%', easing: quintOut }}>
    <div class="sidebar-header">
      <h2>Tu Carrito</h2>
      <button on:click={closeCartSidebar} class="close-button" aria-label="Cerrar carrito">
        <X size={28} />
      </button>
    </div>

    <div class="sidebar-content">
      {#if $cartTotalItems === 0}
        <p class="empty-message">Tu carrito está vacío.</p>
      {:else}
        <ul class="cart-items-list-sidebar">
          {#each $cart as item (item._id)}
            <li class="cart-item-sidebar">
              <img src={item.imageUrl || '/images/placeholder-product.png'} alt={item.name} class="item-image-sidebar" />
              <div class="item-info-sidebar">
                <span class="item-name-sidebar">{item.name}</span>
                <span class="item-quantity-price-sidebar">
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
              <span class="item-total-sidebar">${(item.quantity * item.price).toFixed(2)}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    {#if $cartTotalItems > 0}
      <div class="sidebar-footer">
        <div class="subtotal">
          <span>Subtotal:</span>
          <span>${$cartTotalPrice.toFixed(2)}</span>
        </div>
        <a href="/carrito" class="button-primary view-cart-button" on:click={closeCartSidebar}>
          Ver Carrito y Pagar
        </a>
        <button class="button-secondary continue-shopping-button" on:click={closeCartSidebar}>
          Seguir Comprando
        </button>
      </div>
    {/if}
  </aside>
{/if}

<style>
  .sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040; /* Debajo del sidebar pero encima del resto */
  }

  .cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 400px; /* Ancho de la barra lateral */
    height: 100%;
    background-color: var(--color-background-light, white);
    box-shadow: -5px 0 15px rgba(0,0,0,0.2);
    z-index: 1050; /* Por encima de todo */
    display: flex;
    flex-direction: column;
    font-family: var(--font-primary);
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(var(--spacing-unit, 8px) * 1.5) calc(var(--spacing-unit, 8px) * 2);
    border-bottom: 1px solid var(--color-background-medium, #f0f2f5);
  }
  .sidebar-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--color-dark-primary);
    font-family: var(--font-headings);
  }
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    color: var(--color-dark-primary);
  }
  .close-button:hover {
    color: var(--color-teal-accent);
  }

  .sidebar-content {
    flex-grow: 1;
    padding: calc(var(--spacing-unit, 8px) * 2);
    overflow-y: auto; /* Scroll si hay muchos ítems */
  }
  .empty-message {
    text-align: center;
    color: #777;
    margin-top: 2rem;
    font-size: 1.1rem;
  }

  .cart-items-list-sidebar {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .cart-item-sidebar {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-unit, 8px);
    padding-bottom: var(--spacing-unit, 8px);
    border-bottom: 1px dotted var(--color-background-medium);
  }
  .cart-item-sidebar:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  .item-image-sidebar {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: var(--spacing-unit, 8px);
  }
  .item-info-sidebar {
    flex-grow: 1;
  }
  .item-name-sidebar {
    display: block;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--color-dark-primary);
  }
  .item-quantity-price-sidebar {
    font-size: 0.85rem;
    color: #555;
  }
  .item-total-sidebar {
    font-weight: 600;
    font-size: 0.9rem;
  }


  .sidebar-footer {
    padding: calc(var(--spacing-unit, 8px) * 2);
    border-top: 1px solid var(--color-background-medium, #f0f2f5);
    background-color: #f9f9f9;
  }
  .subtotal {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: var(--spacing-unit, 8px);
    font-size: 1.1rem;
  }
  .view-cart-button, .continue-shopping-button {
    width: 100%;
    text-align: center;
    margin-top: var(--spacing-unit, 8px);
  }
  /* Reutilizar estilos de botones de carrito/+page.svelte o app.css */
  .button-primary { /* Asegúrate que esta clase esté definida globalmente o aquí */
    display: inline-block;
    background-color: var(--color-teal-accent, #53A69C);
    color: var(--color-text-light, white);
    padding: calc(var(--spacing-unit, 8px) * 1.25) calc(var(--spacing-unit, 8px) * 2);
    border: none;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }
  .button-primary:hover { opacity: 0.85; }

  .button-secondary {
    display: inline-block;
    background-color: transparent;
    color: var(--color-dark-primary);
    padding: calc(var(--spacing-unit, 8px) * 1) calc(var(--spacing-unit, 8px) * 2);
    border: 2px solid var(--color-beige-secondary);
    border-radius: 25px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .button-secondary:hover {
    background-color: var(--color-beige-secondary);
  }

</style>