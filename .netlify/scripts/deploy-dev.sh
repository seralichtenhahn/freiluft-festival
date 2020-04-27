#!/usr/bin/env bash

set -e
yarn generate
cp .netlify/headers_dev dist/_headers
cp .netlify/redirects dist/_redirects
