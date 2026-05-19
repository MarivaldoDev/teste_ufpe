# Smart Lesson Planner

Uma aplicação full stack moderna para criação, gerenciamento e organização de planos de aula com recomendações geradas por IA.

Desenvolvida com Flask, React, Tailwind CSS e Groq AI.

---

# Funcionalidades

## Backend
- API REST com Flask
- ORM com SQLAlchemy
- Banco de dados SQLite
- Operações CRUD
- Paginação
- Filtros
- Ordenação
- Endpoint de recomendações com IA
- CORS configurado

## Frontend
- SPA com React + Vite
- Interface moderna com Tailwind CSS
- Layout responsivo
- Busca e filtros
- Paginação
- Criação/Edição/Exclusão de planos de aula
- Sugestões geradas por IA
- Toast notifications
- Skeleton loading

---

# Tecnologias Utilizadas

## Backend
- Python
- Flask
- Flask SQLAlchemy
- Flask Migrate
- SQLite
- Groq API

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Sonner

---

# Estrutura do Projeto

```bash
project/
│
├── backend/
│   ├── app/
│   ├── migrations/
│   ├── run.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Como Rodar o Backend

## 1. Acesse a pasta backend

```bash
cd backend
```

---

## 2. Crie um ambiente virtual

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Instale as dependências

```bash
pip install -r requirements.txt
```

---

## 4. Configure as variáveis de ambiente

Crie um arquivo `.env`:

```env
SECRET_KEY=sua_secret_key

DATABASE_URL=sqlite:///lesson_plans.db

GROQ_API_KEY=sua_chave_groq
```

---

## 5. Execute as migrations

```bash
flask db init
flask db migrate
flask db upgrade
```

---

## 6. Inicie o servidor backend

```bash
python run.py
```

O backend ficará disponível em:

```txt
http://127.0.0.1:5000
```

---

# Como Rodar o Frontend

## 1. Acesse a pasta frontend

```bash
cd frontend
```

---

## 2. Instale as dependências

```bash
npm install
```

---

## 3. Inicie o frontend

```bash
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173
```

---

# Endpoints da API

## Health Check

```http
GET /health
```

---

## Listar Planos de Aula

```http
GET /plans
```

### Query Params

| Parâmetro | Descrição |
|---|---|
| page | Página atual |
| per_page | Itens por página |
| title | Busca por título |
| discipline | Filtro por disciplina |
| order_by | Campo de ordenação |

---

## Criar Plano de Aula

```http
POST /plans
```

---

## Buscar Plano de Aula

```http
GET /plans/:id
```

---

## Atualizar Plano de Aula

```http
PUT /plans/:id
```

---

## Deletar Plano de Aula

```http
DELETE /plans/:id
```

---

## Recomendações com IA

```http
POST /ai/recommendations
```

### Exemplo de Body

```json
{
  "title": "Introdução ao OSPF",
  "discipline": "Redes",
  "summary": "Conceitos básicos de roteamento"
}
```

---

# Integração com IA

A aplicação utiliza Groq AI para gerar:
- conteúdos recomendados
- tópicos relacionados
- tags educacionais

Modelo utilizado:

```txt
llama-3.3-70b-versatile
```

---

# Screenshots

## Página Inicial
Adicione screenshot aqui

---

## Criação de Plano
Adicione screenshot aqui

---

## Recomendações com IA
Adicione screenshot aqui

---

# Melhorias Futuras

- Autenticação
- Controle de usuários
- Exportação para PDF
- Dark mode
- Testes automatizados
- Pipeline de deploy

---

# Autor

Desenvolvido por Marivaldo Dev