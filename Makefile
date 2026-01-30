.PHONY: menu up down restart

menu:
	@clear
	@echo "=============================="
	@echo " 🐳 Gerenciador Docker Compose"
	@echo "=============================="
	@echo "1) Subir projeto (docker-compose up -d)"
	@echo "2) Remover projeto (docker-compose down -v)"
	@echo "3) Reiniciar projeto"
	@echo "0) Sair"
	@echo "------------------------------"
	@read -p "Escolha uma opção: " opcao; \
	case $$opcao in \
		1) make up ;; \
		2) make down ;; \
		3) make restart ;; \
		0) echo "Saindo..." ;; \
		*) echo "Opção inválida!" ;; \
	esac

up:
	@echo "🚀 Subindo containers..."
	docker-compose up -d

down:
	@echo "🧹 Removendo containers e volumes..."
	docker-compose down -v

restart:
	@echo "🔄 Reiniciando containers..."
	docker-compose down -v
	docker-compose up -d
