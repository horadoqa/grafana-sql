# Separando por Idade

Separar os candidatos em faixas de idade de 10 em 10 anos, podemos usar FLOOR com DATE_PART('year', AGE(...)).

```sql
SELECT
    FLOOR(DATE_PART('year', AGE(data_nascimento)) / 10) AS faixa_inicial,
    CONCAT(
        FLOOR(DATE_PART('year', AGE(data_nascimento)) / 10) * 10,
        ' - ',
        FLOOR(DATE_PART('year', AGE(data_nascimento)) / 10) * 10 + 9
    ) AS faixa_idade,
    COUNT(*) AS quantidade
FROM public.candidatos
GROUP BY faixa_inicial
ORDER BY faixa_inicial;
```

---

## ✅ Opção 1 — Usando `AGE()` (mais legível)

Retorna **apenas os candidatos menores de 18 anos**:

```sql
SELECT *
FROM public.candidatos
WHERE AGE(CURRENT_DATE, data_nascimento) < INTERVAL '18 years';
```

📌 O `AGE()` calcula a idade com base na data atual.

---

## ✅ Opção 2 — Comparação direta de datas (mais performática)

Também retorna apenas menores de idade:

```sql
SELECT *
FROM public.candidatos
WHERE data_nascimento > CURRENT_DATE - INTERVAL '18 years';
```

📌 Aqui, qualquer pessoa nascida **depois** da data limite ainda não completou 18 anos.

---

## ✅ Verificar se **existe** algum menor de idade

Se você só quiser saber **se existe** (true/false):

```sql
SELECT EXISTS (
  SELECT 1
  FROM public.candidatos
  WHERE data_nascimento > CURRENT_DATE - INTERVAL '18 years'
) AS existe_menor_idade;
```

---


