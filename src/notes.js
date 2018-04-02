const fs = require('fs');

const fetchNoteContent = (title) => {
  try {
    return JSON.parse(fs.readFileSync(`../notes/${title}.json`));
  } catch (err) {
    return [];
  }
};

const fetchNotes = () => {
  fs.readdirSync('../notes').forEach((file) => {
    const notesList = JSON.parse(fs.readFileSync(`../notes/${file}`));
    console.log(`Notes in ${file}:-`);
    notesList.forEach(element => console.log(element));
  });
};

const saveNote = (col, note) => {
  fs.writeFileSync(`../notes/${col}.json`, JSON.stringify(note));
};

const checkFileExists = col => fs.existsSync(`../notes/${col}.json`);

const addNote = (col, title, body) => {
  const note = {
    title,
    body,
  };

  if (checkFileExists(col)) {
    const notes = fetchNoteContent(col);
    notes.push(note);
  }

  saveNote(col, note);
  return note;
};

const getAllCollections = () => {
  fetchNotes();
};

const getAllNotesInCollection = (col) => {
  fetchNoteContent(col);
};

const deleteCollection = col => fs.unlinkSync(`../notes/${col}.json`);

const deleteNoteInCollection = (col, title) => {
  let notes = fetchNoteContent(col);
  notes = notes.filter(note => note.title !== title);
  saveNote(notes);
};

const getNote = (col, title) => {
  if (checkFileExists(col)) {
    const notes = fetchNoteContent(col);
    const fetchNote = notes.filter(note => note.title === title);
    return fetchNote[0];
  }
};

const updateBody = (col, title, body) => {
  if (fs.existsSync(`../notes/${col}.json`)) {
    const notes = fetchNoteContent(col);
    const note = notes.filter(n => n.head === title);
    if (note.length === 0) {
      console.log('title does not exists');
      return;
    }
    note.head = body;
    notes.push(note);
    saveNote(notes);
  } else {
    console.log('note file does not exists');
  }
};
module.exports =
{
  addNote,
  getAllCollections,
  getAllNotesInCollection,
  deleteNoteInCollection,
  deleteCollection,
  getNote,
  updateBody,
};
