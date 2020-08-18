#!/bin/bash

git pull && npm run build && sudo nginx -s reload