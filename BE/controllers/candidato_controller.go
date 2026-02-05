package controllers

import (
	"crud-go-gin/db"
	"crud-go-gin/models"
	"net/http"
	"strconv"
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// POST /candidatos
func CreateCandidato(c *gin.Context) {
	var candidato models.Candidato

	if err := c.ShouldBindJSON(&candidato); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	candidato.ID = uuid.New().String()

	query := `
		INSERT INTO candidatos
		(id, nome_completo, cpf, sexo, data_nascimento, estado_civil, email, telefone)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
	`

	_, err := db.DB.Exec(
		query,
		candidato.ID,
		candidato.NomeCompleto,
		candidato.CPF,
		candidato.Sexo,
		candidato.DataNascimento,
		candidato.EstadoCivil,
		candidato.Email,
		candidato.Telefone,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, candidato)
}

// GET /candidatos
func GetCandidatos(c *gin.Context) {
	rows, err := db.DB.Query(`
		SELECT id, nome_completo, cpf, sexo, data_nascimento, estado_civil, email, telefone
		FROM candidatos
	`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var candidatos []models.Candidato

	for rows.Next() {
		var cand models.Candidato
		rows.Scan(
			&cand.ID,
			&cand.NomeCompleto,
			&cand.CPF,
			&cand.Sexo,
			&cand.DataNascimento,
			&cand.EstadoCivil,
			&cand.Email,
			&cand.Telefone,
		)
		candidatos = append(candidatos, cand)
	}

	c.JSON(http.StatusOK, candidatos)
}

// GET /cpf/
func GetCandidatoByCPF(c *gin.Context) {
	cpf := c.Param("cpf")

	var candidato models.Candidato
	err := db.DB.QueryRow(`
		SELECT id, nome_completo, cpf, sexo, data_nascimento, estado_civil, email, telefone, criado_em, atualizado_em
		FROM candidatos
		WHERE cpf = $1
	`, cpf).Scan(
		&candidato.ID,
		&candidato.NomeCompleto,
		&candidato.CPF,
		&candidato.Sexo,
		&candidato.DataNascimento,
		&candidato.EstadoCivil,
		&candidato.Email,
		&candidato.Telefone,
		&candidato.CriadoEm,
		&candidato.AtualizadoEm,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Candidato não encontrado !!!"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, candidato)
}


// PATCH /candidatos/:id
// Struct para atualização parcial de contato
type UpdateContatoCandidatoRequest struct {
    Email    *string `json:"email"`    // ponteiro permite update parcial
    Telefone *string `json:"telefone"` // ponteiro permite update parcial
}

func UpdateContatoCandidato(c *gin.Context) {
	id := c.Param("id")

	var req UpdateContatoCandidatoRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if req.Email == nil && req.Telefone == nil {
		c.JSON(400, gin.H{
			"error": "informe ao menos email ou telefone",
		})
		return
	}

	query := "UPDATE candidatos SET "
	args := []interface{}{}
	i := 1

	if req.Email != nil {
		query += "email = $" + strconv.Itoa(i)
		args = append(args, *req.Email)
		i++
	}

	if req.Telefone != nil {
		if len(args) > 0 {
			query += ", "
		}
		query += "telefone = $" + strconv.Itoa(i)
		args = append(args, *req.Telefone)
		i++
	}

	query += ", atualizado_em = now() WHERE id = $" + strconv.Itoa(i)
	args = append(args, id)

	result, err := db.DB.Exec(query, args...)
	if err != nil {
		// erro comum: email duplicado (UNIQUE)
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		c.JSON(404, gin.H{"error": "candidato não encontrado"})
		return
	}
	
	c.Status(204)

	// c.JSON(http.StatusOK, gin.H{
	// 	"message": "Informações atualizadas com sucesso",
	// })
	
}


// PUT /candidatos/:id
func UpdateCandidato(c *gin.Context) {
	id := c.Param("id")

	var candidato models.Candidato
	if err := c.ShouldBindJSON(&candidato); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		UPDATE candidatos
		SET nome_completo=$1, sexo=$2, estado_civil=$3, email=$4, telefone=$5, atualizado_em=now()
		WHERE id=$6
	`

	_, err := db.DB.Exec(
		query,
		candidato.NomeCompleto,
		candidato.Sexo,
		candidato.EstadoCivil,
		candidato.Email,
		candidato.Telefone,
		id,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Candidato atualizado com sucesso"})
}

// DELETE /candidatos/:id
func DeleteCandidato(c *gin.Context) {
	id := c.Param("id")

	_, err := db.DB.Exec(`DELETE FROM candidatos WHERE id=$1`, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Candidato removido com sucesso"})
}
