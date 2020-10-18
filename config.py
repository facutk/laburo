from os import environ
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = environ.get("MAIL_SERVER")
    MAIL_PORT = environ.get("MAIL_PORT")
    MAIL_USERNAME = environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = environ.get("MAIL_PASSWORD")
    MAIL_SENDER = environ.get("MAIL_SENDER")
