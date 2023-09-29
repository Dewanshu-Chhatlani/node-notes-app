const chalk = require("chalk");

const fs = require("fs");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.greenBright(`Note Added! - ${title}`));
  } else {
    console.log(chalk.redBright(`ERROR: Duplicate Note - ${title}`));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  const noteIndex = notes.findIndex((note) => note.title === title);

  if (noteIndex >= 0) {
    notes.splice(noteIndex, 1);

    saveNotes(notes);
    console.log(chalk.greenBright(`Note Removed! - ${title}`));
  } else {
    console.log(chalk.redBright(`ERROR: Note not found! - ${title}`));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.bgYellowBright("List of Notes:"));
  notes.forEach((note, index) =>
    console.log(chalk.yellowBright(`${index + 1}. ${note.title}`))
  );
};

const readNote = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => note.title === title);

  if (foundNote) {
    console.log(chalk.bgYellowBright.bold.italic(`${foundNote.title}`));
    console.log(chalk.yellowBright(foundNote.body));
  } else {
    console.log(chalk.redBright(`ERROR: Note not found!`));
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
