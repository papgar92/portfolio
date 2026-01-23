document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('footer-placeholder').innerHTML = `
        <!-- CONTACTO -->
        <section class="contact-section">
            <h2>📬 ¿Interesado en Colaborar?</h2>
            <p>Disponible para oportunidades como Junior en Ciberseguridad, Administración de Sistemas o roles relacionados.</p>
            
            <div class="contact-links">
                <a href="mailto:perez.gcia@gmail.com">✉️ Escríbeme</a>
                <a href="tel:+34681279891"> 📞 Llámame</a>
                <a href="https://wa.me/34681279891?text=Hola%20Pablo,%20me%20interesa%20tu%20perfil%20para..." target="_blank">📱 WhatsApp</a>
            </div>

            
        </section>
        <!-- FOOTER -->
        <footer>
            <p>© Pablo Pérez García | Portfolio</p>
            <p>Actualizado: <span id="current-month"></span> | Madrid, España</p>
        </footer>
    `;
    
    // Formato: Enero 2026 (Primera letra mayúscula)
    const fecha = new Date();
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesFormato = meses[fecha.getMonth()] + ' ' + fecha.getFullYear();
    document.getElementById('current-month').textContent = mesFormato;
});
