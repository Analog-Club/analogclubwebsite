from flask import Blueprint, render_template
from .models import Social, Member, Collection  # Import your models

# Ties web routes to html templates
main = Blueprint('main', __name__)

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

# @app.route('/user/<name>')
# def user(name):
#     personal = f'<h1>Hello, {name}!</h1>'
#     instruc = '<p>Change the name in the <em>browser address bar</em> \
#         and reload the page.</p>'
#     return render_template('admin.html', user=personal, instruc=instruc)