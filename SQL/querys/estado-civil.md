# Separando por Estado Civil

```sql
SELECT 
    estado_civil,
    COUNT(*) AS quantidade
FROM 
    public.candidatos
GROUP BY 
    estado_civil
ORDER BY 
    quantidade DESC;
```