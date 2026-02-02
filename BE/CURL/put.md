# PUT - Alterando informação

```bash
curl -X PUT http://localhost:8080/candidatos/0f2fbf35-aae8-4594-8945-a2676ed46680 \
  -H "Content-Type: application/json" \
  -d '{
    "nome_completo": "João da Silva",
    "cpf": "12345678901",
    "sexo": "masculino",
    "data_nascimento": "1990-05-20",
    "estado_civil": "solteiro",
    "email": "novo@email.com",
    "telefone": "11988887777"
  }'
```

Resposta:

```bash
{"message":"Candidato atualizado com sucesso"}%
```

## Atualizar email e telefone
```bash
curl -s http://localhost:8080/candidatos/cpf/12345678901 \
  | jq '.email = "novo@email.com" | .telefone = "11988887777"' \
  | curl -X PUT http://localhost:8080/candidatos/0f2fbf35-aae8-4594-8945-a2676ed46680 \
        -H "Content-Type: application/json" \
        -d @-
```

## só o email de um candidato com CPF 12345678901:

```bash
curl -s http://localhost:8080/candidatos/cpf/12345678901 \
  | jq '.email = "novo.email@email.com"' \
  | curl -X PUT http://localhost:8080/candidatos/0f2fbf35-aae8-4594-8945-a2676ed46680 \
        -H "Content-Type: application/json" \
        -d @-
```