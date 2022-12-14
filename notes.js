//** dont forget to import fs */
const chalk = require("chalk");
const fs = require("fs");

//1. This function will be responsible for adding notes.
const addNote = (title, body) => {
  const notes = loadNotes();
  //10. we set property&value pair and push them.
  //Till now, we have loaded the data and added something in array.
  //13. what if we try to add a title which is already existing? how to prevent duplicating?

  // const duplicateNotes = notes.filter(function (note) {
  //   return note.title === title;
  // });
  const duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.inverse.green("New note added!"));
  } else {
    console.log(chalk.inverse.red("Note title taken"));
  }

  //12. call saveNotes function.
  // Run command line: node app.js add --title="List" --body="Pants" and another examples. we will see it will add new notes.
  // So this proves that both of the cases for load notes are working the first time around when there was no file,
  //this did indeed throw an error, so we started off with an empty array,
  //giving us a barebones way to actually create that file the next time we ran it.
  //This didn't throw an error. It correctly parsed the existing data.
  //It then added on to that existing data and saved it.
};
//11. After loading and adding the data, we need to save it. for this, we can create a function.
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
//5. Create a function to load existing notes.
const loadNotes = () => {
  //9. Use try&catch statement for error handling
  try {
    //6. To use fs.readFileSync and create notes.json file
    const dataBuffer = fs.readFileSync("notes.json");
    //7. To convert this data to string
    const dataJSON = dataBuffer.toString();
    //8. and we can parse it
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

//2.2 Create a removeNote function
const removeNote = (title) => {
  //2.4 Have removeNote log the title of the note to be removed
  // console.log("Removing: ", title);
  //3.1 Loading existing notes
  const notes = loadNotes();
  //3.2 new array to filter unmatched titles
  const notesToKeep = notes.filter((note) => note.title !== title);
  //3.3 saving new array as new array
  saveNotes(notesToKeep);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.inverse.green("Note removed!"));
  } else {
    console.log(chalk.inverse.red("No note found!"));
  }
};

//4.1
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)
  if(note){
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.inverse.red("Note not found!"))
  }
}
//2. Set up more properties to be able to export
module.exports = {
  addNote: addNote,
  //2.2 Export removeNote function
  removeNote: removeNote,
  //4.1 Export listNotes function
  listNotes: listNotes,
  readNote : readNote
};
