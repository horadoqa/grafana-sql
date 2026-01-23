# Querys

SELECT COUNT(*) FROM pg_catalog.pg_tables;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.candidatos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_completo TEXT NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  estado_civil TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  criado_em TIMESTAMP DEFAULT now(),
  atualizado_em TIMESTAMP DEFAULT now()
);

INSERT INTO public.candidatos (nome_completo, cpf, data_nascimento, estado_civil, email, telefone)
SELECT
  'Raimundo Correa',
  '12345678910',
  '1956-01-24',
  'casado',
  'email-raimundo@teste.com',
  '+55714567897'
WHERE NOT EXISTS (
  SELECT 1 FROM public.candidatos WHERE cpf = '12345678910'
);

SELECT *
FROM public.candidatos