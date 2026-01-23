# Idade

```sql
SELECT
    CASE 
        WHEN DATE_PART('year', AGE(data_nascimento)) >= 18 THEN 'maior_18'
        ELSE 'menor_18'
    END AS faixa_idade,
    COUNT(*) AS quantidade
FROM public.candidatos
GROUP BY faixa_idade
ORDER BY faixa_idade;
```

separar os candidatos em faixas de idade de 10 em 10 anos, podemos usar FLOOR com DATE_PART('year', AGE(...)).

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