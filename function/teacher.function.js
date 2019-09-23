const fs = require('fs');
const readLineSync = require('readline-sync');
const chalk = require('chalk');
const dateDiff = require('date-diff');
const clear = require('clear');

let teachers = [];
let departments = [];
let subjects = [];

function menuTeacher() {
  const options = [
    "1. Add new teacher",
    "2. Edit a teacher",
    "3. Delete a teacher",
    "4. Display list teacher",
    "5. Search teacher by name",
    "6. Search teacher by code",
    "7. Add subject for a teacher",
    "8. Display list subject have age more than N",
    "0. Exit"
  ]
  for(let option of options) {
    console.log(option);
  }
  const anwser = readLineSync.question("Choose option: ");
  switch(anwser) {
    case "1":
      clear();
      addNewTeacher();
      menuTeacher();
      break;
    case "2":
      clear();
      editTeacher();
      menuTeacher();
      break;
    case "3":
      clear();
      deleteTeacher();
      menuTeacher();
      break;
    case "4":
      clear();
      displayListTeacher();
      menuTeacher();
      
      break;
    case "5":
      clear();
      searchTeacherByName();
      menuTeacher();
      break;
    case "6":
      clear();
      searchTeacherByCode();
      menuTeacher();
      break;
    case "7":
      clear();
      addSubjectForTeacher();
      menuTeacher();
      break;
    case "8":
      clear();
      ageMoreThanN();
      menuTeacher();
      break;
    case "0":
      clear();
      save();
      break;
      
  }

}

function loadData() {
  const readData = fs.readFileSync('./data/teachers.json');
  const readData1 = fs.readFileSync('./data/departments.json');
  const readData2 = fs.readFileSync("./data/subjects.json");
  teachers = JSON.parse(readData);
  departments = JSON.parse(readData1);
  subjects = JSON.parse(readData2);
}

function writeDataTeacher(departmentV) {
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
    writeDataTeacher(departmentV);
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

function addNewTeacher() {
  const department = readLineSync.question('Write department: ').toUpperCase().trim();
  const isHave = departments.includes(department);
  if(isHave) {
    writeDataTeacher(department);
  }
  else {
    console.log(chalk.red("Department does not exist!"));
    const anwser = readLineSync.question("Do you want to save it?(Y/N)").toUpperCase().trim();
    if(anwser === "YES" || anwser ==="Y") {
      departments.push(department);
      writeDataTeacher(department);
    }
    else {
      addNewTeacher();
    }
  }
  
}

function displayListTeacher() {
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

function searchTeacherByName() {
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

function searchTeacherByCode() {
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

function save() {
  const teachersToString = JSON.stringify(teachers, null, 1);
  const departmentsToString = JSON.stringify(departments, null, 1);
  const subjectsToString = JSON.stringify(subjects, null, 1);
  fs.writeFileSync('./data/teachers.json', teachersToString, { encoding: 'utf8'});
  fs.writeFileSync('./data/departments.json', departmentsToString, { encoding: 'utf8'});
  fs.writeFileSync('./data/subjects.json', subjectsToString, {encoding: 'utf8'});
}

module.exports = {
  loadData,
  teachers,
  addNewTeacher,
  deleteTeacher,
  editTeacher,
  displayListTeacher,
  searchTeacherByName,
  searchTeacherByCode,
  addSubjectForTeacher,
  ageMoreThanN, 
  menuTeacher
}