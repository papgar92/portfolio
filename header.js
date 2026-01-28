document.addEventListener('DOMContentLoaded', function() {
    // Detectar si estamos en /proyectos/ o raíz
    const currentPath = window.location.pathname;
    const imagePath = currentPath.includes('/proyectos/') ? '../resources/Profile image.png' : 'resources/Profile image.png';
    
    document.getElementById('header-placeholder').innerHTML = `
        <header>
            <div class="profile">
                <div><img src="${imagePath}" alt="Foto de perfil" onerror="this.src='https://via.placeholder.com/150x150?text=PPG'"></div>
                <div class="profile-info">
                    <h1>Pablo Pérez García</h1>
                    <p class="title">🎓 Profesional Tech Jr. | 🔐 Interés en ciberseguridad y redes</p>
                    <p>Madrid, España</p>

                    <div class="contact-links">
                        <a href="#contacto">📌 Localízame</a> 
                    </div>

                    <div class="contact-links">
                        <a href="https://linkedin.com/in/ppg92" target="_blank">LinkedIn</a>
                        <a href="${currentPath.includes('/proyectos/') ? '../resources/CV PPG.pdf' : 'resources/CV PPG.pdf'}" download="CV-Pablo-Perez-Garcia.pdf">Curriculum Vitae</a>
                        <a href="${currentPath.includes('/proyectos/') ? '../resources/Recomendacion.pdf' : 'resources/Recomendacion.pdf'}" target="_blank">Referencias</a>
                    </div>
                </div>
            </div>
        </header>
    `;
});

