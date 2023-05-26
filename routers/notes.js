const path = require('path');
const fs = require('fs');
const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

notesRouter.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json('Error in reading notes');
      } else {
        const notes = JSON.parse(data);
        res.status(200).json(notes);
      }
    });
  });
  
  notesRouter.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        id: uuidv4(),
        title,
        text,
      };
  
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json('Error in reading notes');
        } else {
          const parsedNotes = JSON.parse(data);
  
          parsedNotes.push(newNote);
  
          fs.writeFile(dbPath, JSON.stringify(parsedNotes, null, 2), (writeErr) => {
            if (writeErr) {
              console.error(writeErr);
              res.status(500).json('Error in updating notes');
            } else {
              console.info('Successfully updated notes!');
              res.status(201).json(newNote);
            }
          });
        }
      });
    } else {
      res.status(400).json('Title and text are required');
    }
  });
  
  notesRouter.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
  });

  module.exports = notesRouter;