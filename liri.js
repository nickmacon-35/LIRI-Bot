require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios")

var command = process.argv[2];
var value = process.argv[3];

switch(command) {
    case 'movie-this':
        movie();
    break;
}

function movie() {
    console.log("You are in movie command");
    var queryUrl = "https://www.omdbapi.com/?t=" + value + "&apikey=trilogy";
    axios.get(queryUrl)
    .then(function(data) {
        console.log(data);
    });
}
