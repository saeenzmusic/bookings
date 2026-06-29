# SAEENZ | UNDERSWITCH — Página de disponibilidad de booking

Sitio estático simple para mostrar disponibilidad de fechas y recibir solicitudes de booking. Pensado para alojarse gratis en GitHub Pages.

## Archivos

- `index.html` — estructura de la página y el formulario
- `style.css` — estilos (tema oscuro)
- `script.js` — lógica del calendario y envío del formulario
- `bookings.json` — **el único archivo que vas a editar regularmente**

## 1. Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (puede ser público).
2. Subí estos 4 archivos a la raíz del repo (podés arrastrarlos desde la web de GitHub, "Add file" → "Upload files").
3. Entrá a **Settings → Pages**.
4. En "Source" elegí la rama `main` y carpeta `/ (root)`.
5. Guardá. En 1-2 minutos tu sitio queda en:
   `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`

## 2. Conectar el formulario a tu email (Formspree)

1. Creá una cuenta gratis en [formspree.io](https://formspree.io).
2. Creá un formulario nuevo, te va a dar una URL tipo:
   `https://formspree.io/f/xxxxxxxx`
3. Abrí `index.html`, buscá esta línea:
   ```html
   <form id="bookingForm" action="https://formspree.io/f/TU_ENDPOINT_AQUI" method="POST">
   ```
4. Reemplazá `TU_ENDPOINT_AQUI` por tu endpoint real de Formspree.
5. Guardá y subí el cambio al repo (commit).
6. La primera vez que alguien envíe el formulario, Formspree te va a pedir confirmar tu email — es normal, solo pasa una vez.

El plan gratis de Formspree permite 50 envíos por mes, que debería sobrarte.

## 3. Cómo agregar/quitar una fecha reservada

Cada vez que confirmes una reserva (o se cancele una), editás `bookings.json` directo desde GitHub:

1. Entrá al repo en GitHub, abrí `bookings.json`.
2. Click en el ícono de lápiz (editar).
3. Agregá o quitá la fecha en formato `"YYYY-MM-DD"`, separadas por coma.

   Ejemplo con dos fechas reservadas:
   ```json
   {
     "booked": ["2026-07-18", "2026-08-02"]
   }
   ```
4. Click en "Commit changes".
5. El cambio se refleja en el sitio en aproximadamente 1 minuto.

No hace falta tocar ningún otro archivo para esto.

## 4. Sobre el selector de mes

La página arranca siempre mostrando el mes actual. Las flechas `‹` `›` dejan navegar a cualquier mes, pasado o futuro, sin límite — así un promotor que quiere reservar con 6 meses de anticipación puede revisar esa disponibilidad sin problema.

Por ahora el calendario muestra 4 fechas de referencia por mes (días 4, 11, 18 y 25), igual al diseño original. Si más adelante querés mostrar *todos* los días del mes en vez de solo esas 4 fechas, decímelo y lo ajustamos — es un cambio simple en `script.js`.

## 5. Personalización rápida

- **Nombre/marca**: cambiá el texto dentro de `<h1 class="logo">` en `index.html`.
- **Colores**: están todos definidos arriba de `style.css`, en la sección `:root`. Cambiá `--green` y `--red` si querés otra paleta.
- **Tipos de evento** del formulario: editá las `<option>` dentro del `<select id="eventType">` en `index.html`.
