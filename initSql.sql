DELIMITER //

CREATE PROCEDURE CreateUser(IN name VARCHAR(255), IN email VARCHAR(255))
BEGIN
    INSERT INTO Users (name, email) VALUES (name, email);
END //

CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT * FROM Users;
END //

CREATE PROCEDURE GetUserById(IN userId INT)
BEGIN
    SELECT * FROM Users WHERE id = userId;
END //

CREATE PROCEDURE UpdateUser(IN userId INT, IN name VARCHAR(255), IN email VARCHAR(255))
BEGIN
    UPDATE Users SET name = name, email = email WHERE id = userId;
END //

CREATE PROCEDURE DeleteUser(IN userId INT)
BEGIN
    DELETE FROM Users WHERE id = userId;
END //

DELIMITER ;