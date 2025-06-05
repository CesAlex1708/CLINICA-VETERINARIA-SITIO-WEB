<script>
  import { onMount } from 'svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';

  let servicesWithImages = [];
  let isLoading = true;
  let error = null;

  // Mapa para asociar nombres de servicio con rutas de imagen
  const serviceImageMap = {
    "Consulta General Veterinaria": "/images/services/consulta.jpeg",
    "Plan de Vacunación Cachorro Canino (Primera Dosis)": "/images/services/vacunacion.jpeg",
    "Esterilización Quirúrgica Canina (Macho)": "/images/services/cirugia.jpeg",
    "Baño y Corte Estético Canino (Raza Mediana)": "/images/services/estetica.jpeg",
    "Análisis Coproparasitoscópico (Muestra Fecal)": "/images/services/laboratorio.jpeg",
    "Atención de Urgencia Veterinaria (Valoración Inicial)": "/images/services/urgencias.jpeg",
    "Aplicación y Registro de Microchip de Identificación": "/images/services/microchip.jpeg"
  };
  const defaultServiceImage = '/images/services/placeholder-service.jpg';

  async function fetchAllServices() {
    isLoading = true;
    error = null;
    try {
      const response = await fetch('/api/services'); // Llama a la API sin filtros
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'No se pudieron obtener los servicios');
      }
      const rawServices = await response.json();

      // Mapear los servicios para añadir la imageUrl
      servicesWithImages = rawServices.map(service => ({
        ...service,
        imageUrl: serviceImageMap[service.name] || defaultServiceImage
      }));

    } catch (err) {
      console.error("Error al obtener servicios:", err);
      error = err.message;
      servicesWithImages = [];
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchAllServices();
  });
</script>

<svelte:head>
  <title>Nuestros Servicios - Clínica Canina Ornelas López</title>
  <meta name="description" content="Descubre todos los servicios veterinarios que ofrecemos para el cuidado integral de tu mascota." />
</svelte:head>

<div class="services-page-container">
  <h1 class="page-title">Nuestros Servicios Veterinarios</h1>

  {#if isLoading}
    <p class="loading-message">Cargando servicios...</p>
  {:else if error}
    <p class="error-message">Error: {error}</p>
  {:else if servicesWithImages.length === 0}
    <p class="empty-message">No hay servicios disponibles en este momento.</p>
  {:else}
    <div class="services-grid">
      {#each servicesWithImages as service (service._id)}
        <ServiceCard {service} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .services-page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2) var(--spacing-unit, 8px);
  }

  /* Asumimos que .page-title está en tu app.css global */

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: calc(var(--spacing-unit, 8px) * 3);
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