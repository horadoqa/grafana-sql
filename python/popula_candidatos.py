# pip install faker psycopg2-binary

from faker import Faker
import psycopg2
from psycopg2.extras import execute_values
import random
from datetime import date

fake = Faker("pt_BR")

DB_CONFIG = {
    "host": "host.docker.internal", # NO WSL
    # "host": "localhost",   # fora do docker
    "port": 5432,
    "dbname": "app_db",
    "user": "admin",
    "password": "admin"
}

TOTAL_REGISTROS = 100


def gerar_cpf():
    """Gera CPF fake apenas numérico"""
    return fake.cpf().replace(".", "").replace("-", "")


def inserir_candidatos():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    candidatos = []

    for _ in range(TOTAL_REGISTROS):
        cpf = gerar_cpf()

        candidatos.append((
            fake.name(),
            cpf,
            fake.date_of_birth(minimum_age=18, maximum_age=80),
            random.choice(["solteiro", "casado", "divorciado", "viúvo"]),
            fake.email(),
            fake.phone_number()
        ))

    sql = """
        INSERT INTO public.candidatos
        (nome_completo, cpf, data_nascimento, estado_civil, sexo, email, telefone)
        SELECT %s, %s, %s, %s, %s, %s
        WHERE NOT EXISTS (
            SELECT 1 FROM public.candidatos WHERE cpf = %s
        );
    """

    inseridos = 0

    for c in candidatos:
        cur.execute(sql, (*c, c[1]))
        if cur.rowcount == 1:
            inseridos += 1

    conn.commit()
    cur.close()
    conn.close()

    print(f"✅ Inseridos {inseridos} novos candidatos")


if __name__ == "__main__":
    inserir_candidatos()
