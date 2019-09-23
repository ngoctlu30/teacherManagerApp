const fs = require('fs');
const readLineSync = require('readline-sync');
const chalk = require('chalk');
const clear = require('clear');

let teachers = [];
let departments = [];
let subjects = [];

function menuDepartment() {
  
  const options = [
    '1. Add new department',
    '2. Edit department',
    '3. Delete department',
    '4. Display list department',
    '5. Displat list teacher with department',
    '0. Exit'
  ]
  for(let option of options) {
    console.log(option);
  }
  const option = readLineSync.question("Choose option: ");
  switch(option) {
    case "1":
      clear();
      addDepartment();
      menuDepartment();
      break;
    case "2":
      clear();
      editDepartment();
      menuDepartment();
      break;
    case "3":
      clear();
      deleteDepartment();
      menuDepartment();
      break;
    case "4":
      clear();
      displayListDepartment();
      menuDepartment();
      break;
    case "5":
      clear();
      displayTeacherWithDepartment();
      menuDepartment();
      break;
    case "0":
      clear();
      save();
      break;
  }
}


function loadData2() {
  const readData = fs.readFileSync('./data/teachers.json');
  const readData1 = fs.readFileSync('./data/departments.json');
  const readData2 = fs.readFileSync("./data/subjects.json");
  teachers = JSON.parse(readData);
  departments = JSON.parse(readData1);
  subjects = JSON.parse(readData2);
}

function addDepartment() {
  console.log(departments);
  const newDepartment = readLineSync.question('Write new department: ').toUpperCase().trim();
  const isTrue = departments.includes(newDepartment);
  if(isTrue) {
    console.log(chalk.red("Department already. Please rewrite new department"));
  }
  else {
    departments.push(newDepartment);
  }
}


function displayListDepartment() {
  console.log(departments);
}

function displayTeacherWithDepartment() {
  const department = readLineSync.question('Enter department: ').toUpperCase().trim();
  const data = teachers.filter(item => {
    return item.department === department;
  })
  console.table(data);
}
function deleteDepartment() {
  if(teachers.length === 0) {
    console.log(chalk.red("Dont have any teacher"));
  }
  else {
    const department = readLineSync.question('Write department want to del: ').toUpperCase().trim();
    let isExist = departments.includes(department);
    
    if(isExist) {
      for(let i=0 ; i<departments.length ; i++) {
        if(departments[i] === department) {
          teachers.forEach(e => {
            if(e.department === departments[i]) {
              e.department = null;
            }
          })
          departments.splice(i,1);
        }
      }
    }
    else {
      console.log(chalk.red("Department does not exsit"));
    }
  }
}

function editDepartment() {
  const a = readLineSync.question("Write department want to edit: ").toUpperCase().trim();
  let isExist = departments.includes(a);
  if(isExist === true) {
    const newDepartment = readLineSync.question('Enter new department: ').toUpperCase().trim();
    for(let i=0 ; i<departments.length ; i++) {
      if(departments[i] === a) {
        teachers.forEach(e => {
          if(e.department === departments[i]) {
            e.department = newDepartment;
          }
        });
        departments.splice(i,1);
        departments.splice(i, 0, newDepartment);
      }
    }
  }
  else {
    console.log(chalk.red("Department is not exsit"));
  }
}

function save() {
  const teachersToString = JSON.stringify(teachers, null, 1);
  const departmentsToString = JSON.stringify(departments, null, 1);
  const subjectsToString = JSON.stringify(subjects, null, 1);
  fs.writeFileSync('./data/teachers.json', teachersToString, { encoding: 'utf8'});
  fs.writeFileSync('./data/departments.json', departmentsToString, { encoding: 'utf8'});
  fs.writeFileSync('./data/subjects.json', subjectsToString, {encoding: 'utf8'});
}

module.exports = {
  loadData2,
  departments,
  addDepartment,
  displayListDepartment,
  displayTeacherWithDepartment,
  deleteDepartment,
  editDepartment,
  menuDepartment
}
