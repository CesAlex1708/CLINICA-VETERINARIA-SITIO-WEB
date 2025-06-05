<script>
  // Variable para llevar la cuenta del z-index más alto asignado
  let topZIndex = 3;

  // --- Datos de las imágenes para cada sección ---
  // Usamos la reactividad de Svelte: al cambiar los datos en estos arrays, la UI se actualizará.
  let puppyPhotos = [
    { id: 1, src: '/images/guides/cachorro1.jpeg', alt: 'Cachorro juguetón', style: 'transform: rotate(-8deg);', zIndex: 1 },
    { id: 2, src: '/images/guides/cachorro2.jpeg', alt: 'Cachorro durmiendo', style: 'transform: rotate(5deg) scale(0.95);', zIndex: 2 },
    { id: 3, src: '/images/guides/cachorro3.jpeg', alt: 'Cachorro en el veterinario', style: 'transform: rotate(12deg) scale(0.9);', zIndex: 0 }
  ];

  let foodPhotos = [
    { id: 4, src: '/images/guides/alimento3.jpeg', alt: 'Plato de comida para perro', style: 'transform: rotate(6deg);', zIndex: 0 },
    { id: 5, src: '/images/guides/alimento2.jpeg', alt: 'Perro comiendo feliz', style: 'transform: rotate(-5deg) scale(0.95);', zIndex: 1 },
    { id: 6, src: '/images/guides/alimento1.jpeg', alt: 'Plato de comida para perro', style: 'transform: rotate(6deg);', zIndex: 2 }
  ];

  let travelPhotos = [
    { id: 7, src: '/images/guides/viaje1.jpeg', alt: 'Perro en el asiento de un coche', style: 'transform: rotate(10deg);', zIndex: 1 },
    { id: 8, src: '/images/guides/viaje2.jpeg', alt: 'Mascota en una transportadora', style: 'transform: rotate(-3deg) scale(0.95);', zIndex: 2 },
    { id: 9, src: '/images/guides/viaje3.jpeg', alt: 'Perro en la playa', style: 'transform: rotate(-9deg) scale(0.9);', zIndex: 0 }
  ];

  // --- Función para traer una foto al frente ---
  function bringToFront(photoId, photoArray) {
    // Svelte es reactivo. Necesitamos reasignar el array para que detecte el cambio.
    let updatedArray = photoArray.map(p => {
      if (p.id === photoId) {
        // Incrementamos el contador global de z-index y se lo asignamos a la foto clicada
        topZIndex++;
        return { ...p, zIndex: topZIndex };
      }
      return p;
    });

    // Esta reasignación es la que le dice a Svelte que la UI debe actualizarse.
    if (photoArray === puppyPhotos) {
      puppyPhotos = updatedArray;
    } else if (photoArray === foodPhotos) {
      foodPhotos = updatedArray;
    } else if (photoArray === travelPhotos) {
      travelPhotos = updatedArray;
    }
  }
</script>

<svelte:head>
  <title>Guías de Cuidado - Clínica Canina Ornelas López</title>
  <meta name="description" content="Consejos y guías sobre cuidado de cachorros, alimentación y viajes con tu mascota." />
</svelte:head>

<div class="guides-page-container">
  <h1 class="page-title">Guías de Cuidado para tu Mascota</h1>

  <section class="guide-section" id="cuidado-cachorros">
    <div class="text-content">
      <h2>Cuidado de Cachorros</h2>
      <p>La llegada de un cachorro a casa es un momento emocionante. Aquí te damos los consejos esenciales para sus primeros meses. Desde la primera visita al veterinario, el calendario de vacunación, hasta el entrenamiento para ir al baño y la socialización temprana, te acompañamos en cada paso para asegurar que tu nuevo amigo crezca sano, feliz y bien adaptado.</p>
    </div>
    <div class="collage-container">
      {#each puppyPhotos as photo (photo.id)}
        <img 
          src={photo.src} 
          alt={photo.alt} 
          class="collage-photo" 
          style="{photo.style} z-index: {photo.zIndex};"
          on:click={() => bringToFront(photo.id, puppyPhotos)}
          role="button"
          tabindex="0"
          on:keydown={(e) => { if(e.key === 'Enter') bringToFront(photo.id, puppyPhotos) }}
        >
      {/each}
    </div>
  </section>

  <section class="guide-section reverse" id="alimentacion-saludable">
    <div class="text-content">
      <h2>Alimentación Saludable</h2>
      <p>Una nutrición adecuada es la base de una vida larga y saludable. La dieta de tu mascota debe adaptarse a su edad, raza, tamaño y nivel de actividad. Discutiremos los beneficios de las croquetas premium, el alimento húmedo y las dietas especiales. Aprende a leer las etiquetas de los alimentos y a evitar los ingredientes nocivos. ¡Una buena alimentación es el mayor acto de amor!</p>
    </div>
    <div class="collage-container">
       {#each foodPhotos as photo (photo.id)}
        <img 
          src={photo.src} 
          alt={photo.alt} 
          class="collage-photo" 
          style="{photo.style} z-index: {photo.zIndex};"
          on:click={() => bringToFront(photo.id, foodPhotos)}
          role="button"
          tabindex="0"
          on:keydown={(e) => { if(e.key === 'Enter') bringToFront(photo.id, foodPhotos) }}
        >
      {/each}
    </div>
  </section>

  <section class="guide-section" id="viajar-con-mascota">
    <div class="text-content">
      <h2>Viajar con tu Mascota</h2>
      <p>¿Planeando unas vacaciones? ¡No dejes a tu mejor amigo atrás! Te damos los mejores consejos para viajar de forma segura y cómoda con tu mascota, ya sea en coche o en avión. Desde la elección de la transportadora adecuada, la documentación necesaria, hasta cómo manejar la ansiedad por el viaje y qué empacar en su maleta.</p>
    </div>
    <div class="collage-container">
       {#each travelPhotos as photo (photo.id)}
        <img 
          src={photo.src} 
          alt={photo.alt} 
          class="collage-photo" 
          style="{photo.style} z-index: {photo.zIndex};"
          on:click={() => bringToFront(photo.id, travelPhotos)}
          role="button"
          tabindex="0"
          on:keydown={(e) => { if(e.key === 'Enter') bringToFront(photo.id, travelPhotos) }}
        >
      {/each}
    </div>
  </section>

</div>

<style>
  .guides-page-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2) var(--spacing-unit, 8px);
  }
  
  .guide-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--spacing-unit, 8px) * 5);
    align-items: center;
    margin-bottom: calc(var(--spacing-unit, 8px) * 8);
    padding-top: 70px; 
    margin-top: -70px; 
  }
  .guide-section.reverse {
    grid-template-columns: 1fr 1fr;
  }
  .guide-section.reverse .text-content {
    grid-row: 1;
    grid-column: 2;
  }
  .guide-section.reverse .collage-container {
    grid-row: 1;
    grid-column: 1;
  }

  .text-content h2 {
    font-family: var(--font-headings);
    font-size: 2.2rem;
    color: var(--color-teal-accent);
    margin-bottom: var(--spacing-unit, 8px);
  }
  .text-content p {
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
  }
  
  .collage-container {
    position: relative;
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .collage-photo {
    position: absolute;
    max-width: 70%; 
    border-radius: 8px;
    border: 5px solid white;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.3s ease, z-index 0s 0.15s;
    cursor: pointer; /* Cambiar el cursor para indicar que es clickeable */
  }

  /* El hover ahora trae la foto al frente temporalmente con un z-index muy alto */
  .collage-photo:hover, .collage-photo:focus {
    transform: scale(1.05) rotate(0deg) !important; 
    z-index: 999 !important; /* Usar z-index muy alto para que siempre esté al frente en hover/focus */
    outline: none; /* Quitar el contorno de foco por defecto del navegador */
  }
  
</style>