# Projeto com PostgreSQL + Grafana

📚 Cursos gratuitos para começar:

🔗 Modelagem de Dados: https://lnkd.in/egvmw6Vw

🔗 Implementando Banco de Dados: https://lnkd.in/eWt5ejVu

🔗 Administrando Banco de Dados: https://lnkd.in/eWtya_tm

---

**Grafana**

![Grafana](./images/dashboard.png)

## Makefile

Este projeto foi desenvolvido com docker-compose, e um Makefile foi criado para falicitar o processo de subida da infra.

## 1️⃣ Pré-requisitos

- Docker Desktop
- DBeaver
- Python

## 2️⃣ Execute o comando

```bash
$ make menu
```

## 3️⃣ Escolha a opão desejada

```bash
==============================
 🐳 Gerenciador Docker Compose
==============================
1) Subir projeto (docker-compose up -d)
2) Remover projeto (docker-compose down -v)
3) Reiniciar projeto
0) Sair
------------------------------
Escolha uma opção: 
```

## 4️⃣ Acessar o Grafana

* URL: **[http://localhost:3000](http://localhost:3000)**
* Login padrão:

  * **Usuário:** `admin`
  * **Senha:** `admin` (vai pedir pra trocar)

## 5️⃣ Popular o banco

Na pasta SQL/CRUD tem um programa em python que cria 100 registros de candidatos.

```python
✗ python3 create.py
✅ Inseridos 100 novos candidatos
```

## 6️⃣ Contribuições

Contribuições são mais do que bem-vindas — são incentivadas 🚀
Se você quer ajudar a melhorar este projeto, siga os passos abaixo:

### 🛠️ Como contribuir

1. **Faça um fork** deste repositório
2. **Clone o fork** para sua máquina:

   ```bash
   git clone https://github.com/horadoqa/grafana-sql.git
   ```
3. **Crie uma branch** para sua contribuição:

   ```bash
   git checkout -b minha-contribuicao
   ```
4. **Faça suas alterações**, mantendo o padrão de código e boas práticas do projeto

Utilize a convenção de nomes (`feature/`, `fix/`, `docs/`).

5. **Commit suas mudanças** com uma mensagem clara:

   ```bash
   git commit -m "Descrição objetiva da alteração"
   ```
6. **Envie para o seu fork**:

   ```bash
   git push origin minha-contribuicao
   ```
7. **Abra um Pull Request (PR)** explicando o que foi feito e, se possível, o motivo da mudança

### 💡 Dicas importantes

* Verifique se já **existe uma issue** relacionada antes de abrir uma nova
* Se for uma mudança grande, **abra uma issue antes** para discutir a ideia
* Mantenha o código limpo, organizado e bem documentado
* Seja respeitoso(a) nas interações — colaboração saudável é essencial ❤️

### 🐛 Encontrou um problema?

Fique à vontade para **abrir uma issue** descrevendo o bug, melhoria ou sugestão.

---

