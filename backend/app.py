from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database.db_setup import setup_database

# Load environment variables from .env file
load_dotenv()
setup_database()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


# Root route for testing
@app.route('/home')
def home():
    return "Hello, Flask is working!"

# Error handling for 500 - Internal Server Error
@app.errorhandler(500)
def internal_error(e):
    return {"error": "An internal server error occurred."}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)