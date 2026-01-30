# Querys Utilizadas

Conta quantas tabelas existem no banco (todas as schemas)

```sql
SELECT COUNT(*) 
FROM pg_catalog.pg_tables;
```

-- Lista os nomes das schemas existentes no banco

```sql
SELECT schemaname 
FROM pg_catalog.pg_tables;
```

-- Lista todas as tabelas pertencentes à schema "public"
-- (OBS: em PostgreSQL, strings usam aspas simples, não duplas)

```sql
SELECT * 
FROM pg_catalog.pg_tables 
WHERE schemaname = 'public';
```

-- Conta o total de registros da tabela candidatos

```sql
SELECT COUNT(*) 
FROM candidatos;
```

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

-- Conta novamente o total de candidatos

```sql
SELECT COUNT(*) 
FROM candidatos;
```

-- Lista ID, nome e sexo de todos os candidatos

```sql
SELECT id, nome_completo, sexo
FROM public.candidatos;
```

-- Remove a coluna sexo da tabela (operação destrutiva)

```sql
ALTER TABLE public.candidatos
DROP COLUMN sex;
```

-- Adiciona a coluna sexo caso não exista

```sql
ALTER TABLE public.candidatos
ADD COLUMN IF NOT EXISTS sexo VARCHAR(10);
```

-- Preenche a coluna sexo com base na última letra do nome
-- (heurística simples, não 100% confiável)

```sql
UPDATE public.candidatos
SET sexo = CASE
    WHEN nome_completo ILIKE '%a' THEN 'Feminino'
    ELSE 'Masculino'
END
WHERE sexo IS NULL;
```

-- Atualiza o sexo com base em nomes conhecidos
-- Se não corresponder, define como "Desconhecido"

```sql
UPDATE public.candidatos
SET sexo = CASE
    WHEN nome_completo ILIKE ANY (ARRAY['Alessandra%', 'Maria%', 'Ana%', 'Carla%']) THEN 'Feminino'
    WHEN nome_completo ILIKE ANY (ARRAY['João%', 'Carlos%', 'Pedro%', 'José%']) THEN 'Masculino'
    ELSE 'Desconhecido'
END
WHERE sexo IS NULL;
```

-- Atualiza manualmente o sexo de um candidato específico pelo ID

```sql
UPDATE public.candidatos
SET sexo = 'Masculino'
WHERE id = 'fd3aa7a0-ca36-4fd8-b4b4-4027f3f9c530';
```

-- Atualiza manualmente o sexo de outro candidato específico pelo ID

```sql
UPDATE public.candidatos
SET sexo = 'Feminino'
WHERE id = '4dbcaa33-0038-4a97-94b7-76e23636159c';
```

-- Consulta ID, nome e sexo (sem ordenação)

```sql
SELECT id, nome_completo, sexo
FROM public.candidatos;
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

-- Retorna todos os registros da tabela candidatos

```sql
SELECT * 
FROM public.candidatos;
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