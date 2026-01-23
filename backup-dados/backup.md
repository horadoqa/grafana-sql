# Backup

Backup do banco inteiro
docker exec postgres pg_dump \
  -U admin \
  -d app_db \
  > backup_app_db.sql

  👉 Isso cria um arquivo backup_app_db.sql no seu computador, não dentro do container.


  Backup só dos dados
docker exec postgres pg_dump \
  -U admin \
  -d app_db \
  --data-only \
  > backup_dados.sql



  🔄 Como restaurar depois
🔹 Backup .sql
docker exec -i postgres psql \
  -U admin \
  -d app_db \
  < backup_app_db.sql



  ✔ Backup de TODOS os bancos
docker exec postgres pg_dumpall -U admin > backup_todos_bancos.sql