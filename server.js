// Import mysql and inquirer
const mysql = require('mysql2');
const inquirer = require("inquirer");

// Connectint to mysql2 with crudentials  
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'ASd1021504157/',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

// All the commands
const commands = ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]

// Main function
function ask_user() {
    // Logs all the options
    for (let i = 0; i < commands.length; i ++) {
        console.log(`${i+1} ${commands[i]}`)
    }
    // Prompts users for entry
    inquirer
        .prompt([
            {
                type: "input",
                message: "Pick from one of these options (Enter their number)",
                name: "option",
            },
        ])
        .then((response) => {
            // View all department
            if (response.option === "1") {
                // query for viewing all department
                let sql = "SELECT * FROM department";
                console.log("view all departments");
                // function for viewing all department
                db.query(sql, function (err, results) {
                    for (let i = 0; i < results.length; i ++) {
                        console.log(`ID: ${results[i].id}\t\t\t\tNAME: ${results[i].name}`);  
                    } 
                });

            // View all roles
            } else if (response.option === "2") {
                // query for viewing all roles and role is joined together with department
                let sql = "SELECT * FROM role JOIN department ON role.department_id = department.id";
                console.log("view all roles");
                // Function for viewing all roles
                db.query(sql, function (err, results) {
                    for (let i = 0; i < results.length; i ++) {
                        console.log(`ID: ${i+1}\t\t\t\tNAME: ${results[i].title}\t\t\t\tSALARY: ${results[i].salary}\t\t\t\tNAME:${results[i].name}`);  
                    } 
                });
            
            // View all employees
            } else if (response.option === "3") {
                // query for viewing all employees and department and role table are joined together
                let sql = "SELECT *FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;";
                console.log("view all employees");
                // Function for viewing all employees
                db.query(sql, function (err, results) {
                    for (let i = 0; i < results.length; i ++) {
                        console.log(`ID: ${i+1}\t\t\t\tFIRST NAME: ${results[i].first_name}\t\t\t\tLAST NAME: ${results[i].last_name}\t\t\t\tTITLE: ${results[i].title}\t\t\t\tSALARY: ${results[i].salary}DEPARTMENT: ${results[i].name}`);  
                    } 
                });
            
            // Add a department
            } else if (response.option === "4") {
                console.log("add a department");
                // Prompt user to enter name
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Enter the department name: ",
                            name: "name",
                        }
                    ])
                    .then((response) => {
                        // Insert in database using query function
                        let sql = `INSERT INTO department(name) VALUES("${response.name}")`
                        db.query(sql, function (err, results) {
                            console.log(`${response.name} is added`);
                        })
                    });

            // Add a role
            } else if (response.option === "5") {
                console.log("add a role");
                // Prompt user to enter title, salary and department_id
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "Enter the role title: ",
                                name: "title",
                            },
                            {
                                type: "input",
                                message: "Enter the role salary: ",
                                name: "salary",
                            },
                            {
                                type: "input",
                                message: "Enter the department id: ",
                                name: "department_id",
                            }
                        ])
                        // Insert in database using query function
                        .then((response) => {
                            let sql = `INSERT INTO role(title, salary, department_id) VALUES("${response.title}", ${parseFloat(response.salary)}, ${parseInt(response.department_id)})`
                            db.query(sql, function (err, results) {
                                console.log(`${response.title} is added`);
                            })
                        });

            // Add an employee
            } else if (response.option === "6") {
                console.log("add an employee");
                    // Prompts user to enter first_name, last_name, role_id, and manager_id
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "Enter first name: ",
                                name: "first_name",
                            },
                            {
                                type: "input",
                                message: "Enter last name: ",
                                name: "last_name",
                            },
                            {
                                type: "input",
                                message: "Enter role id: ",
                                name: "role_id",
                            },
                            {
                                type: "input",
                                message: "Enter manager id: ",
                                name: "manager_id",
                            },
                        ])
                        // Query for inserting into employee database
                        .then((response) => {
                            let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${response.first_name}", "${response.last_name}", ${parseInt(response.role_id)}, ${parseInt(response.manager_id)})`
                            db.query(sql, function (err, results) {
                                console.log(`${response.first_name} is added`);
                            })
                        });
            // Updates user employee role
            } else if (response.option === "7") {
                console.log("update an employee role");
                // Prompts user for first_name and role_id
                inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "Enter first name: ",
                                name: "first_name",
                            },
                            {
                                type: "input",
                                message: "Enter role id: ",
                                name: "role_id",
                            },
                        ])
                        .then((response) => {
                            // Gets the employee first_name and changes the role_id based on the first name 
                            let sql = `UPDATE employee SET role_id = ${parseInt(response.role_id)} WHERE first_name = "${response.first_name}"`
                            db.query(sql, function (err, results) {
                                console.log(`${response.first_name} role is updated`);
                            })
                        })

            } else {
                console.log("Please Enter a correcrt option next time!")
                ask_user();
            }

        })
}

ask_user();