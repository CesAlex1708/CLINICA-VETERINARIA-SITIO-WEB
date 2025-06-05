<script>
  import { Phone, MapPin, AlertTriangle, Droplets, Bone } from 'lucide-svelte';

  const emergencyInfo = {
    phone: '5514209928',
    address: 'C. Mirador de Chapultepec 8, San Miguel Topilejo, Tlalpan, 14500 San Miguel Topilejo, CDMX',
    googleMapsLink: 'https://www.google.com/maps/search/?api=1&query=C.+Mirador+de+Chapultepec+8,+San+Miguel+Topilejo,+Tlalpan,+14500+San+Miguel+Topilejo,+CDMX'
  };

  const symptoms = [
    { text: 'Dificultad para respirar', icon: AlertTriangle },
    { text: 'Sangrado profuso o que no para', icon: Droplets },
    { text: 'Posible fractura o cojera severa', icon: Bone },
    { text: 'Ingestión de veneno o tóxicos', icon: AlertTriangle },
    { text: 'Vómitos o diarrea continuos y severos', icon: Droplets },
    { text: 'Convulsiones o pérdida de conciencia', icon: AlertTriangle }
  ];

  const backgroundLights = Array.from({ length: 15 });
</script>

<svelte:head>
  <title>URGENCIAS 24/7 - Clínica Canina Ornelas López</title>
  <meta name="description" content="Información crítica para emergencias veterinarias. Contacto 24 horas y guía de primeros auxilios." />
</svelte:head>

<div class="background-lights-container" aria-hidden="true">
  {#each backgroundLights as _, i}
    <div class="floating-light"></div>
  {/each}
</div>

<div class="emergency-page">
  <header class="emergency-header">
    <div class="emergency-light main-light"></div>
    <h1>Atención de Urgencias 24/7</h1>
    <p class="subtitle">Mantén la calma. Estamos aquí para ayudarte.</p>
  </header>

  <section class="critical-info-section">
    <a href={`tel:${emergencyInfo.phone}`} class="info-box phone">
      <Phone class="icon" size={36} />
      <div class="text">
        <span>Llamar a Urgencias</span>
        <strong>{emergencyInfo.phone}</strong>
      </div>
    </a>
    <a href={emergencyInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" class="info-box address">
      <MapPin class="icon" size={36} />
      <div class="text">
        <span>Cómo Llegar</span>
        <strong>{emergencyInfo.address}</strong>
      </div>
    </a>
  </section>

  <section class="guide-section" id="que-hacer">
    <h2>
      <span role="img" aria-label="peligro">⚠️</span> Qué Hacer en una Emergencia <span role="img" aria-label="peligro">⚠️</span>
    </h2>
    <ol class="steps-list">
      <li><strong>Mantén la calma y asegura a tu mascota.</strong> Un animal asustado o con dolor puede morder. Acércate con cuidado.</li>
      <li><strong>Llámanos inmediatamente.</strong> Informarnos de la situación nos permite prepararnos para tu llegada.</li>
      <li><strong>No automediques a tu mascota.</strong> Nunca le des medicamentos para humanos o remedios caseros sin consultar.</li>
      <li><strong>Transporta a tu mascota con cuidado.</strong> Si hay una posible lesión en la columna o fractura, muévela sobre una superficie plana y rígida como una tabla.</li>
    </ol>
  </section>

  <section class="symptoms-section" id="sintomas">
    <h2>
      <span role="img" aria-label="peligro">⚠️</span> Síntomas que Requieren Atención de Urgencia <span role="img" aria-label="peligro">⚠️</span>
    </h2>
    <div class="symptoms-grid">
      {#each symptoms as symptom}
        <div class="symptom-item">
          <svelte:component this={symptom.icon} class="symptom-icon" size={40} />
          <p>{symptom.text}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="images-section">
    <img src="/images/urgencias/urgencia1.jpeg" alt="Área de urgencias de la clínica" class="info-image">
    <img src="/images/urgencias/urgencia2.jpeg" alt="Veterinario atendiendo a una mascota" class="info-image">
  </section>
</div>

<style>
  /* --- INICIO: Estilos para el nuevo fondo animado --- */
  .background-lights-container {
    position: fixed; /* CAMBIO CLAVE: Fijo a la ventana del navegador */
    top: 0;
    left: 0;
    width: 100vw; /* Ancho completo de la ventana */
    height: 100vh; /* Alto completo de la ventana */
    overflow: hidden;
    z-index: -1; /* Detrás de todo el contenido de la página */
    pointer-events: none; /* Para que no interfiera con los clics */
  }

  .floating-light {
    position: absolute;
    background-color: rgba(231, 59, 55, 0.1); /* Aún más transparente para sutileza */
    border-radius: 50%;
    animation: float 25s infinite linear;
    bottom: -200px; /* Empezar un poco más abajo */
  }

  @keyframes float {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    10% {
        opacity: 0.7; /* Aparecer gradualmente */
    }
    90% {
        opacity: 0.7; /* Mantener opacidad */
    }
    100% {
      transform: translateY(-120vh); /* Flotar un poco más allá del borde superior */
      opacity: 0;
    }
  }

  /* Asignar diferentes tamaños, posiciones y retrasos para un efecto aleatorio */
  .floating-light:nth-child(1) { width: 40px; height: 40px; left: 10%; animation-duration: 20s; }
  .floating-light:nth-child(2) { width: 20px; height: 20px; left: 25%; animation-duration: 18s; animation-delay: 2s; }
  .floating-light:nth-child(3) { width: 60px; height: 60px; left: 35%; animation-duration: 30s; animation-delay: 4s; }
  .floating-light:nth-child(4) { width: 30px; height: 30px; left: 50%; animation-duration: 22s; animation-delay: 0s; }
  .floating-light:nth-child(5) { width: 50px; height: 50px; left: 65%; animation-duration: 28s; animation-delay: 5s; }
  .floating-light:nth-child(6) { width: 25px; height: 25px; left: 80%; animation-duration: 19s; animation-delay: 1s; }
  .floating-light:nth-child(7) { width: 45px; height: 45px; left: 90%; animation-duration: 24s; animation-delay: 3s; }
  .floating-light:nth-child(8) { width: 55px; height: 55px; left: 5%; animation-duration: 26s; animation-delay: 7s; }
  .floating-light:nth-child(9) { width: 15px; height: 15px; left: 45%; animation-duration: 35s; animation-delay: 6s; }
  .floating-light:nth-child(10) { width: 35px; height: 35px; left: 70%; animation-duration: 21s; animation-delay: 8s; }

  /* --- FIN: Estilos para el fondo animado --- */


  .emergency-page {
    /* Este contenedor ya no necesita position: relative o z-index: 1 
       porque las luces están fuera de él y fijas al fondo */
    max-width: 900px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2) var(--spacing-unit, 8px);
  }

  /* ... (El resto de tus estilos para .emergency-header, .info-box, .guide-section, etc. se mantienen igual) ... */
  /* Los fondos semi-transparentes de .info-box y .symptom-item ahora se verán aún mejor */
  .emergency-header {
    text-align: center;
    margin-bottom: calc(var(--spacing-unit, 8px) * 4);
    position: relative;
  }
  .emergency-header h1 {
    font-size: 3rem;
    color: #c0392b; 
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
  }
  .emergency-header .subtitle {
    font-size: 1.2rem;
    color: #555;
  }
  .emergency-light.main-light {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background-color: #E73B37;
    border-radius: 50%;
    box-shadow: 0 0 10px #E73B37, 0 0 20px #E73B37, 0 0 30px #ff4d4d;
    animation: pulse 1.5s infinite alternate;
  }
  @keyframes pulse {
    from { opacity: 1; box-shadow: 0 0 10px #E73B37, 0 0 20px #E73B37, 0 0 30px #ff4d4d; }
    to { opacity: 0.5; box-shadow: 0 0 5px #c0392b, 0 0 10px #c0392b, 0 0 15px #ff4d4d; }
  }
  .critical-info-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--spacing-unit, 8px) * 2);
    margin-bottom: calc(var(--spacing-unit, 8px) * 5);
  }
  .info-box {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing-unit, 8px) * 1.5);
    background-color: rgba(255, 255, 255, 0.85); /* Un poco menos transparente para mejor legibilidad */
    backdrop-filter: blur(5px);
    padding: calc(var(--spacing-unit, 8px) * 2);
    border-radius: 8px;
    text-decoration: none;
    color: var(--color-dark-primary);
    transition: box-shadow 0.2s, transform 0.2s;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .info-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  }
  .info-box .icon {
    flex-shrink: 0;
    color: #E73B37;
  }
  .info-box .text span {
    display: block;
    font-size: 0.85rem;
    color: #666;
  }
  .info-box .text strong {
    font-size: 1.1rem;
  }
  .guide-section, .symptoms-section, .images-section {
    margin-bottom: calc(var(--spacing-unit, 8px) * 5);
  }
  h2 {
    font-family: var(--font-headings);
    font-size: 1.8rem;
    color: var(--color-dark-primary);
    border-bottom: 2px solid var(--color-beige-secondary);
    padding-bottom: var(--spacing-unit, 8px);
    margin-bottom: calc(var(--spacing-unit, 8px) * 2);
  }
  .steps-list { padding-left: 20px; }
  .steps-list li { margin-bottom: var(--spacing-unit, 8px); line-height: 1.6; }
  .symptoms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-unit, 8px) * 2;
  }
  .symptom-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-unit, 8px);
    background-color: rgba(255, 255, 255, 0.85); 
    backdrop-filter: blur(5px);
    padding: var(--spacing-unit, 8px) * 1.5;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .symptom-icon { color: #E73B37; flex-shrink: 0; }
  .images-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-unit, 8px) * 2;
  }
  .info-image {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  @media (max-width: 600px) {
    .critical-info-section, .images-section { grid-template-columns: 1fr; }
  }
</style>