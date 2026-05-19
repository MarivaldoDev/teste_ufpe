from flask import Blueprint, request, jsonify
from datetime import datetime

from ..extensions import db
from ..models.lesson_plan import LessonPlan
from ..app.schemas.lesson_plan_schema import LessonPlanSchema
from ..services.ai_service import generate_lesson_recommendations


lesson_plan_bp = Blueprint("lesson_plan", __name__)

lesson_plan_schema = LessonPlanSchema()
lesson_plans_schema = LessonPlanSchema(many=True)


# CREATE
@lesson_plan_bp.route("/plans", methods=["POST"])
def create_lesson_plan():
    data = request.get_json()

    errors = lesson_plan_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    lesson_plan = LessonPlan(
        title=data["title"],
        objective=data["objective"],
        summary=data["summary"],
        discipline=data["discipline"],
        contents=data.get("contents"),
        support_resources=data.get("support_resources"),
        tags=data.get("tags"),
        expected_date=(
            datetime.strptime(
                data["expected_date"],
                "%Y-%m-%d"
            ).date()
            if data.get("expected_date")
            else None
        ),
    )

    db.session.add(lesson_plan)
    db.session.commit()

    return jsonify(lesson_plan_schema.dump(lesson_plan)), 201


# LIST WITH FILTERS + PAGINATION
@lesson_plan_bp.route("/plans", methods=["GET"])
def get_lesson_plans():
    query = LessonPlan.query

    # filtros
    title = request.args.get("title")
    discipline = request.args.get("discipline")
    tags = request.args.get("tags")

    if title:
        query = query.filter(LessonPlan.title.ilike(f"%{title}%"))

    if discipline:
        query = query.filter(
            LessonPlan.discipline.ilike(f"%{discipline}%")
        )

    if tags:
        query = query.filter(
            LessonPlan.tags.ilike(f"%{tags}%")
        )

    # ordenação
    order_by = request.args.get("order_by", "created_at")

    if order_by == "title":
        query = query.order_by(LessonPlan.title.asc())
    else:
        query = query.order_by(LessonPlan.created_at.desc())

    # paginação
    page = request.args.get("page", 1, type=int)

    per_page = request.args.get("per_page", 10, type=int)

    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    return jsonify({
        "items": lesson_plans_schema.dump(pagination.items),
        "total": pagination.total,
        "page": pagination.page,
        "pages": pagination.pages,
    })


# GET BY ID
@lesson_plan_bp.route("/plans/<int:plan_id>", methods=["GET"])
def get_lesson_plan(plan_id):
    lesson_plan = LessonPlan.query.get_or_404(plan_id)

    return jsonify(lesson_plan_schema.dump(lesson_plan))


# UPDATE
@lesson_plan_bp.route("/plans/<int:plan_id>", methods=["PUT"])
def update_lesson_plan(plan_id):
    lesson_plan = LessonPlan.query.get_or_404(plan_id)

    data = request.get_json()

    errors = lesson_plan_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    lesson_plan.title = data["title"]
    lesson_plan.objective = data["objective"]
    lesson_plan.summary = data["summary"]
    lesson_plan.discipline = data["discipline"]
    lesson_plan.contents = data.get("contents")
    lesson_plan.support_resources = data.get("support_resources")
    lesson_plan.tags = data.get("tags")
    lesson_plan.expected_date = (
        datetime.strptime(
            data["expected_date"],
            "%Y-%m-%d"
        ).date()
        if data.get("expected_date")
        else None
    )

    db.session.commit()

    return jsonify(lesson_plan_schema.dump(lesson_plan))


# DELETE
@lesson_plan_bp.route("/plans/<int:plan_id>", methods=["DELETE"])
def delete_lesson_plan(plan_id):
    lesson_plan = LessonPlan.query.get_or_404(plan_id)

    db.session.delete(lesson_plan)
    db.session.commit()

    return jsonify({
        "message": "Lesson plan deleted successfully"
    })


@lesson_plan_bp.route(
    "/ai/recommendations",
    methods=["POST"]
)
def ai_recommendations():
    data = request.get_json()

    title = data.get("title")
    discipline = data.get("discipline")
    summary = data.get("summary")

    if not all([title, discipline, summary]):
        return jsonify({
            "error": (
                "title, discipline "
                "and summary are required"
            )
        }), 400

    try:
        recommendations = (
            generate_lesson_recommendations(
                title,
                discipline,
                summary,
            )
        )

        return jsonify(recommendations)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500