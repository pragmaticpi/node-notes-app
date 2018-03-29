var addNote = (title, body) => {
    console.log(title, body);
};

var getAll = () => {
    console.log('Getting notes');
};

var deleteNote = (title) => {
    console.log('deleting');
};

var getNote = (title) => {
    console.log('getting a particular note');
};

module.exports = { addNote, getAll, deleteNote, getNote };

