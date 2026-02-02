# Querys Utilizadas

-- Cria a extensão necessária para gerar UUID automaticamente

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

-- Cria a tabela candidatos caso ainda não exista
-- Inclui chave primária UUID, campos obrigatórios e timestamps

```sql
CREATE TABLE IF NOT EXISTS candidatos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_completo TEXT NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  sexo VARCHAR(10) NOT NULL,
  data_nascimento DATE NOT NULL,
  estado_civil TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  criado_em TIMESTAMP DEFAULT now(),
  atualizado_em TIMESTAMP DEFAULT now()
);
```

-- Insere um candidato específico
-- Evita duplicação verificando se o CPF já existe

```sql
INSERT INTO public.candidatos 
(nome_completo, cpf, data_nascimento, estado_civil, email, telefone, sexo)
SELECT
  'Fulano de tal',
  '1234567890',
  '1956-01-24',
  'casado',
  'email-fulano@teste.com',
  '+55714567897',
  'M'
WHERE NOT EXISTS (
  SELECT 1 
  FROM public.candidatos 
  WHERE cpf = '1234567890'
);
```

-- Retorna todos os candidatos cadastrados

```sql
SELECT * 
FROM public.candidatos;
```

-- Conta o total de registros da tabela candidatos

```sql
SELECT COUNT(*) 
FROM candidatos;
```

-- Lista ID, nome e sexo de todos os candidatos

```sql
SELECT id, nome_completo, sexo
FROM public.candidatos;
```

-- Procurar pelo nome do candidato

```sql
SELECT *
FROM public.candidatos
WHERE nome_completo = 'Fulano de tal';
```

-- Busca parcial (contém o texto)
-- Muito usada quando você não sabe o nome completo:

```sql
SELECT *
FROM public.candidatos
WHERE nome_completo LIKE '%Fulano%';
```

-- Alterar o email com base no IF

```sql
UPDATE public.candidatos
SET email = 'novo-email@teste.com'
WHERE id = 'b5ff10ae-8a15-4afb-ad89-e8ad7836d90c';
```

-- Alterar o email com base no CPF

```sql
UPDATE public.candidatos
SET email = 'novo-email@teste.com'
WHERE cpf = '1234567890 ';
```

-- Remove a uma coluna da tabela (operação destrutiva)

```sql
ALTER TABLE public.candidatos
DROP COLUMN {nome da coluna};
```

-- Adiciona uma coluna caso não exista

```sql
ALTER TABLE public.candidatos
ADD COLUMN IF NOT EXISTS {nome da coluna} VARCHAR(10);
```

-- Consulta ID, nome e sexo ordenados alfabeticamente

```sql
SELECT id, nome_completo, sexo
FROM public.candidatos
ORDER BY nome_completo ASC;
```

-- Remove o prefixo "Srta. " do nome dos candidatos

```sql
UPDATE public.candidatos
SET nome_completo = REPLACE(nome_completo, 'Srta. ', '')
WHERE nome_completo LIKE 'Srta. %';
```

-- Retorna apenas a estrutura da tabela (sem dados)

```sql
SELECT * 
FROM public.candidatos 
LIMIT 0;
```

-- Remove a tabela candidatos (falha se houver dependências)

```sql
DROP TABLE public.candidatos;
```

-- Remove a tabela candidatos e todas as dependências

```sql
DROP TABLE public.candidatos CASCADE;
```

-- Renomeia a tabela candidato para candidatos

```sql
ALTER TABLE public.candidato
RENAME TO candidatos;
```

-- Retorna a quantidade de candidatos cadastrados por dia
-- Ideal para gráficos de série temporal

```sql
SELECT 
  DATE(criado_em) AS time, 
  COUNT(*) AS quantidade 
FROM public.candidatos 
GROUP BY time 
ORDER BY time;
```

-- Retorna a primeira data de cadastro, a última e o total de registros

```sql
SELECT
  MIN(criado_em),
  MAX(criado_em),
  COUNT(*)
FROM public.candidatos;
```

-- Retorna a quantidade de candidatos agrupados por dia (versão detalhada)

```sql
SELECT
  DATE(criado_em) AS time,
  COUNT(*) AS quantidade
FROM public.candidatos
GROUP BY time
ORDER BY time;
```

-- Verifica o impacto de timezone nas datas de criação
-- Útil para depurar gráficos no Grafana

```sql
SELECT
  criado_em,
  criado_em AT TIME ZONE 'UTC',
  criado_em AT TIME ZONE 'America/Sao_Paulo'
FROM public.candidatos
ORDER BY criado_em DESC
LIMIT 5;
```

-- Gera uma série diária dos últimos 30 dias
-- Inclui dias sem cadastro (quantidade = 0)
-- Ideal para gráficos contínuos no Grafana

```sql
SELECT
  d::date AS time,
  COUNT(c.id) AS quantidade
FROM generate_series(
  now() - interval '30 days',
  now(),
  interval '1 day'
) d
LEFT JOIN public.candidatos c
  ON DATE(c.criado_em) = d::date
GROUP BY d
ORDER BY d;
```