const fs = require('fs');
const _ = require('lodash');

var addNote = (title, body) => {
    var note = {
        title,
        body,
    };

    var notes = fetchNotes();
    
    var duplicateNotes = notes.filter( note => note.title === title );

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNote(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var deleteNote = (title) => {
    var notes = fetchNotes();
    notes = notes.filter( note => note.title !== title );
    saveNote(notes);
};

var getNote = (title) => {
    var notes = fetchNotes();
    var getNote = notes.filter( note => note.title === title );
    return getNote[0];
};

var updateNote = (title, body) => {
}

const fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('../notes/notes-data.json'));
    } catch (err) {
        return [];
    }
}

const saveNote = (notes) => {
    fs.writeFileSync('../notes/notes-data.json', JSON.stringify(notes));
}

module.exports = { addNote, getAll, deleteNote, getNote };