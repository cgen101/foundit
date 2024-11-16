from flask import Flask
from routes.uploadImage import uploadImage_bp

app = Flask(__name__)

# Register the blueprint from the routes folder
app.register_blueprint(uploadImage_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
