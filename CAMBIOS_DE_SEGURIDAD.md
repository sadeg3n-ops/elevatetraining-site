# CAMBIOS_DE_SEGURIDAD

## Resumen honesto
Este proyecto es una web estática. No se han detectado medidas avanzadas de backend como Turnstile, validación server-side, rate limiting o cuarentena.

La mejora hecha con esta copia de seguridad es **operacional**:
- exclusión clara de secretos y archivos sensibles en `.gitignore`;
- manuales de recuperación y secretos;
- script de backup offline;
- rama y tag de copia estable.

## Qué había antes
- no había un manual de recuperación total;
- no había export estándar para pendrive;
- no había inventario de qué protecciones existen y cuáles no;
- no había una copia estable fácil de señalar en GitHub.

## Qué se implementó exactamente
- Documentación de backup, recuperación y secretos.
- Script `scripts/create-backup.sh`.
- Endurecimiento de `.gitignore`.
- Estrategia de rama + tag de copia estable.

## Inventario de medidas

| Medida | Estado actual | Archivo | Cómo comprobar |
|---|---|---|---|
| Turnstile | No implementado | N/A | No hay integración detectada. |
| Validación server-side | No implementada | N/A | No hay backend propio. |
| Token firmado de formulario | No implementado | N/A | No hay emisión/verificación de token. |
| Cookie HttpOnly + SameSite=Strict | No implementada | N/A | No hay backend de captación que la use. |
| Tiempo mínimo de envío | No implementado | N/A | No hay formulario protegido en servidor. |
| Honeypot | No implementado | N/A | No hay campo trampa. |
| Filtro anti insultos / spam / abuse | No implementado | N/A | No hay pipeline backend. |
| Allow / review / drop | No implementado | N/A | No hay clasificación de leads. |
| Cuarentena | No implementada | N/A | No existe almacenamiento en revisión. |
| Protección replay / duplicados | No implementada | N/A | No hay nonce/control de duplicidad. |
| Rate limiting | No implementado | N/A | No hay API propia. |
| Origin allowlist | No implementado | N/A | No hay endpoint backend. |
| JSON-only | No implementado | N/A | No hay API JSON propia. |
| Límites de tamaño | No implementados | N/A | No hay backend con request body propio. |
| Errores públicos genéricos | No aplica hoy | N/A | No hay backend de captación. |
| Seguridad del email | No implementada | N/A | No hay envío de email server-side. |
| Headers de seguridad custom | No detectados en repo | N/A | Verificar manualmente si se añaden en Vercel. |
| Integración Cloudflare | No detectada | N/A | Hoy la publicación depende de Vercel. |
| Integración Vercel | Sí, a nivel de despliegue | `vercel.json`, herramientas locales, proyecto en Vercel | Verificar despliegue HTTPS y rutas. |
| Exclusión de secretos en git | Sí | `.gitignore` | Confirmar que `.vercel-global/`, `.vercel/` y `.env*` no se suben. |

## Archivos tocados
- `.gitignore`
- `README_BACKUP.md`
- `RECUPERACION_TOTAL.md`
- `CAMBIOS_DE_SEGURIDAD.md`
- `MANUAL_PARA_CODEX.md`
- `BACKUP_PENDRIVE.md`
- `VARIABLES_Y_SECRETOS.md`
- `scripts/create-backup.sh`

## Pendiente u opcional
- Si se añade formulario real o backend, implementar protección anti-spam antes de abrir tráfico.
- Si se usa dominio propio, documentar DNS y renovación.
- Si se usan integraciones externas, documentarlas fuera del repo y en un gestor de contraseñas.

## Cómo comprobar que la protección operativa sigue activa
1. `git status --ignored` debe dejar fuera `.vercel/`, `.vercel-global/` y secretos.
2. `./scripts/create-backup.sh` debe generar `.tar.gz` + `.bundle` + checksums.
3. Deben existir la rama `backup/copia-de-seguridad-completa-2026-04-01` y el tag `copia-seguridad-2026-04-01`.
