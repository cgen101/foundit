CREATE TABLE IF NOT EXISTS Items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_location TEXT NOT NULL,
    item_name TEXT NOT NULL,
    item_color TEXT NOT NULL UNIQUE,
    item_description TEXT NOT NULL UNIQUE,
    item_picture TEXT NOT NULL, 
    item_flag TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    user_password TEXT NOT NULL
);

