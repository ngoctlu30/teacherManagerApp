const fs = require('fs');
const readLineSync = require('readline-sync');
const chalk = require('chalk');
const clear = require('clear');

let teachers = [];
let departments = [];
let subjects = [];

function menuSubject() {
  const options = [
    '1. Add subject.',
    '2. Display list subject',
    '3. Edit subject.',
    '4. Delete subject'
  ];
  options.forEach(e => console.log(e));
  const option = readLineSync.question("Choose option:");
  switch(option) {
    case "1":
      clear();
      addSubject();
      menuSubject();
      break;
    case "2":
      clear();
      displayListSubject();
      menuSubject();
      break;
    case "3":
      clear();
      editSubject();
      menuSubject();
      break;
    case "4":
      clear();
      deleteSubject();
      menuSubject();
      break;
    case "0":
      clear();
      save();
      break;

  }
}

function loadData1() {
  const readData = fs.readFileSync('./data/teachers.json');
  const readData1 = fs.readFileSync('./data/departments.json');
  const readData2 = fs.readFileSync("./data/subjects.json");
  teachers = JSON.parse(readData);
  departments = JSON.parse(readData1);
  subjects = JSON.parse(readData2);
}

function addSubject() {
  const newNameSubject = readLineSync.question("Write new name of subject: " ).toUpperCase().trim();
  const newCodeSubject = readLineSync.question("Write new code of subject: ").toUpperCase().trim();
  if(newCodeSubject === '' || newNameSubject === '') {
    console.log(chalk.red("Name or code are empty. Please rewrite!"));
    addSubject();
  } 
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
      name: newNameSubject,
      books: []
    }
    subjects.push(newSubject);
  }
}

function displayListSubject() {
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
    }
  }
  if(isHave ===  true) {    
    subjects = subjects.filter(e => {      
      if(e.code === codeSubject) {        
        teachers.forEach(teacher => {          
          for(let key in teacher) {            
            if(key === "subject") {
              
              for(let i=0 ; i< teacher[key].length ; i++) {               
                if(teacher[key][i] === e.name) {
                  teacher[key].splice(i, 1);
                  console.log("here");                           
                }
              }        
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

function addBookForSubject() {

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
  loadData1,
  subjects,
  addSubject,
  displayListSubject,
  editSubject,
  deleteSubject,
  menuSubject
}
