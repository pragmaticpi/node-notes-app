const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const { argv } = yargs
  .command('add', 'Add a new note', {
    col: {
      describe: 'Notes collection',
      demand: true,
      alias: 'c',
      type: 'string',
    },
    title: {
      describe: 'Heading of note',
      demand: true,
      alias: 't',
      type: 'string',
    },
    body: {
      describe: 'Body of note',
      demand: true,
      alias: 'b',
      type: 'string',
    },
  })
  .command('list', 'List all notes, Defaults to all collection', {
    col: {
      describe: 'List all notes in particular collection',
      demand: false,
      alias: 'c',
      type: 'string',
    },
  })
  .command('delete', 'Delete notes/collection', args =>
    args.options({
      c: {
        alias: 'col',
        demandOption: true,
        describe: 'name of collection',
        type: 'string',
      },
      t: {
        alias: 'title',
        demandOption: false,
        describe: 'title of collection',
        type: 'string',
      },
    }))
  .command('read', 'Read a particular note body', args =>
    args.options({
      c: {
        alias: 'col',
        demandOption: true,
        describe: 'name of collection',
        type: 'string',
      },
      t: {
        alias: 'title',
        demandOption: true,
        describe: 'title of collection',
        type: 'string',
      },
    }))
  .command('update', 'Update a note body - provided collection and title name', {
    col: {
      describe: 'name of collection',
      demand: true,
      alias: 'c',
      type: 'string',
    },
    title: {
      describe: 'Heading of note',
      demand: true,
      alias: 't',
      type: 'string',
    },
    body: {
      describe: 'Updated Body of note',
      demand: true,
      alias: 'b',
      type: 'string',
    },
  })
  .help()
  .argv;

const command = argv._[0];
console.log(argv);

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.head, argv.body);
  if (note) {
    console.log(`Note created with title ${argv.title}`);
  } else {
    console.log('note not created');
  }
} else if (command === 'list') {
  if (argv.col) {
    if (_.isEmpty(argv.col)) {
      console.log('Provide collection name');
    } else {
      const notesList = notes.getAllNotesInCollection(argv.col);
      notesList.forEach(element => console.log(element));
    }
  } else {
    notes.getAllCollections();
  }
} else if (command === 'delete') {
  if (argv.title) {
    notes.deleteNoteInCollection(argv.col, argv.title);
  } else {
    const status = notes.deleteCollection(argv.col);
    console.log(status ? 'File not deleted' : 'File deleted');
  }
} else if (command === 'read') {
  const note = notes.getNote(argv.col, argv.title);
  if (note) {
    console.log(note);
  } else {
    console.log('note not found');
  }
} else if (command === 'update') {
  notes.updateBody(argv.col, argv.title, argv.body);
} else {
  console.log('command not recognized');
}
