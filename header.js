document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('header-placeholder').innerHTML = `
        <header>
            <div class="profile">
                <div><img src="resources/Profile image.jpeg" alt="Foto de perfil"></div>
                <div class="profile-info">
                    <h1>Pablo Pérez García</h1>
                    <p class="title">🎓 Profesional Tech Jr. | 🔐 Interés en ciberseguridad y redes</p>
                    <p>Madrid, España</p>
                    <p>📧 <a href="mailto:perez.gcia@gmail.com">perez.gcia@gmail.com</a> | 📱 <a href="tel:+34681279891">+34 681279891</a></p>
                    <div class="contact-links">
                        <a href="https://linkedin.com/in/ppg92" target="_blank">LinkedIn</a>
                        <a href="resources/CV PPG.pdf" download="CV-Pablo-Perez-Garcia-SOC.pdf">Curriculum Vitae</a>
                        <a href="resources/Recomendacion.pdf" target="_blank">Referencias</a>
                    </div>
                </div>
            </div>
        </header>
    `;
});
