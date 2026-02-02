package models

import "time"

type Candidato struct {
	ID             string    `json:"id"`
	NomeCompleto   string    `json:"nome_completo" binding:"required"`
	CPF            string    `json:"cpf" binding:"required,len=11"`
	Sexo           string    `json:"sexo" binding:"required"`
	DataNascimento string    `json:"data_nascimento" binding:"required"`
	EstadoCivil    string    `json:"estado_civil" binding:"required"`
	Email          string    `json:"email" binding:"required,email"`
	Telefone       string    `json:"telefone"`
	CriadoEm       time.Time `json:"criado_em"`
	AtualizadoEm   time.Time `json:"atualizado_em"`
}

type UpdateContatoCandidatoRequest struct {
	Email    *string `json:"email"`
	Telefone *string `json:"telefone"`
}
