from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="build", static_url_path="/")
app.config.from_object('config.Config')

db = SQLAlchemy(app)
from models import User

@app.route("/api/add/")
def webhook():
    id = 1
    name = "ram"
    email = "ram@ram.com"
    u = User(id = id, nickname = name, email = email)
    print("user created", u)
    db.session.add(u)
    db.session.commit()
    return "user created"

@app.route("/api/users")
def users():
    id = 1
    name = "ram"
    email = "ram@ram.com"
    u = User(id = id, nickname = name, email = email)
    print("user created", u)
    db.session.add(u)
    db.session.commit()
    return "user created"

@app.route("/api/user/<nickname>")
def show_user(nickname):
    user = User.query.filter_by(nickname=nickname).first_or_404("user not found")
    print(user)
    return(jsonify(user.serialize))

@app.route("/api/notes/<note_id>", methods = ["GET"])
def notes(note_id):
    return({})

@app.route("/api/status")
def heartbeat():
    return jsonify({"status": "ok"})

@app.route("/", defaults={"path": ""})
@app.errorhandler(404)
def index(path):
    return app.send_static_file("index.html")

@app.errorhandler(404)
def error_404(e):
    if 'api' in request.url:
        return jsonify(error=str(e.description)), 404
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run()
