const express = require ('express');
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


//static files
app.use(express.static(path.join(__dirname, "/Develop/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// create routes to connect the index and notes html

app.get("/", (req,res)=>{
  res.sendFile(__dirname+"/Develop/public/index.html");
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/Develop/public/notes.html');
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err); // Log the error to the console for debugging.
      res.status(500).json({ error: "Something went wrong on the server" });
    } else {
      try {
        const notes = JSON.parse(data);
        res.json(notes);
      } catch (error) {
        console.error(error); // Log JSON parsing errors.
        res.status(500).json({ error: "Error parsing JSON data" });
      }
    }
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4(); 

  fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err); // Log the error to the console for debugging.
      res.status(500).json({ error: 'Something is wrong with the internal server' });
    } else {
      try {
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err); // Log the error to the console for debugging.
            res.status(500).json({ error: 'Something is wrong with the internal server' });
          } else {
            res.json(newNote);
          }
        });
      } catch (error) {
        console.error(error); // Log JSON parsing errors.
        res.status(500).json({ error: "Error parsing JSON data" });
      }
    }
  });
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);