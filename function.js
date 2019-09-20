const fs = require('fs');
const readLineSync = require('readline-sync');
const chalk = require('chalk');
const dateDiff = require('date-diff');
let teachers = [];
let departments = [];
let subjects = [];
function loadData() {
  const readTeachers = fs.readFileSync('./teachers.json');
  const readDepartments = fs.readFileSync('./departments.json');
  const readSubjects = fs.readFileSync('./subjects.json');
  teachers = JSON.parse(readTeachers);
  departments = JSON.parse(readDepartments);
  subjects = JSON.parse(readSubjects);
}

function write(departmentV) {
  console.log(departmentV);
  let isTrue ;
  const Code = readLineSync.question("Teacher code: ").toUpperCase().trim();
  for(let key of teachers) {
    if(Code.length !== 0 && key.code === Code) {
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
    code: Code.toUpperCase().trim(),
    name: Name.toUpperCase().trim(),
    birthday: Birthday,
    gen: Gen.toUpperCase().trim(),
    dateJoin: DateJoin,
    subject: [],
    department: departmentV.toUpperCase().trim(),
    coef: Coef
  };
  teachers.push(newTeacher);
  }
}

function addNew() {
  const department = readLineSync.question('Write department: ').toUpperCase().trim();
  const isHave = departments.includes(department);
  if(isHave) {
    write(department);
  }
  else {
    console.log(chalk.red("Department does not exist!"));
    const anwser = readLineSync.question("Do you want to save it?(Y/N)").toUpperCase().trim();
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
  const newDepartment = readLineSync.question('Write new department: ').toUpperCase().trim();
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
    const code = readLineSync.question('Write code or name teacher you want to delete: ').toUpperCase().trim();
    let isExist; 
    for(let key of teachers) {
      if(key.code === code) isExist = true;
    }
    if(isExist === true) {
      
    teachers = teachers.filter(item => {
      return item.code !== code.toUpperCase().trim();
    });
    }
    else {
      console.log(chalk.red("Teacher code does not exist"));
    }
  }
}

// function writeEdit(newValue) {
  
// }

function editTeacher() {
  const code = readLineSync.question('Enter code teacher you want to edit: ').toUpperCase().trim();
  
  let isExist;
  for(let key of teachers) {
    if(key.code === code) isExist = true;
  }
  if(isExist === true)  {
    teachers.map(item => {
      if(item.code === code) {
        console.table(item);
        const field = readLineSync.question("Enter field you want to edit: ");
        if(field === "department") {
          // writeEdit(newValue);

          const newValue = readLineSync.question(`Enter new department : `).toUpperCase().trim();
          if(departments.includes(newValue)) {
            item[field] = newValue;
          }
          else {
            console.log(chalk.red("Department does not exist!"));
            const anwser = readLineSync.question('Do you want to save it?(Y?N)').toUpperCase().trim();
            console.log(anwser);

            if(anwser === "YES" || anwser === "Y") {
              departments.push(newValue);
              item[field] = newValue;
            }
            else {
              // writeEdit();
            }
            
          }
        }
        else {
          const newValue = readLineSync.question(`Enter new ${field}: `).toUpperCase().trim();
          item[field] = newValue;
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
  const inputSearch = readLineSync.question("Enter code teacher want to search: ").toUpperCase().trim();
  let isExist;
  for(let key of teachers) {
    if(key.code === inputSearch) isExist=true;
  }
  
  if(isExist===true) {
    for(let key of teachers) {
      if(key.code === inputSearch) {
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

function addSubject() {
  const newNameSubject = readLineSync.question("Write new subject: " ).toUpperCase().trim();
  const newCodeSubject = readLineSync.question("Write new code: ").toUpperCase().trim();
  let isHave;
  for(let key of subjects) {
    if(key.code === newCodeSubject || (key.name === newNameSubject && key.code === newCodeSubject)) {
      isHave = true;
    }
  }

  if(isHave) {
    console.log(chalk.red("Subject has already"));
  }
  else {
    const newSubject = {
      code: newCodeSubject,
      name: newCodeSubject
    }
    subjects.push(newSubject);
  }
}
function displaySubject() {
  console.table(subjects);
}
function editSubject() {
  const codeSubject = readLineSync.question("Write code subject want to edit: ").toUpperCase().trim();
  let isHave;
  for(let key of subjects) {
    if(key.code === codeSubject) {
      isHave = true;
      console.table(key);
    }
  }
  if(isHave) {
    const field = readLineSync.question("Write field want to edit: ");
    subjects.forEach(e => {
      if(e.code === codeSubject) {
        const newValue = readLineSync.question(`Write new value of ${field}: `).toUpperCase().trim();
        e[field] = newValue;
      }
    })
  }
  else {
    console.log(chalk.red("Subject does not exist"));
  }
}
function deleteSubject() {
  const codeSubject = readLineSync.question("Write code subject want to delete: ").toUpperCase().trim();
  let isHave;
  for(let key of subjects) {
    if(key.code === codeSubject) {
      isHave = true;
      // console.log(key);
    }
  }
  if(isHave ===  true) {
    
    subjects = subjects.filter(e => {
      
      if(e.code === codeSubject) {
        
        teachers.forEach(teacher => {
          
          for(let key in teacher) {
            
            if(key === "subject") {
              
              for(let i=0 ; i< teacher[key].length ; i++) {
                // console.log(teacher[key][i]);
                if(teacher[key][i] === e.name) {
                  teacher[key].splice(i, 1);
                  console.log("here");                           
                }
              }
              // console.log("Subject");
            }
          }
        })
      } 
      return e.code !== codeSubject;
    });
    
  }
  else {
    console.log(chalk.red("Subject does not exist"));
  }
}

function addSubjectForTeacher() {
  const codeT = readLineSync.question("Write code teacher want to add subject: ").toUpperCase().trim();
  let isHave;
  for(let key of teachers) {
    if(key.code === codeT) {
      isHave = true;
    } 
  }
  if(isHave) {
    teachers.forEach(e => {
      if(e.code === codeT) {
        const codeS = readLineSync.question("Write code subject want to add: ").toUpperCase().trim();
        let isHave1;
        for(let key of subjects) {
          if(key.code === codeS) {
            isHave1 = true;
          }
        }
        if(isHave1 ===  true) {
          subjects.forEach(a => {
            if(a.code === codeS) {
              e.subject.push(a.name);
            }
          })
        }
        else {
          // let temp = [ ];
          const err = "Subject does not exist.";
          console.log(chalk.red(err));
        }
      }
      
    })
  }
  else {
    console.log(chalk.red("Code does not esxit"));
  }
}

function beautiful() {
  console.log("========================================");
}

function save() {
  const teachersToString = JSON.stringify(teachers);
  const departmentsToString = JSON.stringify(departments);
  const subjectsToString = JSON.stringify(subjects);
  fs.writeFileSync('./teachers.json', teachersToString, { encoding: 'utf8'});
  fs.writeFileSync('./departments.json', departmentsToString, { encoding: 'utf8'});
  fs.writeFileSync('./subjects.json', subjectsToString, {encoding: 'utf8'});
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
  addDepartment,
  addSubject,
  displaySubject,
  editSubject,
  deleteSubject,
  addSubjectForTeacher
}
