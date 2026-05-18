/**
 * MY PORTFOLIO JS
 * main.js — v1.0
 *
 * Contiene:
 *  1. Fecha dinámica en el footer
 *  2. Efecto typewriter en el hero
 *  3. Toggle de tarjetas de proyectos
 *  4. Animación de barras de progreso al hacer scroll
 *  5. Formulario de contacto (Web3Forms)
 *  6. Visitor tracker (Google Apps Script → Google Sheets)
 */

/* ── 1. FECHA FOOTER ────────────────────────────────────────── */
(function setFooterDate() {
    const meses = [
        'Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
    ];
    const hoy = new Date();
    const el  = document.getElementById('fecha-footer');
    if (el) el.textContent = meses[hoy.getMonth()] + ' ' + hoy.getFullYear();
})();


/* ── 2. TYPEWRITER HERO ─────────────────────────────────────── */
(function initTypewriter() {
    const FRASES = [
        'cat whoami.txt',
        'grep -r "blue_team" ./career/',
        'tail -f /var/log/incidents.log',
        'snort -A fast -c /etc/snort.conf'
    ];
    let fi = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-text');
    if (!el) return;

    function tick() {
        const frase = FRASES[fi];
        if (!deleting) {
            el.textContent = frase.slice(0, ++ci);
            if (ci === frase.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
        } else {
            el.textContent = frase.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                fi = (fi + 1) % FRASES.length;
            }
        }
        setTimeout(tick, deleting ? 32 : 72);
    }
    setTimeout(tick, 700);
})();


/* ── 3. PROYECTOS: TOGGLE ───────────────────────────────────── */
function toggleProj(header) {
    const body   = header.nextElementSibling;
    const toggle = header.querySelector('.proj-toggle');
    const isOpen = body.classList.toggle('open');
    toggle.textContent = isOpen ? '[ colapsar ▴ ]' : '[ expandir ▾ ]';
}


/* ── 4. BARRAS DE PROGRESO (scroll-triggered) ───────────────── */
(function initProgressBars() {
    const grid = document.getElementById('lp-grid');
    if (!grid) return;

    let animated = false;

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            grid.querySelectorAll('.fill').forEach(bar => {
                const targetWidth = bar.dataset.w || '0';
                setTimeout(() => { bar.style.width = targetWidth + '%'; }, 150);
            });
        }
    }, { threshold: 0.2 });

    observer.observe(grid);
})();


/* ── 5. FORMULARIO DE CONTACTO (Web3Forms) ──────────────────── */
(function initContactForm() {
    const form    = document.getElementById('contact-form');
    const btn     = document.getElementById('form-btn');
    const btnText = document.getElementById('form-btn-text');
    const fb      = document.getElementById('form-feedback');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        btn.disabled        = true;
        btnText.textContent = '⏳ Enviando...';
        fb.textContent      = '';
        fb.className        = '';

        try {
            const res  = await fetch('https://api.web3forms.com/submit', {
                method : 'POST',
                body   : new FormData(form)
            });
            const data = await res.json();

            if (data.success) {
                fb.textContent = '✓ Mensaje enviado. Te responderé en breve.';
                fb.className   = 'fb-ok';
                form.reset();
            } else {
                throw new Error(data.message || 'Error en el servidor');
            }
        } catch (err) {
            fb.textContent = '✗ Error al enviar. Escríbeme directamente a perez.gcia@gmail.com';
            fb.className   = 'fb-err';
        } finally {
            btn.disabled        = false;
            btnText.textContent = '→ Enviar mensaje';
        }
    });
})();


/* ── 6. VISITOR TRACKER ─────────────────────────────────────────────────────
 *
 *  Cómo funciona:
 *    - Al cargar la página obtiene la IP y geolocalización del visitante
 *      a través de la API pública ipapi.co (1 000 req/día gratis, sin clave)
 *    - Envía los datos a un Google Apps Script desplegado como Web App
 *    - El script registra la visita en una hoja de Google Sheets
 *    - Se puede configurar un resumen diario por email desde el propio script
 *
 *  Datos recopilados (todos públicos, sin datos personales identificables):
 *    IP pública · Ciudad · Región · País · ISP/Organización
 *    Referrer · Idioma del navegador · Resolución de pantalla · User-Agent
 *
 *  Configuración:
 *    1. Despliega el script gas/visitor-logger.gs como Web App en Google Apps Script
 *    2. Copia la URL de despliegue y pégala en GAS_URL (justo debajo)
 *    3. Sube el portfolio a GitHub Pages
 *
 *  Ver instrucciones completas en SETUP.md
 * ─────────────────────────────────────────────────────────────────────────── */

const GAS_URL = 'https://script.google.com/macros/s/AKfycbwq-vcOJxcHcRYZtryHcTsrSOThgyER2DQ0kj3Zn7TPw6YPoQs2syolNsTqGez_FHb0jw/exec';

async function trackVisit() {
    // Una sola vez por sesión de navegador
    if (sessionStorage.getItem('ppg_tracked')) return;
    sessionStorage.setItem('ppg_tracked', '1');

    try {
        // Obtener IP + geolocalización
        const geo = await (await fetch('https://ipapi.co/json/')).json();

        const params = new URLSearchParams({
            ip      : geo.ip            || '',
            city    : geo.city          || '',
            region  : geo.region        || '',
            country : geo.country_name  || '',
            org     : geo.org           || '',   // ISP o empresa
            ref     : document.referrer  || 'directo',
            lang    : navigator.language || '',
            screen  : screen.width + 'x' + screen.height,
            page    : window.location.href,
            ua      : navigator.userAgent.substring(0, 200)
        });

        // mode: 'no-cors' — el dato llega al servidor pero no leemos la respuesta
        await fetch(GAS_URL + '?' + params.toString(), { mode: 'no-cors' });

    } catch (_) {
        // Siempre silencioso — nunca interrumpir la experiencia del visitante
    }
}

// Esperar a que la página cargue completamente antes de trackear
window.addEventListener('load', () => setTimeout(trackVisit, 1500));
