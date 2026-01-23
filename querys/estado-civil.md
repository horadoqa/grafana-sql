# Estado Civil

Separando por Estado Civil

SELECT 
    estado_civil,
    COUNT(*) AS quantidade
FROM 
    public.candidatos
GROUP BY 
    estado_civil
ORDER BY 
    quantidade DESC;
