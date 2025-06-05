<script>
  export let plan = {
    id: 'default-plan',
    title: 'Título del Plan',
    imageSrc: '/images/placeholder-product.png',
    features: ['Característica 1', 'Característica 2', 'Característica 3'],
    price: '$0 / mes'
  };
</script>

<div class="plan-card" id={plan.id}>
  <div class="details-container">
    <h3>{plan.title}</h3>
    <ul class="features-list">
      {#each plan.features as feature}
        <li><span role="img" aria-hidden="true">✓</span> {feature}</li>
      {/each}
    </ul>
    <div class="price">{plan.price}</div>
    <a href={`/citas?plan=${encodeURIComponent(plan.title)}`} class="cta-button">Contratar Plan</a>
  </div>
  
  <div class="image-container">
    <img src={plan.imageSrc} alt="Imagen del {plan.title}" />
  </div>
</div>

<style>
  .plan-card {
    position: relative; /* Contenedor padre para el posicionamiento absoluto */
    width: 100%;
    max-width: 450px; /* Podemos ajustar el ancho de nuevo */
    aspect-ratio: 4 / 3;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    color: var(--color-dark-primary); /* Texto oscuro por defecto para los detalles */
    cursor: pointer; /* Indica que toda la tarjeta es interactiva */
  }

  /* El contenedor de los detalles ahora es la capa base */
  .details-container {
    width: 100%;
    height: 100%;
    padding: calc(var(--spacing-unit, 8px) * 3);
    background-color: var(--color-background-light, white); /* Fondo claro para los detalles */
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }

  /* El contenedor de la imagen está posicionado absolutamente encima de todo */
  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2; /* Capa superior */
    opacity: 1; /* Visible por defecto */
    transition: opacity 0.5s ease-in-out; /* Transición suave de la opacidad */
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* === El Efecto Mágico de Desvanecimiento === */
  .plan-card:hover .image-container {
    opacity: 0; /* La imagen se vuelve completamente transparente en hover */
    pointer-events: none; /* Permite hacer clic en lo que está detrás (el botón "Contratar Plan") */
  }

  /* Estilos del texto y botones (se mantienen similares) */
  .details-container h3 {
    font-family: var(--font-headings);
    font-size: 1.8rem;
    color: var(--color-dark-primary);
    margin: 0 0 calc(var(--spacing-unit, 8px) * 2) 0;
  }
  
  .features-list {
    list-style: none;
    padding: 0;
    margin: 0 0 calc(var(--spacing-unit, 8px) * 3) 0;
    flex-grow: 1;
  }
  .features-list li {
    margin-bottom: var(--spacing-unit, 8px);
    font-size: 0.95rem;
  }
  .features-list li span {
    color: var(--color-teal-accent);
    font-weight: bold;
    margin-right: var(--spacing-unit, 8px);
  }

  .price {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-teal-accent);
    margin-bottom: calc(var(--spacing-unit, 8px) * 2);
  }

  .cta-button {
    display: inline-block;
    background-color: var(--color-teal-accent);
    color: var(--color-text-light, white);
    padding: calc(var(--spacing-unit, 8px) * 1.25) calc(var(--spacing-unit, 8px) * 2.5);
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    text-align: center;
    transition: opacity 0.2s, transform 0.2s;
    transform: scale(1);
  }
  .cta-button:hover {
    opacity: 0.85;
    transform: scale(1.03); /* Un pequeño efecto de crecimiento al pasar el cursor sobre el botón */
  }
</style>