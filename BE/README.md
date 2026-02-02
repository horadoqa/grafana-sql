Boa 😄 então bora converter **TODO o CRUD para Gin**, passo a passo, já no padrão que você usaria em produção.

Vou manter **PostgreSQL**, **UUID**, e organizar melhor o projeto.

---

## 📁 Estrutura final do projeto (com Gin)

```bash
crud-go-gin/
│── go.mod
│── main.go
│
├── db/
│   └── connection.go
│
├── models/
│   └── candidato.go
│
├── controllers/
│   └── candidato_controller.go
│
├── routes/
│   └── routes.go
```

---

## 1️⃣ Instalar dependências

```bash
go mod init crud-go-gin
go get github.com/gin-gonic/gin
go get github.com/lib/pq
go get github.com/google/uuid
```

---

## 2️⃣ Conexão com o banco (`db/connection.go`)

*(igual à versão anterior, sem mudanças)*

```go
package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() {
	connStr := fmt.Sprintf(
		"host=%s port=5432 user=%s password=%s dbname=%s sslmode=disable",
		getEnv("POSTGRES_HOST", "localhost"),
		getEnv("POSTGRES_USER", "admin"),
		getEnv("POSTGRES_PASSWORD", "admin"),
		getEnv("POSTGRES_DB", "app_db"),
	)

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal(err)
	}

	log.Println("✅ PostgreSQL conectado")
}

func getEnv(key, defaultValue string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return defaultValue
}
```

---

## 3️⃣ Model (`models/candidato.go`)

```go
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
```

👉 Note que o **Gin valida automaticamente** com `binding:"required"`.

---

## 4️⃣ Controller (CRUD) (`controllers/candidato_controller.go`)

```go
package controllers

import (
	"crud-go-gin/db"
	"crud-go-gin/models"
	"net/http"

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
```

---

## 5️⃣ Rotas (`routes/routes.go`)

```go
package routes

import (
	"crud-go-gin/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	candidatos := r.Group("/candidatos")
	{
		candidatos.POST("", controllers.CreateCandidato)
		candidatos.GET("", controllers.GetCandidatos)
		candidatos.PUT("/:id", controllers.UpdateCandidato)
		candidatos.DELETE("/:id", controllers.DeleteCandidato)
	}
}
```

---

## 6️⃣ Main (`main.go`)

```go
package main

import (
	"crud-go-gin/db"
	"crud-go-gin/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()

	r := gin.Default()

	routes.SetupRoutes(r)

	r.Run(":8080")
}
```

---

## 🧪 Testando a API (Gin)

### Criar candidato

```bash
POST http://localhost:8080/candidatos
```

### Listar

```bash
GET http://localhost:8080/candidatos
```

### Atualizar

```bash
PUT http://localhost:8080/candidatos/{id}
```

### Deletar

```bash
DELETE http://localhost:8080/candidatos/{id}
```

---

## 🔥 O que você ganhou com Gin?

✔️ Rotas limpas
✔️ Validação automática
✔️ JSON fácil
✔️ Código mais organizado
✔️ Padrão de mercado

---

Se quiser dar o **próximo passo**, posso:

* 🧱 Separar em **Repository + Service**
* 🔐 Adicionar **JWT**
* 📄 Gerar **Swagger**
* 🐳 Criar **docker-compose** completo
* 🧪 Testes automatizados

Qual você quer agora? 🚀

🧠 Resumo rápido
Situação	Comando
Desenvolver	go run .
Produção	go build → ./app
Docker	go build dentro do Dockerfile
