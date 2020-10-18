from flask import Blueprint, jsonify
from .models import db, User

user = Blueprint("user", __name__)

@user.route("/user/<nickname>", methods = ["GET"])
def show_user(nickname):
    user = User.query.filter_by(nickname=nickname).first_or_404("user not found")
    print(user)
    return(jsonify(user.serialize))

@user.route("/user/", methods = ["POST"])
def users_add():
    id = 1
    name = "ram"
    email = "ram@ram.com"
    u = User(id = id, nickname = name, email = email)
    print("user created", u)
    db.session.add(u)
    db.session.commit()
    return "user created"