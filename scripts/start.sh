#!/bin/bash

start_api_one() {
  echo 'Starting API One!'
  cd api-one && nodemon .
}

start_api_two() {
  echo 'Starting API Two'
  cd api-two && nodemon .
}

start_api_one & start_api_two
