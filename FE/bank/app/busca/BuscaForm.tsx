"use client"

import { useState } from "react"
import type { Candidato } from "@/types/Candidato"
import styles from "./BuscaForm.module.css"

export function formatarCPF(cpf: string) {
  return cpf
    .replace(/\D/g, '')                 // remove tudo que não é número
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatarTelefone(telefone: string) {
  const tel = telefone.replace(/\D/g, '')

  if (tel.length === 11) {
    return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  if (tel.length === 10) {
    return tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return telefone
}


export function BuscaForm() {
    const [cpf, setCpf] = useState("")
    const [candidato, setCandidato] = useState<Candidato | null>(null)
    const [erro, setErro] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErro(null)
        setCandidato(null)
        setLoading(true)

        try {
            const res = await fetch(`http://localhost:8080/candidatos/cpf/${cpf}`)

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || "Erro desconhecido")
            }

            const data: Candidato = await res.json()
            setCandidato(data)
        } catch (err: any) {
            setErro(err.message)
        } finally {
            setLoading(false)
        }
    }

    function formatarData(dataISO: string) {
        return new Date(dataISO).toLocaleDateString('pt-BR')
    }
    return (


        <div className={styles.container}>
            <h1 className={styles.title}>Buscar Candidato por CPF</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="cpf" className={styles.label}>CPF</label>
                <input
                    id="cpf"
                    name="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </form>

            {erro && <p className={styles.alertError}>{erro}</p>}

            {candidato && (
                <div className={styles.result}>
                    <h2>Dados do Candidato</h2>
                    <p><strong>Nome:</strong> {candidato.nome_completo}</p>
                    <p><strong>CPF:</strong> {formatarCPF(candidato.cpf)}</p>
                    <p><strong>Sexo:</strong> {candidato.sexo}</p>
                    <p><strong>Data de nascimento:</strong>{' '}{formatarData(candidato.data_nascimento)}</p>
                    <p><strong>Estado Civil:</strong> {candidato.estado_civil}</p>
                    <p><strong>Email:</strong> {candidato.email}</p>
                    <p><strong>Telefone:</strong> {formatarTelefone(candidato.telefone)}</p>
                </div>
            )}
        </div>
    )
}


