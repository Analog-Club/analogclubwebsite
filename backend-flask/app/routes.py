from flask import Blueprint, render_template, jsonify
from .models import Social, Member, Collection  # Import your models

# Ties web routes to html templates
main = Blueprint('main', __name__)
api = Blueprint('api', __name__, url_prefix='/api')

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/admin')
def admin():
    name = "Jimmy"
    return render_template('admin.html', user=name)

@main.route('/show_tables')
def show_tables():
    # Query data from each table
    socials = Social.query.all()
    members = Member.query.all()
    collections = Collection.query.all()

    # Pass data to the template
    return render_template('show_tables.html', socials=socials, members=members, collections=collections)


# API routes

@api.route('/socials', methods=['GET'])
def get_socials():
    socials = Social.query.all()
    return jsonify([social.to_dict() for social in socials])

@api.route('/members', methods=['GET'])
def get_members():
    members = Member.query.all()
    print(members)
    return jsonify([member.to_dict() for member in members])

@api.route('/collections', methods=['GET'])
def get_collections():
    collections = Collection.query.all()
    return jsonify([collection.to_dict() for collection in collections])

# @app.route('/user/<name>')
# def user(name):
#     personal = f'<h1>Hello, {name}!</h1>'
#     instruc = '<p>Change the name in the <em>browser address bar</em> \
#         and reload the page.</p>'
#     return render_template('admin.html', user=personal, instruc=instruc)