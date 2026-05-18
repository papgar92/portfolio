/**
 * visitor-logger.gs
 * Google Apps Script — Visitor Logger para portfolio
 *
 * Registra las visitas al portfolio en una hoja de Google Sheets
 * y opcionalmente envía un resumen diario por email.
 *
 * INSTRUCCIONES DE DESPLIEGUE:
 *   1. Ve a https://script.google.com
 *   2. Crea un nuevo proyecto y pega este código
 *   3. Clic en "Desplegar" → "Nueva implementación"
 *   4. Tipo: "Aplicación web"
 *   5. Ejecutar como: "Yo (tu cuenta)"
 *   6. Quién tiene acceso: "Cualquier usuario (anónimo)"
 *   7. Copia la URL de despliegue → pégala en main.js (variable GAS_URL)
 */


/* ── CONFIGURACIÓN ────────────────────────────────────────── */
const CONFIG = {
    SHEET_NAME  : 'Visitas',          // Nombre de la pestaña en Google Sheets
    EMAIL_ALERTS: true,               // true = recibir resumen diario por email
    MIN_VISITS  : 1,                  // Mínimo de visitas para enviar el resumen
    TIMEZONE    : 'Europe/Madrid'     // Tu zona horaria
};


/* ── HANDLER PRINCIPAL ────────────────────────────────────── */
function doGet(e) {
    try {
        const p = e.parameter || {};

        // Ignorar peticiones de bots obvios o sin IP
        if (!p.ip || p.ip === '') {
            return ContentService.createTextOutput('ignored');
        }

        // Obtener o crear la hoja de cálculo
        const sheet = getOrCreateSheet();

        // Añadir fila con los datos de la visita
        sheet.appendRow([
            formatDate(new Date()),   // Fecha y hora (Madrid)
            p.ip      || '',          // IP pública
            p.city    || '',          // Ciudad
            p.region  || '',          // Comunidad / Región
            p.country || '',          // País
            p.org     || '',          // ISP / Empresa / Organización
            p.ref     || 'directo',   // Referrer (de dónde viene)
            p.lang    || '',          // Idioma del navegador
            p.screen  || '',          // Resolución de pantalla
            p.page    || '',          // URL visitada
            p.ua      || ''           // User-Agent (navegador / SO)
        ]);

        return ContentService.createTextOutput('ok');

    } catch (err) {
        // Loguear el error pero no fallar visiblemente
        console.error('Error en visitor-logger:', err.toString());
        return ContentService.createTextOutput('error');
    }
}


/* ── HELPERS ──────────────────────────────────────────────── */

/**
 * Devuelve la hoja "Visitas", creándola con cabeceras si no existe.
 */
function getOrCreateSheet() {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let   sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    if (!sheet) {
        sheet = ss.insertSheet(CONFIG.SHEET_NAME);

        // Cabeceras
        const headers = [
            'Fecha/Hora', 'IP', 'Ciudad', 'Región', 'País',
            'ISP / Organización', 'Referrer', 'Idioma',
            'Pantalla', 'URL', 'User-Agent'
        ];
        sheet.appendRow(headers);
        sheet.setFrozenRows(1);

        // Estilo básico de cabeceras
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setBackground('#0c1510');
        headerRange.setFontColor('#00e676');
        headerRange.setFontWeight('bold');

        // Ajustar anchos de columna
        sheet.setColumnWidth(1, 160);  // Fecha
        sheet.setColumnWidth(2, 120);  // IP
        sheet.setColumnWidth(7, 200);  // Referrer
        sheet.setColumnWidth(11, 300); // User-Agent
    }

    return sheet;
}


/**
 * Formatea una fecha en la zona horaria configurada.
 */
function formatDate(date) {
    return Utilities.formatDate(date, CONFIG.TIMEZONE, 'dd/MM/yyyy HH:mm:ss');
}


/* ── RESUMEN DIARIO POR EMAIL ─────────────────────────────── */

/**
 * Envía un resumen diario de visitas por email.
 *
 * Para activarlo automáticamente:
 *   1. En el editor de Apps Script, ve a "Disparadores" (ícono del reloj)
 *   2. Añade un nuevo disparador:
 *      - Función: sendDailySummary
 *      - Tipo: Basado en tiempo → Temporizador diario → Entre 8:00 y 9:00
 */
function sendDailySummary() {
    if (!CONFIG.EMAIL_ALERTS) return;

    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet || sheet.getLastRow() <= 1) return;

    // Filtrar visitas de las últimas 24 horas
    const ahora    = new Date();
    const ayer     = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);
    const allData  = sheet.getDataRange().getValues();
    const headers  = allData[0];

    const recent = allData.slice(1).filter(row => {
        // La fecha está en formato 'dd/MM/yyyy HH:mm:ss'
        const parts  = row[0].split(/[/ :]/);
        const rowDate = new Date(
            parseInt(parts[2]),     // año
            parseInt(parts[1]) - 1, // mes (0-indexed)
            parseInt(parts[0]),     // día
            parseInt(parts[3]),     // hora
            parseInt(parts[4])      // minutos
        );
        return rowDate >= ayer && rowDate <= ahora;
    });

    if (recent.length < CONFIG.MIN_VISITS) return;

    // Construir cuerpo del email
    let body = `Portfolio — Visitas de las últimas 24 horas: ${recent.length}\n`;
    body    += '─'.repeat(60) + '\n\n';

    recent.forEach((row, i) => {
        body += `Visita #${i + 1}\n`;
        body += `  Fecha/Hora : ${row[0]}\n`;
        body += `  IP         : ${row[1]}\n`;
        body += `  Ubicación  : ${row[2]}, ${row[3]}, ${row[4]}\n`;
        body += `  ISP/Org    : ${row[5]}\n`;
        body += `  Referrer   : ${row[6]}\n`;
        body += `  Idioma     : ${row[7]}\n`;
        body += `  Pantalla   : ${row[8]}\n`;
        body += `  Navegador  : ${String(row[10]).substring(0, 80)}\n`;
        body += '\n';
    });

    body += '─'.repeat(60) + '\n';
    body += `Ver todas las visitas: ${ss.getUrl()}\n`;

    MailApp.sendEmail({
        to      : Session.getActiveUser().getEmail(),
        subject : `📊 Portfolio: ${recent.length} visita(s) — ${formatDate(ahora)}`,
        body    : body
    });
}


/* ── TEST MANUAL ──────────────────────────────────────────── */

/**
 * Ejecuta esta función desde el editor para probar que todo funciona.
 * Debe aparecer una fila nueva en Google Sheets.
 */
function testLogger() {
    const fakeEvent = {
        parameter: {
            ip      : '1.2.3.4',
            city    : 'Madrid',
            region  : 'Community of Madrid',
            country : 'Spain',
            org     : 'AS1234 Test ISP',
            ref     : 'https://linkedin.com',
            lang    : 'es-ES',
            screen  : '1920x1080',
            page    : 'https://papgar92.github.io/portfolio/',
            ua      : 'Mozilla/5.0 (test)'
        }
    };
    const result = doGet(fakeEvent);
    console.log('Resultado:', result.getContent());
}
