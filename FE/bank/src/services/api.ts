const API_URL = 'http://localhost:8080'

export async function createCandidato(data: unknown) {
  const response = await fetch(`${API_URL}/candidatos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Erro ao cadastrar candidato')
  }

  return response.json()
}
