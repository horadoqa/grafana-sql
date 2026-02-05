'use client'

import { useState } from 'react'
import { createCandidato } from '@/services/api'
import type { Candidato } from '@/types/Candidato'
import styles from './CandidatoForm.module.css'

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
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Candidato</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {erro && <p className={styles.alertError}>{erro}</p>}
        {mensagem && <p className={styles.alertSuccess}>{mensagem}</p>}

        <div className={styles.formFields}>
          <div className={styles.field}>
            <label htmlFor="nome_completo">Nome completo</label>
            <input
              id="nome_completo"
              name="nome_completo"
              value={form.nome_completo}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              name="cpf"
              value={form.cpf}
              placeholder="000.000.000-00"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
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
          </div>

          <div className={styles.field}>
            <label htmlFor="data_nascimento">Data de nascimento</label>
            <input
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
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
              <option value="Viuvo">Viúvo</option>
              <option value="Divorciado">Divorciado</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className={styles.button} type="submit">Cadastrar</button>
      </form>

    </div>
  )
}
