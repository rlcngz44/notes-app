//** dont forget to import fs */
const fs = require("fs");

const getNotes = function () {
  return "Your notes ...";
};

//1. This function will be responsible for adding notes.
const addNote = function (title, body) {
  const notes = loadNotes();
  //10. we set property&value pair and push them.
  //Till now, we have loaded the data and added something in array.
  //13. what if we try to add a title which is already existing? how to prevent duplicating?
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken");
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
const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
//5. Create a function to load existing notes.
const loadNotes = function () {
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
const removeNote = function (title) {
  //2.4 Have removeNote log the title of the note to be removed
  console.log("Removing: ", title);
};

//2. Set up more properties to be able to export
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  //2.2 Export removeNote function
  removeNote: removeNote,
};
