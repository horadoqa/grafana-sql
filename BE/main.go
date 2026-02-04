package main

import (
	"crud-go-gin/db"
	"crud-go-gin/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()

	r := gin.Default()

	// 🔐 Middleware CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173", // Vite
		},
		AllowMethods: []string{
			"GET", "POST", "PUT", "DELETE", "OPTIONS",
		},
		AllowHeaders: []string{
			"Content-Type",
		},
	}))

	routes.SetupRoutes(r)

	r.Run(":8080")
}
