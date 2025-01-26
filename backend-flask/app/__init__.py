from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from flask_migrate import Migrate

# Include flask_migrate if database schema changes are necessary

db = SQLAlchemy()
# migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    CORS(app)  # Allow cross-origin requests (for React frontend)

    db.init_app(app)
    # migrate.init_app(app, db)

    from app.routes import main
    app.register_blueprint(main)

    return app
