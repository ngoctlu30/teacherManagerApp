const fs = require('fs');
const readLineSync = require('readline-sync');
const chalk = require('chalk');
const dateDiff = require('date-diff');
let teachers = [];
let departments = [];

function loadData() {
  const readTeachers = fs.readFileSync('./teachers.json');
  const readDepartments = fs.readFileSync('./departments.json')
  teachers = JSON.parse(readTeachers);
  departments = JSON.parse(readDepartments);
}

function write(departmentV) {
  let isTrue = false;
  const Code = readLineSync.question("Teacher code: ");
  for(let key of teachers) {
    if(key.code === Code.toUpperCase()) {
      isTrue = true;
    }
  }
  if(isTrue === true) {
    console.log(chalk.red("Teacher code already. Please rewrite teacher code "));
    console.log("");
    write();
  }
 
  else {
  const Name = readLineSync.question('Teacher name: ');
  const Birthday = readLineSync.question('Teacher birthday (dd/mm/yy): ');
  const Gen  = readLineSync.question('Gen of teacher: ');
  const DateJoin = readLineSync.question('Date join (dd/mm/yy): ');  
  const Coef = readLineSync.questionFloat('Coef money: ');
  const newTeacher = {
    code: Code.toUpperCase(),
    name: Name.toUpperCase(),
    birthday: Birthday,
    gen: Gen.toUpperCase(),
    dateJoin: DateJoin,
    department: departmentV.toUpperCase(),
    coef: Coef
  };
  teachers.push(newTeacher);
  }
}

function addNew() {
  const department = readLineSync.question('Write department: ').toUpperCase();
  const isHave = departments.includes(department);
  if(isHave) {
    write(department);
  }
  else {
    console.log(chalk.red("Department does not exist!"));
    const anwser = readLineSync.question("Do you want to save it?(Y/N)").toUpperCase();
    if(anwser === "YES" || anwser ==="Y") {
      departments.push(department);
      write(department);
    }
    else {
      addNew();
    }
  }
  
}

function addDepartment() {
  const newDepartment = readLineSync.question('Write new department: ').toUpperCase();
  const isTrue = departments.includes(newDepartment);
  if(isTrue) {
    console.log(chalk.red("Department already. Please rewrite new department"));
  }
  else {
    departments.push(newDepartment);
  }
}

function display() {
    if(teachers.length === 0) {
      console.log(chalk.blue("Dont have any teachers"));
    }
    else {
      console.table(teachers);
    }
}


function deleteTeacher() {
  if(teachers.length === 0) {
    console.log("Dont have any teachers");
  }
  else {
    const code = readLineSync.question('Write code or name teacher you want to delete: ');
    let isExist; 
    for(let key of teachers) {
      if(key.code === code.toUpperCase()) isExist = true;
    }
    if(isExist === true) {
      
    teachers = teachers.filter(item => {
      return item.code !== code.toUpperCase();
    });
    }
    else {
      console.log(chalk.red("Teacher code does not exist"));
    }
  }
}

function writeEdit() {
  const newValue = readLineSync.question(`Enter new department : `).toUpperCase();
  if(departments.includes(newValue)) {
    item[field] = newValue.toUpperCase();
  }
  else {
    console.log(chalk.red("Department does not exist!"));
    const anwser = readLineSync.question('Do you want to save it?(Y?N)');
    if(anwser === "YES" || anwser === "Y") {
      departments.push(newValue);
    }
    else {
      writeEdit();
    }
    
  }
}

function editTeacher() {
  const code = readLineSync.question('Enter code teacher you want to edit: ');
  let isExist;
  for(let key of teachers) {
    if(key.code === code.toUpperCase()) isExist = true;
  }
  if(isExist == true)  {
    teachers.map(item => {
      if(item.code === code.toUpperCase()) {
        console.table(item);
        const field = readLineSync.question("Enter field you want to edit: ");
        if(field === "department") {
          writeEdit();
        }
        else {
          item[field] = newValue.toUpperCase();
        }
      }
      return;
    });
  }
  else {
    console.log(chalk.red("Dont have any teachers"));
  }
  
}


function searchByName() {
  if(teachers.length === 0) {
    console.log("Dont have any teachers");
  }
  else {
    let temp = [];
    const inputSearch = readLineSync.question("Enter name teacher want to search: ");
    const x = new RegExp(inputSearch, 'i');
    let isExist = null;
    for(let key of teachers) {
      if(x.test(key.name) == true) {isExist = true;}
      console.log(key.code);
    }
    if(isExist == true) {
      for(let key of teachers) {
        if(x.test(key.name)== true) {
          temp.push(key);
        }
      }
      console.table(temp);
    }
    else {
      console.log(chalk.red("input not match"));
    }
  }

}

function searchByCode() {
  let temp = [];
  const inputSearch = readLineSync.question("Enter code teacher want to search: ");
  let isExist;
  for(let key of teachers) {
    if(key.code === inputSearch.toUpperCase()) isExist=true;
  }
  
  if(isExist===true) {
    for(let key of teachers) {
      if(key.code === inputSearch.toUpperCase()) {
        temp.push(key);
      }
    }
    console.table(temp);
  }
  else {
    console.log(chalk.red("input not match"));
  }

}

function displayListDepartment() {
  console.log(departments);
}
function displayTeacherWithDepartment() {
  const department = readLineSync.question('Enter department: ');
  const data = teachers.filter(item => {
    return item.department === department.toUpperCase();
  })
  console.table(data);
}
function deleteDepartment() {
  if(teachers.length === 0) {
    console.log(chalk.red("Dont have any teacher"));
  }
  else {
    const department = readLineSync.question('Write department want to del: ').toUpperCase();
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
  const a = readLineSync.question("Write department want to edit: ").toUpperCase();
  let isExist = departments.includes(a);
  if(isExist === true) {
    const newDepartment = readLineSync.question('Enter new department: ').toUpperCase();
    for(let i=0 ; i<departments.length ; i++) {
      if(departments[i] === a) {
        teachers.forEach(e => {
          if(e.department === departments[i]) {
            e.department = newDepartment;
          }
        });
        departmentts.splice(i,1);
        departments.splice(i, 0, newDepartment);
      }
    }
  }
  else {
    console.log(chalk.red("Department is not exsit"));
  }
}

function ageMoreThanN() {
  let temp = [];
  if(teachers.length === 0 ){
    console.log(chalk.red("Dont have any teachers"));
  }
  else {
    const today = new Date();
    const n = readLineSync.questionInt("Enter age: ");
    for(let key of teachers) {
      const birthday = new Date(key.birthday);
      const distance = new dateDiff(today, birthday);
      if(distance.years() >= n) {
        temp.push(key);
      }
    }
  }
  console.table(temp);

}

function beautiful() {
  console.log("========================================");
}

function save() {
  const teachersToString = JSON.stringify(teachers);
  const departmentsToString = JSON.stringify(departments);
  fs.writeFileSync('./teachers.json', teachersToString, { encoding: 'utf8'});
  fs.writeFileSync('./departments.json', departmentsToString, { encoding: 'utf8'});
}
module.exports = {
  addNew,
  deleteTeacher,
  editTeacher,
  display,
  searchByName,
  searchByCode,
  displayListDepartment,
  displayTeacherWithDepartment,
  deleteDepartment,
  editDepartment,
  ageMoreThanN,
  loadData,
  save,
  beautiful,
  addDepartment
}
