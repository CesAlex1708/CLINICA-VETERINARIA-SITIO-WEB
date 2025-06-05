<script>
  // No se necesita lógica de script compleja para esta página.
  // Los datos están directamente en el HTML por simplicidad.
</script>

<svelte:head>
  <title>Sobre Nosotros - Clínica Canina Ornelas López</title>
  <meta name="description" content="Conoce la historia, filosofía y al equipo de expertos detrás de la Clínica Canina Ornelas López." />
</svelte:head>

<div class="about-page-container">
  <h1 class="page-title">Quienes Somos</h1>

  <section class="clinic-intro">
    <div class="intro-image">
      <img src="/images/about/clinica-fachada.jpeg" alt="Fachada de la Clínica Canina Ornelas López" />
    </div>
    <div class="intro-text">
      <h2>Nuestra Historia</h2>
      <p>Fundada en 2015 con la misión de ofrecer un cuidado veterinario excepcional y compasivo, la Clínica Canina Ornelas López nació de un profundo amor por los animales. Lo que comenzó como un pequeño consultorio, hoy se ha convertido en un centro de referencia en la comunidad, equipado con tecnología de punta y un equipo de profesionales apasionados por la salud y el bienestar de cada paciente que cruza nuestras puertas.</p>
      <p>Creemos en construir relaciones duraderas con nuestros clientes y sus mascotas, basadas en la confianza, la honestidad y la excelencia médica.</p>
    </div>
  </section>

  <section class="philosophy-section">
    <h2>Nuestra Filosofía de Cuidado</h2>
    <div class="philosophy-grid">
      <div class="philosophy-item">
        <span class="icon" role="img" aria-label="corazón con pulso">❤️</span>
        <h3>Trato Compasivo</h3>
        <p>Cada paciente es único y lo tratamos con el cariño y la paciencia que merecen, como si fuera parte de nuestra propia familia.</p>
      </div>
      <div class="philosophy-item">
        <span class="icon" role="img" aria-label="escudo">🛡️</span>
        <h3>Medicina Preventiva</h3>
        <p>Nos enfocamos en la prevención como la mejor herramienta para garantizar una vida larga, sana y feliz para tu compañero.</p>
      </div>
      <div class="philosophy-item">
        <span class="icon" role="img" aria-label="microscopio">🔬</span>
        <h3>Excelencia y Tecnología</h3>
        <p>Combinamos la experiencia de nuestro equipo con tecnología moderna para ofrecer diagnósticos precisos y tratamientos efectivos.</p>
      </div>
    </div>
  </section>

  <section class="team-section">
    <h2>Conoce a Nuestro Equipo</h2>
    <div class="team-grid">
      <div class="team-member-card">
        <div class="member-photo">
          <img src="/images/about/dr-ornelas.jpeg" alt="Foto del Dr. Ornelas" />
        </div>
        <div class="member-info">
          <h3>Dr. César Ornelas</h3>
          <h4>M.V.Z. - Director y Cirujano Principal</h4>
          <p>Egresado de la UNAM con especialidad en cirugía de tejidos blandos. Apasionado por los casos complejos y por encontrar la mejor solución para la salud de sus pacientes. Fundador de la clínica y pilar de nuestro equipo.</p>
        </div>
      </div>

      <div class="team-member-card">
        <div class="member-photo">
           <img src="/images/about/dra-lopez.jpeg" alt="Foto de la Dra. López" />
        </div>
        <div class="member-info">
          <h3>Dra. Alejandra López</h3>
          <h4>M.V.Z. - Especialista en Medicina Interna</h4>
           <p>Con un enfoque en el diagnóstico y tratamiento de enfermedades internas, la Dra. López es experta en dermatología y cardiología. Su trato amable y paciente la hace favorita de las mascotas y sus dueños.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .about-page-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2);
  }
  
  section {
    margin-bottom: calc(var(--spacing-unit, 8px) * 6);
  }

  /* --- Estilos para la Introducción de la Clínica (CON EFECTO DE LUZ) --- */
  .clinic-intro {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: calc(var(--spacing-unit, 8px) * 5);
    align-items: center;
  }

  /* Contenedor para la imagen y su fondo brillante */
  .intro-image {
    position: relative; /* Necesario para posicionar el fondo y la imagen */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* El fondo brillante (pseudo-elemento) */
  .intro-image::after {
    content: '';
    position: absolute;
    z-index: -1; /* Detrás de la imagen */
    width: 100%;
    height: 100%;
    background-color: var(--color-teal-accent, #53A69C);
    border-radius: 16px; /* Un poco más grande que el de la imagen */
    filter: blur(25px); /* Desenfoque para el efecto de "glow" */
    animation: pulse-glow 4s infinite alternate ease-in-out; /* La animación */
  }

  @keyframes pulse-glow {
    from {
      opacity: 0.4;
      transform: scale(0.95);
    }
    to {
      opacity: 0.8;
      transform: scale(1);
    }
  }

  .intro-image img {
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    position: relative; /* Para asegurar que esté por encima del ::after */
    z-index: 1;
    width: 100%; /* Asegura que la imagen sea responsiva dentro de su contenedor */
  }

  .intro-text h2 {
    font-size: 2rem;
    font-family: var(--font-headings);
    color: var(--color-teal-accent);
  }
  .intro-text p {
    line-height: 1.8;
    color: #333;
  }

  /* --- Estilos para la Filosofía de Cuidado (se mantienen igual) --- */
  .philosophy-section h2 { text-align: center; }
  .philosophy-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: calc(var(--spacing-unit, 8px) * 3);
    margin-top: calc(var(--spacing-unit, 8px) * 3);
  }
  .philosophy-item {
    text-align: center;
    padding: calc(var(--spacing-unit, 8px) * 2);
  }
  .philosophy-item .icon {
    font-size: 3rem;
    display: block;
    margin-bottom: var(--spacing-unit, 8px);
    color: var(--color-teal-accent);
  }
  .philosophy-item h3 {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-unit, 8px);
    font-family: var(--font-headings);
  }
  .philosophy-item p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #555;
  }

  /* --- Estilos para el Equipo (CON FOTOS MÁS GRANDES Y EFECTO LUPA) --- */
  .team-section h2 { text-align: center; }
  .team-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--spacing-unit, 8px) * 4);
    margin-top: calc(var(--spacing-unit, 8px) * 3);
  }
  .team-member-card {
    background-color: var(--color-background-medium, #f0f2f5);
    border-radius: 12px;
    text-align: center;
    padding: calc(var(--spacing-unit, 8px) * 3);
  }

  .member-photo {
    width: 180px;  /* TAMAÑO AUMENTADO */
    height: 180px; /* TAMAÑO AUMENTADO */
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto calc(var(--spacing-unit, 8px) * 2) auto;
    border: 5px solid var(--color-beige-secondary); /* Borde un poco más grueso */
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* Transición suave para el zoom */
  }

  /* EFECTO LUPA AL PASAR EL CURSOR SOBRE LA TARJETA COMPLETA */
  .team-member-card:hover .member-photo {
    transform: scale(1.1); /* Agranda la foto en un 10% */
  }

  .member-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .member-info h3 { font-size: 1.5rem; margin: 0; }
  .member-info h4 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-teal-accent);
    margin: calc(var(--spacing-unit, 8px) * 0.5) 0 calc(var(--spacing-unit, 8px) * 1.5) 0;
  }
  .member-info p { font-size: 0.9rem; line-height: 1.6; }

  /* Responsividad */
  @media (max-width: 768px) {
    .clinic-intro, .team-grid {
      grid-template-columns: 1fr;
    }
    .intro-image {
      order: -1;
    }
  }
</style>