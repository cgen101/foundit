from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from routes.users import users_bp
from imageupload import upload_image_to_cloudinary
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database.db_setup import setup_database

# Load environment variables from .env file
load_dotenv()
setup_database()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
app.secret_key = 'dev_secret_key'

app.register_blueprint(users_bp)

# Root route for testing
@app.route('/home')
def home():
    return "Hello, Flask is working!"

# Route for image upload
@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided."}), 400

    image_file = request.files['image']
    upload_response = upload_image_to_cloudinary(image_file)
    if "error" in upload_response:
        return jsonify({"error": upload_response["error"]}), 500

    return jsonify(upload_response)

# Error handling for 500 - Internal Server Error
@app.errorhandler(500)
def internal_error(e):
    return {"error": "An internal server error occurred."}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
