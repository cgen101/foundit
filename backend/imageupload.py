import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from flask import jsonify

# Configure Cloudinary with environment variables
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

def upload_image_to_cloudinary(image_file):
    try:
        # Upload image to Cloudinary
        response = cloudinary.uploader.upload(image_file)
        return {"url": response["secure_url"]}
    except Exception as e:
        print(f"Error uploading image: {e}")
        return {"error": "Image upload failed."}
