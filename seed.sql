/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employee_tracker_db;

/* Insert 3 Rows into your new table */
INSERT INTO department (name)
VALUES ("IT"), ("HR"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 35000, 1),
    ("Accountant", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Shonn", 1, NULL);