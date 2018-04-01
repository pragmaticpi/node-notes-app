const fs = require('fs');
const _ = require('lodash');

var addNote = (title, head, body) => {
    var note = {
        head,
        body,
    };

    if (checkFileExists(title)) {
        console.log('file already exists');
    } else {
        saveNote(title, note);
        return note;
    }
};

var getAll = () => {
    fetchNotes();
};

var deleteNote = (title) => {
    var notes = fetchNotes();
    notes = notes.filter(note => note.title !== title);
    saveNote(notes);
};

var getNote = (title) => {
    if(checkFileExists(title)) {
        var note = fetchNote(title);
        var note = notes.filter(note => note.head === head);
        return note[0];
    } else {
        console.log('note file does not exists');
    }
};

var updateNote = (title, head, body) => {
    if (fs.existsSync(`../notes/${title}.json`)) {
        var notes = fetchNoteContent(title);
        var note = notes.filter(note => note.head === head);

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
    fs.readdirSync('../notes').forEach( file => {
        var noteList = JSON.parse(fs.readFileSync(`../notes/${file}`));
        console.log(`Notes in ${file}:-`);
        notesList.forEach(element => console.log(element));
    });
};

const saveNote = (title, note) => {
    fs.writeFileSync(`../notes/${title}.json`, JSON.stringify(note));
}

const checkFileExists = (title) => {
    return fs.existsSync(`../notes/${title}.json`);
}

module.exports = { addNote, getAll, deleteNote, getNote };