from flask import Flask
from flask_cors import CORS

from .config import Config
from ..extensions import db, migrate

from ..models import LessonPlan
from ..routes.lesson_plan_routes import lesson_plan_bp

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(lesson_plan_bp)

    @app.route("/health")
    def health():
        return {"status": "ok"}, 200

    return app