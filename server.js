var express = require("express");
var bodyParser = require("body-parser");
var app = express();


var session = require("express-session");
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

require("./app/controller/main_routes")(app);

app.listen(PORT, () => {
  console.log('CONNECTED ON PORT', PORT);
});