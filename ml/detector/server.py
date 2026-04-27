from flask import Flask, request, jsonify, send_from_directory, render_template_string
from pathlib import Path
from datetime import datetime

app = Flask(__name__)

UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)

# ── Simple gallery UI ───────────────────────────────────────
HTML_PAGE = """
<!DOCTYPE html>
<html>
<head>
    <title>Uploads</title>
    <meta http-equiv="refresh" content="5">
</head>
<body style="background:#111;color:#fff;font-family:sans-serif;">
    {% for img in images %}
        <div style="margin:10px">
            <img src="/images/{{img}}" width="1000"><br>
        </div>
    {% endfor %}
</body>
</html>
"""

@app.route("/")
def gallery():
    images = sorted([p.name for p in UPLOAD_FOLDER.glob("*.jpg")], reverse=True)
    return render_template_string(HTML_PAGE, images=images)

# ── Upload endpoint ─────────────────────────────────────────
@app.route("/upload", methods=["POST"])
def upload():
    if "image" not in request.files:
        return jsonify({"error": "No image"}), 400

    file = request.files["image"]
    people = request.form.get("people", "unknown")

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"latest.jpg"
    filepath = UPLOAD_FOLDER / filename

    file.save(filepath)

    return jsonify({
        "status": "ok",
        "filename": filename
    })

# ── Serve images ────────────────────────────────────────────
@app.route("/images/<filename>")
def get_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# ── Run server ──────────────────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8225, debug=True)