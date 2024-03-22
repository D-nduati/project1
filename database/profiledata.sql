CREATE TABLE ProfileData (
    ProfileID INT PRIMARY KEY IDENTITY,
    MotherName VARCHAR(100),
    FatherName VARCHAR(100),
    DateOfExpectancy DATE,
    NameOfChild VARCHAR(100),
    ProfilePicture VARBINARY(MAX)
);


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
