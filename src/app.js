const fs = require('fs');
const _ = require('lodash');
const argv = require('yargs').argv;

const notes = require('./notes');

var command = argv._[0];
console.log(argv);

if (command === 'add') {
    notes.addNote(argv.title, argv.body);    
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'delete') {
    notes.deleteNote(argv.title);
} else if (command === 'read') {
    notes.getNote(argv.title);
} else {
    console.log('command not recognized');
}