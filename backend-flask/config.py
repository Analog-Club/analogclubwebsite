import os
from dotenv import load_dotenv

# Loads environment variables from .env file
load_dotenv()

# Stores the configuration of the Flask app
class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False