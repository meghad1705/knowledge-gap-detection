from pathlib import Path
import sqlite3

DATABASE_PATH = Path(__file__).parent / "atlas.db"

def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection
