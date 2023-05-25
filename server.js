const express = require("express");
const path = require("path");
const fs = require('fs');
const uuid = require('./helpers/uuid');
const db = require('./db/db.json');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//GET /api/notes should read the db.json file and return all saved notes as JSON.
//Get Attempt

app.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
    console.info(db)
    // Sending all reviews to the client
    return res.json(db);
  });


// app.get('/api/notes', (req, res) => {
//     // Send a message to the client
//     res.status(200).json(`${req.method} request received to get reviews`);
  
//     // Log our request to the terminal
//     console.info(`${req.method} request received to get reviews`);
//   });


//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
//Post Attempt

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    console.info(req.body);
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        review_id: uuid(),
      };
  
      // Obtain existing reviews
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNote = JSON.parse(data);
  
          // Add a new review
          parsedNote.push(newNote);
  
          // Write updated reviews back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNote, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });


app.listen(PORT, () =>
  console.log(`Serving static asset routes at http://localhost:${PORT}`)
);
