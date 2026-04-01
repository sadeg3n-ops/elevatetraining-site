# README_BACKUP

## Qué es esta copia
Esta copia convierte el repo estático de **Elevate Training / Impulso Gym** en una base estable, portable y fácil de recuperar.

## Qué contiene
- código fuente de la web estática;
- documentación de recuperación, seguridad y secretos;
- script `scripts/create-backup.sh` para exportar copia offline;
- rama/tag de copia estable.

## Datos rápidos del proyecto
- Ruta local esperada: `/Users/antonio/Documents/3. Webs/www.elevatetraining.com-1773934565511-cfe74a`
- GitHub: https://github.com/sadeg3n-ops/elevatetraining-site
- Producción esperada: https://elevatetraining-site.vercel.app
- Proyecto Vercel: `elevatetraining-site`
- Stack: HTML/CSS/JS estático + Vercel
- Vista previa local habitual: `./01_site/03_tools/preview.command`
- Deploy rápido habitual: `./01_site/03_tools/publish.command "mensaje"`

## Identificadores de la copia estable
- Rama de backup: `backup/copia-de-seguridad-completa-2026-04-01`
- Tag anotado: `copia-seguridad-2026-04-01`
- Fecha de la copia: `2026-04-01`

## Uso rápido recomendado
1. Trabaja en `main`.
2. No borres la rama/tag de copia estable.
3. Ejecuta `./scripts/create-backup.sh` antes de cambios críticos.
4. Mantén fuera del repo `.vercel-global`, secretos y herramientas locales.
5. Si hay desastre, sigue [`RECUPERACION_TOTAL.md`](./RECUPERACION_TOTAL.md).

## Release en GitHub
```bash
gh release create copia-seguridad-2026-04-01 \
  --repo sadeg3n-ops/elevatetraining-site \
  --title "Copia de seguridad 2026-04-01" \
  --notes "Backup estable del proyecto listo para recuperación total."
```

## Proteger la copia en GitHub
1. GitHub → `Settings` → `Rules` o `Branches`.
2. Regla para `backup/copia-de-seguridad-completa-*`.
3. Impedir borrado y force push.
4. No borrar ni reutilizar el tag `copia-seguridad-2026-04-01`.
