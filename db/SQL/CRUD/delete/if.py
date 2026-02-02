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

def deletar_por_estado_civil(estado_civil):
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    sql = """
        DELETE FROM public.candidatos
        WHERE estado_civil = %s;
    """

    cur.execute(sql, (estado_civil,))
    deletados = cur.rowcount

    conn.commit()
    cur.close()
    conn.close()

    print(f"🗑️ Deletados {deletados} candidatos ({estado_civil})")


if __name__ == "__main__":
    deletar_por_estado_civil("casado")
