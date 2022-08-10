const chalk = require("chalk");
const yargs = require("yargs");
//3. require the notes.js
const notes = require("./notes.js");

yargs.version("1.1.0");

//create add command
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  //4. Define handler function with two arguments (argv.title, argv.body)
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "remove an existing note",
  //2.1 Set up remove command to take a required "--title" option
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    //2.3 Call removeNote function
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "list all notes",
  handler: function () {
    console.log("Listing the notes!");
  },
});

yargs.command({
  command: "read",
  describe: "read a notes",
  handler: function () {
    console.log("Read the note!");
  },
});
//add, remove, read, list notes

yargs.parse();
