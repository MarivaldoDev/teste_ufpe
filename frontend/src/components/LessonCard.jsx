import { Link } from "react-router-dom";

function LessonCard({
  plan,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">
            {plan.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {plan.summary}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {plan.discipline}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">
          Contents
        </h3>

        <p className="text-gray-600">
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
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
              >
                #{tag.trim()}
              </span>
            ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Link
            to={`/edit/${plan.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
            Edit
        </Link>
        <button
          onClick={() =>
            onDelete(plan.id)
          }
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default LessonCard;