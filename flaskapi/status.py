from flask import Blueprint, jsonify

status = Blueprint("status", __name__)

@status.route("/status")
def get_status():
    return jsonify(status="ok")