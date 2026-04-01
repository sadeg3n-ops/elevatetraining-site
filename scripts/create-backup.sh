#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STAMP="$(date +%Y-%m-%d_%H-%M-%S)"
REPO_NAME="$(basename "$ROOT_DIR")"
EXPORT_DIR="$ROOT_DIR/backup-export/generated/$STAMP"
ARCHIVE_NAME="${REPO_NAME}-copia-seguridad-$STAMP"
TAR_FILE="$EXPORT_DIR/${ARCHIVE_NAME}.tar.gz"
BUNDLE_FILE="$EXPORT_DIR/${ARCHIVE_NAME}.bundle"
MANIFEST_FILE="$EXPORT_DIR/MANIFIESTO_BACKUP.txt"
SHA_FILE="$EXPORT_DIR/SHA256SUMS.txt"

mkdir -p "$EXPORT_DIR"

cat >"$MANIFEST_FILE" <<MANIFEST
Proyecto: $REPO_NAME
Ruta local: $ROOT_DIR
Fecha de exportación: $(date '+%Y-%m-%d %H:%M:%S %Z')
Commit HEAD: $(git -C "$ROOT_DIR" rev-parse HEAD)
Branch actual: $(git -C "$ROOT_DIR" branch --show-current)
Estado git:
$(git -C "$ROOT_DIR" status --short || true)
MANIFEST

git -C "$ROOT_DIR" bundle create "$BUNDLE_FILE" --all

COPYFILE_DISABLE=1 tar \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.vercel' \
  --exclude='.vercel-global' \
  --exclude='.tools' \
  --exclude='backup-export/generated' \
  --exclude='dist' \
  --exclude='.DS_Store' \
  --exclude='Training WEB - Antigravity' \
  -czf "$TAR_FILE" -C "$ROOT_DIR" .

(
  cd "$EXPORT_DIR"
  shasum -a 256 "$(basename "$TAR_FILE")" "$(basename "$BUNDLE_FILE")" "$(basename "$MANIFEST_FILE")" > "$(basename "$SHA_FILE")"
)

echo "Backup offline generado en: $EXPORT_DIR"
echo "- Código y documentación: $TAR_FILE"
echo "- Historial git completo: $BUNDLE_FILE"
echo "- Checksums: $SHA_FILE"
