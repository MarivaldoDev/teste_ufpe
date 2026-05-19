import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import LessonCard from "../components/LessonCard";

function Home() {  
  const [plans, setPlans] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
  useState(1);

  const [loading, setLoading] =
    useState(true);

  async function loadPlans() {
    try {
      const response = await api.get(
        `/plans?page=${page}&per_page=5`
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

    loadPlans();
  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
    loadPlans();
  }, [page]);

  if (loading) {
  return (
    <div className="flex justify-center py-20">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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