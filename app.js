const mysql = require ('mysql');
const express = require('express');
const {check, validationResult} = require("express-validator");
const bodyParser = require ('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Gohanssj2",
  database: "sqlTrial"
});


app.post("/",[
  check('emailFormInput',"Email is not valid...").isEmail().normalizeEmail().escape(),
  check("commentFormInput", "Please enter a comment...").isLength({min:12}).trim().escape()
  ],
  function(req, res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(res.status(422).json({ errors: errors.array() }));
  }
  else {
    var email = req.body.emailFormInput;
    var comment = req.body.commentFormInput;
  }

  connection.connect(function (err) {
    connection.on('error', function(err) {
      console.log("[mysql error]",err);
    });
    console.log("Connected to DB...");
    var sql = "INSERT INTO messages (email, message) VALUES ('"+email+"','"+comment+"')";
    connection.query(sql, function(err, result){
      connection.on('error', function(err) {
        console.log("[mysql error]",err);
      });
      console.log("Inserted data into DB...");
      res.send();

    });
  });

  res.send();

});
app.listen(3000);
