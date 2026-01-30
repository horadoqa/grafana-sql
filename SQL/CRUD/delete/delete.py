# pip install faker psycopg2-binary

import psycopg2
import random



DB_CONFIG = {
    "host": "host.docker.internal",  # NO WSL
    # "host": "localhost",   # fora do docker
    "port": 5432,
    "dbname": "app_db",
    "user": "admin",
    "password": "admin"
}

def deletar_candidatos(qtd):
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    sql = """
        DELETE FROM public.candidatos
        WHERE id IN (
            SELECT id
            FROM public.candidatos
            ORDER BY random()
            LIMIT %s
        );
    """

    cur.execute(sql, (qtd,))
    deletados = cur.rowcount

    conn.commit()
    cur.close()
    conn.close()

    print(f"🗑️ Deletados {deletados} candidatos")

if __name__ == "__main__":
    deletar_candidatos(10)
