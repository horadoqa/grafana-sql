# Candidatos

## Todos os Candidatos

```bash
curl http://localhost:8080/candidatos/
```

## Busca por CPF
```bash
curl http://localhost:8080/candidatos/cpf/12345678901                     
```
Resposta:

```bash                 
{"id":"0f2fbf35-aae8-4594-8945-a2676ed46680","nome_completo":"João da Silva","cpf":"12345678901","sexo":"masculino","data_nascimento":"1990-05-20T00:00:00Z","estado_civil":"solteiro","email":"novo@email.com","telefone":"11988887777","criado_em":"2026-02-02T14:09:37.260702Z","atualizado_em":"2026-02-02T14:41:10.267602Z"}% 
```