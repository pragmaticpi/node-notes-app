const fs = require('fs');
const _ = require('lodash');

var addNote = (col, title, body) => {
  var note = {
    title,
    body,
  };

  if (checkFileExists(col)) {
    var notes = fetchNoteContent(col);
    notes.push(note);
  };

  saveNote(col, note);
  return note;
};

var getAllCollections = () => {
  fetchNotes();
};

var getAllNotesInCollection = (col) => {
  fetchNoteContent(col);
}

var deleteCollection = (col) => {
  return fs.unlinkSync(`../notes/${col}.json`);
};

var deleteNoteInCollection = (col, title) => {
  var notes = fetchNoteContent(col);
  notes = notes.filter(note => note.title !== title);
  saveNote(notes);
}

var getNote = (col, title) => {
  if (checkFileExists(col)) {
    var note = fetchNoteContent(col);
    var note = notes.filter(note => note.title === title);
    return note[0];
  } else {
    console.log('note file does not exists');
  }
};

var updateBody = (col, title, body) => {
  if (fs.existsSync(`../notes/${col}.json`)) {
    var notes = fetchNoteContent(col);
    var note = notes.filter(note => note.head === head);
    if(note.length === 0) {
      console.log('title does not exists');
      return;
    }
    note.head = body;
    notes.push(note);
    saveNote(notes);
  } else {
    console.log('note file does not exists');
  }
}

const fetchNoteContent = (title) => {
  try {
    return JSON.parse(fs.readFileSync(`../notes/${title}.json`));
  } catch (err) {
    return [];
  }
}

const fetchNotes = () => {
  fs.readdirSync('../notes').forEach(file => {
    var noteList = JSON.parse(fs.readFileSync(`../notes/${file}`));
    console.log(`Notes in ${file}:-`);
    notesList.forEach(element => console.log(element));
  });
};

const saveNote = (col, note) => {
  fs.writeFileSync(`../notes/${col}.json`, JSON.stringify(note));
}

const checkFileExists = (col) => {
  return fs.existsSync(`../notes/${col}.json`);
}

module.exports = { addNote, getAllCollections, getAllNotesInCollection, deleteNote, getNote };