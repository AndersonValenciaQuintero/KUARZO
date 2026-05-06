import mysql.connector
from mysql.connector import Error
from config import DB_CONFIG

class Database:
    def __init__(self):
        self.connection = None
        self.connect()

    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=DB_CONFIG["host"],
                user=DB_CONFIG["user"],
                password=DB_CONFIG["password"],
                database=DB_CONFIG["database"]
            )
        except Error as e:
            print(f"Error connecting to MySQL: {e}")

    def fetch_all(self, query, params=None):
        if not self.connection or not self.connection.is_connected():
            self.connect()
        try:
            cursor = self.connection.cursor(dictionary=True)
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            result = cursor.fetchall()
            cursor.close()
            return result
        except Error as e:
            print(f"Error executing query: {e}")
            return []

    def fetch_one(self, query, params=None):
        if not self.connection or not self.connection.is_connected():
            self.connect()
        try:
            cursor = self.connection.cursor(dictionary=True)
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            result = cursor.fetchone()
            cursor.close()
            return result
        except Error as e:
            print(f"Error executing query: {e}")
            return None

    def execute(self, query, params=None):
        if not self.connection or not self.connection.is_connected():
            self.connect()
        try:
            cursor = self.connection.cursor()
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            self.connection.commit()
            last_id = cursor.lastrowid
            cursor.close()
            return last_id
        except Error as e:
            print(f"Error executing query: {e}")
            return None

db = Database()
