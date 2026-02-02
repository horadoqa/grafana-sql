# Atualinzado informações

## EMAIL

```bash
curl -X PATCH http://localhost:8080/candidatos/UUID/contato \
  -H "Content-Type: application/json" \
  -d '{"email":"novo.email@email.com"}'
```

# Telefone

```bash
curl -X PATCH http://localhost:8080/candidatos/UUID/contato \
  -H "Content-Type: application/json" \
  -d '{"telefone":"11988887777"}'
```

## Os dois

```bash
curl -X PATCH http://localhost:8080/candidatos/UUID/contato \
  -H "Content-Type: application/json" \
  -d '{
    "email":"novo@email.com",
    "telefone":"11988887777"
  }'
```