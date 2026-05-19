from datetime import datetime

from ..extensions import db


class LessonPlan(db.Model):
    __tablename__ = "lesson_plans"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(255), nullable=False)

    objective = db.Column(db.Text, nullable=False)

    summary = db.Column(db.Text, nullable=False)

    discipline = db.Column(db.String(100), nullable=False)

    contents = db.Column(db.Text)

    support_resources = db.Column(db.Text)

    tags = db.Column(db.String(255))

    expected_date = db.Column(db.Date)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)