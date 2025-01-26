USE ANALOG
GO

CREATE TABLE socials (
   social_id INTEGER IDENTITY(1, 1) PRIMARY KEY,
   instagram VARCHAR(100),
   facebook VARCHAR(100),
   website VARCHAR(100),
   phone VARCHAR(10)
);
GO

CREATE TABLE collections (
   collection_id INTEGER IDENTITY(1, 1) PRIMARY KEY,
   collection_name VARCHAR(100) NOT NULL,
   collection_date DATETIME NOT NULL
);
GO

CREATE TABLE minors (
   minor_id INTEGER IDENTITY(1, 1) PRIMARY KEY,
   minor_name VARCHAR(100) NOT NULL
);
GO

CREATE TABLE majors (
   major_id INTEGER IDENTITY(1, 1) PRIMARY KEY,
   major_name VARCHAR(100) NOT NULL
);
GO

CREATE TABLE members (
   member_id INTEGER IDENTITY(1, 1) PRIMARY KEY, --PK
   social_id INTEGER, -- FK
   minor_id INTEGER, -- FK
   major_id INTEGER, -- FK
   member_name VARCHAR(100) NOT NULL,    
   member_year VARCHAR(10) NOT NULL,
   member_age INTEGER NOT NULL,
   FOREIGN KEY (social_id) REFERENCES socials(social_id),
   FOREIGN KEY (minor_id) REFERENCES minors(minor_id),
   FOREIGN KEY (major_id) REFERENCES majors(major_id)
);
GO

CREATE TABLE donations (
   donation_id INTEGER IDENTITY(1, 1) PRIMARY KEY,
   member_id INT,
   donor_name VARCHAR(100),
   donation_amount NUMERIC(10, 2) NOT NULL, 
   donation_date DATETIME NOT NULL,
   FOREIGN KEY (member_id) REFERENCES members(member_id)
);
GO

CREATE TABLE member_collections (
   member_collection_id INTEGER IDENTITY(1, 1) PRIMARY KEY, -- PK
   member_id INTEGER,  -- FK
   collection_id INTEGER,  -- FK
   FOREIGN KEY (member_id) REFERENCES members(member_id),
   FOREIGN KEY (collection_id) REFERENCES collections(collection_id)
);
GO

CREATE TABLE locations (
    location_id INT IDENTITY(1, 1) PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL
);
GO

CREATE TABLE events (
    event_id INT IDENTITY(1, 1) PRIMARY KEY,
    location_id INT,
    event_name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);
GO

CREATE TABLE commissions (
    commission_id INT IDENTITY(1, 1) PRIMARY KEY,
    commissioner VARCHAR(100),
    commission_type VARCHAR(100) NOT NULL,
    commission_amount NUMERIC(10, 2) NOT NULL
);
GO

CREATE TABLE brands (
    brand_id INT IDENTITY(1, 1) PRIMARY KEY,
    brand_name VARCHAR(100) NOT NULL
);
GO

CREATE TABLE cameras (
    camera_id INT IDENTITY(1, 1) PRIMARY KEY,
    brand_id INT,
    camera_name VARCHAR(100) NOT NULL,
    camera_year NUMERIC(4) NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id)
);
GO

CREATE TABLE films (
    film_id INT IDENTITY(1, 1) PRIMARY KEY,
    brand_id INT,
    film_speed NUMERIC(4) NOT NULL,
    film_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id)
);
GO

CREATE TABLE photos (
    photo_id INT IDENTITY(1, 1) PRIMARY KEY,
    collection_id INT,
    commission_id INT,
    camera_id INT,
    film_id INT,
    event_id INT,
    member_id INT,
    photo_name VARCHAR(100) NOT NULL,
    photo_path VARCHAR(100) NOT NULL,
    photo_date DATE NOT NULL,
    photo_description VARCHAR(200),
    FOREIGN KEY (collection_id) REFERENCES collections(collection_id),
    FOREIGN KEY (commission_id) REFERENCES commissions(commission_id),
    FOREIGN KEY (camera_id) REFERENCES cameras(camera_id),
    FOREIGN KEY (film_id) REFERENCES films(film_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);
GO