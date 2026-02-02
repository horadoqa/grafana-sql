#!/bin/bash

DATA=$(date +%Y%m%d_%H%M)
docker exec postgres pg_dump -U admin -d app_db > backup_$DATA.sql
