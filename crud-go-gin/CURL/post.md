Adicionando Candidato

```bash
curl -X POST http://localhost:8080/candidatos \
  -H "Content-Type: application/json" \
  -d '{
    "nome_completo": "João da Silva",
    "cpf": "12345678901",
    "sexo": "masculino",
    "data_nascimento": "1990-05-20",
    "estado_civil": "solteiro",
    "email": "joao.silva@email.com",
    "telefone": "11999999999"
  }'
```

Resposta:
```bash
  {"id":"cb091996-bc53-4820-98d8-225acd52981f","nome_completo":"João da Silva","cpf":"12345678901","sexo":"masculino","data_nascimento":"1990-05-20","estado_civil":"solteiro","email":"joao.silva@email.com","telefone":"11999999999","criado_em":"0001-01-01T00:00:00Z","atualizado_em":"0001-01-01T00:00:00Z"}%
```