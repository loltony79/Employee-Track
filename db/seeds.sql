-- Department Seeding
INSERT INTO department(name)
VALUES ("Math"),
       ("Science");

-- Role Seeding
INSERT INTO role(title, salary, department_id)
VALUES ("Math Teacher", 1000.0, 1),
       ("Science Teacher", 1000.0, 2),
       ("Math Tutor", 500.0, 1),
       ("Science Tutor", 500.0, 2);

-- Employee Seeding
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("ADAM", "A", 1, 3),
       ("BBOB", "B", 2, NULL),
       ("CHEN", "C", 3, NULL),
       ("DODO", "D", 4, NULL);


