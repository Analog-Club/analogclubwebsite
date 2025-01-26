USE ANALOG
GO

-- 1)  One (1) Stored procedure to insert a new row of data into one of your database tables
--     (the stored procedures must use lookup code for foreign keys.)

CREATE OR ALTER PROCEDURE InsertNewEvent
    @event_name VARCHAR(100),
    @event_date DATE,
    @location_name VARCHAR(100)
AS
BEGIN
    DECLARE @location_id INT;

    -- lookup location_id based on location_name.
    SELECT @location_id = location_id
    FROM locations
    WHERE location_name = @location_name;

    -- check if id was found.
    IF @location_id IS NULL
    BEGIN
        PRINT 'Location not found.';
        RETURN;
    END

    -- insert.
    INSERT INTO events (event_name, event_date, location_id)
    VALUES (@event_name, @event_date, @location_id);

    PRINT 'Event added successfully.';
END;
GO


-- 2)  One (1) Nested stored procedure insert query to insert a new row of data into another of your database tables
--     (the main stored procedures should invoke stored procedures that lookup the applicable foreign keys.)

-- lookup procedure
CREATE OR ALTER PROCEDURE GetBrandIDByName
    @brand_name VARCHAR(100),
    @brand_id INT OUTPUT
AS
BEGIN
    SELECT @brand_id = brand_id
    FROM brands
    WHERE brand_name = @brand_name;

    -- check if id found, otherwise set to NULL.
    IF @brand_id IS NULL
        PRINT 'Brand not found.';
END;
GO

-- main insert procedure
CREATE PROCEDURE AddCamera
    @camera_name VARCHAR(100),
    @camera_year NUMERIC(4),
    @brand_name VARCHAR(100)
AS
BEGIN
    DECLARE @brand_id INT;

    -- call nested procedure.
    EXEC GetBrandIDBYName @brand_name, @brand_id OUTPUT;

    -- check if id was found.
    IF @brand_id IS NULL
    BEGIN
        PRINT 'Error: Brad not found, cannot insert camera.';
        RETURN;
    END

    -- insert.
    INSERT INTO cameras (camera_name, camera_year, brand_id)
    VALUES (@camera_name, @camera_year, @brand_id);

    PRINT 'Camera added successfully.';
END;
GO


-- 3)  One (1) Check constraint

-- ensure commission amount is greater than 0.
ALTER TABLE commissions
ADD CONSTRAINT
ch_commission_amount
CHECK (commission_amount > 0);
GO

-- 4)  One (1) Computed column. (hint: for computed columns that leverage columns from other tables, you must use a user-defined function).

-- computed column for collection age in years.
ALTER TABLE collections
ADD collection_age AS
DATEDIFF(YEAR, collection_date, GETDATE());
GO

/*
-- test queries.
-- InsertNewEvent
EXEC InsertNewEvent @event_name = 'General Meeting', @event_date = '2023-07-20', @location_name = 'Community Center';
GO

-- AddCamera
EXEC AddCamera @camera_name = 'Nikon F3hp', @camera_year = 2001, @brand_name = 'Nikon';
GO

-- collection_age check
-- SELECT * FROM collections;
-- GO
*/

-- procedure to insert a new member row using lookup code for foreign keys

CREATE OR ALTER PROCEDURE InsertNewMember

   @social_id INTEGER,

   @minor_name VARCHAR(100),

   @major_name VARCHAR(100),

   @member_name VARCHAR(100),

   @member_year VARCHAR(10),

   @member_age INTEGER

AS

BEGIN

   SET NOCOUNT ON;


   DECLARE @minor_id INTEGER, @major_id INTEGER;

   SELECT @minor_id = minor_id FROM minors WHERE minor_name = @minor_name;

   SELECT @major_id = major_id FROM majors WHERE major_name = @major_name;

   INSERT INTO members (social_id, minor_id, major_id, member_name, member_year, member_age)

   VALUES (@social_id, @minor_id, @major_id, @member_name, @member_year, @member_age);

END;

GO


-- procedure to insert a new photo and invoke another procedure for member lookup

CREATE OR ALTER PROCEDURE InsertNewPhoto

   @collection_name VARCHAR(100),

   @commissioner VARCHAR(100),

   @camera_name VARCHAR(50),

   @film_name VARCHAR(50),

   @event_name VARCHAR(50),

   @member_name VARCHAR(100),

   @photo_name VARCHAR(50),

   @photo_date DATE,

   @photo_description VARCHAR(200)

AS

BEGIN

   SET NOCOUNT ON;


   DECLARE @collection_id INTEGER, @commission_id INTEGER, @camera_id INTEGER, @film_id INTEGER, @event_id INTEGER, @member_id INTEGER;

   SELECT @collection_id = collection_id FROM collections WHERE collection_name = @collection_name;

   SELECT @commission_id = commission_id FROM commissions WHERE commissioner = @commissioner;

   SELECT @camera_id = camera_id FROM cameras WHERE camera_name = @camera_name;

   SELECT @film_id = film_id FROM films WHERE film_name = @film_name;

   SELECT @event_id = event_id FROM events WHERE event_name = @event_name;

   EXEC InsertNewMember @social_id = NULL, @minor_name = 'Art History', @major_name = 'Marketing', @member_name = @member_name, @member_year = 'Senior', @member_age = 21;

   SELECT @member_id = SCOPE_IDENTITY();

   INSERT INTO photos (collection_id, commission_id, camera_id, film_id, event_id, member_id, photo_name, photo_date, photo_description)

   VALUES (@collection_id, @commission_id, @camera_id, @film_id, @event_id, @member_id, @photo_name, @photo_date, @photo_description);

END;

GO


-- Add a check constraint to ensure donation_amount is greater than zero

ALTER TABLE donations
ADD CONSTRAINT chk_donation_amount CHECK (donation_amount > 0);
GO


-- Add a computed column to the photos table for photo age

ALTER TABLE photos
ADD photo_age AS DATEDIFF(YEAR, photo_date, GETDATE());
GO

-- 1.)
/* SQL script for updating photo name and description. */
CREATE OR ALTER PROCEDURE UpdatePhotoInfo
    @photo_id INT,
    @new_photo_name VARCHAR(50),
    @new_photo_description VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Update photo details
        UPDATE photos
        SET photo_name = @new_photo_name,
            photo_description = @new_photo_description
        WHERE photo_id = @photo_id;

        -- Check if the update affected any rows
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50001, 'No photo found with the given ID.', 1;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Roll back the transaction if an error occurs
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Re-throw the error
        THROW;
    END CATCH;

    print(CONCAT('photo', @photo_id, 'was successfuly updated'))
END;
GO

-- Photo edits log table.
CREATE TABLE update_log_photos (
    log_id INT IDENTITY(1, 1) PRIMARY KEY,
    photo_id INT,
    old_photo_name VARCHAR(50),
    new_photo_name VARCHAR(50),
    old_photo_description VARCHAR(200),
    new_photo_description VARCHAR(200),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

/* Trigger to automatically log updates to the photo table. */
CREATE TRIGGER LogPhotoUpdate
ON photos
AFTER UPDATE
AS
BEGIN
    INSERT INTO update_log_photos (photo_id, old_photo_name, new_photo_name,
                                    old_photo_description, new_photo_description)
    SELECT 
        inserted.photo_id,
        deleted.photo_name, inserted.photo_name,
        deleted.photo_description, inserted.photo_description
    FROM inserted
    INNER JOIN deleted ON inserted.photo_id = deleted.photo_id;
END;
GO


/* SQL script for deleting photos. */
CREATE OR ALTER PROCEDURE DeletePhoto
    @photo_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Delete the photo based on photo_id
        DELETE FROM photos
        WHERE photo_id = @photo_id;

        -- Check if the delete affected any rows
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50002, 'No photo found with the given ID.', 1;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Roll back the transaction if an error occurs
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Re-throw the error
        THROW;
    END CATCH;

    print(CONCAT('photo', @photo_id, 'was successfuly deleted'))
END;
GO

-- Photo deletion log table.
CREATE TABLE delete_log_photos (
    log_id INT IDENTITY(1, 1) PRIMARY KEY,
    photo_id INT,
    photo_name VARCHAR(50),
    photo_date DATE,
    photo_description VARCHAR(200),
    deleted_at DATETIME DEFAULT GETDATE()
);
GO

/* Trigger to automatically log deletions from the photo table. */
CREATE TRIGGER LogPhotoDelete
ON photos
AFTER DELETE
AS
BEGIN
    INSERT INTO delete_log_photos (photo_id, photo_name, photo_date, photo_description)
    SELECT 
        deleted.photo_id,
        deleted.photo_name,
        deleted.photo_date,
        deleted.photo_description
    FROM deleted;
END;
GO


-- 2.)
/* Business logic trigger to ensure photos within a collection have unique names. */
CREATE TRIGGER trg_UniquePhotoNamePerCollection
ON photos
AFTER INSERT, UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT photo_name, collection_id
        FROM photos
        GROUP BY photo_name, collection_id
        HAVING COUNT(*) > 1
    )
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50004, 'Each photo in a collection must have a unique name.', 1;
    END
END;
GO


-- 3.)
/* SQL query to analyze popularity of events based on photo counts. */
SELECT 
    e.event_name,
    e.event_date,
    COUNT(p.photo_id) AS total_photos
FROM 
    events e
LEFT JOIN photos p ON e.event_id = p.event_id
GROUP BY 
    e.event_name, 
    e.event_date
HAVING 
    COUNT(p.photo_id) > 0
ORDER BY 
    total_photos DESC;
GO

/* Stored procedure that returns all photos taken by a given member */
CREATE OR ALTER PROCEDURE GetPhotosByMemberName
    @member_name VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        p.photo_id,
        p.photo_name,
        p.photo_date,
        p.photo_description,
        c.collection_name,
        m.member_name
    FROM 
        photos p
    JOIN collections c ON p.collection_id = c.collection_id
    JOIN members m ON p.member_id = m.member_id
    WHERE 
        m.member_name = @member_name
    ORDER BY 
        p.photo_date ASC;
END;
GO

/* Test Queries
-- working case
EXEC UpdatePhotoInfo
    @photo_id = 1,
    @new_photo_name = 'Sunset Above City',
    @new_photo_description = "A beautiful sunset captured above the city skyline.";
GO

-- fail case (no photo with given id)
EXEC UpdatePhotoInfo
    @photo_id = 5,
    @new_photo_name = 'Sunset Above City',
    @new_photo_description = "A beautiful sunset captured above the city skyline.";
GO

-- check logs
SELECT * FROM update_log_photos;
GO

-- check complex query
GetPhotosByMemberName
    @member_name = 'David Brown';
GO
 */

-- SQL script for database maintenance and querying tasks for one student
-- 1) Stored Procedure for Updating Data
CREATE OR ALTER PROCEDURE UpdateMemberAge
    @member_id INT,
    @new_age INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Update member age
        UPDATE members
        SET member_age = @new_age
        WHERE member_id = @member_id;

        -- Check if the update was successful
        IF @@ROWCOUNT = 0
            THROW 50001, 'Member not found or update failed.', 1;
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- Trigger to Log Update Operations
CREATE TABLE update_log_members (
    log_id INT IDENTITY(1, 1) PRIMARY KEY,
    member_id INT,
    updated_column VARCHAR(100),
    old_value INT,
    new_value INT,
    update_time DATE
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);
GO

CREATE OR ALTER TRIGGER LogMemberUpdate
ON members
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Log update operations
    INSERT INTO update_log_members (member_id, updated_column, old_value, new_value, update_time)
    SELECT d.member_id, 'member_age', d.member_age, i.member_age, GETDATE()
    FROM deleted d
    INNER JOIN inserted i ON d.member_id = i.member_id;
END;
GO

-- 2) Stored Procedure for Deleting Data
CREATE OR ALTER PROCEDURE DeleteMember
    @member_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Delete member
        DELETE FROM members
        WHERE member_id = @member_id;

        -- Check if the delete was successful
        IF @@ROWCOUNT = 0
            THROW 50002, 'Member not found or delete failed.', 1;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT ERROR_MESSAGE();
    END CATCH
END;
GO

-- Trigger to Log Delete Operations
CREATE TABLE delete_log_members (
    log_id INT IDENTITY(1, 1) PRIMARY KEY,
    member_id INT,
    delete_time DATE
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);
GO

CREATE OR ALTER TRIGGER LogMemberDelete
ON members
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Log delete operations
    INSERT INTO delete_log_members (member_id, delete_time)
    SELECT member_id, GETDATE()
    FROM deleted;
END;
GO

-- 3) Trigger to Implement Business Logic or Business Rule
CREATE OR ALTER TRIGGER EnsureValidAmount
ON donations
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Ensure that the donation amount is at least $1
    IF EXISTS (
        SELECT 1 FROM inserted
        WHERE donation_amount < 1
    )
    BEGIN
        -- If invalid donation is found, raise an error and roll back the transaction
        ROLLBACK TRANSACTION;
        THROW 50008, 'Donation must be at least $1.', 1;
    END
END;
GO

-- 4) Complex Queries

-- Query 1: List Members with Recent Donations
/*
Query to list all members who have made donations in the last 6 months, including the amount and donation date.
This information can be useful for identifying active donors and targeting future fundraising campaigns.
*/
SELECT m.member_name, d.donation_amount, d.donation_date
FROM members m
INNER JOIN donations d ON m.member_id = d.member_id
WHERE d.donation_date >= DATEADD(MONTH, -6, GETDATE())
ORDER BY d.donation_date DESC;
GO

-- Query 2: Stored Procedure to Retrieve Camera Details by Brand
/*
Stored procedure that returns all camera details for a given brand name.
This can help determine the variety of cameras available from a specific brand for procurement or inventory analysis.
*/
CREATE OR ALTER PROCEDURE GetCamerasByBrand
    @brand_name VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT c.camera_name, c.camera_year, b.brand_name
    FROM cameras c
    INNER JOIN brands b ON c.brand_id = b.brand_id
    WHERE b.brand_name = @brand_name;
END;
GO

-- Execute the stored procedure
EXEC GetCamerasByBrand @brand_name = 'Nikon';
GO