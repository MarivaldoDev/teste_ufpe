import { Link } from "react-router-dom";

function LessonCard({
  plan,
    onRequestDelete,
}) {
  return (
    <article className="group rounded-3xl border border-white/60 bg-white/85 p-6 shadow-lg shadow-slate-300/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-300/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-slate-900 md:text-3xl">
            {plan.title}
          </h2>

          <p className="mt-2 max-w-3xl text-slate-600">
            {plan.summary}
          </p>
        </div>

        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">
          {plan.discipline}
        </span>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-100/75 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
          Conteudos
        </h3>

        <p className="mt-2 text-slate-600">
          {plan.contents}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {plan.tags &&
          plan.tags
            .split(",")
            .map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
              >
                #{tag.trim()}
              </span>
            ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Link
            to={`/edit/${plan.id}`}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
          Editar
        </Link>
        <button
          onClick={() =>
            onRequestDelete && onRequestDelete(plan)
          }
          className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default LessonCard;