# Conectando ao banco de Dados

1️⃣ No terminal

```bash
psql -h localhost -p 5432 -U admin -d app_db
```

2️⃣ Se estiver usando Windows + Docker Desktop ou WSL

No Windows com Docker Desktop, localhost geralmente funciona.

No WSL, às vezes você precisa do IP do WSL, ou usar host.docker.internal como host.

Teste:

```bash
psql -h host.docker.internal -p 5432 -U admin -d app_db
```

Se funcionar, no DBeaver use host.docker.internal no lugar de localhost.