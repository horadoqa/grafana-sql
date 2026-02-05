"use client"
import { useState } from "react"
import styles from "./BuscaForm.module.css"
import type { Candidato } from "@/types/Candidato"

export function BuscaForm() {
  const [form, setForm] = useState<Partial<Candidato>>({
    nome_completo: "",
    cpf: "",
    telefone: "",
    email: "",
  })

  const [resultado, setResultado] = useState<Candidato | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    if (name === "cpf") {
      const numeric = value.replace(/\D/g, "")
      const formatted = numeric
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2")
        .slice(0, 14)
      setForm({ ...form, [name]: formatted })
    } else if (name === "telefone") {
      const numeric = value.replace(/\D/g, "")
      const formatted = numeric
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2")
        .slice(0, 15)
      setForm({ ...form, [name]: formatted })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    setResultado(null)
    setLoading(true)

    try {
      let url = ""
      let param = ""

      if (form.cpf) {
        param = form.cpf.replace(/\D/g, "")
        url = `http://localhost:8080/candidatos/cpf/${param}`
      } else if (form.nome_completo) {
        param = encodeURIComponent(form.nome_completo)
        url = `http://localhost:8080/candidatos/nome/${param}`
      } else if (form.telefone) {
        param = form.telefone.replace(/\D/g, "")
        url = `http://localhost:8080/candidatos/telefone/${param}`
      } else if (form.email) {
        param = encodeURIComponent(form.email)
        url = `http://localhost:8080/candidatos/email/${param}`
      } else {
        setErro("Informe pelo menos um campo para buscar")
        setLoading(false)
        return
      }

      const res = await fetch(url)
      const data = await res.json()

      if ("error" in data) {
        setErro(data.error)
        setResultado(null)
      } else {
        setResultado(data)
        setErro(null)
      }
    } catch (err: any) {
      setErro(err.message || "Ocorreu um erro ao buscar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Buscar Candidato</h2>

        <div className={styles.formFields}>
          <div className={styles.field}>
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              maxLength={14}
              placeholder="123.456.789-01"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="nome_completo">Nome</label>
            <input
              type="text"
              id="nome_completo"
              name="nome_completo"
              value={form.nome_completo}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              maxLength={15}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className={styles.button}>
          {loading ? "Buscando..." : "Buscar"}
        </button>

        {erro && <p className={styles.alertError}>{erro}</p>}
      </form>

      {resultado && (
        <div className={styles.resultCard}>
          <h3 className={styles.resultTitle}>Resultado:</h3>
          <div className={styles.resultFields}>
            {[
              ["Nome", resultado.nome_completo],
              ["CPF", resultado.cpf],
              ["Sexo", resultado.sexo],
              ["Data Nascimento", new Date(resultado.data_nascimento).toLocaleDateString()],
              ["Estado Civil", resultado.estado_civil],
              ["Email", resultado.email],
              ["Telefone", resultado.telefone],
            ].map(([label, value]) => (
              <div key={label} className={styles.field}>
                <label>{label}:</label>
                <input type="text" value={value} readOnly />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
