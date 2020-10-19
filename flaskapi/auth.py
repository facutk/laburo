from flask import current_app as app, Blueprint, jsonify, request, abort
from flask_mail import Mail, Message
mail = Mail(app)

auth = Blueprint("auth", __name__)

@auth.route("/auth/signup", methods = ["POST"])
def signup():
    data = request.get_json(force=True)
    email = data["email"]

    if email == None:
        return jsonify(error="Missing email"), 400

    msg = Message(
        "New account",
        sender = app.config["MAIL_SENDER"],
        recipients = [email]
    )
    msg.body = "Please activate your account"
    msg.html = "Please activate your account <b>now</b>"
    mail.send(msg)
    return(jsonify(status="OK"))

@auth.route("/auth/login", methods = ["POST"])
def login():
    data = request.get_json(force=True)

    if 'email' not in data or 'password' not in data:
        return jsonify(error="Missing data"), 400

    email = data["email"]
    password = data["password"]
    
    if email != "foo" or password != "bar":
        return jsonify(error="Wrong credentials"), 403

    resp = jsonify(status="OK")
    resp.set_cookie("my_key", "my_value")

    return(resp)
