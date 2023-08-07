console.log("yep");

const express = require ('express');
const path = require('path');
const app = express();

const PORT = 3005;

//static files
app.use(express.static('public'));

// create routes to connect the index and notes html

app.get('/', (req, res) => res.send('Navigate to /notes'));
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);