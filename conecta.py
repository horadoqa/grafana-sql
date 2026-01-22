# pip install psycopg2-binary
 
import psycopg2

conn = psycopg2.connect(
    host="host.docker.internal", # NO WSL
    # host="localhost",
    # host="127.0.0.1"
    port=5432,
    database="app_db",
    user="admin",
    password="admin"
)

cur = conn.cursor()

cur.execute("SELECT COUNT(*) FROM candidatos;")
result = cur.fetchone()

print("Quantidade de tabelas:", result[0])

cur.close()
conn.close()
