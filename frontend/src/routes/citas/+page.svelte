<script>
  import { onMount } from 'svelte';
  import Calendar from '$lib/components/Calendar.svelte';
  import { page } from '$app/stores';

  // --- Datos del Formulario ---
  let ownerName = '';
  let petName = '';
  let email = '';
  let phone = '';
  let selectedServiceId = '';
  let selectedDate = new Date();
  let selectedTime = '';

  // --- Datos para el componente ---
  let services = []; // Se llenará desde la API
  let isLoading = true;
  let error = null;
  // Horarios fijos para la "cortina de humo"
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

  async function fetchServices() {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('No se pudieron cargar los servicios.');
      services = await response.json();
    } catch(e) {
      console.error(e);
      error = e.message;
    }
  }

  // Función para manejar la fecha seleccionada en el calendario
  function handleDateSelect(event) {
    selectedDate = event.detail;
    selectedTime = ''; // Resetea la hora al cambiar de día
  }

  // Función del botón de envío (cortina de humo)
  function handleSubmit() {
    if (!selectedTime) {
      alert('Por favor, selecciona una hora para tu cita.');
      return;
    }
    alert('¡Gracias! Hemos recibido tu solicitud de cita. Te contactaremos pronto para confirmar. (Esta es una función de demostración).');
    // En una aplicación real, aquí se haría la petición POST a /api/appointments
  }

  onMount(async () => {
    await fetchServices();

    // Si vienes de una tarjeta de servicio (ej. /citas?servicio=Nombre%20Servicio),
    // intenta pre-seleccionar ese servicio en el dropdown.
    const serviceFromUrl = $page.url.searchParams.get('servicio');
    if (serviceFromUrl && services.length > 0) {
      const foundService = services.find(s => s.name === serviceFromUrl);
      if (foundService) {
        selectedServiceId = foundService._id;
      }
    }
    isLoading = false;
  });
</script>

<svelte:head>
  <title>Agendar Cita - Clínica Canina Ornelas López</title>
</svelte:head>

<div class="appointment-page-container">
  <h1 class="page-title">Agenda tu Cita</h1>
  <p class="page-subtitle">Selecciona una fecha y hora, completa tus datos y elige el servicio que necesitas. ¡Es muy fácil!</p>

  <form class="appointment-form" on:submit|preventDefault={handleSubmit}>
    <div class="scheduler-section">
      <div class="calendar-wrapper">
        <h3>1. Elige una Fecha</h3>
        <Calendar on:dateSelected={handleDateSelect} />
      </div>
      <div class="time-slots-wrapper">
        <h3>2. Elige una Hora</h3>
        {#if selectedDate}
          <div class="time-slots-grid">
            {#each timeSlots as time}
              <button 
                type="button" 
                class="time-slot"
                class:selected={time === selectedTime}
                on:click={() => selectedTime = time}
              >
                {time}
              </button>
            {/each}
          </div>
        {:else}
          <p>Por favor, selecciona una fecha primero.</p>
        {/if}
      </div>
    </div>

    <div class="details-section">
      <h3>3. Completa tus Datos</h3>
      <div class="form-grid">
        <div class="form-group">
          <label for="ownerName">Tu Nombre Completo</label>
          <input type="text" id="ownerName" bind:value={ownerName} required />
        </div>
        <div class="form-group">
          <label for="petName">Nombre de tu Mascota</label>
          <input type="text" id="petName" bind:value={petName} required />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" bind:value={email} required />
        </div>
        <div class="form-group">
          <label for="phone">Teléfono de Contacto</label>
          <input type="tel" id="phone" bind:value={phone} required />
        </div>
        <div class="form-group full-width">
          <label for="service">Servicio Requerido</label>
          <select id="service" bind:value={selectedServiceId} required>
            <option value="" disabled>-- Elige un servicio --</option>
            {#if isLoading}
              <option disabled>Cargando servicios...</option>
            {:else if error}
              <option disabled>Error al cargar servicios</option>
            {:else}
              {#each services as service}
                <option value={service._id}>{service.name} ({service.category})</option>
              {/each}
            {/if}
          </select>
        </div>
      </div>
      <button type="submit" class="button-primary submit-appointment">Solicitar Cita</button>
    </div>
  </form>
</div>

<style>
  .appointment-page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2);
  }
  .page-subtitle {
    text-align: center;
    max-width: 600px;
    margin: calc(var(--spacing-unit, 8px) * -3) auto calc(var(--spacing-unit, 8px) * 4) auto;
    font-size: 1.1rem;
    color: #555;
  }

  .appointment-form {
    display: grid;
    grid-template-columns: 400px 1fr; /* Calendario/hora a la izquierda, formulario a la derecha */
    gap: calc(var(--spacing-unit, 8px) * 4);
  }

  .scheduler-section, .details-section {
    background-color: var(--color-background-medium);
    padding: calc(var(--spacing-unit, 8px) * 3);
    border-radius: 8px;
  }

  h3 {
    font-family: var(--font-headings);
    font-size: 1.5rem;
    margin: 0 0 calc(var(--spacing-unit, 8px) * 2) 0;
    border-bottom: 2px solid var(--color-beige-secondary);
    padding-bottom: var(--spacing-unit, 8px);
  }

  .calendar-wrapper {
    margin-bottom: calc(var(--spacing-unit, 8px) * 3);
  }

  .time-slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: var(--spacing-unit, 8px);
  }

  .time-slot {
    padding: var(--spacing-unit, 8px);
    border: 1px solid var(--color-beige-secondary);
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    font-weight: 500;
  }
  .time-slot:hover {
    background-color: var(--color-beige-secondary);
  }
  .time-slot.selected {
    background-color: var(--color-teal-accent);
    color: white;
    border-color: var(--color-teal-accent);
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--spacing-unit, 8px) * 2);
  }
  .form-group {
    display: flex;
    flex-direction: column;
  }
  .form-group.full-width {
    grid-column: 1 / -1; /* Ocupa todo el ancho del grid */
  }
  .form-group label {
    margin-bottom: calc(var(--spacing-unit, 8px) * 0.5);
    font-weight: 500;
    font-size: 0.9rem;
  }
  .form-group input, .form-group select {
    width: 100%;
    padding: calc(var(--spacing-unit, 8px) * 1.25);
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .submit-appointment {
    width: 100%;
    margin-top: calc(var(--spacing-unit, 8px) * 2);
    padding: calc(var(--spacing-unit, 8px) * 1.5);
    font-size: 1.1rem;
  }
  .button-primary { /* Estilo ya conocido */ }

  @media (max-width: 900px) {
    .appointment-form {
      grid-template-columns: 1fr; /* Apilar todo en una columna en pantallas más pequeñas */
    }
  }

</style>