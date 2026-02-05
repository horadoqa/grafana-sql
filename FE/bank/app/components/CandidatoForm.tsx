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

        <label className={styles.label} htmlFor="nome_completo">Nome completo</label>
        <input
          className={styles.input}
          id="nome_completo"
          name="nome_completo"
          value={form.nome_completo}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="cpf">CPF</label>
        <input
          className={styles.input}
          id="cpf"
          name="cpf"
          value={form.cpf}
          placeholder='00000000000'
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="sexo">Sexo</label>
        <select
          className={styles.select}
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

        <label className={styles.label} htmlFor="data_nascimento">Data de nascimento</label>
        <input
          className={styles.input}
          type="date"
          id="data_nascimento"
          name="data_nascimento"
          value={form.data_nascimento}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="estado_civil">Estado civil</label>
        <select
          className={styles.select}
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

        <label className={styles.label} htmlFor="email">E-mail</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="telefone">Telefone</label>
        <input
          className={styles.input}
          id="telefone"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />

        <button className={styles.button} type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
