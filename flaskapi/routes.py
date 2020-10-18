from flask import current_app as app, jsonify, request, abort
from .models import db, User, Todo
from .utils.lexorank import rank
import uuid

@app.route("/api/users_add")
def users_add():
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
    allTodos = [todo.serialize for todo in Todo.query.order_by(Todo.rank.asc()).all()]
    return(jsonify(allTodos))

  if request.method == "POST":
    data = request.get_json(force=True)

    prev_rank = ""
    next_rank = ""
    first_todo = Todo.query.order_by(Todo.rank.asc()).first()
    if first_todo:
      next_rank = first_todo.rank

    t = Todo(id = str(uuid.uuid4()), text=data["text"], rank=rank(prev_rank, next_rank))
    db.session.add(t)
    db.session.commit()

    return(jsonify(t.serialize))

@app.route("/api/todos/<todo_id>", methods = ["DELETE"])
def delete_todo(todo_id):
  todo = Todo.query.filter_by(id=todo_id).first_or_404("Todo not found")
  db.session.delete(todo)
  db.session.commit()

  return(jsonify(message='ok'))

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
