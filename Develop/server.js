const express = require ('express');


const app = express();

const PORT = 3008
;

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




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);