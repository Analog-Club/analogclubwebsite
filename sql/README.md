# Getting Started with MSSQL

This project uses SQL Server 2022. <br>

## Windows Devices
- Download [SQL Server Management Studio](https://www.c-sharpcorner.com/article/how-to-install-sql-server-20222/) (Windows Guide).
- For VS Code get [SQL Server extension](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql).

## MAC Devices
- First, install [Docker](https://docs.docker.com/desktop/setup/install/mac-install/)
- Download [SQL Server Management Studio](https://builtin.com/software-engineering-perspectives/sql-server-management-studio-mac) (Mac Guide).

# Connecting to Local Database (for testing)
Using SSMS (SQL Server Management Studio)
- Server type should be Database Engine
- Server name should be "localhost"
- Windows: use windows authentication and no username/password should be needed.
- Mac: use username/password setup in guide.
- check the box for "Trust server certificate"

# Creating SQL User for easier database access (Python Backend)
- In the object explorer, right click the server and click into "properties".
- Set local server's (or whatever server is being used) "Security" settings to include SQL Server authentication.
- Right click and restart the server if you needed to change the security settings.
- In the object explorer, right click the "Security" folder.
- Make a new "Login".
- Set to SQL Server authentication and fillout login name/password.
- Optional: uncheck enforce password policy for easier login setup (worse for security).
- Connecting to the database in Azure Data Studio, VS Code, and python backend will require the server name, database name, login, and password

# Populating Tables With Test Data
- Run the test_data.sql script while connected to local database.
- A database named "ANALOG" will be created and populated (might be using an outdated schema).