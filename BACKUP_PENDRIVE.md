# BACKUP_PENDRIVE

## Objetivo
Crear una copia offline de **Elevate Training / Impulso Gym** que puedas guardar en un pendrive sin arrastrar dependencias pesadas ni secretos reales.

## Cómo generar la copia
```bash
cd "/Users/antonio/Documents/3. Webs/www.elevatetraining.com-1773934565511-cfe74a"
./scripts/create-backup.sh
```

## Qué incluye la exportación
- `.tar.gz` con código y documentación
- `.bundle` con historial git completo
- `MANIFIESTO_BACKUP.txt`
- `SHA256SUMS.txt`

## Qué NO incluir
- `.tools/`
- `.vercel-global/`
- `.vercel/`
- secretos reales
- caches y archivos temporales

## Cómo guardar en el pendrive
1. Crear carpeta `www.elevatetraining.com-1773934565511-cfe74a-copia-seguridad-2026-04-01`.
2. Copiar dentro el contenido de `backup-export/generated/ULTIMA_FECHA/`.
3. Guardar secretos por separado en gestor de contraseñas o archivo cifrado.

## Cómo verificar la copia
```bash
cd /ruta/al/pendrive/www.elevatetraining.com-1773934565511-cfe74a-copia-seguridad-2026-04-01
shasum -a 256 -c SHA256SUMS.txt
git bundle verify *.bundle
tar -tzf *.tar.gz | head
```
