# Configurar la subida de fotos a Google Drive

La web ya tiene los botones de **"Hacer una foto"** y **"Subir fotos"** (arriba del todo y en la sección de fotos).
Para que las fotos se guarden solas en tu carpeta de Drive, hay que crear un pequeño script en tu cuenta de Google. Es un paso único de ~5 minutos.

> Importante: los invitados **no** necesitan iniciar sesión. El script guarda las fotos con **tus** permisos.

---

## Paso 1 — Crear el script

1. Entra en **https://script.google.com** con la cuenta de Google **dueña de la carpeta de Drive**.
2. Pulsa **Nuevo proyecto**.
3. Borra el código de ejemplo y pega **todo** el contenido del archivo [`apps-script-fotos.gs`](apps-script-fotos.gs) (está en este mismo repo).
4. Ponle un nombre al proyecto (ej. "Fotos Boda") y guarda (icono del disquete o `Ctrl+S`).

La carpeta ya está puesta en el script (el ID `1xM7hqMWeDcW0iuHcg2K6pqjj_Z5hp9Vj`, la misma que tienes enlazada). No hay que tocar nada.

## Paso 2 — Publicar como aplicación web

1. Arriba a la derecha, pulsa **Implementar** → **Nueva implementación**.
2. En el engranaje ⚙️ (tipo), elige **Aplicación web**.
3. Configura así:
   - **Descripción:** lo que quieras.
   - **Ejecutar como:** **Yo** (tu correo).
   - **Quién tiene acceso:** **Cualquier persona**.  ← imprescindible
4. Pulsa **Implementar**.
5. Google te pedirá **autorizar** los permisos (para escribir en tu Drive). Acepta:
   - "Revisar permisos" → elige tu cuenta → "Configuración avanzada" → "Ir a (nombre) no seguro" → **Permitir**.
   - (Sale ese aviso porque el script es tuyo y aún no está verificado por Google; es normal.)
6. Copia la **URL de la aplicación web** que aparece. Termina en **`/exec`**.

## Paso 3 — Pegar la URL en la web

1. Abre [`index.html`](index.html) y busca esta línea (cerca del final, dentro del `<script>`):

   ```js
   const PHOTO_UPLOAD_URL = 'PEGA_AQUI_LA_URL_DEL_APPS_SCRIPT';
   ```

2. Sustituye `PEGA_AQUI_LA_URL_DEL_APPS_SCRIPT` por la URL que copiaste (déjala entre comillas). Ejemplo:

   ```js
   const PHOTO_UPLOAD_URL = 'https://script.google.com/macros/s/AKfy.../exec';
   ```

3. Guarda, haz `commit` y `push`. Listo.

---

## Probar

Abre la web en el móvil:
- **Hacer una foto** → se abre la cámara → al aceptar, se sube sola.
- **Subir fotos** → se abre la galería (puedes elegir varias).

Aparece un aviso abajo ("Subiendo… / ¡Gracias!") y la foto aparece en tu carpeta de Drive.

## Si cambias el código del script más adelante

Cada vez que edites `apps-script-fotos.gs` en script.google.com, tienes que volver a **Implementar → Gestionar implementaciones → editar (lápiz) → Versión: Nueva → Implementar** para que los cambios entren en vigor. La URL `/exec` se mantiene igual.

## Notas

- Las fotos se comprimen en el móvil antes de subir (lado más largo ~1920 px, calidad alta). Suficiente para recuerdos y mucho más rápido. Si quieres calidad original, avísame y lo quito.
- Los nombres de archivo se generan con fecha/hora para que no se pisen entre sí.
