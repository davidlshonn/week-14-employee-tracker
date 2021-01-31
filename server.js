// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// MySQL DB Connection Information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sat-news967",
  database: "employee_tracker_db",
});

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) throw err;
  userSelection();
});

function userSelection() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View all Employees By Role",
        "View all Employees By Department",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View all Employees By Role":
          viewEmployeesByRole();
          break;

        case "View all Employees By Department":
          viewEmployeesByDepartment();
          break;

        case "Add Department":
          addDepartment();
          break;
        
        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;
      }
    });
}

function viewEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      userSelection();
    }
  );
}

function viewEmployeesByDepartment() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      userSelection();
    }
  );
}

function viewEmployeesByRole() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      userSelection();
    }
  );
}

function addDepartment() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is the name of the Department you would like to add?"
    }
  ]).then(function(res) {
    const query = connection.query(
      "INSERT INTO department SET ? ",
      {
        name: res.name
      },
      function(err) {
        if (err) throw err
        console.table(res);
        userSelection();
      }
    )
  })
}

function addRole() {
  let departments = [];
  connection.query("SELECT * FROM department",
  function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      res[i].first_name + " " + res[i].last_name
      departments.push({ name: res[i].name, value: res[i].id});
    }
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role you would like to add?"
    },
    {
        type: "input",
        name: "salary",
        message: "What is the salary for said role?"
    },
    {
        type: "list",
        name: "department",
        message: "what department?",
        choices: departments
    }
  ]).then(function(res) {
    const query = connection.query(
      "INSERT INTO role SET ?", {
        title: res.title,
        salary: res.salary,
        department_id: res.department
      },
      function(err, res) {
        if (err) throw err;
        userSelection();
      }
    )
  })
  })
}

function addEmployee() {
  let roles = [];
  connection.query("SELECT * FROM role",
  function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      res[i].first_name + " " + res[i].last_name
      roles.push({ name: res[i].title, value: res[i].id});
    }
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employees first name?"
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employees last name?"
},
{
  type: "list",
  name: "role_id",
  message: "What is the employees role?",
  choices: roles
}
  ]).then(function(res) {
    console.log(res)
    const query = connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: res.first_name,
        last_name: res.last_name,
        role_id: res.role_id,
      },
      function(err, res) {
        if (err) throw err;
        userSelection();
      }
    )
  })
})
}

// function updateEmployeeRole() {
//   connection.query("SELECT first_name, last_name, id FROM employee",
//   function(err, res) {
    
//   })
// }

// // 