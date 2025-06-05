<script>
  import PlanCard from '$lib/components/PlanCard.svelte';

  const healthPlans = [
    {
      id: 'plan-cachorro',
      title: 'Plan Bienestar Cachorro',
      imageSrc: '/images/plans/plan-cachorro.jpeg', // Reemplaza con tu imagen
      features: [
        'Esquema de vacunación completo',
        'Consultas de seguimiento ilimitadas (primeros 6 meses)',
        'Plan de desparasitación',
        '10% de descuento en alimentos para cachorro'
      ],
      price: '$350 / mes'
    },
    {
      id: 'plan-adulto',
      title: 'Plan Adulto Activo',
      imageSrc: '/images/plans/plan-adulto.jpeg', // Reemplaza con tu imagen
      features: [
        'Consulta anual de revisión',
        'Vacuna de refuerzo anual',
        'Limpieza dental profesional con 15% de descuento',
        'Análisis de sangre preventivo'
      ],
      price: '$280 / mes'
    },
    {
      id: 'plan-senior',
      title: 'Plan Cuidado Senior',
      imageSrc: '/images/plans/plan-senior.jpeg', // Reemplaza con tu imagen
      features: [
        '2 consultas de revisión al año',
        'Perfil geriátrico completo (sangre y orina)',
        'Monitoreo de presión arterial',
        '20% de descuento en medicamentos para condiciones crónicas'
      ],
      price: '$450 / mes'
    }
  ];
</script>

<svelte:head>
  <title>Planes de Salud - Clínica Canina Ornelas López</title>
  <meta name="description" content="Descubre nuestros planes de salud preventivos para cachorros, adultos y mascotas senior." />
</svelte:head>

<div class="plans-page-container">
  <h1 class="page-title">Planes de Salud Preventivos</h1>
  <p class="page-subtitle">
    La mejor manera de cuidar a tu compañero es a través de la prevención. Conoce nuestros planes diseñados para cada etapa de su vida.
  </p>

  <div class="plans-grid">
    {#each healthPlans as plan (plan.id)}
      <PlanCard {plan} />
    {/each}
  </div>
</div>

<style>
  .plans-page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2) var(--spacing-unit, 8px);
    text-align: center; /* Centrar los títulos de la página */
  }

  /* Asumimos que .page-title está en tu app.css global */

  .page-subtitle {
    max-width: 600px;
    margin: calc(var(--spacing-unit, 8px) * -3) auto calc(var(--spacing-unit, 8px) * 5) auto; /* Margen negativo para acercarlo al título */
    font-size: 1.1rem;
    color: #555;
  }

  .plans-grid {
    display: flex;
    flex-wrap: wrap; /* Para responsividad */
    justify-content: center;
    gap: calc(var(--spacing-unit, 8px) * 4); /* Espacio entre tarjetas */
  }
</style>