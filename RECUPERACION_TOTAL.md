# RECUPERACION_TOTAL

## Objetivo
Recuperar **Elevate Training / Impulso Gym** desde cero aunque se pierda el ordenador o la carpeta local.

## Qué necesitas
- Git
- Python 3 para preview simple
- Node.js + npm si vas a usar la CLI de Vercel
- acceso a GitHub y Vercel

## Recuperación paso a paso
1. **Clonar el repo**
   ```bash
   git clone https://github.com/sadeg3n-ops/elevatetraining-site.git
   cd "www.elevatetraining.com-1773934565511-cfe74a"
   ```
2. **Restaurar herramientas mínimas**
   - Si no tienes la carpeta local `.tools`, instala Node.js 20 LTS.
   - Instala la CLI de Vercel:
     ```bash
     npm install -g vercel
     ```
3. **Vista previa local**
   Opción simple:
   ```bash
   python3 -m http.server 4173
   ```
   Luego abre:
   - `http://127.0.0.1:4173/01_site/01_entry/index.html`
4. **Vincular Vercel**
   ```bash
   vercel login
   vercel link
   ```
5. **Desplegar en Vercel**
   ```bash
   vercel deploy --prod --yes
   ```
6. **Comprobar Turnstile**
   - Estado actual: no implementado.
7. **Comprobar formulario / captación**
   - Esta web es estática. Verifica enlaces críticos, CTA, WhatsApp/Calendly o scripts front-end que existan.
8. **Comprobar correo**
   - No hay backend de email en el repo.
9. **Comprobar headers y seguridad**
   - HTTPS activo en producción.
   - `.vercel/` y `.vercel-global/` fuera de git.
   - sin secretos reales en repo.
10. **Validación final**
    - Abrir https://elevatetraining-site.vercel.app
    - Revisar hero, CTA, equipo, FAQ, footer y preview social.

## Checklist de desastre
1. clonar repo
2. instalar Node si hace falta
3. instalar Vercel CLI
4. revisar que no faltan secretos ni herramientas externas
5. abrir la preview local
6. desplegar en Vercel
7. comprobar Turnstile (no aplica hoy)
8. comprobar CTA y enlaces
9. comprobar correo (no aplica hoy)
10. comprobar HTTPS y secretos
