const fs = require('fs');
const _ = require('lodash');

var addNote = (title, body) => {
    var note = {
        body,
    }

    if (checkFileExists(title)) {
        console.log('note already exists...use update...or change title');
        return;
    } else {
        saveNote(note, title);
    }
};

var getAll = () => {
    console.log('Getting notes');
};

var deleteNote = (title) => {
    console.log('deleting');

    if (checkFileExists(title)) {
        fs.unlinkSync(`../notes/${title}.json`);
    } else {
        console.log('file does not exists');
    }
};

var getNote = (title) => {
    console.log('getting a particular note');

    if (checkFileExists(title)) {
        console.log(fetchNote(title).body);
    } else {
        console.log('note does not exists');
    }
};

var updateNote = (title, body) => {

    if(checkFileExists(title)) {
        fetchNote(title).body = body;
    } else {
        console.log('note not exists');
    }
}

const fetchNote = (title) => {
    try {
        return JSON.parse(fs.readFileSync(`../notes/${title}.json`));
    } catch (err) {
        return null;
    }
}

const saveNote = (note) => {
    fs.writeFileSync(`../notes/${title}.json`, JSON.stringify(note));
}

const checkFileExists = (title) => {
    return fs.existsSync(`..notes/${title}.json`);
}

module.exports = { addNote, getAll, deleteNote, getNote };