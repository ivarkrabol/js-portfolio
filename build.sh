#!/bin/bash

until [[ -f ./docker-compose.yml ]] || [[ $PWD == / ]]; do
  cd ..
done

echo "Building"
docker-compose run closure-compiler
