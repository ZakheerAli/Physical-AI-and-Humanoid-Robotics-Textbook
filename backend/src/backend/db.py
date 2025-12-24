import psycopg
from backend.config import settings
import logging

logger = logging.getLogger(__name__)

def get_db_connection():
    return psycopg.connect(settings.NEON_DATABASE_URL)

def init_db():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Create conversations table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS conversations (
                        id SERIAL PRIMARY KEY,
                        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        user_message TEXT,
                        bot_response TEXT,
                        selection TEXT,
                        sources TEXT[],
                        mode TEXT
                    );
                """)
                conn.commit()
                logger.info("Database initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize database: {str(e)}")

def log_conversation(user_message, bot_response, selection=None, sources=[], mode="full"):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO conversations (user_message, bot_response, selection, sources, mode)
                    VALUES (%s, %s, %s, %s, %s);
                """, (user_message, bot_response, selection, sources, mode))
                conn.commit()
    except Exception as e:
        logger.error(f"Failed to log conversation: {str(e)}")
