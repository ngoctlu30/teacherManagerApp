const readLineSync = require('readline-sync');
const clear = require('clear');

const funcT = require('./function/teacher.function');
const funcS = require('./function/subject.function');
const funcD = require('./function/department.function');

function Menu() {
  const options = [
    '1. TEACHER',
    '2. DEPARTMENT',
    '3. SUBJECT'   ,
    '0. EXIT'
  ]
  for(let option of options) {
    console.log(option);
  }

  const option = readLineSync.question("Choose one: ");
  switch(option) {
    case "1":
      clear();
      funcT.loadData();
      funcT.menuTeacher();
      Menu()
      break;
    case "2":
      clear();
      funcD.loadData2();
      funcD.menuDepartment();
      Menu();
      break;
    case "3":
      clear();
      // funcS.loadData1();
      funcS.menuSubject();
      Menu();
      break;
    case "0":
      clear();
      break;
  }
}

Menu();

