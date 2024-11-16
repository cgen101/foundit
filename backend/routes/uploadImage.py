from flask import Blueprint, request, jsonify
import sqlite3
import os

uploadImage_bp = Blueprint('uploadImage', __name__)

# Database configuration
DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../database/database.db")

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@uploadImage_bp.route('/upload-item', methods=['POST'])
def upload_item():
    try:
        # Get data from frontend
        data = request.json
        item_location = data.get('item_location')
        item_name = data.get('item_name')
        item_color = data.get('item_color')
        item_description = data.get('item_description')
        item_picture = data.get('item_picture')  # Cloudinary image URL
        item_flag = data.get('item_flag')  # "lost" or "found"

        # Validate input
        if not all([item_location, item_name, item_color, item_description, item_picture, item_flag]):
            return jsonify({'error': 'All fields are required.'}), 400

        # Insert into the database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            '''
            INSERT INTO Items (item_location, item_name, item_color, item_description, item_picture, item_flag)
            VALUES (?, ?, ?, ?, ?, ?)
            ''',
            (item_location, item_name, item_color, item_description, item_picture, item_flag)
        )
        conn.commit()
        conn.close()

        return jsonify({'message': 'Item uploaded successfully!'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Item with similar details already exists.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
