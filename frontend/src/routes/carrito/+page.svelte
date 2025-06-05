<script>
  import { cart, cartTotalItems, cartTotalPrice } from '$lib/stores/cartStore.js';
  import { Trash2, PlusCircle, MinusCircle } from 'lucide-svelte'; // O tus propios SVGs/iconos

  // Función para manejar el cambio de cantidad directamente desde el input
  // Svelte maneja el tipo number, pero el evento input da string
  function handleQuantityChange(event, itemId) {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      if (newQuantity === 0) {
        cart.removeItem(itemId); // Si la cantidad es 0, eliminar el ítem
      } else {
        cart.updateItemQuantity(itemId, newQuantity);
      }
    }
  }

  function incrementQuantity(itemId, currentQuantity) {
    cart.updateItemQuantity(itemId, currentQuantity + 1);
  }

  function decrementQuantity(itemId, currentQuantity) {
    if (currentQuantity - 1 === 0) {
      cart.removeItem(itemId);
    } else {
      cart.updateItemQuantity(itemId, currentQuantity - 1);
    }
  }
</script>

<svelte:head>
  <title>Tu Carrito de Compras - Clínica Canina Ornelas López</title>
  <meta name="description" content="Revisa y gestiona los productos en tu carrito de compras." />
</svelte:head>

<div class="cart-page-container">
  <h1>Tu Carrito de Compras</h1>

  {#if $cartTotalItems === 0}
    <div class="empty-cart-message">
      <p>¡Tu carrito está vacío!</p>
      <a href="/tienda" class="button-primary">Explorar productos</a>
    </div>
  {:else}
    <div class="cart-content">
      <div class="cart-items-list">
        {#each $cart as item (item._id)}
          <div class="cart-item">
            <div class="item-image">
              <img src={item.imageUrl || '/images/placeholder-product.png'} alt={item.name} />
            </div>
            <div class="item-details">
              <h3>{item.name}</h3>
              <p class="item-price">${item.price.toFixed(2)} c/u</p>
            </div>
            <div class="item-quantity">
              <button 
                class="quantity-btn" 
                on:click={() => decrementQuantity(item._id, item.quantity)}
                aria-label="Reducir cantidad de {item.name}"
              >
                <MinusCircle size={20} />
              </button>
              <input 
                type="number" 
                value={item.quantity} 
                min="0" 
                on:change={(e) => handleQuantityChange(e, item._id)}
                aria-label="Cantidad de {item.name}"
              />
              <button 
                class="quantity-btn" 
                on:click={() => incrementQuantity(item._id, item.quantity)}
                aria-label="Aumentar cantidad de {item.name}"
              >
                <PlusCircle size={20} />
              </button>
            </div>
            <div class="item-subtotal">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="item-remove">
              <button class="remove-btn" on:click={() => cart.removeItem(item._id)} aria-label="Eliminar {item.name} del carrito">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        {/each}
      </div>

      <div class="cart-summary">
        <h2>Resumen del Pedido</h2>
        <div class="summary-row">
          <span>Subtotal ({$cartTotalItems} items):</span>
          <span>${$cartTotalPrice.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Envío:</span>
          <span>Por calcular</span> 
        </div>
        <div class="summary-total">
          <span>Total Estimado:</span>
          <span>${$cartTotalPrice.toFixed(2)}</span> 
        </div>
        <button class="checkout-button button-primary" on:click={() => alert('Proceder al pago (funcionalidad pendiente)')}>
          Continuar Compra
        </button>
        <button class="clear-cart-button button-secondary" on:click={cart.clearCart}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .cart-page-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2) var(--spacing-unit, 8px);
  }

  .cart-page-container h1 {
    text-align: center;
    margin-bottom: calc(var(--spacing-unit, 8px) * 3);
    font-size: 2.5rem;
    color: var(--color-dark-primary);
  }

  .empty-cart-message {
    text-align: center;
    padding: calc(var(--spacing-unit, 8px) * 5) 0;
  }
  .empty-cart-message p {
    font-size: 1.5rem;
    margin-bottom: calc(var(--spacing-unit, 8px) * 2);
  }

  /* Estilos generales para botones (puedes moverlos a app.css si los usas mucho) */
  .button-primary {
    display: inline-block;
    background-color: var(--color-teal-accent, #53A69C);
    color: var(--color-text-light, white);
    padding: calc(var(--spacing-unit, 8px) * 1.25) calc(var(--spacing-unit, 8px) * 2.5);
    border: none;
    border-radius: 25px; /* Píldora */
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }
  .button-primary:hover {
    opacity: 0.85;
  }
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
    margin-top: var(--spacing-unit, 8px);
  }
  .button-secondary:hover {
    background-color: var(--color-beige-secondary);
    color: var(--color-dark-primary);
  }


  .cart-content {
    display: grid;
    grid-template-columns: 2fr 1fr; /* 2/3 para ítems, 1/3 para resumen */
    gap: calc(var(--spacing-unit, 8px) * 3);
  }
  @media (max-width: 768px) {
    .cart-content {
      grid-template-columns: 1fr; /* Una columna en móviles */
    }
  }

  .cart-items-list {
    /* border: 1px solid var(--color-background-medium); */
    /* border-radius: 8px; */
  }

  .cart-item {
    display: grid;
    grid-template-columns: auto 1fr auto auto auto; /* Imagen, Detalles, Cantidad, Subtotal, Eliminar */
    gap: var(--spacing-unit, 8px);
    align-items: center;
    padding: var(--spacing-unit, 8px) 0;
    border-bottom: 1px solid var(--color-background-medium, #f0f2f5);
  }
  .cart-item:last-child {
    border-bottom: none;
  }

  .item-image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid var(--color-background-medium);
  }

  .item-details h3 {
    font-size: 1.1rem;
    margin: 0 0 5px 0;
    color: var(--color-dark-primary);
    font-weight: 600;
  }
  .item-price {
    font-size: 0.9rem;
    color: #555;
  }

  .item-quantity {
    display: flex;
    align-items: center;
  }
  .item-quantity input[type="number"] {
    width: 45px;
    text-align: center;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 5px;
    font-size: 0.9rem;
    -moz-appearance: textfield; /* Firefox */
  }
  .item-quantity input[type=number]::-webkit-inner-spin-button, 
  .item-quantity input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  .quantity-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    color: var(--color-teal-accent);
  }
  .quantity-btn:hover {
    color: var(--color-dark-primary);
  }

  .item-subtotal {
    font-weight: 600;
    font-size: 1rem;
    text-align: right;
    min-width: 80px; /* Para alinear bien */
  }

  .item-remove .remove-btn {
    background: none;
    border: none;
    color: #e74c3c; /* Rojo para eliminar */
    cursor: pointer;
    padding: 5px;
  }
  .item-remove .remove-btn:hover {
    color: #c0392b; /* Rojo oscuro */
  }

  .cart-summary {
    background-color: var(--color-background-medium, #f0f2f5);
    padding: calc(var(--spacing-unit, 8px) * 2.5);
    border-radius: 8px;
    height: fit-content; /* Para que no se estire innecesariamente */
  }
  .cart-summary h2 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: calc(var(--spacing-unit, 8px) * 2);
    color: var(--color-dark-primary);
    border-bottom: 1px solid #ddd;
    padding-bottom: var(--spacing-unit, 8px);
  }
  .summary-row, .summary-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-unit, 8px);
    font-size: 1rem;
  }
  .summary-total {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: calc(var(--spacing-unit, 8px) * 2);
    padding-top: var(--spacing-unit, 8px);
    border-top: 1px solid #ddd;
  }
  .checkout-button {
    width: 100%;
    margin-top: calc(var(--spacing-unit, 8px) * 2);
    padding: calc(var(--spacing-unit, 8px) * 1.5); /* Botón más grande */
    font-size: 1.1rem;
  }
  .clear-cart-button {
    width: 100%;
    text-align: center;
  }
</style>