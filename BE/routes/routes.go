package routes

import (
	"crud-go-gin/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	
	r.GET("/health", controllers.HealthCheck)

	candidatos := r.Group("/candidatos")
	{
		candidatos.POST("", controllers.CreateCandidato)
		candidatos.GET("", controllers.GetCandidatos)
		candidatos.GET("/cpf/:cpf", controllers.GetCandidatoByCPF)
		candidatos.PATCH("/:id/contato", controllers.UpdateContatoCandidato)
		candidatos.PUT("/:id", controllers.UpdateCandidato)
		candidatos.DELETE("/:id", controllers.DeleteCandidato)
	}
}
