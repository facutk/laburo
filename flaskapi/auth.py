from flask import current_app as app, Blueprint, jsonify, request, abort
from flask_mail import Mail, Message
mail = Mail(app)

auth = Blueprint("auth", __name__)

@auth.route("/auth/signup", methods = ["POST"])
def signup():
    data = request.get_json(force=True)
    email = data["email"]

    if email == None:
        abort(400, "Missing email")

    msg = Message(
        "New account",
        sender = app.config["MAIL_SENDER"],
        recipients = [email]
    )
    msg.body = "Please activate your account"
    msg.html = "Please activate your account <b>now</b>"
    mail.send(msg)
    return(jsonify(status="OK"))
