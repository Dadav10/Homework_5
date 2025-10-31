from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BUILD_DIR = os.path.join(BASE_DIR, "..", "build")

app = Flask(__name__, static_folder=BUILD_DIR, static_url_path="")
CORS(app)

@app.route("/")
def serve_react():
    index_path = os.path.join(app.static_folder, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(app.static_folder, "index.html")
    else:
        return "React build not found.", 404

@app.errorhandler(404)
def not_found(e):
    index_path = os.path.join(app.static_folder, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(app.static_folder, "index.html")
    return jsonify({"error": "Not Found"}), 404

# --- API routes ---
@app.route("/checkin", methods=["POST"])
def checkIn_hardware():
    project_id = request.args.get("projectId")
    qty = request.args.get("qty")
    if not project_id or not qty:
        return jsonify({"error": "Missing projectId or qty"}), 400
    return jsonify({
        "message": f"{qty} hardware checked in",
        "projectId": project_id,
        "qty": qty
    })

@app.route("/checkout", methods=["POST"])
def checkOut_hardware():
    project_id = request.args.get("projectId")
    qty = request.args.get("qty")
    if not project_id or not qty:
        return jsonify({"error": "Missing projectId or qty"}), 400
    return jsonify({
        "message": f"{qty} hardware checked out",
        "projectId": project_id,
        "qty": qty
    })

@app.route("/join", methods=["POST"])
def joinProject():
    project_id = request.args.get("projectId")
    if not project_id:
        return jsonify({"error": "Missing projectId"}), 400
    return jsonify({
        "message": f"Joined {project_id}",
        "projectId": project_id
    })

@app.route("/leave", methods=["POST"])
def leaveProject():
    project_id = request.args.get("projectId")
    if not project_id:
        return jsonify({"error": "Missing projectId"}), 400
    return jsonify({
        "message": f"Left {project_id}",
        "projectId": project_id
    })

if __name__ == "__main__":
    app.run(debug=True)