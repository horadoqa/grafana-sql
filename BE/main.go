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
