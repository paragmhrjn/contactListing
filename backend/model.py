# import db which is configure with sqlalchemy
from config import db

# creating a class to inheritence a model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

# function to convert data model into dictionary and afterward to json format
def to_json(self):
    return {
        "id": self.id,
        "firstname": self.first_name,
        "lastName": self.last_name,
        "email": self.email,
    }