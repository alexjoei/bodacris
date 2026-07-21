/**
 * Apps Script para recibir fotos desde la web de la boda
 * y guardarlas en la carpeta de Google Drive.
 *
 * Instrucciones de despliegue: ver SUBIR-FOTOS-SETUP.md
 */

// Carpeta de Drive donde se guardan las fotos (la que ya tienes enlazada).
var FOLDER_ID = '1xM7hqMWeDcW0iuHcg2K6pqjj_Z5hp9Vj';

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var bytes = Utilities.base64Decode(body.data);
    var name = body.filename || ('foto_' + Date.now() + '.jpg');
    var blob = Utilities.newBlob(bytes, body.mimeType || 'image/jpeg', name);
    var folder = DriveApp.getFolderById(FOLDER_ID);
    var file = folder.createFile(blob);
    return jsonResponse({ ok: true, id: file.getId(), name: name });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

// Permite comprobar en el navegador que el script está publicado.
function doGet() {
  return jsonResponse({ ok: true, status: 'listo' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
