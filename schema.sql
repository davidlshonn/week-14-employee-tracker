-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS employee_tracker_db;

-- Created the DB "employee_tracker_db" (only works on local connections)
CREATE DATABASE employee_tracker_db;

-- Use the DB employee_tracker_db for all the rest of the script
USE employee_tracker_db;

-- Created the table "department"
CREATE TABLE department (
  id int NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

-- Created the table "role"
CREATE TABLE role (
  id int NOT NULL,
  title varchar(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
  PRIMARY KEY(id)
);

-- Created the table "employee"
CREATE TABLE employee (
  id int NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int --null?
  PRIMARY KEY(id)
);
