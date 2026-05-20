# Smart Lesson Planner

Uma aplicação full stack para criar, organizar e gerenciar planos de aula com recomendações geradas por IA.

O projeto foi desenvolvido em Flask + React e estruturado para execução local com Docker, conforme o desafio de manutenção de software.

---

## Visão Geral

A aplicação permite:

- criar, editar, listar e excluir planos de aula
- filtrar por título, disciplina, data e tags
- ordenar a listagem por data ou título
- gerar recomendações com IA a partir de título, disciplina e resumo
- acompanhar a saúde da API por meio de endpoint dedicado

---

## Requisitos Atendidos

O projeto foi preparado para atender aos pontos principais do desafio:

- uso de Docker e Docker Compose para execução local
- API REST com CRUD completo
- banco SQLite
- filtros e paginação
- integração com IA para recomendações
- logs de observabilidade no backend
- endpoint `/health`
- frontend em React com interface responsiva

---

## Tecnologias

### Backend

- Python
- Flask
- Flask SQLAlchemy
- Flask Migrate
- SQLite
- Groq API

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Sonner

---

## Estrutura do Projeto

```bash
project/
├── backend/
│   ├── app/
│   ├── migrations/
│   ├── run.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

---

## Execução com Docker

Esta é a forma recomendada de rodar o projeto.

### 1. Crie o arquivo `.env` na raiz do projeto

O `docker-compose.yml` carrega as variáveis de ambiente a partir da raiz do repositório.

```env
SECRET_KEY=sua_secret_key
DATABASE_URL=sqlite:///lesson_plans.db
GROQ_API_KEY=sua_chave_groq
```

### 2. Suba os containers

```bash
docker compose up --build
```

Se o seu ambiente usar a sintaxe antiga, também funciona:

```bash
docker-compose up --build
```

### 3. Acesse a aplicação

- Frontend: http://localhost:5173
- Backend: http://127.0.0.1:5000
- Health check: http://127.0.0.1:5000/health

### 4. Encerrar a execução

```bash
docker compose down
```

---

## O Que O Docker Sobe

O `docker-compose.yml` sobe dois serviços:

- `backend`: Flask com migrações aplicadas automaticamente no start
- `frontend`: Vite em modo desenvolvimento com hot reload

### Portas expostas

- `5000` para a API
- `5173` para o frontend

### Volumes

- o backend monta `./backend:/app`
- o frontend monta `./frontend:/app` e preserva `node_modules`

---

## Execução Local Sem Docker

Se quiser rodar sem Docker, o fluxo é este:

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `SECRET_KEY` | Chave secreta do Flask |
| `DATABASE_URL` | URL do banco de dados |
| `GROQ_API_KEY` | Chave da API da Groq |

---

## Endpoints da API

### Health Check

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok"
}
```

### Listar Planos de Aula

```http
GET /plans
```

#### Query params

| Parâmetro | Descrição |
|---|---|
| `page` | Página atual |
| `per_page` | Itens por página |
| `title` | Busca por título |
| `discipline` | Filtro por disciplina |
| `tags` | Filtro por tags |
| `expected_date` | Filtro por data |
| `order_by` | Ordenação por `created_at` ou `title` |

### Criar Plano de Aula

```http
POST /plans
```

### Buscar Plano de Aula

```http
GET /plans/:id
```

### Atualizar Plano de Aula

```http
PUT /plans/:id
```

### Excluir Plano de Aula

```http
DELETE /plans/:id
```

### Recomendações com IA

```http
POST /ai/recommendations
```

Exemplo de corpo da requisição:

```json
{
  "title": "Introdução ao OSPF",
  "discipline": "Redes",
  "summary": "Conceitos básicos de roteamento"
}
```

---

## Como Funciona a IA

Quando o usuário clica em **Gerar com IA**, o frontend envia:

- título
- disciplina
- resumo

O backend chama o modelo configurado na Groq e retorna:

- conteúdos recomendados
- tópicos complementares
- tags sugeridas

Esses dados são usados para preencher automaticamente o formulário.

---

## Observabilidade

O backend registra eventos importantes no log, incluindo chamadas de IA com informações como:

- título
- disciplina
- uso estimado de tokens
- latência da requisição

Isso ajuda na análise de desempenho e no acompanhamento de uso.

---

## Scripts do Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Prints da Aplicação

Adicione aqui os screenshots finais da interface.

### Página inicial

<img width="1865" height="915" alt="Image" src="https://github.com/user-attachments/assets/47753f3d-f0a7-4fad-837b-23d4065761fe" />

### Criação de plano de aula

<img width="1865" height="915" alt="Image" src="https://github.com/user-attachments/assets/e505a8da-3298-4278-9ce8-0f44687bb338" />

### Listagem com filtros

<img width="1865" height="742" alt="Image" src="https://github.com/user-attachments/assets/85056c61-2110-4b29-88bc-445dbfa6f9f9" />

---

## Vídeo de Demonstração

https://github.com/user-attachments/assets/5c87769a-57c1-4769-ba69-714b5a1c63fc

## Autor

Desenvolvido por Marivaldo Pedro
