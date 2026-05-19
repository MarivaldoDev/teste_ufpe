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

  async function loadLessonPlan() {
    try {
      const response = await api.get(
        `/plans/${id}`
      );

      setFormData({
        ...response.data,
        expected_date:
          response.data.expected_date || "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isEditing) {
      loadLessonPlan();
    }
  }, []);

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

      toast.error("Error generating AI recommendations");
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
  }, []);

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
        "Lesson updated successfully!"
      );
      } else {
        await api.post(
          "/plans",
          formData
        );

        toast.success(
          "Lesson created successfully!"
        );
      }

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Error saving lesson");
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
     <div className="mb-8">
        <h1 className="text-4xl font-bold">
            {
              isEditing
                ? "Edit Lesson Plan"
                : "Create Lesson Plan"
            }
        </h1>

        <p className="text-gray-500 mt-2">
            Use AI to generate educational recommendations
        </p>
    </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Lesson title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="discipline"
          placeholder="Discipline"
          value={formData.discipline}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="summary"
          placeholder="Summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-24"
        />

        <textarea
          name="objective"
          placeholder="Objective"
          value={formData.objective}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-24"
        />

        <textarea
          name="contents"
          placeholder="Contents"
          value={formData.contents}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-24"
        />

        <input
          type="text"
          name="support_resources"
          placeholder="Support resources"
          value={formData.support_resources}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="date"
          name="expected_date"
          value={formData.expected_date}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={loadingAI}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-5 py-3 rounded-lg transition"
          >
            {loadingAI
              ? "Generating AI Suggestions..."
              : "Generate with AI"}
          </button>

          <button
            type="submit"
            disabled={loadingSubmit}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-5 py-3 rounded-lg transition"
          >
            {
              loadingSubmit
                ? "Saving Lesson..."
                : isEditing
                ? "Update Lesson"
                : "Save Lesson Plan"
            }
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateLesson;