#!/bin/bash
set -e
npm install
npm link --force
echo "CLI Beemm Vision installé. Commandes disponibles : 'beemmvision' (canonique) et 'visionboard' (alias)."
echo "Vérification : $(beemmvision --version 2>/dev/null || echo 'relancez votre shell puis tapez beemmvision --version')"
