from app import create_app

# Creates app structure from app/__init__.py
app = create_app()

# Checks if this file is being directly run as the main program
# (as opposed to being imported into another program)
if __name__ == '__main__':
    # Runs the app
    app.run(debug=True)