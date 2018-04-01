const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs
    .command('add', 'Add a new note', {
        title: {
            describe: 'Title of note',
            demand: true,
            alias: 't',
        },
        body: {
            describe: 'Body of note',
            demand: true,
            alias: 'b',
        },
    })
    .help()
    .argv;

var command = argv._[0];
console.log(argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log(note);
    } else {
        console.log('note not created');
    }
} else if (command === 'list') {
    var notesList = notes.getAll();
    notesList.forEach(element => console.log(element));
} else if (command === 'delete') {
    notes.deleteNote(argv.title);
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log(note);
    } else {
        console.log('note not found');
    }
} else if (command === 'update') {
    notes.updateNote(argv.title, argv.body);
} else {
    console.log('command not recognized');
}