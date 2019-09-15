const fs = require('fs');
const readLineSync = require('readline-sync');
const chalk = require('chalk');
const dateDiff = require('date-diff');
let teachers = [];
let subjects = [];

function loadData() {
  const readTeachers = fs.readFileSync('./teachers.json');
  const readSubjects = fs.readFileSync('./subjects.json')
  teachers = JSON.parse(readTeachers);
  subjects = JSON.parse(readSubjects);
}

function write(subjectV) {
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
    subject: subjectV.toUpperCase(),
    coef: Coef
  };
  teachers.push(newTeacher);
  }
}

function addNew() {
  const subject = readLineSync.question('Write subject: ').toUpperCase();
  const isHave = subjects.includes(subject);
  if(isHave) {
    write(subject);
  }
  else {
    console.log(chalk.red("Subject does not exist!"));
    const anwser = readLineSync.question("Do you want to save it?(Y/N)").toUpperCase();
    if(anwser === "YES" || anwser ==="Y") {
      subjects.push(subject);
      write(subject);
    }
    else {
      addNew();
    }
  }
  
}

function addSubject() {
  const newSubject = readLineSync.question('Write new subject: ').toUpperCase();
  const isTrue = subjects.includes(newSubject);
  if(isTrue) {
    console.log(chalk.red("Subject already. Please rewrite new subject"));
  }
  else {
    subjects.push(newSubject);
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
  const newValue = readLineSync.question(`Enter new subject : `).toUpperCase();
  if(subjects.includes(newValue)) {
    item[field] = newValue.toUpperCase();
  }
  else {
    console.log(chalk.red("Subject does not exist!"));
    const anwser = readLineSync.question('Do you want to save it?(Y?N)');
    if(anwser === "YES" || anwser === "Y") {
      subjects.push(newValue);
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
        if(field === "subject") {
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

function displayListSubject() {
  console.log(subjects);
}
function displayTeacherWithSubject() {
  const subject = readLineSync.question('Enter subject: ');
  const data = teachers.filter(item => {
    return item.subject === subject.toUpperCase();
  })
  console.table(data);
}
function deleteSubject() {
  if(teachers.length === 0) {
    console.log(chalk.red("Dont have any teacher"));
  }
  else {
    const subject = readLineSync.question('Write subject want to del: ').toUpperCase();
    let isExist = subjects.includes(subject);
    
    if(isExist) {
      for(let i=0 ; i<subjects.length ; i++) {
        if(subjects[i] === subject) {
          teachers.forEach(e => {
            if(e.subject === subjects[i]) {
              e.subject = null;
            }
          })
          subjects.splice(i,1);
        }
      }
    }
    else {
      console.log(chalk.red("Subject does not exsit"));
    }
  }
}

function editSubject() {
  const a = readLineSync.question("Write subject want to edit: ").toUpperCase();
  let isExist = subjects.includes(a);
  if(isExist === true) {
    const newSubject = readLineSync.question('Enter new subject: ').toUpperCase();
    for(let i=0 ; i<subjects.length ; i++) {
      if(subjects[i] === a) {
        teachers.forEach(e => {
          if(e.subject === subjects[i]) {
            e.subject = newSubject;
          }
        });
        subjects.splice(i,1);
        subjects.splice(i, 0, newSubject);
      }
    }
  }
  else {
    console.log(chalk.red("Subject is not exsit"));
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
  const subjectsToString = JSON.stringify(subjects);
  fs.writeFileSync('./teachers.json', teachersToString, { encoding: 'utf8'});
  fs.writeFileSync('./subjects.json', subjectsToString, { encoding: 'utf8'});
}
module.exports = {
  addNew,
  deleteTeacher,
  editTeacher,
  display,
  searchByName,
  searchByCode,
  displayListSubject,
  displayTeacherWithSubject,
  deleteSubject,
  editSubject,
  ageMoreThanN,
  loadData,
  save,
  beautiful,
  addSubject
}
