var express = require("express");
 var app = express();
 var port = process.env.PORT || 3000;
 app.use(express.static(__dirname));
 app.get("/", function (req,res) {
 res.send("this is working");
 })
 app.listen(port);
 console.log("listening on port " + port); 
