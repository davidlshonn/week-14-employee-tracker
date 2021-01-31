// Dependencies
var mysql = require("mysql");
var inquirer = require('inquirer');

// MySQL DB Connection Information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sat-news967",
  database: "employee_tracker_db"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) throw err;
  userSelection();
});

function userSelection() {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View all Employees By Role',
        'View all Employees By Department',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager'
      ],
    })
    .then(function (answer) {
      switch (answer.action){
        case 'View All Employees':
          viewEmployees();
          break;

        case 'View all Employees By Role':
          viewEmployeesByRole();
          break;

        case 'View all Employees By Department':
          viewEmployeesByDepartment();         
      }
    });
}

function viewEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
  function (err, res) {
      if (err) throw err
      console.table(res)
      userSelection()
  })
}

function viewEmployeesByDepartment() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
  function (err, res) {
    if (err) throw err
    console.table(res)
    userSelection()
  })
}