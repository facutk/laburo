from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail

db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()

def create_app():
    app = Flask(__name__, instance_relative_config=False, static_folder="../build", static_url_path="/")
    app.config.from_object("config.Config")

    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)

    with app.app_context():
        from . import error_handler
        from .auth import auth
        from .html import html
        from .status import status
        from .todos import todos
        from .user import user
        
        app.register_blueprint(html, url_prefix="/")
        app.register_blueprint(auth, url_prefix="/api")
        app.register_blueprint(status, url_prefix="/api")
        app.register_blueprint(todos, url_prefix="/api")
        app.register_blueprint(user, url_prefix="/api")

        return app