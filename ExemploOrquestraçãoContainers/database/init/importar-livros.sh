#!/bin/bash

echo "Importando livros para o MongoDB..."

mongoimport --host mongodb \
  -u admin -p senha123 --authenticationDatabase admin \
  --db livraria --collection livros --drop \
  --file /docker-entrypoint-initdb.d/livros.json --jsonArray

echo "Importação concluída."