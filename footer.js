document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('footer-placeholder').innerHTML = `
        <!-- CONTACTO -->
        <section class="contact-section">
            <h2>📬 ¿Interesado en Colaborar?</h2>
            <p>Disponible para oportunidades como Junior en Ciberseguridad, Administración de Sistemas o roles relacionados.</p>
            <div class="contact-links">
                <a href="mailto:perez.gcia@gmail.com">Enviar Email</a>
                <a href="https://linkedin.com/in/ppg92" target="_blank">LinkedIn</a>
            </div>
        </section>
        <!-- FOOTER -->
        <footer>
            <p>© <span id="current-year"></span> Pablo Pérez García | Portfolio</p>
            <p>Actualizado: <span id="current-month"></span> | Madrid, España</p>
        </footer>
    `;
    
    // Script se ejecuta DESPUÉS de inyectar HTML
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Formato: Enero 2026 (Primera letra mayúscula)
    const fecha = new Date();
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesFormato = meses[fecha.getMonth()] + ' ' + fecha.getFullYear();
    document.getElementById('current-month').textContent = mesFormato;
});
