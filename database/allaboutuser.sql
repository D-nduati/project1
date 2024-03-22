
create database child; 

use child

create table users
(
    userid int identity(1,1) primary key,
    fname varchar(100),
    lname varchar(100),
    username varchar(100),
    email varchar(100),
    password varchar(100),
    datecreated datetime
);

select *
from users;


create procedure createuser
@fname varchar(100),
@lname varchar(100),
@username varchar(100),
@email varchar(100),
@password varchar(100)
as begin
    insert into users (fname, lname, username, email, password, datecreated)
     values
     (@fname, @lname, @username, @email, @password,getDate())
end
go

--executing the storedprocedure

EXEC createuser @fname='John', @lname='Doe', @username='jdoe', @email='john.doe@example.com', @password='mypass';























create procedure createuser
@firstname varchar(100),
@lastname varchar(100),
@username varchar(100),
@email varchar(100),
@password varchar(100),
@imageurl varchar(400)

as 
BEGIN
insert into users(firstname,lastname,username,email,password,imageurl)
values 
(@firstname,@lastname,@username,@email,@password,@imageurl)

end

EXEC createuser @firstname = 'dave', @lastname='mwaki', @username='mwakidavis', @email='mwakidavis89@gmail.com', @password= "mwaki123", @imageurl='https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';



create procedure changepassword
@userid int,
@password varchar (100)
as
begin
update users
set password = @password
where userid = @userid
end