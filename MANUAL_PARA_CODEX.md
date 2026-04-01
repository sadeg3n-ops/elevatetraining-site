# MANUAL_PARA_CODEX

## Arquitectura actual
- `01_site/01_entry/index.html`: punto de entrada.
- `01_site/02_assets/01_bundle/`: bundle generado.
- `01_site/02_assets/02_styles/`: estilos de personalización.
- `01_site/02_assets/03_logic/`: scripts de copy, FAQ, clases, equipo y enlaces.
- `01_site/02_assets/04_media/`: recursos visuales.
- `01_site/03_tools/`: preview y publish locales.
- `vercel.json`: enruta todo hacia `01_site/01_entry/index.html`.

## Flujo actual de captación
- No hay backend propio de formulario detectado.
- La captación depende de enlaces/CTA front-end y scripts estáticos.
- Si en el futuro se añade un formulario real, documentar backend, seguridad y proveedor antes de publicar.

## Variables de entorno necesarias
- Actualmente no se detectan variables de entorno obligatorias dentro del repo.
- No subir secretos ni ficheros de Vercel locales.

## Decisiones de seguridad importantes
- Mantener `.vercel/` y `.vercel-global/` fuera de git.
- No versionar herramientas locales pesadas (`.tools/`).
- No meter secretos en HTML/JS estático.
- No tocar `vercel.json` sin revisar rutas y despliegue.

## Qué no se debe tocar sin cuidado
- `vercel.json`
- `01_site/01_entry/index.html`
- scripts de `01_site/03_tools/`
- archivos del bundle en `01_site/02_assets/01_bundle/` salvo que sepas regenerarlos

## Checklist antes de modificar producción
1. revisar `git status`
2. comprobar preview local
3. revisar CTA y enlaces
4. no tocar herramientas/secrets locales por error

## Checklist antes de desplegar
1. validar preview local
2. confirmar que `vercel.json` sigue correcto
3. ejecutar deploy
4. abrir https://elevatetraining-site.vercel.app y revisar hero, equipo, FAQ y footer

## Notas para futuro Codex
- Este repo no funciona como las landings Next.js del resto.
- La estructura reorganizada bajo `01_site/` es deliberada.
- Si cambias rutas, revisa también scripts y `vercel.json`.
