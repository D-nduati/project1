CREATE VIEW UpdatableAppointmentsView AS
SELECT id, date, notes, prescription, physician, contact
FROM Appointment;


CREATE VIEW AppointmentsView AS
SELECT id, date, notes, prescription, physician, contact
FROM Appointment;


CREATE PROCEDURE InsertAppointment
    @date DATETIME,
    @notes NVARCHAR(MAX),
    @prescription NVARCHAR(MAX),
    @physician NVARCHAR(255),
    @contact NVARCHAR(255)
AS
BEGIN
    INSERT INTO Appointment (date, notes, prescription, physician, contact)
    VALUES (@date, @notes, @prescription, @physician, @contact)
END;

CREATE TABLE Appointment (
    id INT IDENTITY(1,1) PRIMARY KEY,
    date DATETIME NOT NULL,
    notes NVARCHAR(MAX),
    prescription NVARCHAR(MAX),
    physician NVARCHAR(255),
    contact NVARCHAR(255)
);
