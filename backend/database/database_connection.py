import os
import sqlite3

def get_db_connection():
    """
    Establish and return a connection to the SQLite database.
    The database is located in the 'database' folder.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  
    db_path = os.path.join(base_dir, 'database', 'findit_database.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  
    return conn