import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api{/:date}", (req, res) => {
  let dateObj;
  const dateParam = req.params.date;
  const isNumber = /^-?\d+$/.test(dateParam);
  /* const isInvalidDate = Number.isNaN(dateObj.getTime()); */
  
  if (!dateParam) {
    dateObj = new Date();
  } else if (isNumber) {
    dateObj = new Date(Number(dateParam));
  } else {
    dateObj = new Date(dateParam);
  }
  
  if (Number.isNaN(dateObj.getTime())) {
      res.json({
        error: "Invalid Date"
      });

      return;
  }

  res.json({
    "unix": dateObj.getTime(),
    "utc": dateObj.toUTCString()
  })
})
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
