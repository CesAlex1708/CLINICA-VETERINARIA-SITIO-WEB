<script>
  // No se necesita JavaScript específico para este footer por ahora.
</script>

<footer class="site-footer">
  <div class="footer-content-grid">
    <div class="footer-section">
      <h4>Nosotros</h4>
      <ul>
        <li><a href="/nosotros">Conoce Nuestra Clínica y Equipo</a></li>
        </ul>
    </div>

    <div class="footer-section">
      <h4>Importante</h4>
      <ul>
        <li><a href="/informacion-importante">Información Clave y Políticas</a></li>
        </ul>
    </div>

    <div class="footer-section">
      <h4>Contáctenos</h4>
      <address>
        <strong>Clínica Canina Ornelas López</strong><br />
        C. Mirador de Chapultepec 8, San Miguel Topilejo, Tlalpan, 14500 San Miguel Topilejo, CDMX<br />
        <br />
        Teléfono: <a href="tel:5626348013">56-2634-8013</a><br />
        Urgencias 24hrs: <a href="tel:5514209928">55-1420-9928</a><br />
        Email: <a href="mailto:cesalexmv17@gmail.com">cesalexmv17@gmail.com</a>
      </address>
    </div>

    <div class="footer-section">
      <h4>Síguenos</h4>
      <div class="social-links">
        <a href="https://www.facebook.com/share/15gMdivccP/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-icon-link">
          <span class="social-text">FB</span>
        </a>
        <a href="https://www.instagram.com/estetica_canina_ornelas?igsh=OGF0dWVlZW9rNjdt" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon-link">
          <span class="social-text">IG</span>
        </a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; {new Date().getFullYear()} Clínica Canina Ornelas López. Todos los derechos reservados.</p>
  </div>
</footer>

<style>
  .site-footer {
    background-color: var(--color-dark-primary, #1D1B1C);
    color: var(--color-text-light, #ecf0f1);
    padding: 3rem 2rem 1.5rem;
    margin-top: auto;
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .footer-content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); 
    gap: 2.5rem;
    margin-bottom: 2.5rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .footer-section h4 {
    color: var(--color-beige-secondary, #B2A991);
    margin-bottom: 1.25rem;
    font-size: 1.15rem;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section ul li {
    margin-bottom: 0.75rem;
  }

  .footer-section a, /* Estilo general para enlaces en las listas */
  .site-footer address a { /* Estilo para enlaces en la dirección */
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.2s ease, text-decoration 0.2s ease;
  }

  .footer-section a:hover,
  .site-footer address a:hover {
    color: var(--color-teal-accent, #53A69C);
    text-decoration: none; /* Quitamos el subrayado por defecto en hover, o lo dejamos si prefieres */
  }
  
  .site-footer address {
    font-style: normal;
  }

  .site-footer address strong {
    color: var(--color-text-light, white);
    font-weight: 600;
    display: block;
    margin-bottom: 0.75rem;
  }

  .social-links {
    display: flex; /* Para alinear los íconos horizontalmente */
    gap: 1rem; /* Espacio entre íconos */
  }

  .social-icon-link {
    color: #bdc3c7; /* Color base del ícono/texto */
    text-decoration: none;
    font-size: 1.5rem; /* Tamaño para el texto "FB", "IG" si no usas SVGs */
    /* Si usaras SVGs aquí, podrías controlar su tamaño con width/height en el SVG
       y el color con 'fill="currentColor"' y esta propiedad 'color'. */
    transition: color 0.2s ease;
  }
  .social-icon-link:hover {
    color: var(--color-teal-accent, #53A69C);
  }
  /* .social-text { ... } // Podrías añadir estilos aquí si es necesario */

  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #3e444a;
    font-size: 0.85rem;
    color: #95a0a8;
  }
</style>