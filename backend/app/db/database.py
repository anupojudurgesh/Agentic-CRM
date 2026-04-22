import psycopg
from app.core.config import settings

def get_conn():
    # Neon requires SSL
    return psycopg.connect(settings.DATABASE_URL, sslmode="require")

def init_db():
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("DROP TABLE IF EXISTS interactions;")
            cur.execute("""
            CREATE TABLE interactions (
                id SERIAL PRIMARY KEY,
                hcp_name TEXT,
                interaction_type TEXT,
                date TEXT,
                time TEXT,
                attendees JSONB,
                topics TEXT,
                materials_shared JSONB,
                samples_distributed JSONB,
                sentiment TEXT,
                outcomes TEXT,
                follow_up_actions TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)
            conn.commit()