import { useState } from 'react'
import { createCandidato } from '../services/api'
import type { Candidato } from '../types/Candidato'

export function CandidatoForm() {
  const [form, setForm] = useState<Candidato>({
    nome_completo: '',
    cpf: '',
    sexo: '',
    data_nascimento: '',
    estado_civil: '',
    email: '',
    telefone: '',
  })

  const [mensagem, setMensagem] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setMensagem(null)

    try {
      await createCandidato(form)
      setMensagem('Candidato cadastrado com sucesso.')
      setForm({
        nome_completo: '',
        cpf: '',
        sexo: '',
        data_nascimento: '',
        estado_civil: '',
        email: '',
        telefone: '',
      })
    } catch (err: any) {
      setErro(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-labelledby="titulo-formulario">
      <h1 id="titulo-formulario">Cadastro de Candidato</h1>

      {erro && (
        <p role="alert" style={{ color: 'red' }}>
          {erro}
        </p>
      )}

      {mensagem && (
        <p role="status" style={{ color: 'green' }}>
          {mensagem}
        </p>
      )}

      <label htmlFor="nome_completo">Nome completo</label>
      <input
        id="nome_completo"
        name="nome_completo"
        value={form.nome_completo}
        onChange={handleChange}
        required
        aria-required="true"
      />

      <label htmlFor="cpf">CPF</label>
      <input
        id="cpf"
        name="cpf"
        value={form.cpf}
        onChange={handleChange}
        required
        aria-required="true"
      />

      <label htmlFor="sexo">Sexo</label>
      <select
        id="sexo"
        name="sexo"
        value={form.sexo}
        onChange={handleChange}
        required
      >
        <option value="">Selecione</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
      </select>

      <label htmlFor="data_nascimento">Data de nascimento</label>
      <input
        type="date"
        id="data_nascimento"
        name="data_nascimento"
        value={form.data_nascimento}
        onChange={handleChange}
        required
      />

      <label htmlFor="estado_civil">Estado civil</label>
      <select
        id="estado_civil"
        name="estado_civil"
        value={form.estado_civil}
        onChange={handleChange}
        required
      >
        <option value="">Selecione</option>
        <option value="Casado">Casado</option>
        <option value="Solteiro">Solteiro</option>
        <option value="Viuvo">Viuvo</option>
        <option value="Divorciado">Divorciado</option>
      </select>

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="telefone">Telefone</label>
      <input
        id="telefone"
        name="telefone"
        value={form.telefone}
        onChange={handleChange}
      />

      <button type="submit">Cadastrar</button>
    </form>
  )
}
