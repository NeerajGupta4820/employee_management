# app/config.py
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Yeh dono variables same hone chahiye
MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = 'assessment_db'

try:
    client = MongoClient(MONGODB_URL)  # Yahan MONGODB_URL use karein
    db = client[DB_NAME]
    print("✅ MongoDB connection successful!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")