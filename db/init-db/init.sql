-- habilitar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- criar tabela de candidatos
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

-- tabela de endereços
CREATE TABLE IF NOT EXISTS enderecos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidato_id UUID NOT NULL REFERENCES candidatos(id) ON DELETE CASCADE,
  logradouro TEXT NOT NULL,
  numero TEXT NOT NULL,
  complemento TEXT,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado CHAR(2) NOT NULL,
  cep CHAR(8) NOT NULL,
  criado_em TIMESTAMP DEFAULT now()
);
