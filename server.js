const express = require("express");
const notesRouter = require('./routers/notes');
const indexRouter = require('./routers/index');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Server route to notes
app.use('/api/notes', notesRouter);
//Server route to index
app.use('/', indexRouter)

app.listen(PORT, () =>
  console.log(`Serving static asset routes at http://localhost:${PORT}`)
);