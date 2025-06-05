<script>
  export let petImageSrc = '/images/testimonials/default-pet.jpg';
  export let petImageAlt = 'Mascota atendida';
  export let stars = 5; 
  export let testimonialText = 'Un servicio increíble, mi mascota está muy feliz y saludable. ¡Totalmente recomendados!';
  export let clientName = 'Dueño Contento'; 

  const totalStars = 5;
</script>

<div class="testimonial-card">
  <div class="pet-image-container">
    <img src={petImageSrc} alt={petImageAlt} class="pet-image" />
  </div>
  <div class="rating-stars">
    {#each Array(totalStars) as _, i}
      {#if i < stars}
        <svg class="star filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.445l-7.416 3.963 1.48-8.279-6.064-5.828 8.332-1.151L12 .587z"/></svg>
      {:else}
        <svg class="star empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M12 4.163l2.428 4.964 5.508.76-3.992 3.83.944 5.452L12 16.627l-4.928 2.542.944-5.452-3.992-3.83 5.508-.76L12 4.163m0-3.576l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279L12 19.445l7.416 3.963 1.48-8.279-6.064-5.828 8.332-1.151L12 .587z"/></svg>
      {/if}
    {/each}
  </div>
  <p class="testimonial-text">"{testimonialText}"</p>
  {#if clientName}
    <p class="client-name">- {clientName}</p>
  {/if}
</div>

<style>
  .testimonial-card {
    background-color: var(--color-background-light, white);
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    padding: calc(var(--spacing-unit, 8px) * 2.5); /* 20px */
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; 
    max-width: 320px; /* Ancho máximo para una tarjeta individual, para que 3 quepan bien */
    margin: calc(var(--spacing-unit, 8px) * 1.5); /* Margen para cuando estén en la cuadrícula */
    height: 100%; /* Para que todas las tarjetas en una fila flex tiendan a la misma altura */
    box-sizing: border-box;
  }

  .pet-image-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: var(--spacing-unit, 8px);
    border: 3px solid var(--color-beige-secondary, #B2A991);
  }

  .pet-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .rating-stars {
    margin-bottom: calc(var(--spacing-unit, 8px) * 1.5);
    display: flex;
  }

  .star {
    width: 20px;
    height: 20px;
    margin: 0 2px;
  }
  .star.filled {
    fill: var(--color-teal-accent, #53A69C);
  }
  .star.empty {
    fill: #ccc;
  }

  .testimonial-text {
    font-size: 0.95rem;
    color: var(--color-dark-primary, #1D1B1C);
    line-height: 1.6;
    margin-bottom: var(--spacing-unit, 8px);
    font-style: italic;
    flex-grow: 1; /* Permite que este texto ocupe el espacio sobrante para igualar alturas */
  }

  .client-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-teal-accent, #53A69C);
    margin-top: var(--spacing-unit, 8px); /* Un pequeño margen arriba */
  }
</style>