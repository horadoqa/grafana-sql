import styles from './Home.module.css'

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>BANK</h1>
      {/* Ícone do Banco em SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#14532d"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      >
        <path d="M3 10l9-7 9 7" /> {/* telhado */}
        <path d="M21 10v10H3V10" /> {/* prédio */}
        <path d="M7 10v10" /> {/* colunas */}
        <path d="M10 10v10" />
        <path d="M13 10v10" />
        <path d="M16 10v10" />
        <path d="M3 20h18" /> {/* base */}
      </svg>

  
      <p className={styles.subtitle}>
        Cadastre, consulte e gerencie candidatos
      </p>
    </main>
  )
}
