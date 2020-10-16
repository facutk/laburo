from os import environ
from dotenv import load_dotenv

load_dotenv()

class Config:
    STATIC_FOLDER = 'static'
    STATIC_URL_PATH = ""
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
