from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)

# === Your API routes here ===
@app.route("/checkin", methods=["POST"])
def checkIn_hardware():
    project_id = request.args.get("projectId")
    qty = request.args.get("qty")
    return jsonify({
        "message": f"{qty} hardware checked in",
        "projectId": project_id,
        "qty": qty
    })

@app.route("/checkout", methods=["POST"])
def checkOut_hardware():
    project_id = request.args.get("projectId")
    qty = request.args.get("qty")
    return jsonify({
        "message": f"{qty} hardware checked out",
        "projectId": project_id,
        "qty": qty
    })

@app.route("/join", methods=["POST"])
def joinProject():
    project_id = request.args.get("projectId")
    return jsonify({
        "message": f"Joined {project_id}",
        "projectId": project_id
    })

@app.route("/leave", methods=["POST"])
def leaveProject():
    project_id = request.args.get("projectId")
    return jsonify({
        "message": f"Left {project_id}",
        "projectId": project_id
    })

# === Serve React build ===
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)