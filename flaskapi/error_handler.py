from flask import current_app as app, request, jsonify

@app.errorhandler(404)
def error_404(e):
    if "api" in request.url:
      return jsonify(error=str(e.description)), 404
    return app.send_static_file("index.html")