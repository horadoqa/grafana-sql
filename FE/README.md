# FE

**Front-end em React**, já pensada com **responsividade + acessibilidade (WCAG)** e **integração direta com a API em Go**.

---

## 1️⃣ Stack recomendada (simples e corporativa)

Sugestão equilibrada entre produtividade e qualidade:

* **React + TypeScript**
* **Vite** (build rápido)
* **CSS puro ou CSS Modules** (menos dependência)
* **Fetch API** (sem overengineering)
* **HTML semântico + ARIA**
* **Mobile First**

Criação do projeto:

```bash
npm create vite@latest bank -- --template react-ts
cd FE/bank
npm install
npm run dev
```

---

## 2️⃣ Contrato da API (baseado no Go)

### POST `/candidatos`

Payload esperado:

```json
{
  "nome_completo": "João da Silva",
  "cpf": "12345678900",
  "sexo": "M",
  "data_nascimento": "1990-01-01",
  "estado_civil": "Solteiro",
  "email": "joao@email.com",
  "telefone": "11999999999"
}
```

⚠️ O `id` é gerado no backend (correto 👍)

---

## 3️⃣ Princípios de acessibilidade aplicados

Este formulário vai respeitar:

* `<label htmlFor>` corretamente associado
* Inputs com `aria-required`
* Mensagens de erro com `role="alert"`
* Navegação 100% por teclado
* Contraste adequado
* Layout responsivo

Isso já cobre boa parte da **WCAG 2.1 AA**.

---

## 4️⃣ Estrutura do Front-end

```text
src/
├── components/
│   └── CandidatoForm.tsx
├── services/
│   └── api.ts
├── types/
│   └── Candidato.ts
├── App.tsx
└── main.tsx
```

---

## 5️⃣ Tipagem do Candidato

`src/types/Candidato.ts`

```ts
export interface Candidato {
  nome_completo: string
  cpf: string
  sexo: string
  data_nascimento: string
  estado_civil: string
  email: string
  telefone: string
}
```

---

## 6️⃣ Serviço de API

`src/services/api.ts`

```ts
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
```

---

## 7️⃣ Formulário acessível e responsivo

`src/components/CandidatoForm.tsx`

```tsx
import { useState } from 'react'
import { createCandidato } from '../services/api'
import { Candidato } from '../types/Candidato'

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
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
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
      <input
        id="estado_civil"
        name="estado_civil"
        value={form.estado_civil}
        onChange={handleChange}
      />

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
```

---

## 8️⃣ Responsividade (CSS simples e eficiente)

Exemplo básico (mobile-first):

```css
form {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
}

input,
select,
button {
  padding: 0.6rem;
  font-size: 1rem;
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.2rem;
  }
}
```

---

## 9️⃣ Integração com seu App

`src/App.tsx`

```tsx
import { CandidatoForm } from './components/CandidatoForm'

function App() {
  return <CandidatoForm />
}

export default App
```

---

## 🔐 Observação importante (CORS)

No backend Go, **garanta CORS habilitado**, senão o front não acessa:

```go
router.Use(cors.Default())
```

---

## Próximos passos (se quiser evoluir)

Posso te ajudar a:

* Criar **listagem de candidatos (GET /candidatos)**
* Validar CPF no front
* Adicionar **design system acessível**
* Preparar isso para **auditoria / LGPD**
* Documentar como **arquitetura corporativa**

Só me dizer até onde você quer levar esse front 🚀
