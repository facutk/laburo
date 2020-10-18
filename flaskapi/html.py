from flask import current_app as app, Blueprint

html = Blueprint("html", __name__)

@html.route("/", defaults={"path": ""})
def serve_html(path):
    return app.send_static_file("index.html")