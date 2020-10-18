from datetime import datetime

from . import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)

    def __repr__(self):
        return '<User %r>' % (self.nickname)

    @property
    def serialize(self):
       return {
           'id': self.id,
           'nickname': self.nickname,
           'email'  : self.email
       }

class Todo(db.Model):
    __tablename__ = 'todos'

    id = db.Column(db.String(36), primary_key=True)
    text = db.Column(db.String(256))
    rank = db.Column(db.String(32), nullable=False)
    created = db.Column(db.DateTime, nullable=False,
        default=datetime.utcnow)
    modified = db.Column(db.DateTime, nullable=False,
        default=datetime.utcnow)

    def __repr__(self):
        return '<Todo %r>' % (self.text)

    @property
    def serialize(self):
       return {
           'id': self.id,
           'text': self.text,
           'rank'  : self.rank,
           'created'  : self.created,
           'modified'  : self.modified
       }