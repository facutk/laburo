from flask import Blueprint, jsonify, request
from .models import db, Todo
from .utils.lexorank import rank
import uuid

todos = Blueprint("todos", __name__)

@todos.route("/todos", methods = ["GET"])
def get_todos():
  allTodos = [todo.serialize for todo in Todo.query.order_by(Todo.rank.asc()).all()]
  return(jsonify(allTodos))

@todos.route("/todos", methods = ["POST"])
def create_todo():
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

@todos.route("/todos/<todo_id>", methods = ["DELETE"])
def delete_todo(todo_id):
  todo = Todo.query.filter_by(id=todo_id).first_or_404("Todo not found")
  db.session.delete(todo)
  db.session.commit()

  return(jsonify(message="ok"))