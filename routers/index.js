const path = require("path");
const indexRouter = require('express').Router();

//Route to notes.html
indexRouter.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//Route to index.html
indexRouter.get("*", (req, res) =>
res.sendFile(path.join(__dirname, "/public/index.html"))
);

module.exports = indexRouter;