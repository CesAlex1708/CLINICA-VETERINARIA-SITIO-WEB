<script>
  import Carousel from '$lib/components/Carousel.svelte';
  import TestimonialCard from '$lib/components/TestimonialCard.svelte';
  import ValuePropositionItem from '$lib/components/ValuePropositionItem.svelte';
  import DogCategoryCard from '$lib/components/DogCategoryCard.svelte';

  // Datos para el carrusel principal
  const carouselImages = [
    {
      src: '/images/carousel/slide1.jpeg', // ¡RECUERDA USAR TUS NOMBRES DE ARCHIVO EXACTOS!
      alt: 'Mascota feliz siendo atendida en nuestra clínica',
      title: 'Cuidado Experto y Cariñoso',
      caption: 'El bienestar de tu mascota es nuestra prioridad número uno.'
    },
    {
      src: '/images/carousel/slide2.jpeg',
      alt: 'Interior moderno y limpio de la Clínica Canina Ornelas López',
      title: 'Productos de Primera Calidad',
      caption: 'Dale a tu ser querido lo mejor de lo mejor.'
    },
    {
      src: '/images/carousel/slide3.jpeg',
      alt: 'Veterinario sonriendo con un perro y un gato',
      title: 'Las Mejores Promociones',
      caption: 'Aprovecha nuestras promociones hasta agotar existencias.'
    },
    {
      src: '/images/carousel/slide4.jpeg',
      alt: 'Perro y gato jugando juntos y saludables',
      title: 'Equipo Apasionado',
      caption: 'Profesionales dedicados y amantes de los animales.'
    }
  ];

  // Datos de ejemplo para los testimonios
  // ¡ASEGÚRATE DE QUE ESTA SECCIÓN ESTÉ COMPLETA Y CORRECTA!
  const allTestimonials = [ // <--- DEFINICIÓN DE allTestimonials
    { id: 1, petImageSrc: '/images/testimonials/pet1.jpeg', petImageAlt: 'Mascota Max', stars: 5, testimonialText: 'El Dr. Ornelas es el mejor, Max se recuperó rápido.', clientName: 'Ana G.' },
    { id: 2, petImageSrc: '/images/testimonials/pet2.jpeg', petImageAlt: 'Mascota Luna', stars: 4, testimonialText: 'Amables y profesionales, cuidan mucho a Luna.', clientName: 'Carlos M.' },
    { id: 3, petImageSrc: '/images/testimonials/pet3.jpeg', petImageAlt: 'Mascota Rocky', stars: 5, testimonialText: 'Excelente estética, ¡Rocky quedó guapísimo!', clientName: 'Laura P.' },
    { id: 4, petImageSrc: '/images/testimonials/pet4.jpeg', petImageAlt: 'Mascota Nala', stars: 5, testimonialText: 'Resolvieron la urgencia de Nala con eficiencia y cariño.', clientName: 'Sofía R.' },
    { id: 5, petImageSrc: '/images/testimonials/pet5.jpeg', petImageAlt: 'Mascota Coco', stars: 4, testimonialText: 'Buenos precios en tienda y siempre encuentro lo que necesito.', clientName: 'Javier L.' }
  ];

  const valueProps = [
    {
      iconSvg: `<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16v-3a2 2 0 0 0-2-2h- абстрактн0a2 2 0 0 0-2 2v3"></path><rect x="1" y="13" width="22" height="8" rx="2" ry="2"></rect><path d="M5 13V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6"></path><circle cx="18.5" cy="17.5" r="2.5"></circle><circle cx="5.5" cy="17.5" r="2.5"></circle></svg>`, // Placeholder Camión
      title: "Envío gratis",
      subtitle: "Por compras superiores a $100.000" // Ajusta este monto
    },
    {
      iconSvg: `<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`, // Placeholder Tienda
      title: "Recoger en tienda",
      subtitle: "Facilitamos tus tiempos"
    },
    {
      iconSvg: `<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`, // Placeholder Tarjeta/Pago
      title: "Métodos de pago",
      subtitle: "Sencillo, rápido y seguro"
    },
    {
      iconSvg: `<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`, // Placeholder Lista/Pasos
      title: "Pasos para comprar",
      subtitle: "Automatiza tus compras"
    }
  ];

  const dogCategories = [
    { name: 'Chihuahua', imageSrc: '/images/breeds/chihuahua.jpeg', link: '/tienda?raza=chihuahua' },
    { name: 'Schnauzer', imageSrc: '/images/breeds/schnauzer.jpeg', link: '/tienda?raza=schnauzer' },
    { name: 'Labrador', imageSrc: '/images/breeds/labrador.jpeg', link: '/tienda?raza=labrador' },
    { name: 'Pug', imageSrc: '/images/breeds/pug.jpeg', link: '/tienda?raza=pug' },
    { name: 'Mestizo', imageSrc: '/images/breeds/mestizo.jpeg', link: '/tienda?raza=mestizo' },
    { name: 'Otros', imageSrc: '/images/breeds/logo-perro.jpeg', link: '/tienda?raza=otros' } // Usando la imagen que subiste
  ];

  let showAllTestimonials = false;
  // ESTA LÍNEA USA 'allTestimonials', así que la definición debe estar antes.
  let displayedTestimonials = allTestimonials.slice(0, 3); 

  function toggleShowAllTestimonials() {
    showAllTestimonials = true; // Simplemente mostramos todos y el botón desaparece
    // ESTA LÍNEA USA 'allTestimonials'
    displayedTestimonials = allTestimonials; 
  }
</script>

<svelte:head>
  <title>Clínica Canina Ornelas López - Inicio</title>
  <meta name="description" content="Bienvenidos a la Clínica Canina Ornelas López. Ofrecemos servicios veterinarios completos, tienda de productos y el mejor cuidado para tu mascota." />
</svelte:head>

<div class="homepage-content">
  <section class="hero-carousel-section">
    <Carousel images={carouselImages} interval={6000} />
  </section>

  <section class="quick-access-section">
    <h3>Explora Nuestros Servicios</h3>
    <div class="access-links-container">
      <a href="/servicios" class="access-link"><span role="img" aria-label="servicios">🩺</span> Nuestros Servicios</a>
      <a href="/tienda" class="access-link"><span role="img" aria-label="tienda">🛍️</span> Tienda de Productos</a>
      <a href="/citas" class="access-link"><span role="img" aria-label="citas">📅</span> Agendar una Cita</a>
    </div>
  </section>

  <section class="testimonials-section">
    <h3>Conoce Nuestro Trabajo</h3>
    <div class="testimonials-grid">
      {#each displayedTestimonials as testimonial (testimonial.id)} 
        <TestimonialCard 
          petImageSrc={testimonial.petImageSrc}
          petImageAlt={testimonial.petImageAlt}
          stars={testimonial.stars}
          testimonialText={testimonial.testimonialText}
          clientName={testimonial.clientName}
        />
      {/each}
    </div>
    {#if !showAllTestimonials && allTestimonials.length > 3}
      <div class="see-more-testimonials">
        <button type="button" class="button-outline" on:click={toggleShowAllTestimonials}>
          Ver todos los testimonios
        </button>
      </div>
    {/if}
  </section>

  <section class="value-propositions-section">
    <div class="value-props-container">
        {#each valueProps as prop (prop.title)}
            <ValuePropositionItem
            iconSvg={prop.iconSvg}
            title={prop.title}
            subtitle={prop.subtitle}
            />
        {/each}
    </div>
  </section>

  <section class="dog-categories-section">
  <div class="section-header">
    <h2>Nuestras Categorías</h2>
    <p>Todo para consentir a tu mascota, en un solo clic. Elige su categoría favorita.</p>
  </div>
  <div class="categories-grid">
    {#each dogCategories as category (category.name)}
      <DogCategoryCard {category} />
    {/each}
  </div>
</section>

</div>

<style>
  .homepage-content {}

  .hero-carousel-section {
    padding-top: calc(var(--spacing-unit, 8px) * 2);
    padding-bottom: calc(var(--spacing-unit, 8px) * 3);
  }

  .quick-access-section {
    text-align: center;
    margin-bottom: calc(var(--spacing-unit, 8px) * 5);
    padding: calc(var(--spacing-unit, 8px) * 3) var(--spacing-unit, 8px);
  }

  .quick-access-section h3 {
    font-size: 2rem;
    color: var(--color-dark-primary);
    margin-bottom: calc(var(--spacing-unit, 8px) * 3);
  }

  .access-links-container {
    display: flex;
    justify-content: center;
    gap: calc(var(--spacing-unit, 8px) * 3);
    flex-wrap: wrap; 
  }

  .access-link {
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    padding: calc(var(--spacing-unit, 8px) * 2.5) calc(var(--spacing-unit, 8px) * 2);
    background-color: var(--color-background-light, white);
    color: var(--color-dark-primary);
    text-decoration: none;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.07);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    width: 220px; 
    min-height: 180px; 
    border: 1px solid var(--color-background-medium, #e0e0e0);
    text-align: center;
  }

  .access-link span[role="img"] {
    font-size: 2.8rem; 
    margin-bottom: calc(var(--spacing-unit, 8px) * 1.5);
    color: var(--color-teal-accent);
  }
  
  .access-link:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  .testimonials-section {
    padding: calc(var(--spacing-unit, 8px) * 4) var(--spacing-unit, 8px);
    background-color: var(--color-background-medium, #f0f2f5);
    text-align: center;
    margin-bottom: calc(var(--spacing-unit, 8px) * 4);
  }
  .testimonials-section h3 {
    font-size: 2rem;
    color: var(--color-dark-primary);
    margin-bottom: calc(var(--spacing-unit, 8px) * 3);
  }
  
  .testimonials-grid {
    display: flex;
    flex-wrap: wrap; /* Importante para que se acomoden en filas */
    justify-content: center; /* Centra las tarjetas en la fila */
    gap: calc(var(--spacing-unit, 8px) * 2.5); /* Espacio entre tarjetas */
    max-width: 1100px; 
    margin: 0 auto; /* Centra el grid en la página */
  }

  /* El .testimonial-card (definido en TestimonialCard.svelte) 
     tiene max-width: 340px; y margin. Esto permitirá que aproximadamente 3 quepan
     en el max-width de 1100px del grid, y los restantes irán abajo.
     Si quieres forzar exactamente 3 por fila y luego 2, necesitarías
     ajustes más específicos en el grid o en el ancho de las tarjetas.
     Con flex-wrap y el max-width de las tarjetas, se acomodarán naturalmente.
  */

  .see-more-testimonials {
    margin-top: calc(var(--spacing-unit, 8px) * 4);
  }

  .button-outline {
    display: inline-block;
    padding: calc(var(--spacing-unit, 8px) * 1.25) calc(var(--spacing-unit, 8px) * 3);
    border: 2px solid var(--color-teal-accent);
    color: var(--color-teal-accent);
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer; /* Para que parezca un botón */
  }
  .button-outline:hover {
    background-color: var(--color-teal-accent);
    color: var(--color-text-light, white);
    transform: translateY(-2px);
  }

    .value-propositions-section {
    padding: calc(var(--spacing-unit, 8px) * 4) var(--spacing-unit, 8px); /* Espaciado para la sección */
    background-color: var(--color-background-light, white); /* O un color de fondo muy sutil si prefieres */
    /* border-top: 1px solid var(--color-background-medium, #f0f2f5); */ /* Borde opcional */
    /* border-bottom: 1px solid var(--color-background-medium, #f0f2f5); */ /* Borde opcional */
    }

    .value-propositions-section h2 { /* Si decides añadir un título a la sección */
    text-align: center;
    font-size: 2rem;
    color: var(--color-dark-primary);
    margin-bottom: calc(var(--spacing-unit, 8px) * 3);
    }

    .value-props-container {
    display: grid;
    /* Crea 4 columnas en pantallas grandes, 2 en medianas, 1 en pequeñas */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: calc(var(--spacing-unit, 8px) * 2.5); /* Espacio entre los ítems */
    max-width: 1200px; /* Ancho máximo del contenedor de los ítems */
    margin: 0 auto; /* Centrar el contenedor */
    }

    .dog-categories-section {
    padding: calc(var(--spacing-unit, 8px) * 5) var(--spacing-unit, 8px);
    /* background-color: #fafafa; /* Fondo muy sutil opcional */
    }

    .section-header {
    text-align: center;
    margin-bottom: calc(var(--spacing-unit, 8px) * 4);
    }
    .section-header h2 {
    font-size: 2.2rem;
    color: var(--color-dark-primary);
    margin: 0;
    }
    .section-header p {
    font-size: 1.1rem;
    color: #666;
    margin-top: calc(var(--spacing-unit, 8px) * 1);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    }

    .categories-grid {
    display: grid;
    /* Responsive: 6 columnas en pantallas grandes, 3 en medianas, 2 en pequeñas */
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: calc(var(--spacing-unit, 8px) * 2.5);
    max-width: 1200px;
    margin: 0 auto;
    }
</style>