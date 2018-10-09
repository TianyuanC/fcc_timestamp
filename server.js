const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:time?", function (req, res) {
  let time = req.params.time;

  if (!time) {
    time = new Date();
  }
  
  if (!isNaN(time)) {
    time = parseInt(time, 10)
  }
  
  time = new Date(time);
  
  if (time === "Invalid Date") {
    res.json({
      unix: null,
      utc: "Invalid Date"
    })
    return;
  }
  
  res.json({
    unix: time.getTime(),
    utc: time.toUTCString()
  });
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});