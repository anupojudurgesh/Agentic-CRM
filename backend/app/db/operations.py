from app.db.database import get_conn
import json

def insert_interaction(data: dict):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO interactions (
                    hcp_name, interaction_type, date, time, attendees, topics,
                    materials_shared, samples_distributed, sentiment, outcomes, follow_up_actions
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, (
                data.get("hcp_name"),
                data.get("interaction_type"),
                data.get("date"),
                data.get("time"),
                json.dumps(data.get("attendees", [])),
                data.get("topics"),
                json.dumps(data.get("materials_shared", [])),
                json.dumps(data.get("samples_distributed", [])),
                data.get("sentiment"),
                data.get("outcomes"),
                data.get("follow_up_actions")
            ))
            new_id = cur.fetchone()[0]
            conn.commit()
            return new_id


def update_interaction(data: dict):
    # Demo approach: update the latest record
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM interactions ORDER BY id DESC LIMIT 1;")
            row = cur.fetchone()
            if not row:
                return None
            last_id = row[0]

            fields = []
            values = []

            for key in ["hcp_name", "interaction_type", "date", "time", "sentiment", "attendees", "topics", "materials_shared", "samples_distributed", "outcomes", "follow_up_actions"]:
                if key in data and data[key] is not None:
                    fields.append(f"{key} = %s")
                    if key in ["attendees", "materials_shared", "samples_distributed"]:
                        values.append(json.dumps(data[key]))
                    else:
                        values.append(data[key])

            if not fields:
                return last_id

            query = f"UPDATE interactions SET {', '.join(fields)} WHERE id = %s;"
            values.append(last_id)

            cur.execute(query, values)
            conn.commit()
            return last_id

def get_all_interactions():
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, hcp_name, interaction_type, date, time, attendees, topics, materials_shared, samples_distributed, sentiment, outcomes, follow_up_actions, created_at FROM interactions ORDER BY id DESC;")
            rows = cur.fetchall()
            result = []
            for row in rows:
                attendees = row[5]
                if isinstance(attendees, str): attendees = json.loads(attendees)
                elif attendees is None: attendees = []
                
                materials_shared = row[7]
                if isinstance(materials_shared, str): materials_shared = json.loads(materials_shared)
                elif materials_shared is None: materials_shared = []

                samples_distributed = row[8]
                if isinstance(samples_distributed, str): samples_distributed = json.loads(samples_distributed)
                elif samples_distributed is None: samples_distributed = []

                result.append({
                    "id": row[0],
                    "hcp_name": row[1],
                    "interaction_type": row[2],
                    "date": row[3],
                    "time": row[4],
                    "attendees": attendees,
                    "topics": row[6],
                    "materials_shared": materials_shared,
                    "samples_distributed": samples_distributed,
                    "sentiment": row[9],
                    "outcomes": row[10],
                    "follow_up_actions": row[11],
                    "created_at": str(row[12]) if row[12] else None
                })
            return result

def get_latest_interaction():
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, hcp_name, interaction_type, date, time, attendees, topics, materials_shared, samples_distributed, sentiment, outcomes, follow_up_actions FROM interactions ORDER BY id DESC LIMIT 1;")
            row = cur.fetchone()
            if not row:
                return None
                
            attendees = row[5]
            if isinstance(attendees, str): attendees = json.loads(attendees)
            elif attendees is None: attendees = []
            
            materials_shared = row[7]
            if isinstance(materials_shared, str): materials_shared = json.loads(materials_shared)
            elif materials_shared is None: materials_shared = []

            samples_distributed = row[8]
            if isinstance(samples_distributed, str): samples_distributed = json.loads(samples_distributed)
            elif samples_distributed is None: samples_distributed = []

            return {
                "id": row[0],
                "hcp_name": row[1],
                "interaction_type": row[2],
                "date": row[3],
                "time": row[4],
                "attendees": attendees,
                "topics": row[6],
                "materials_shared": materials_shared,
                "samples_distributed": samples_distributed,
                "sentiment": row[9],
                "outcomes": row[10],
                "follow_up_actions": row[11]
            }

def delete_all_interactions():
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM interactions;")
            conn.commit()

def check_db_connection():
    try:
        with get_conn() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT 1;")
                return True
    except Exception as e:
        return False