# Verifica a quantidade por sexo

```sql
SELECT
    sexo,
    COUNT(*) AS quantidade,
    ROUND( (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM public.candidatos)), 2) AS percentual
FROM public.candidatos
GROUP BY sexo
ORDER BY sexo;
```