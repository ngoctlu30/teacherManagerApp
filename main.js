const func = require('./function');
const readLineSync = require('readline-sync');


function Menu() {
  console.log('1. Add new a teacher.');
  console.log('2. Delete a teacher');
  console.log('3. Edit a teacher');
  console.log('4. Display list teacher');
  console.log('5. Search by name');
  console.log('6. Seach by code');
  console.log('7. Display list subject');
  console.log('8. Display teachers belongto subject');
  console.log('9. Delete a subject ');
  console.log('10.Edit subject');
  console.log("11.Display list teachers have age more than N");
  console.log("12.Add new subject ");
  console.log('0. Exit');
  console.log("=========================================");
  const option = readLineSync.question('Enter option: ');
  switch (option) {
    case '1':
      func.addNew();
      func.beautiful();
      Menu();
      break;
    case "2":
      func.deleteTeacher();
      func.beautiful()
      Menu();
      break;
    case "3":
      func.editTeacher();
      func.beautiful()
      Menu();
      break;
    case "4":
      func.display();
      func.beautiful()
      Menu();
      break;
    case '5':
      func.searchByName();
      func.beautiful()
      Menu();
      break;
    case "6":
      func.searchByCode();
      func.beautiful()
      Menu();
      break;
    case "7":
      func.displayListSubject();
      func.beautiful()
      Menu();
      break;
    case "8":
      func.displayTeacherWithSubject();
      func.beautiful()
      Menu();
      break;
    case "9":
      func.deleteSubject();
      func.beautiful()
      Menu();
      break;
    case "10":
      func.editSubject();
      func.beautiful()
      Menu();
      break;
    case "11":
      func.ageMoreThanN();
      func.beautiful()
      Menu();
      break;
    case "12":
      func.addSubject();
      func.beautiful();
      Menu();
      break;
    case "0":
      func.save();
      break;
  };
}

function Main() {
  func.loadData();
  Menu();
}
Main();