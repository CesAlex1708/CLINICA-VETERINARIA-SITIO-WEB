<script>
  export let service = {
    _id: 'defaultId',
    name: 'Nombre del Servicio Ejemplo',
    description: 'Una breve descripción del servicio ofrecido...',
    price: null,
    duration: 'N/A',
    category: 'General',
    imageUrl: null
  };

  $: displayPrice = service.price !== null && service.price !== undefined 
                      ? `$${service.price.toFixed(2)}` 
                      : 'Consultar';
</script>

<div class="service-card">
  {#if service.imageUrl}
    <div class="service-image-container">
      <img src={service.imageUrl} alt="Imagen representativa de {service.name}" />
    </div>
  {/if}
  <div class="service-info">
    <span class="service-category">{service.category}</span>
    <h3 class="service-name">{service.name}</h3>
    <p class="service-description">{service.description}</p>
    <div class="service-meta">
      {#if service.duration}<p class="service-duration"><strong>Duración:</strong> {service.duration}</p>{/if}
      <p class="service-price"><strong>Precio:</strong> {displayPrice}</p>
    </div>
    <a 
      href={`/citas?servicio=${encodeURIComponent(service.name)}`} 
      class="appointment-button"
      aria-label={`Agendar cita para ${service.name}`}
    >
      Agendar Cita
    </a>
  </div>
</div>

<style>
  .service-card {
    background-color: var(--color-background-light, white);
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.07);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    height: 100%; 
  }
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 22px rgba(0,0,0,0.1);
  }

  .service-image-container {
    width: 100%;
    aspect-ratio: 16 / 9; 
    background-color: var(--color-background-medium, #f0f2f5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .service-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .service-info {
    padding: calc(var(--spacing-unit, 8px) * 2);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .service-category {
    display: inline-block;
    background-color: var(--color-beige-secondary, #B2A991);
    color: var(--color-dark-primary);
    padding: calc(var(--spacing-unit, 8px) * 0.5) var(--spacing-unit, 8px);
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: calc(var(--spacing-unit, 8px) * 1);
    align-self: flex-start;
    text-transform: uppercase;
  }

  .service-name {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-dark-primary);
    margin: 0 0 calc(var(--spacing-unit, 8px) * 1) 0;
    font-family: var(--font-headings);
  }

  .service-description {
    font-size: 0.9rem;
    color: #444;
    line-height: 1.5;
    margin-bottom: calc(var(--spacing-unit, 8px) * 2);
    flex-grow: 1;
  }

  .service-meta {
    font-size: 0.85rem;
    color: #555;
    border-top: 1px solid var(--color-background-medium);
    padding-top: var(--spacing-unit, 8px);
    margin-top: auto; 
    margin-bottom: calc(var(--spacing-unit, 8px) * 1.5); /* Más espacio antes del botón */
  }
  .service-meta p {
    margin-bottom: calc(var(--spacing-unit, 8px) * 0.5);
  }
  .service-price strong, .service-duration strong {
    font-weight: 600;
    color: var(--color-dark-primary);
  }

  .appointment-button { /* Estilo para el nuevo botón */
    display: inline-block;
    background-color: var(--color-teal-accent);
    color: var(--color-text-light, white);
    padding: calc(var(--spacing-unit, 8px) * 1.25) calc(var(--spacing-unit, 8px) * 2);
    border-radius: 25px; /* Estilo píldora */
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    text-align: center;
    margin-top: var(--spacing-unit, 8px); /* Espacio arriba del botón */
    transition: opacity 0.2s;
    width: 100%; /* Para que ocupe el ancho de la tarjeta */
    box-sizing: border-box; /* Para que el padding no lo haga más ancho */
  }
  .appointment-button:hover {
    opacity: 0.85;
  }
</style>