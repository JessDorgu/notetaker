const express = require ('express');
const fs = require("fs");
const uuid = require("uuid");

const app = express();
const PORT = 3008;

//static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// create routes to connect the index and notes html

app.get("/", (req,res)=>{
  res.sendFile(__dirname+"/public/index.html");
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.get("/api/notes", (req,res) =>{
  fs.readFile("db/db.json", "utf8",(err,data)=>{
      if(err){
          console.error(err);
          res.statusCode(500).json({error:"Something is wrong with the internal server"});
      } else{
          const notes = JSON.parse(data);
          res.json(notes);
      }
  });

});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4(); 

  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Something is wrong with the internal server' });
    } else {
      const notes = JSON.parse(data);
     
      notes.push(newNote);

      fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Something is wrong with the internal server' });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);