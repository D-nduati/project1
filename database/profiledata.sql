CREATE TABLE ProfileData (
    ProfileID INT PRIMARY KEY IDENTITY,
    MotherName VARCHAR(100),
    FatherName VARCHAR(100),
    DateOfExpectancy DATE,
    NameOfChild VARCHAR(100),
    ProfilePicture VARBINARY(MAX)
);

ALTER TABLE ProfileData
ALTER COLUMN ProfilePicture VARCHAR(MAX);



CREATE PROCEDURE InsertProfileData
    @MotherName VARCHAR(100),   
    @FatherName VARCHAR(100),
    @DateOfExpectancy DATE,
    @NameOfChild VARCHAR(100),
    @ProfilePicture VARBINARY(MAX)
AS
BEGIN
    INSERT INTO ProfileData (MotherName, FatherName, DateOfExpectancy, NameOfChild, ProfilePicture) 
    VALUES (@MotherName,  @FatherName, @DateOfExpectancy, @NameOfChild, @ProfilePicture)
END

-- to include the column for username

ALTER TABLE ProfileData
ADD username VARCHAR(100); 

ALTER TABLE ProfileData
ALTER COLUMN ProfilePicture VARCHAR(MAX);


--the modified stored procedure with the username: 
ALTER PROCEDURE InsertProfileData
    @Username VARCHAR(100), -- Add username parameter
    @MotherName VARCHAR(100),   
    @FatherName VARCHAR(100),
    @DateOfExpectancy DATE,
    @NameOfChild VARCHAR(100),
    @ProfilePicture VARBINARY(MAX)
AS
BEGIN
    INSERT INTO ProfileData (Username, MotherName, FatherName, DateOfExpectancy, NameOfChild, ProfilePicture) -- Include username column
    VALUES (@Username, @MotherName,  @FatherName, @DateOfExpectancy, @NameOfChild, @ProfilePicture)
END


ALTER PROCEDURE InsertProfileData
    @Username VARCHAR(100),
    @MotherName VARCHAR(100),
    @FatherName VARCHAR(100),
    @DateOfExpectancy DATE,
    @NameOfChild VARCHAR(100),
    @ProfilePictureURL VARCHAR(MAX) -- Change parameter type to VARCHAR(MAX)
AS
BEGIN
    INSERT INTO ProfileData (Username, MotherName, FatherName, DateOfExpectancy, NameOfChild, ProfilePicture) 
    VALUES (@Username, @MotherName, @FatherName, @DateOfExpectancy, @NameOfChild, @ProfilePictureURL) -- Change column to store URL
END

exec InsertProfileData 
	@username ='davidnduati',
    @MotherName = 'bradley houston',
    @FatherName = 'chris evans',
    @DateOfExpectancy = '2024-02-05',
    @NameOfChild = 'George William',
    @ProfilePictureURL = 'https://th.bing.com/th?id=OIP.9lp-AzhvWVzYdKMb9E8tLQHaHs&w=245&h=254&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2';


    DELIMITER //

CREATE PROCEDURE InsertProfile(
  IN MotherName VARCHAR(255),
  IN FatherName VARCHAR(255),
  IN DateOfExpectancy DATE,
  IN NameOfChild VARCHAR(255)
)
BEGIN
  INSERT INTO profiles (MotherName, FatherName, DateOfExpectancy, NameOfChild)
  VALUES (MotherName, FatherName, DateOfExpectancy, NameOfChild);
END //

DELIMITER ;

ALTER TABLE ProfileData
Drop COLUMN ProfilePicture;

select * from ProfileData

CREATE PROCEDURE ProfileData
@username VARCHAR(100),
    @MotherName VARCHAR(100),   
    @FatherName VARCHAR(100),
    @DateOfExpectancy DATE,
    @NameOfChild VARCHAR(100)
    
AS
BEGIN
    INSERT INTO ProfileData (username,MotherName, FatherName, DateOfExpectancy, NameOfChild) 
    VALUES (@username, @MotherName,  @FatherName, @DateOfExpectancy, @NameOfChild)
END
CREATE PROCEDURE EnterProfileData
    @MotherName VARCHAR(100),   
    @FatherName VARCHAR(100),
    @DateOfExpectancy DATE,
    @NameOfChild VARCHAR(100),
    @username varchar(100)
AS
BEGIN
    INSERT INTO ProfileData (MotherName, FatherName, DateOfExpectancy, NameOfChild, username) 
    VALUES (@MotherName,  @FatherName, @DateOfExpectancy, @NameOfChild, @username)
END