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


// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <p>Bem-vindo ao sistema</p>
    </main>
  )
}