const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs
    .command('add', 'Add a new note', {
        title: {
            describe: 'File name of note',
            demand: true,
            alias: 't',
            type: "string",
        },
        head: {
            describe: 'Heading of note',
            demand: true,
            alias: 'h',
            type: "string",
        },
        body: {
            describe: 'Body of note',
            demand: true,
            alias: 'b',
            type: "string",
        },
    })
    .example('node app.js add -title="" --head = "" --body=""')
    .command('list', 'List all notes', {})
    .example('node app.js list', 'list all note')
    .command('read', 'Read a particular note', {
        title: {
            describe: 'File name of note',
            demand: true,
            alias: 't',
            type: "string",
        },
    })
    .example('node app.js read --title=""')
    .help()
    .argv;

var command = argv._[0];
console.log(argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.head, argv.body);
    if (note) {
        console.log(`Note created with title ${argv.title}`);
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
} else if (command === 'update-head') {
    notes.updateHead(argv.title, argv.head);
} else if (command === 'update-body') {
    notes.updateBody(argv.title, argv.body);
} else {
    console.log('command not recognized');
}