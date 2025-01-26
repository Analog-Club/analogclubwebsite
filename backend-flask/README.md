# Getting Started with Flask

The back-end is constructed with [Flask](https://flask.palletsprojects.com/en/stable/). <br>
Download version 17 of [ODBC Driver](https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16#version-17)

## Connecting to Database

The .env file contains the database url to connect to an mssql database.

`mssql+pyodbc://<login_name>:<password>@<server_name>/<database_name>?driver=ODBC+Driver+17+for+SQL+Server`

If working with a database constructed from the sql README, `<server_name>` should be "localhost" and `<database_name>` should be "ANALOG".

## Available Scripts

Be sure to move to the correct directories via cd commands in the terminal. <br>
In the project directory, you can run:

### `---app` option

Is used to define what file to import. <br>
Defaults to an app (app or application) or factory (create_app or make_app).

Ex. `flask --app cool_file_name run` (if you want to run a file not named "app")

### `flask run`

Runs the app in the development mode.
The link to the Flask App will print in the terminal.