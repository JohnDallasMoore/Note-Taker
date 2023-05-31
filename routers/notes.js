const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile,  readAndAppend } = require('../helpers/fsUtils');

//Route to add saved notes
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
//Route to save new notes
notesRouter.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});  
  
//Route to delete saved notes
notesRouter.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    //figure out wtf to put here
});

module.exports = notesRouter;