const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const countryColor = require('./public/assets/colorToCode.json')
const alpha3 = require('./public/assets/codeToName.json')
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "./views"));

app.use(express.urlencoded({ extended: true }));
const port = 2003;

app.listen(port, () => {
   console.log(`App listening on port http://localhost:${port}/`);
});

app.post("/country", async (req, res) => {
   const color = req.body.color.replace(/ /g, '')
   const countryCode = countryColor[color] || "OCEAN"
   const name = codeToName(countryCode.toLowerCase()) || "OCEAN"
   res.json({code:name})
});


function codeToName(code){
   let el = alpha3.find(el => el.alpha3 == code)
   if (!el) return "ocean"
   return el.fr
}

const demo = require("./routes/demo.js");
app.use("/", demo);
