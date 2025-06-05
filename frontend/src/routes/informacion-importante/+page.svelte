<script>
  // No se necesita JavaScript para la funcionalidad de esta página.
  // El acordeón de FAQ funciona con HTML nativo.
</script>

<svelte:head>
  <title>Información Importante - Clínica Canina Ornelas López</title>
  <meta name="description" content="Encuentra nuestras políticas de la clínica, horarios de atención, métodos de pago y respuestas a preguntas frecuentes." />
</svelte:head>

<div class="info-page-container">
  <h1 class="page-title">Información Importante</h1>

  <section class="info-section">
    <h2>Horarios y Métodos de Pago</h2>
    <div class="info-grid">
      <div class="info-card">
        <h3>Horarios de Atención</h3>
        <p><strong>Lunes a Viernes:</strong> 9:00 AM - 8:00 PM</p>
        <p><strong>Sábados:</strong> 10:00 AM - 4:00 PM</p>
        <p><strong>Domingos:</strong> Cerrado (Solo atención de urgencias)</p>
        <p><strong>Urgencias:</strong> 24 horas, 7 días a la semana.</p>
      </div>
      <div class="info-card">
        <h3>Métodos de Pago Aceptados</h3>
        <p>Aceptamos los siguientes métodos para tu comodidad:</p>
        <ul>
          <li>Efectivo</li>
          <li>Tarjetas de Crédito (Visa, MasterCard, Amex)</li>
          <li>Tarjetas de Débito</li>
          <li>Transferencia Bancaria (SPEI)</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="info-section">
    <h2>Políticas de la Clínica</h2>
    <div class="policy-text">
      <h4>Política de Citas</h4>
      <p>Agradecemos tu puntualidad. Si necesitas cancelar o reagendar tu cita, por favor avísanos con al menos 24 horas de anticipación para poder ofrecer el espacio a otro paciente que lo necesite. Las ausencias no notificadas pueden generar un cargo administrativo.</p>
      <h4>Política de Privacidad</h4>
      <p>Tu privacidad y la de tu mascota son de suma importancia para nosotros. Toda la información recopilada se utiliza exclusivamente para fines de tratamiento médico y comunicación. No compartimos tus datos con terceros sin tu consentimiento explícito. Puedes consultar nuestro aviso de privacidad completo <a href="/politica-privacidad">aquí</a>.</p>
      </div>
  </section>

  <section class="info-section">
    <h2>Preguntas Frecuentes (FAQ)</h2>
    <div class="faq-container">
      <details class="faq-item">
        <summary>¿Necesito agendar una cita para una consulta?</summary>
        <div class="faq-content">
          <p>Sí, recomendamos agendar una cita para todas las consultas de rutina y seguimientos para asegurar que podamos dedicarte el tiempo necesario sin prisas. Para emergencias, puedes acudir en cualquier momento.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Qué debo hacer si mi mascota tiene una emergencia fuera del horario de consulta?</summary>
        <div class="faq-content">
          <p>Nuestro servicio de urgencias está disponible 24/7. Por favor, llama a nuestro teléfono de urgencias <strong>(55) 2222-3333</strong> antes de dirigirte a la clínica para que nuestro equipo esté preparado para recibir a tu mascota.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Mi perro debe estar en ayuno para una cirugía o análisis de sangre?</summary>
        <div class="faq-content">
          <p>Generalmente sí. Para la mayoría de los procedimientos quirúrgicos y análisis de sangre, se requiere un ayuno de sólidos de 8 a 12 horas. El agua suele estar permitida. Sin embargo, nuestro equipo veterinario te dará las instrucciones específicas para el caso particular de tu mascota.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Aceptan seguros para mascotas?</summary>
        <div class="faq-content">
          <p>Actualmente trabajamos con varias aseguradoras. Te proporcionamos toda la documentación necesaria (informes médicos, facturas detalladas) para que puedas solicitar el reembolso a tu compañía de seguros. Por favor, consulta directamente con tu aseguradora sobre los detalles de tu cobertura.</p>
        </div>
      </details>
    </div>
  </section>

</div>

<style>
  .info-page-container {
    max-width: 900px;
    margin: 0 auto;
    padding: calc(var(--spacing-unit, 8px) * 2);
  }
  /* La clase .page-title se toma de tu app.css global */

  .info-section {
    margin-bottom: calc(var(--spacing-unit, 8px) * 5);
  }
  .info-section h2 {
    font-family: var(--font-headings);
    font-size: 2rem;
    color: var(--color-dark-primary);
    border-bottom: 2px solid var(--color-beige-secondary);
    padding-bottom: var(--spacing-unit, 8px);
    margin-bottom: calc(var(--spacing-unit, 8px) * 3);
  }

  /* Estilos para Horarios y Pagos */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: calc(var(--spacing-unit, 8px) * 3);
  }
  .info-card {
    background-color: var(--color-background-medium, #f0f2f5);
    padding: calc(var(--spacing-unit, 8px) * 2.5);
    border-radius: 8px;
  }
  .info-card h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: var(--spacing-unit, 8px);
    color: var(--color-teal-accent);
  }
  .info-card p, .info-card ul {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  .info-card ul {
    padding-left: 20px;
  }

  /* Estilos para Políticas */
  .policy-text h4 {
    font-family: var(--font-headings);
    font-size: 1.2rem;
    margin-top: calc(var(--spacing-unit, 8px) * 2);
    margin-bottom: var(--spacing-unit, 8px);
  }
  .policy-text p {
    line-height: 1.7;
    color: #333;
  }

  /* Estilos para el Acordeón de FAQ */
  .faq-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-unit, 8px);
  }
  .faq-item {
    border: 1px solid var(--color-background-medium);
    border-radius: 8px;
    background-color: var(--color-background-light, white);
  }
  .faq-item summary {
    padding: calc(var(--spacing-unit, 8px) * 1.5) calc(var(--spacing-unit, 8px) * 2);
    font-weight: 600;
    cursor: pointer;
    list-style: none; /* Quitar la flecha por defecto en algunos navegadores */
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s;
  }
  .faq-item summary::-webkit-details-marker { /* Quitar la flecha por defecto en Chrome/Safari */
    display: none;
  }
  .faq-item summary::after { /* Añadir nuestro propio ícono de flecha */
    content: '▼';
    font-size: 0.8em;
    transition: transform 0.2s ease-in-out;
  }
  .faq-item[open] > summary {
    background-color: var(--color-beige-secondary); /* Color cuando está abierto */
  }
  .faq-item[open] > summary::after {
    transform: rotate(180deg);
  }

  .faq-content {
    padding: 0 calc(var(--spacing-unit, 8px) * 2) calc(var(--spacing-unit, 8px) * 2);
    line-height: 1.7;
    color: #333;
  }
</style>