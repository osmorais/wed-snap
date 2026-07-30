#!/bin/sh
# Roda depois de `next build` (via "postbuild"). O Next.js gera o pacote
# standalone com o node_modules "vizinho" de apps/web (não dentro dele),
# porque as dependências ficam hospedadas (hoisted) no node_modules da raiz
# do monorepo. Hospedagens que só copiam o conteúdo do "Root Directory"
# (ex.: Hostinger) deixam esse node_modules pra trás, e o servidor quebra
# com "Cannot find module 'next'". Este script deixa o pacote de apps/web
# autocontido de verdade, copiando tudo que falta pra dentro dele.
set -e

STANDALONE_ROOT=".next/standalone"
APP_DIR="$STANDALONE_ROOT/apps/web"

cp -r public "$APP_DIR/public"
mkdir -p "$APP_DIR/.next/static"
cp -r .next/static/. "$APP_DIR/.next/static/"

mkdir -p "$APP_DIR/node_modules"
cp -rL "$STANDALONE_ROOT"/node_modules/. "$APP_DIR/node_modules/"

# Pacotes com binário nativo (ex.: Prisma) ganham, dentro do próprio .next
# gerado, um symlink relativo apontando pro node_modules "vizinho" (fora de
# apps/web) — quebra assim que só a pasta apps/web é copiada isolada.
# Substitui qualquer link desses (em qualquer lugar da árvore) pelo
# conteúdo real, já copiado acima.
APP_DIR_ABS=$(cd "$APP_DIR" && pwd)
find "$APP_DIR" -type l | while IFS= read -r link; do
  target=$(readlink -f "$link")
  case "$target" in
    "$APP_DIR_ABS"/*) ;;
    *)
      rm "$link"
      cp -r "$target" "$link"
      ;;
  esac
done
