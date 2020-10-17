from flask import current_app as app, jsonify, request
from .models import db, User
from .utils.lexorank import rank
import time
import uuid

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

todo_list = []
@app.route("/api/todos", methods = ["GET", "POST"])
def todos():
  if request.method == "GET":
    return(jsonify(todo_list))
  if request.method == "POST":
    data = request.get_json(force=True)
    new_todo = {
      "id": uuid.uuid4(),
      "created": time.time(),
      "description": data["description"]
    }
    todo_list.append(new_todo)
    return(jsonify(todo_list))

@app.route("/api/todos/<todo_id>", methods = ["DELETE"])
def todo():
  return(jsonify({}))

@app.route("/api/rank/<prev>/<next>")
def getRank(prev, next):
  return jsonify({"result": rank(prev, next)})

@app.route("/api/status")
def heartbeat():
    return jsonify({"status": "ok"})

@app.route("/", defaults={"path": ""})
def index(path):
    return app.send_static_file("index.html")

@app.errorhandler(404)
def error_404(e):
    if 'api' in request.url:
        return jsonify(error=str(e.description)), 404
    return app.send_static_file("index.html")
