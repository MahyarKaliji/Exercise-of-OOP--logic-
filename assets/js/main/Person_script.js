// prettier-ignore
const departments =new Map([
    [['Programmer', 'Network Engineer', 'IT Analyst', 'Network Architect'], 'IT'],
    [['Accountant', 'Controller', 'Auditor', 'Financial Analyst'], 'Accounting'],
    [['Recruiter', 'HR Analyst', 'Excutive HR', 'Learning and development specialist'], 'Human Resources'],
    [['Content Creator', 'Social Media Coordinator', 'Product Maketing Manager', 'Copywriting'], 'Marketing'],
])

const people = [
  {
    fName: "Abtin",
    lName: "Tehrani",
    age: 25,
    expertise: "Recruiter",
    experience: 3,
  },
  {
    fName: "Nastaran",
    lName: "Rahmani",
    age: 36,
    expertise: "Programmer",
    experience: 5,
  },
  {
    fName: "Babak",
    lName: "Rajabi",
    age: 45,
    expertise: "Programmer",
    experience: 2,
  },
  {
    fName: "Kaveh",
    lName: "Monfared",
    age: 33,
    expertise: "Accountant",
    experience: 8,
  },
  {
    fName: "Kousha",
    lName: "Bahrami",
    age: 29,
    expertise: "Social Media Coordinator",
    experience: 1,
  },
  {
    fName: "Yasaman",
    lName: "Taghavi",
    age: 52,
    expertise: "Controller",
    experience: 12,
  },
  {
    fName: "Garshasb",
    lName: "Sharifi",
    age: 38,
    expertise: "Network Engineer",
    experience: 15,
  },
  {
    fName: "Soroush",
    lName: "Hatami",
    age: 44,
    expertise: "HR Analyst",
    experience: 9,
  },
  {
    fName: "Ramin",
    lName: "Panahi",
    age: 19,
    expertise: "Product Maketing Manager",
    experience: 5,
  },
  {
    fName: "Shila",
    lName: "Bozorhi",
    age: 22,
    expertise: "Network Engineer",
    experience: 3,
  },
  {
    fName: "Parinaz",
    lName: "Nouri",
    age: 32,
    expertise: "Content Creator",
    experience: 4,
  },
];

class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    // this.getFullName();
  }

  getFullName() {
    const full_name = `${this.firstName[0].toUpperCase()}${this.firstName
      .slice(1)
      .toLowerCase()} ${this.lastName[0].toUpperCase()}${this.lastName
      .slice(1)
      .toLowerCase()}`;
    // console.log(this.full_name);
    return full_name;
  }
}

class Employee extends Person {
  constructor(firstName, lastName, age, jobTitle, salary) {
    super(firstName, lastName, age);
    this.jobTitle = jobTitle;
    this.salary = salary;
    this.manager = null;
    this.type = "Employee";
  }
  setManager(manager) {
    this.manager = manager;
  }

  getJobDetails() {
    return `Job Title: ${this.jobTitle}, Salary: $${this.salary}`;
  }

  getManager() {
    return this.manager ? this.manager.getFullName() : "No Manager";
  }
}

class Manager extends Employee {
  department;
  constructor(firstName, lastName, age, jobTitle, salary) {
    super(firstName, lastName, age, jobTitle, salary);
    this.managedEmployees = [];
    this.setDepartment();
    this.type = "Manager";
  }

  addManagedEmployee(employee) {
    this.managedEmployees.push(employee);
    employee.setManager(this);
  }

  removeManagedEmployee(employee) {
    this.managedEmployees = this.managedEmployees.filter(
      (empl) => empl.id !== employee.id
    );
  }

  setDepartment() {
    const dep = [...departments.keys()].find((key) =>
      key.includes(this.jobTitle)
    );
    this.department = departments.get(dep);
    return this.department;
  }

  getManagedEmployees() {
    this.managedEmployees.map((emp) => emp.getFullName()).join(", ");
  }
}

class Company {
  constructor(name, location) {
    this.name = name;
    this.location = location; //City name
    this.employees = [];
    this.managers = [];
  }

  addEmployee(employee) {
    this.employees.push(employee);
    this.setManager(employee);
  }

  addManager(manager) {
    this.managers.push(manager);
    this.addEmployee(manager);
  }

  setManager(employee) {
    if (!this.managers.length && !this.employees.length) return;

    const emplDep = departments.get(
      [...departments.keys()].find((key) => key.includes(employee.jobTitle))
    );
    const relatedManager = this.managers.find(
      (mang) => mang.department === emplDep
    );
    if (employee.getFullName() !== relatedManager.getFullName())
      relatedManager.addManagedEmployee(employee);
  }

  getAverageSalary() {
    if (this.employees.length === 0) return 0;
    const averageSalary =
      this.employees.reduce((acc, emp) => acc + emp.salary, 0) /
      this.employees.length;
    return averageSalary.toFixed(2);
  }

  getCompanyDetails() {
    const employeeDetails = this.employees
      .map(
        (emp) =>
          `${emp.getFullName()} (${
            emp.jobTitle
          }) - Manager: ${emp.getManager()}`
      )
      .join("\n");
    return `Company: ${this.name}, Location: ${this.location} \n\nEmployees: \n\n${employeeDetails}`;
  }
}

// //////////////////////////////////
// prettier-ignore
const employee1 = new Employee("Abtin", "Tehrani", 25, "Recruiter", 2500);
// prettier-ignore
const employee2 = new Employee("Nastaran", "Rahmani", 36, "Programmer", 3000);
// prettier-ignore
const employee3 = new Employee("Babak", "Rajabi", 45, "Programmer", 3200);
// prettier-ignore
const employee4 = new Employee("Ramin", "Panahi", 19, "Product Maketing Manager", 3800);
// prettier-ignore
const employee5 = new Employee("Kousha", "Bahrami", 29, "Social Media Coordinator", 4000);
// prettier-ignore
const employee6 = new Employee("Yasaman", "Taghavi", 52, "Controller", 2500);
// prettier-ignore
const employee7 = new Employee("Garshasb", "Sharifi", 38, "Network Engineer", 2500);
// prettier-ignore
const manager1 = new Manager("Soroush", "Hatami", 44, "HR Analyst", 7800);
// prettier-ignore
const manager2 = new Manager("Kaveh", "Monfared", 33, "Accountant", 9200);
// prettier-ignore
const manager3 = new Manager("Shila", "Bozorhi", 22, "Network Engineer", 7500);
// prettier-ignore
const manager4 = new Manager("Parinaz", "Nouri", 32, "Content Creator", 6900);

// prettier-ignore
const employees = [employee1, employee2, employee3, employee4, employee5, employee6, employee7]
const managers = [manager1, manager2, manager3, manager4];

const centralBranch = new Company("Gandom", "Sari");
managers.forEach((emp) => centralBranch.addManager(emp));
employees.forEach((emp) => centralBranch.addEmployee(emp));

console.log(centralBranch.getAverageSalary());
console.log(centralBranch.getCompanyDetails());

console.log(centralBranch);
