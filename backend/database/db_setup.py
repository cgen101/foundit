import sqlite3
import os

def setup_database():
    # Define the path to your database and schema file
    database_path = 'database/findit_database.db'  # Update with your actual path if needed
    schema_file_path = 'database/findit_models.sql'  # Path to your schema file

    # Ensure the database directory exists
    os.makedirs(os.path.dirname(database_path), exist_ok=True)

    # Establish a connection to the database
    connect = sqlite3.connect(database_path)
    cursor = connect.cursor()
    print("Connection to database successful!")

    # Check if the 'Items' table exists
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='Items';")
    result_items = cursor.fetchone()

    # Check if the 'Users' table exists
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='Users';")
    result_users = cursor.fetchone()

    # If tables don't exist, apply the schema
    if not result_items or not result_users:
        print("Applying schema to database...")
        # Read and execute the SQL commands in the schema file
        try:
            with open(schema_file_path, 'r') as schema_file:
                schema_sql = schema_file.read()
                cursor.executescript(schema_sql)
            print("Schema has been successfully applied to the database.")
        except (sqlite3.Error, FileNotFoundError) as e:
            print(f"An error occurred while applying the schema: {e}")
    else:
        print("Schema already applied. Tables are ready!")

    # Closing the established connection
    connect.close()