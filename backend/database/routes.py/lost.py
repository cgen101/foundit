from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Define the database path
DATABASE_PATH = 'database/findit_database.db'

# Helper function to execute queries
def execute_query(query, args=(), fetch=False):
    """
    Execute a query on the SQLite database.
    Args:
        query (str): SQL query to execute.
        args (tuple): Parameters for the query.
        fetch (bool): Whether to fetch results or not.
    Returns:
        list: Fetched results if fetch=True, else None.
    """
    with sqlite3.connect(DATABASE_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(query, args)
        if fetch:
            return cursor.fetchall()
        conn.commit()

# Route to fetch all lost items
@app.route('/lost_items', methods=['GET'])
def get_lost_items():
    """
    Fetch all lost items from the database.
    """
    try:
        query = "SELECT id, name, color, category, description FROM Items"
        items = execute_query(query, fetch=True)
        result = [
            {"id": item[0], "name": item[1], "color": item[2], "category": item[3], "description": item[4]}
            for item in items
        ]
        return jsonify(result), 200
    except Exception as e:
        print(f"Error fetching items: {e}")
        return jsonify({"error": "Failed to fetch items"}), 500

# Route to add a new lost item
@app.route('/lost_items', methods=['POST'])
def add_lost_item():
    """
    Add a new lost item to the database.
    """
    try:
        data = request.get_json()
        name = data.get('name')
        color = data.get('color')
        category = data.get('category')
        description = data.get('description')

        if not all([name, color, category, description]):
            return jsonify({"error": "All fields are required"}), 400

        query = '''
        INSERT INTO Items (name, color, category, description) 
        VALUES (?, ?, ?, ?)
        '''
        execute_query(query, (name, color, category, description))
        return jsonify({"message": "Item added successfully"}), 201
    except Exception as e:
        print(f"Error adding item: {e}")
        return jsonify({"error": "Failed to add item"}), 500

# Route to delete a lost item
@app.route('/lost_items/<int:item_id>', methods=['DELETE'])
def delete_lost_item(item_id):
    """
    Delete a lost item from the database.
    """
    try:
        query = "DELETE FROM Items WHERE id = ?"
        execute_query(query, (item_id,))
        return jsonify({"message": "Item deleted successfully"}), 200
    except Exception as e:
        print(f"Error deleting item: {e}")
        return jsonify({"error": "Failed to delete item"}), 500

# Test route to verify server is running
@app.route('/home', methods=['GET'])
def home():
    """
    Test route to check server status.
    """
    return jsonify({"message": "Server is running!"}), 200

# Error handler for 500 Internal Server Error
@app.errorhandler(500)
def internal_error(e):
    """
    Handle 500 Internal Server Error.
    """
    return jsonify({"error": "An internal server error occurred."}), 500

# Run the Flask app
if __name__ == '__main__':
    # Ensure the database directory exists
    os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)
    app.run(host='0.0.0.0', port=5001, debug=True)
