from flask import Flask, jsonify
from backend.routes.api.uploadPost import uploadPost_bp

app = Flask(__name__)

# Register the blueprint from the routes folder
app.register_blueprint(uploadPost_bp, url_prefix="/api")

# Define a default route for "/"
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Found It API!"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
