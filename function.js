const fs = require('fs');
const readLineSync = require('readline-sync');
const chalk = require('chalk');
const dateDiff = require('date-diff');
let teachers = [];


function loadData() {
  const readData = fs.readFileSync('./data.json');
  teachers = JSON.parse(readData);
  console.table(teachers);
}

function addNew() {
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
    addNew();
  }
 
  else {
  const Name = readLineSync.question('Teacher name: ');
  const Birthday = readLineSync.question('Teacher birthday (dd/mm/yy): ');
  const Gen  = readLineSync.question('Gen of teacher: ');
  const DateJoin = readLineSync.question('Date join (dd/mm/yy): ');  
  const Subject = readLineSync.question('Subject: ');
  const Coef = readLineSync.questionFloat('Coef money: ');
  const newTeacher = {
    code: Code.toUpperCase(),
    name: Name.toUpperCase(),
    birthday: Birthday,
    gen: Gen.toUpperCase(),
    dateJoin: DateJoin,
    subject: Subject.toUpperCase(),
    coef: Coef
  };
  teachers.push(newTeacher);
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
        console.log(item[field]);
        const newField = readLineSync.question(`Enter new ${field} : `);
        item[field] = newField.toUpperCase();
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
  let temp = [];
  for(let key of teachers) {
    temp.push(key.subject);
  }
  let isExist = (temp, x) => temp.includes(x);
  let arr = [];
  temp.forEach(e => {
    if(!isExist(arr, e)) arr.push(e);
  })
  if(arr.length === 0) {
    console.log(chalk.red("Data do not exsit"));
  } else {
  console.log(arr);
  }
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
    let isExist;
    const subject = readLineSync.question('Write subject want to del: ');
    const x = RegExp(subject, 'i');
    for(let key of teachers) {
      isExist = true;
    }
    if(isExist) {
      teachers = teachers.filter((item) => {
        return item.subject !== subject.toUpperCase();
      });
    }
    else {
      console.log(chalk.red("Subject does not exsit"));
    }
  }
  
}

function editSubject() {
  const a = readLineSync.question("Write subject want to edit: ");
  let isExist;
  for(let k of teachers) {
    if(k.subject === a.toUpperCase()) {
      isExist = true;
    }
    
  }
  if(isExist == true) {
    const newSubject = readLineSync.question('Enter new subject: ');
    teachers.map(item => {
      if(item.subject === a.toUpperCase()) {
        item.subject = newSubject.toUpperCase();
      }
      return;
    })
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
  const toString = JSON.stringify(teachers);
  let data = fs.writeFileSync('./data.json', toString, { encoding: 'utf8'});
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
  beautiful
}
