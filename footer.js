document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('footer-placeholder').innerHTML = `
        <section class="contact-section">
            <h2>📬 ¿Interesado en Colaborar?</h2>
            <p>Disponible para oportunidades como Junior en Ciberseguridad, Administración de Sistemas o roles IT.</p>
            <div class="contact-links">
                <a href="mailto:perez.gcia@gmail.com">Enviar Email</a>
                <a href="https://linkedin.com/in/ppg92" target="_blank">LinkedIn</a>
            </div>
        </section>
        <footer>
            <p>© <span id="current-year"></span> Pablo Pérez García | Portfolio ASIR & Ciberseguridad</p>
            <p>Actualizado: <span id="current-month"></span> | Madrid, España</p>
        </footer>
        <script>
            document.getElementById('current-year').textContent = new Date().getFullYear();
            document.getElementById('current-month').textContent = new Date().toLocaleDateString('es-ES', { month: 'long' });
        </script>
    `;
});
