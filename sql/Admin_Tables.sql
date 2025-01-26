USE ANALOG
GO

-- table creation for admin accounts and logs if needed.

CREATE TABLE admin_users (
    admin_id INT IDENTITY(1, 1)  PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    last_login DATETIME
);

CREATE TABLE admin_action_logs (
    log_id INT IDENTITY(1, 1) PRIMARY KEY,
    admin_id INT,
    action_performed VARCHAR(255),
    action_timestamp DATETIME DEFAULT GETDATE(),
    table_affected VARCHAR(50),
    record_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin_users(admin_id) ON DELETE SET NULL
);