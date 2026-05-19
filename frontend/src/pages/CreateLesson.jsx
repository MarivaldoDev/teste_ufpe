import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "sonner";

import api from "../services/api";

function CreateLesson() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    summary: "",
    discipline: "",
    contents: "",
    support_resources: "",
    tags: "",
    expected_date: "",
  });


  const [loadingAI, setLoadingAI] =
    useState(false);

  const [loadingSubmit, setLoadingSubmit] =
    useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleGenerateAI() {
    try {
      setLoadingAI(true);

      const response = await api.post(
        "/ai/recommendations",
        {
          title: formData.title,
          discipline: formData.discipline,
          summary: formData.summary,
        }
      );

      setFormData((prev) => ({
        ...prev,
        contents:
          response.data.recommended_contents.join(
            ", "
          ),
        tags: response.data.tags.join(", "),
      }));
    } catch (error) {
      console.error(error);

      toast.error("Erro ao gerar recomendacoes com IA");
    } finally {
      setLoadingAI(false);
    }
  }

  async function loadLessonPlan() {
    try {
      const response = await api.get(
        `/plans/${id}`
      );

      const lesson = response.data;

      setFormData({
        title: lesson.title || "",
        objective:
          lesson.objective || "",

        summary: lesson.summary || "",

        discipline:
          lesson.discipline || "",

        contents:
          lesson.contents || "",

        support_resources:
          lesson.support_resources || "",

        tags: lesson.tags || "",

        expected_date:
          lesson.expected_date || "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isEditing) {
      loadLessonPlan();
    }
  }, [isEditing]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoadingSubmit(true);

      if (isEditing) {
        await api.put(
          `/plans/${id}`,
          formData
        );

       toast.success(
        "Aula atualizada com sucesso!"
      );
      } else {
        await api.post(
          "/plans",
          formData
        );

        toast.success(
          "Aula criada com sucesso!"
        );
      }

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao salvar aula");
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-8">
     <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
          Construtor de Aulas
        </p>
        <h1 className="font-display text-4xl leading-tight text-slate-900 md:text-5xl">
            {
              isEditing
                ? "Editar Plano de Aula"
                : "Criar Plano de Aula"
            }
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
            Monte planos de aula completos e use recomendacoes com IA para acelerar o planejamento.
        </p>
    </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="form-field md:col-span-2">
            <span>Titulo da aula</span>
            <input
              type="text"
              name="title"
              placeholder="Ex: Fundamentos de Energia Renovavel"
              value={formData.title}
              onChange={handleChange}
              className="input-base"
            />
          </label>

          <label className="form-field">
            <span>Disciplina</span>
            <input
              type="text"
              name="discipline"
              placeholder="Ex: Ciencias"
              value={formData.discipline}
              onChange={handleChange}
              className="input-base"
            />
          </label>

          <label className="form-field">
            <span>Data prevista</span>
            <input
              type="date"
              name="expected_date"
              value={formData.expected_date}
              onChange={handleChange}
              className="input-base"
            />
          </label>

          <label className="form-field md:col-span-2">
            <span>Resumo</span>
            <textarea
              name="summary"
              placeholder="Descreva brevemente o que esta aula aborda"
              value={formData.summary}
              onChange={handleChange}
              className="input-base min-h-28"
            />
          </label>

          <label className="form-field md:col-span-2">
            <span>Objetivo</span>
            <textarea
              name="objective"
              placeholder="Descreva os resultados de aprendizagem"
              value={formData.objective}
              onChange={handleChange}
              className="input-base min-h-28"
            />
          </label>

          <label className="form-field md:col-span-2">
            <span>Conteudos</span>
            <textarea
              name="contents"
              placeholder="Topicos, atividades e sequencia"
              value={formData.contents}
              onChange={handleChange}
              className="input-base min-h-28"
            />
          </label>

          <label className="form-field">
            <span>Recursos de apoio</span>
            <input
              type="text"
              name="support_resources"
              placeholder="Livros, sites e ferramentas"
              value={formData.support_resources}
              onChange={handleChange}
              className="input-base"
            />
          </label>

          <label className="form-field">
            <span>Tags</span>
            <input
              type="text"
              name="tags"
              placeholder="projeto, trabalho em equipe, avaliacao"
              value={formData.tags}
              onChange={handleChange}
              className="input-base"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={loadingAI}
            className="btn-primary"
          >
            {loadingAI
              ? "Gerando sugestoes com IA..."
              : "Gerar com IA"}
          </button>

          <button
            type="submit"
            disabled={loadingSubmit}
            className="btn-accent"
          >
            {
              loadingSubmit
                ? "Salvando aula..."
                : isEditing
                ? "Atualizar Aula"
                : "Salvar Plano de Aula"
            }
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateLesson;