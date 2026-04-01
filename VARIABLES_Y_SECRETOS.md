# VARIABLES_Y_SECRETOS

## Regla principal
**No subas secretos reales a GitHub.**

## Variables detectadas
- Actualmente no se detectan variables de entorno obligatorias dentro del repo estático.
- La publicación depende de Vercel y de herramientas locales que no deben versionarse (`.vercel-global`, `.vercel/`).

## Dónde se configuran
- Acceso a Vercel: fuera del repo, mediante login y configuración local.
- Dominio/entorno: en el panel de Vercel si aplica.

## Qué es público y qué es secreto
- URLs públicas del sitio: públicas.
- tokens de Vercel, credenciales de dominio o API: secretos.

## Dónde guardar secretos
- 1Password / Bitwarden / archivo cifrado fuera del repo.
