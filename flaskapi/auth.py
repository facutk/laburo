from flask import current_app as app, Blueprint, jsonify, request, abort
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)

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
        return jsonify(error="Wrong credentials"), 401

    # Create the tokens we will be sending back to the user
    access_token = create_access_token(identity=email)
    refresh_token = create_refresh_token(identity=email)

    # Set the JWT cookies in the response
    resp = jsonify({'login': True})
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp, 200

@auth.route('/auth/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    # Create the new access token
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    # Set the JWT access cookie in the response
    resp = jsonify({'refresh': True})
    set_access_cookies(resp, access_token)
    return resp, 200

@auth.route('/auth/remove', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200

@auth.route('/auth/protected', methods=['GET'])
@jwt_required
def protected():
    username = get_jwt_identity()
    return jsonify({'hello': 'from {}'.format(username)}), 200

