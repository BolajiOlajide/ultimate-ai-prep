#!/bin/bash

run_test_api_one() {
  cd api-one
  yarn test
  cd -
}

run_test_api_two() {
  cd api-two
  yarn test
  cd -
}

run_test_api_one && run_test_api_two
