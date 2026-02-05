'use client'

import Link from 'next/link'

export function Menu() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/cadastro">Cadastro</Link>
      <Link href="/busca">Busca</Link>
    </nav>
  )
}
