<script>
  // Importamos el store del carrito para poder añadir productos
  import { cart } from '$lib/stores/cartStore.js';

  // El componente recibe un objeto 'product' como prop
  export let product = {
    _id: 'defaultId',
    name: 'Nombre del Producto Ejemplo',
    price: 29.99,
    imageUrl: '/images/placeholder-product.png',
    description: 'Descripción breve.',
    category: 'General',
    stock: 10
  };

  // Variable local para manejar la cantidad seleccionada en el input
  let quantityToAdd = 1;

  // Función que se ejecuta al hacer clic en "Agregar"
  function handleAddToCart() {
    if (quantityToAdd > 0 && product && product._id !== 'defaultId') {
      // Creamos un objeto con la información esencial para el carrito
      const productDataForCart = {
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl 
      };
      // Llamamos a la función 'addItem' de nuestro store del carrito
      cart.addItem(productDataForCart, quantityToAdd);
      
      // Opcional: podrías mostrar una notificación más elegante en lugar de un alert
      console.log(`${quantityToAdd} x "${product.name}" añadido(s) al carrito.`);
      // alert(`${quantityToAdd} x "${product.name}" añadido(s) al carrito!`);
    }
  }
</script>

<div class="product-card">
  {#if product.category === 'Promociones'}
    <div class="sale-badge" title="Producto en oferta">
      <span role="img" aria-label="descuento">%</span>
    </div>
  {/if}

  <a href={`/tienda/producto/${product._id}`} class="product-link" aria-label={`Ver detalles de ${product.name}`}>
    <div class="image-container">
      <img src={product.imageUrl || '/images/placeholder-product.png'} alt={product.name} />
    </div>
    <div class="info-container">
      <h3 class="product-name">{product.name}</h3>
      <p class="product-price">${product.price.toFixed(2)}</p>
    </div>
  </a>

  <div class="actions-container">
    <div class="quantity-selector">
      <label for={`quantity-${product._id}`} class="visually-hidden">Cantidad para {product.name}:</label>
      <input type="number" id={`quantity-${product._id}`} name="quantity" min="1" bind:value={quantityToAdd} />
    </div>
    <button class="add-to-cart-btn" on:click={handleAddToCart}>
      <span class="cart-icon" role="img" aria-label="carrito">🛒</span>
      Agregar
    </button>
  </div>
</div>

<style>
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .product-card {
    position: relative; /* MUY IMPORTANTE: para posicionar el .sale-badge dentro */
    background-color: var(--color-background-light, white);
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    width: 100%; 
    color: inherit;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }

  /* NUEVO ESTILO PARA EL DISTINTIVO DE OFERTA */
  .sale-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #E73B37; /* Rojo llamativo */
    color: white;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
    z-index: 5; /* Para que esté por encima de la imagen */
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    border: 2px solid white;
  }
  
  .product-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    flex-grow: 1; 
  }
  .image-container {
    width: 100%;
    aspect-ratio: 4 / 3; 
    background-color: var(--color-background-medium, #f0f2f5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
  .info-container {
    padding: var(--spacing-unit, 8px) calc(var(--spacing-unit, 8px) * 1.5);
    text-align: left;
    flex-grow: 1; 
  }
  .product-name {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--color-dark-primary);
    margin: 0 0 calc(var(--spacing-unit, 8px) * 0.5) 0;
    line-height: 1.3;
    height: 2.6em; /* Para 2 líneas de texto */
    overflow: hidden;
  }
  .product-price {
    font-size: 1.15rem;
    font-weight: bold;
    color: var(--color-teal-accent);
    margin: 0 0 calc(var(--spacing-unit, 8px) * 1) 0;
  }
  .actions-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(var(--spacing-unit, 8px) * 0.5) calc(var(--spacing-unit, 8px) * 1.5) calc(var(--spacing-unit, 8px) * 1.5);
    border-top: 1px solid var(--color-background-medium, #f0f2f5);
  }
  .quantity-selector {
    display: flex;
    align-items: center;
  }
  .quantity-selector input[type="number"] {
    width: 50px;
    padding: calc(var(--spacing-unit, 8px) * 0.5);
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  .quantity-selector input[type=number]::-webkit-inner-spin-button, 
  .quantity-selector input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  .quantity-selector input[type=number] {
    -moz-appearance: textfield;
  }
  .add-to-cart-btn {
    background-color: var(--color-teal-accent);
    color: var(--color-text-light, white);
    border: none;
    padding: calc(var(--spacing-unit, 8px) * 0.75) calc(var(--spacing-unit, 8px) * 1.5);
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.85rem;
    display: inline-flex;
    align-items: center;
    gap: calc(var(--spacing-unit, 8px) * 0.5);
    transition: opacity 0.2s ease;
  }
  .add-to-cart-btn:hover {
    opacity: 0.85;
  }
  .cart-icon {
    font-size: 1rem;
  }
</style>