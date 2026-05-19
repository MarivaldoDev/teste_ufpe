import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import LessonCardSkeleton from "../components/LessonCardSkeleton";

import api from "../services/api";

import LessonCard from "../components/LessonCard";

function Home() {  
  const [search, setSearch] = useState("");

  const [discipline, setDiscipline] = useState("");

  const [expectedDate, setExpectedDate] = useState("");

  const [orderBy, setOrderBy] = useState("created_at");

  const [plans, setPlans] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
  useState(1);

  const [loading, setLoading] =
    useState(true);

  async function loadPlans() {
    try {
      const params = new URLSearchParams({
        page: String(page),
        per_page: "5",
        title: search,
        discipline,
        order_by: orderBy,
      });

      if (expectedDate) {
        params.set("expected_date", expectedDate);
      }

      const response = await api.get(
        `/plans?${params.toString()}`
      );

      setPlans(response.data.items);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
  const confirmed = window.confirm(
    "Tem certeza de que deseja excluir este plano de aula?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/plans/${id}`);
    toast.success("Plano de aula excluido com sucesso!");
    loadPlans();
  } catch (error) {
    console.error(error);
    toast.error("Erro ao excluir o plano de aula");
  }
}

  useEffect(() => {
    loadPlans();
  }, [
    page,
    search,
    discipline,
    expectedDate,
    orderBy,
  ]);

  if (loading) {
    return (
      <div className="grid gap-5">
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <LessonCardSkeleton
              key={index}
            />
          )
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/75 p-6 shadow-xl shadow-slate-300/40 backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-orange-200/50 blur-2xl" />

        <div className="relative">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">
            Painel
          </p>

          <h1 className="font-display text-4xl leading-tight text-slate-900 md:text-5xl">
            Planos de Aula
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Organize suas aulas com um fluxo mais limpo, filtros inteligentes e geracao de conteudo com IA.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/60 bg-white/85 p-4 shadow-lg shadow-slate-300/30 backdrop-blur-xl md:p-6">
        <div className="grid gap-3 md:grid-cols-4 md:gap-4">
          <input
            type="text"
            placeholder="Buscar por titulo"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="input-base"
          />

          <input
            type="text"
            placeholder="Filtrar por disciplina"
            value={discipline}
            onChange={(e) =>
              setDiscipline(e.target.value)
            }
            className="input-base"
          />

          <input
            type="date"
            value={expectedDate}
            onChange={(e) =>
              setExpectedDate(e.target.value)
            }
            className="input-base"
          />

          <select
            value={orderBy}
            onChange={(e) =>
              setOrderBy(e.target.value)
            }
            className="input-base"
          >
            <option value="created_at">
              Mais recentes
            </option>

            <option value="title">
              Titulo
            </option>

            <option value="discipline">
              Disciplina
            </option>
          </select>
        </div>
      </section>

      {plans.length === 0 && (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center shadow-sm backdrop-blur-xl">
          <h2 className="font-display text-3xl text-slate-800">
            Nenhum plano de aula encontrado
          </h2>

          <p className="mt-3 text-slate-500">
            Tente filtros diferentes ou crie um novo plano com apoio da IA.
          </p>
        </section>
      )}

      {plans.length > 0 && (
        <section className="grid gap-5">
          {plans.map((plan) => (
            <LessonCard
              key={plan.id}
              plan={plan}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white/80 p-3 shadow-sm backdrop-blur-xl">
        <button
          onClick={() =>
            setPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
          disabled={page === 1}
          className="btn-muted"
        >
          Anterior
        </button>

        <span className="px-2 text-sm font-semibold text-slate-700">
          Pagina {page} de {totalPages}
        </span>

        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(
                prev + 1,
                totalPages
              )
            )
          }
          disabled={page === totalPages}
          className="btn-muted"
        >
          Proxima
        </button>
      </div>
    </div>
  );
}

export default Home;