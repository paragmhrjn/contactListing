from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# initializing apps
app = Flask(__name__)

# defining cors to maintaining error
CORS(app) 

# establishing connection with database using sqlite and sqlalchemy
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jspyprojct.db"
# configuring sql to stop form tracking modification
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)