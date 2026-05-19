from decouple import config


class Config:
    SECRET_KEY = config("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = config("DATABASE_URL")
    GROQ_API_KEY = config("GROQ_API_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False