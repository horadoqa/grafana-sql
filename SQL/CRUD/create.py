# pip install faker psycopg2-binary

from faker import Faker
import psycopg2
import random

fake = Faker("pt_BR")

DB_CONFIG = {
    "host": "host.docker.internal",  # NO WSL
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


def gerar_nome_e_sexo():
    """Gera nome compatível com o sexo"""
    sexo = random.choice(["Masculino", "Feminino"])

    if sexo == "Masculino":
        nome = f"{fake.first_name_male()} {fake.last_name()}"
    else:
        nome = f"{fake.first_name_female()} {fake.last_name()}"

    return nome, sexo


def inserir_candidatos():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    sql = """
        INSERT INTO public.candidatos
        (nome_completo, cpf, sexo, data_nascimento, estado_civil, email, telefone)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT DO NOTHING;
    """

    inseridos = 0

    for _ in range(TOTAL_REGISTROS):
        cpf = gerar_cpf()
        nome, sexo = gerar_nome_e_sexo()

        candidato = (
            nome,
            cpf,
            sexo,
            fake.date_of_birth(minimum_age=18, maximum_age=80),
            random.choice(["solteiro", "casado", "divorciado", "viúvo"]),
            fake.email(),
            fake.phone_number()
        )

        cur.execute(sql, candidato)

        if cur.rowcount == 1:
            inseridos += 1

    conn.commit()
    cur.close()
    conn.close()

    print(f"✅ Inseridos {inseridos} novos candidatos")


if __name__ == "__main__":
    inserir_candidatos()
