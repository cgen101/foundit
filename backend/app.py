from flask import Flask
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
from database.db_connection import setup_database

# Load environment variables from .env file
load_dotenv()

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

# CMD ["sh", "-c", "python database/db-connection.py && flask run --host=0.0.0.0"]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)