document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('footer-placeholder').innerHTML = `
        <!-- CONTACTO -->
        <section class="contact-section" id="contacto">
            <h2>📬 ¿Interesado en Colaborar?</h2>
            <p>Disponible para oportunidades como Junior en Ciberseguridad, Administración de Sistemas o roles relacionados.</p>
            <div class="contact-links">
                <a href="mailto:perez.gcia@gmail.com">✉️ Escríbeme</a>
                <a href="tel:+34681279891"> 📞 Llámame</a>
                <a href="https://wa.me/34681279891?text=Hola%20Pablo,%20me%20interesa%20tu%20perfil%20para..." target="_blank">📱 WhatsApp</a>
            </div>
        </section>

        <!-- BOTÓN VOLVER AL INICIO -->
        <div class="back-to-top-container">
            <a href="/portfolio/#header-placeholder" class="back-to-top-btn" title="Volver al inicio">
                ← Inicio
            </a>
        </div>

        
        
        <!-- FOOTER -->
        <footer>
            <p>© Pablo Pérez García | Portfolio</p>
            <p>Actualizado: <span id="current-month"></span> | Madrid, España</p>
        </footer>
    `;
    
    // Fecha dinámica...
    const fecha = new Date();
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesFormato = meses[fecha.getMonth()] + ' ' + fecha.getFullYear();
    document.getElementById('current-month').textContent = mesFormato;
});





    // 2. MODAL PDF FUNCTIONS (NUEVO)
        window.openPdfModal = function(pdfPath) {
            document.getElementById('pdfFrame').src = pdfPath;
            document.getElementById('pdfModal').style.display = 'block';
        };
    
        window.closePdfModal = function() {
            document.getElementById('pdfModal').style.display = 'none';
            document.getElementById('pdfFrame').src = '';
        };
    
        // ESC cierra modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.closePdfModal();
            }
        });
    
        // Click fuera cierra
        window.onclick = function(event) {
            const modal = document.getElementById('pdfModal');
            if (event.target == modal) {
                window.closePdfModal();
            }
        };
    });
