from fastapi import FastAPI
from database import get_connection
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Allow all origins (good for development)
    allow_credentials=True,
    allow_methods=["*"],      # Allow all HTTP methods
    allow_headers=["*"],      # Allow all headers
)

# -----------------------------
# User Model
# -----------------------------
class User(BaseModel):
    first_name: str
    last_name: str
    age: int
    weight: float
    height: float


# -----------------------------
# Home
# -----------------------------
@app.get("/")
def home():
    return {"message": "Fitness API is running!"}


# -----------------------------
# Get All Users
# -----------------------------
@app.get("/users")
def get_users():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()

    cursor.close()
    conn.close()

    return users


# -----------------------------
# Create User
# -----------------------------
@app.post("/users")
def create_user(user: User):
    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO users
    (first_name, last_name, age, weight, height)
    VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        user.first_name,
        user.last_name,
        user.age,
        user.weight,
        user.height
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "User added successfully"}


# -----------------------------
# Update User
# -----------------------------
@app.put("/users/{user_id}")
def update_user(user_id: int, user: User):
    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    UPDATE users
    SET
        first_name = %s,
        last_name = %s,
        age = %s,
        weight = %s,
        height = %s
    WHERE id = %s
    """

    values = (
        user.first_name,
        user.last_name,
        user.age,
        user.weight,
        user.height,
        user_id
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "User updated successfully"}


# -----------------------------
# Delete User
# -----------------------------
@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    sql = "DELETE FROM users WHERE id = %s"

    cursor.execute(sql, (user_id,))
    conn.commit()

    cursor.close()
    conn.close()

    return {"message": "User deleted successfully"}