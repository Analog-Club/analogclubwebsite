# imports from __init__.py
from . import db

# Socials Table
class Social(db.Model):
    __tablename__ = 'socials'

    social_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    instagram = db.Column(db.String(100))
    facebook = db.Column(db.String(100))
    website = db.Column(db.String(100))
    phone = db.Column(db.String(10))

    members = db.relationship('Member', backref='social', lazy=True)

    def to_dict(self):
        return {
            "social_id": self.social_id,
            "instagram": self.instagram,
            "facebook": self.facebook,
            "website": self.website,
            "phone": self.phone
        }


# Collections Table
class Collection(db.Model):
    __tablename__ = 'collections'

    collection_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    collection_name = db.Column(db.String(100), nullable=False)
    collection_date = db.Column(db.DateTime, nullable=False)

    photos = db.relationship('Photo', backref='collection', lazy=True)
    member_collections = db.relationship('MemberCollection', backref='collection', lazy=True)

    def to_dict(self):
        return {
            "collection_id": self.collection_id,
            "collection_name": self.collection_name,
            "collection_date": self.collection_date
        }


# Minors Table
class Minor(db.Model):
    __tablename__ = 'minors'

    minor_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    minor_name = db.Column(db.String(100), nullable=False)

    members = db.relationship('Member', backref='minor', lazy=True)

    def to_dict(self):
        return {
            "minor_id": self.minor_id,
            "minor_name": self.minor_name
        }


# Majors Table
class Major(db.Model):
    __tablename__ = 'majors'

    major_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    major_name = db.Column(db.String(100), nullable=False)

    members = db.relationship('Member', backref='major', lazy=True)

    def to_dict(self):
        return {
            "major_id": self.major_id,
            "major_name": self.major_name
        }


# Members Table
class Member(db.Model):
    __tablename__ = 'members'

    member_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    social_id = db.Column(db.Integer, db.ForeignKey('socials.social_id'))
    minor_id = db.Column(db.Integer, db.ForeignKey('minors.minor_id'))
    major_id = db.Column(db.Integer, db.ForeignKey('majors.major_id'))
    member_name = db.Column(db.String(100), nullable=False)
    member_year = db.Column(db.String(10), nullable=False)
    member_age = db.Column(db.Integer, nullable=False)

    donations = db.relationship('Donation', backref='member', lazy=True)
    photos = db.relationship('Photo', backref='member', lazy=True)
    member_collections = db.relationship('MemberCollection', backref='member', lazy=True)

    def to_dict(self):
        return {
            "member_id": self.member_id,
            "social_id": self.social_id,
            "minor_id": self.minor_id,
            "major_id": self.major_id,
            "member_name": self.member_name,
            "member_year": self.member_year,
            "member_age": self.member_age
        }


# Donations Table
class Donation(db.Model):
    __tablename__ = 'donations'

    donation_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    member_id = db.Column(db.Integer, db.ForeignKey('members.member_id'))
    donor_name = db.Column(db.String(100))
    donation_amount = db.Column(db.Numeric(10, 2), nullable=False)
    donation_date = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "donation_id": self.donation_id,
            "member_id": self.member_id,
            "donor_name": self.donor_name,
            "donation_amount": self.donation_amount,
            "donation_date": self.donation_date
        }


# Member Collections Table
class MemberCollection(db.Model):
    __tablename__ = 'member_collections'

    member_collection_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    member_id = db.Column(db.Integer, db.ForeignKey('members.member_id'))
    collection_id = db.Column(db.Integer, db.ForeignKey('collections.collection_id'))

    def to_dict(self):
        return {
            "member_collection_id": self.member_collection_id,
            "member_id": self.member_id,
            "collection_id": self.collection_id
        }


# Locations Table
class Location(db.Model):
    __tablename__ = 'locations'

    location_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    location_name = db.Column(db.String(100), nullable=False)

    events = db.relationship('Event', backref='location', lazy=True)

    def to_dict(self):
        return {
            "location_id": self.location_id,
            "location_name": self.location_name
        }


# Events Table
class Event(db.Model):
    __tablename__ = 'events'

    event_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.location_id'))
    event_name = db.Column(db.String(100), nullable=False)
    event_date = db.Column(db.Date, nullable=False)

    photos = db.relationship('Photo', backref='event', lazy=True)

    def to_dict(self):
        return {
            "event_id": self.event_id,
            "location_id": self.location_id,
            "event_name": self.event_name,
            "event_date": self.event_date
        }


# Commissions Table
class Commission(db.Model):
    __tablename__ = 'commissions'

    commission_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    commissioner = db.Column(db.String(100))
    commission_type = db.Column(db.String(100), nullable=False)
    commission_amount = db.Column(db.Numeric(10, 2), nullable=False)

    photos = db.relationship('Photo', backref='commission', lazy=True)

    def to_dict(self):
        return {
            "commission_id": self.commission_id,
            "commissioner": self.commissioner,
            "commission_type": self.commission_type,
            "commission_amount": self.commission_amount
        }


# Brands Table
class Brand(db.Model):
    __tablename__ = 'brands'

    brand_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    brand_name = db.Column(db.String(100), nullable=False)

    cameras = db.relationship('Camera', backref='brand', lazy=True)
    films = db.relationship('Film', backref='brand', lazy=True)

    def to_dict(self):
        return {
            "brand_id": self.brand_id,
            "brand_name": self.brand_name
        }


# Cameras Table
class Camera(db.Model):
    __tablename__ = 'cameras'

    camera_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.brand_id'))
    camera_name = db.Column(db.String(100), nullable=False)
    camera_year = db.Column(db.Numeric(4), nullable=False)

    photos = db.relationship('Photo', backref='camera', lazy=True)

    def to_dict(self):
        return {
            "camera_id": self.camera_id,
            "brand_id": self.brand_id,
            "camera_name": self.camera_name,
            "camera_year": self.camera_year
        }


# Films Table
class Film(db.Model):
    __tablename__ = 'films'

    film_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.brand_id'))
    film_speed = db.Column(db.Numeric(4), nullable=False)
    film_name = db.Column(db.String(100), nullable=False)

    photos = db.relationship('Photo', backref='film', lazy=True)

    def to_dict(self):
        return {
            "film_id": self.film_id,
            "brand_id": self.brand_id,
            "film_speed": self.film_speed,
            "film_name": self.film_name
        }


# Photos Table
class Photo(db.Model):
    __tablename__ = 'photos'

    photo_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    collection_id = db.Column(db.Integer, db.ForeignKey('collections.collection_id'))
    commission_id = db.Column(db.Integer, db.ForeignKey('commissions.commission_id'))
    camera_id = db.Column(db.Integer, db.ForeignKey('cameras.camera_id'))
    film_id = db.Column(db.Integer, db.ForeignKey('films.film_id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'))
    member_id = db.Column(db.Integer, db.ForeignKey('members.member_id'))
    photo_name = db.Column(db.String(100), nullable=False)
    photo_path = db.Column(db.String(100), nullable=False)
    photo_date = db.Column(db.Date, nullable=False)
    photo_description = db.Column(db.String(200))

    def to_dict(self):
        return {
            "photo_id": self.photo_id,
            "collection_id": self.collection_id,
            "commission_id": self.commission_id,
            "camera_id": self.camera_id,
            "film_id": self.film_id,
            "event_id": self.event_id,
            "member_id": self.member_id,
            "photo_name": self.photo_name,
            "photo_path": self.photo_path,
            "photo_date": self.photo_date,
            "photo_description": self.photo_description
        }
