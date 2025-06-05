<script>
  import { onMount, onDestroy } from 'svelte';

  export let images = [];
  export let interval = 5000;
  export let showControls = true;
  export let showIndicators = true;

  let currentIndex = 0;
  let timerId = null;
  let isPausedByKeyboard = false; // Para la lógica de on:keydown

  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function goToSlide(index) {
    currentIndex = index;
  }

  function startAutoplay() {
    if (timerId) clearInterval(timerId);
    if (interval > 0 && images.length > 1) {
      timerId = setInterval(nextSlide, interval);
    }
  }

  function stopAutoplay() {
    clearInterval(timerId);
    timerId = null;
  }

  onMount(startAutoplay);
  onDestroy(stopAutoplay);

  function handleManualNavigation() {
    stopAutoplay();
    // Si quieres que el autoplay se reinicie después de una interacción manual:
    // isPausedByKeyboard = false; // Asumir que la interacción manual "despausa" el teclado
    // clearTimeout(restartTimerId); 
    // restartTimerId = setTimeout(startAutoplay, interval * 2); 
  }

  function handlePrevClick() {
    prevSlide();
    handleManualNavigation();
  }

  function handleNextClick() {
    nextSlide();
    handleManualNavigation();
  }

  function handleIndicatorClick(index) {
    goToSlide(index);
    handleManualNavigation();
  }

  function togglePlayPauseByKeyboard() {
    if (isPausedByKeyboard) { // Si estaba pausado por teclado, reanudar
      startAutoplay();
      isPausedByKeyboard = false;
    } else { // Si estaba corriendo (o pausado por mouse/foco), pausar por teclado
      stopAutoplay();
      isPausedByKeyboard = true;
    }
  }

  function handleKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault(); 
      togglePlayPauseByKeyboard();
    }
  }

  function handleFocusIn() {
    if (!isPausedByKeyboard) { // Solo pausar por foco si no fue pausado por teclado
      stopAutoplay();
    }
  }

  function handleFocusOut() {
    if (!isPausedByKeyboard) { // Solo reanudar por quitar foco si no fue pausado por teclado
      startAutoplay();
    }
  }
</script>

{#if images && images.length > 0}
  <div
    class="carousel-container"
    on:mouseenter={stopAutoplay}
    on:mouseleave={startAutoplay}
    role="region"
    aria-label="Carrusel de imágenes promocionales"
    tabindex="0"
    on:focusin={handleFocusIn}  
    on:focusout={handleFocusOut} 
    on:keydown={handleKeyDown}
  >
    <div class="slides-wrapper">
      {#each images as image, i (image.src) }
        <div class="slide" class:active={i === currentIndex}>
          <div class="slide-content-wrapper">
            <div class="image-area">
              <img src={image.src} alt={image.alt || `Diapositiva ${i + 1}`} />
            </div>
            {#if image.title || image.caption}
              <div class="text-area">
                {#if image.title}<h3>{image.title}</h3>{/if}
                {#if image.caption}<p>{image.caption}</p>{/if}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    {#if showControls && images.length > 1}
      <button class="control prev" on:click={handlePrevClick} aria-label="Diapositiva anterior">❮</button>
      <button class="control next" on:click={handleNextClick} aria-label="Siguiente diapositiva">❯</button>
    {/if}

    {#if showIndicators && images.length > 1}
      <div class="indicators">
        {#each images as _, i (i)}
          <button
            class="indicator"
            class:active={i === currentIndex}
            on:click={() => handleIndicatorClick(i)}
            aria-label="Ir a la diapositiva {i + 1}"
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <p>No hay imágenes para mostrar en el carrusel.</p>
{/if}

<style>
  /* ... (LOS MISMOS ESTILOS CSS QUE YA TENÍAMOS PARA EL CAROUSEL VAN AQUÍ) ... */
  /* Pega aquí la sección <style> completa de la respuesta anterior del Carousel */
  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 1000px; 
    margin: 0 auto calc(var(--spacing-unit, 8px) * 4) auto; 
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    outline: none;
  }
  .carousel-container:focus-visible { 
    outline: 2px solid var(--color-teal-accent, #53A69C);
    outline-offset: 2px;
  }

  .slides-wrapper {
    width: 100%;
    height: 100%; 
    position: relative;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    opacity: 0;
    transition: opacity 0.7s ease-in-out;
    display: flex; 
    justify-content: center;
  }

  .slide.active {
    opacity: 1;
    z-index: 1;
    position: relative; 
  }
  
  .slide:not(.active) {
    position: absolute;
  }

  .slide-content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%; 
  }

  .image-area {
    width: 100%;
    aspect-ratio: 16 / 9; 
    background-color: var(--color-background-medium, #f0f2f5); 
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; 
  }

  .image-area img {
    width: 100%;
    height: 100%;
    object-fit: contain; 
  }

  .text-area {
    padding: calc(var(--spacing-unit, 8px) * 2) calc(var(--spacing-unit, 8px) * 2.5);
    text-align: center;
    background-color: var(--color-beige-secondary, #B2A991); /* O el color que hayas elegido */
  }

  .text-area h3 {
    font-size: 1.5rem; 
    color: var(--color-dark-primary, #1D1B1C); 
    margin: 0 0 calc(var(--spacing-unit, 8px) * 1) 0; 
    font-family: var(--font-headings);
  }

  .text-area p {
    font-size: 0.95rem;
    color: var(--color-dark-primary, #1D1B1C); 
    line-height: 1.5;
    margin: 0;
    font-family: var(--font-primary);
  }

  .control {
    position: absolute;
    top: 40%; 
    transform: translateY(-50%);
    background-color: rgba(29, 27, 28, 0.45);
    color: white;
    border: none;
    padding: 0; 
    font-size: 1.8rem; 
    cursor: pointer;
    z-index: 3;
    border-radius: 50%;
    width: 48px; 
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    line-height: 1; 
  }
  .control:hover {
    background-color: rgba(29, 27, 28, 0.7);
  }
  .control.prev { left: 20px; }
  .control.next { right: 20px; }

  .indicators {
    position: absolute;
    bottom: 10px; 
    /* Ajusta 'bottom' si el .text-area es muy alto o si quieres los indicadores
       justo debajo del .image-area pero encima del .text-area.
       Para eso, necesitarías anidar .indicators dentro de .image-area o ajustar su
       posicionamiento relativo al .slide-content-wrapper.
       Por ahora, lo dejamos relativo al .carousel-container general. */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 3;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(29, 27, 28, 0.3); 
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s ease;
  }
  .indicator.active,
  .indicator:hover {
    background-color: rgba(255, 255, 255, 0.8);
    border-color: rgba(29, 27, 28, 0.5);
  }
</style>