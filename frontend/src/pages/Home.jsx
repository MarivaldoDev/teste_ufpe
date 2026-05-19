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

  const [orderBy, setOrderBy] = useState("created_at");

  const [plans, setPlans] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
  useState(1);

  const [loading, setLoading] =
    useState(true);

  async function loadPlans() {
    try {
      const response = await api.get(
        `/plans?page=${page}&per_page=5&title=${search}&discipline=${discipline}&order_by=${orderBy}`
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
    "Are you sure you want to delete this lesson plan?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/plans/${id}`);
    toast.success("Lesson plan deleted successfully!");
    loadPlans();
  } catch (error) {
    console.error(error);
    toast.error("Error deleting lesson plan");
  }
}

  useEffect(() => {
    loadPlans();
  }, [
    page,
    search,
    discipline,
    orderBy,
  ]);

  if (loading) {
    return (
      <div className="grid gap-6">
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
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Lesson Plans
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and organize your lessons
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 mt-6">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Filter by discipline..."
          value={discipline}
          onChange={(e) =>
            setDiscipline(e.target.value)
          }
          className="border rounded-lg p-3"
        />

        <select
          value={orderBy}
          onChange={(e) =>
            setOrderBy(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="created_at">
            Latest
          </option>

          <option value="title">
            Title
          </option>

          <option value="discipline">
            Discipline
          </option>
        </select>
      </div>
    </div>

    {plans.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-700">
            No lesson plans found
            </h2>

            <p className="text-gray-500 mt-2">
            Create your first lesson plan using AI assistance.
            </p>
        </div>
    )}
      {plans.length > 0 && (
        <div className="grid gap-6">
        {plans.map((plan) => (
          <LessonCard
            key={plan.id}
            plan={plan}
            onDelete={handleDelete}
          />
        ))}
      </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
            onClick={() =>
            setPage((prev) =>
                Math.max(prev - 1, 1)
            )
            }
            disabled={page === 1}
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
            Previous
        </button>

        <span className="font-semibold">
            Page {page} of {totalPages}
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
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
            Next
        </button>
        </div>
    </div>
  );
}

export default Home;