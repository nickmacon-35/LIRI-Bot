require("dotenv").config();

var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
// console.log(keys.id);
// console.log(keys.secret);
var axios = require("axios");


var command = process.argv[2];
var value = process.argv[3];
var movie = process.argv.slice(3).join(" ");
var artist = process.argv.slice(3).join(" ");
var song = process.argv.slice(3).join(" ");

switch(command) {
    case 'movie-this':
        movie();
    break;
}

switch(command) {
    case 'concert-this':
        concert();
    break;
}

switch(command) {
    case 'spotify-this-song':
        spotify();
    break;
}

switch(command) {
    case 'do-what-it-says':
        doWhat();
    break;
}

function movie() {
    console.log("You are in movie command");

  if (value === undefined) {
    var queryUrl = "https://www.omdbapi.com/?t=mr+nobody&apikey=trilogy";
    axios.get(queryUrl)
    .then(function(response) {
        console.log("----------------------------------------");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country produced in: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("If you haven't watched 'Mr. Nobody' then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
        console.log("----------------------------------------");
  });
  }

  else {
    var queryUrl = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    axios.get(queryUrl)
    .then(function(response) {
        console.log("----------------------------------------");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country produced in: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("----------------------------------------");
    });
  }
}

function concert() {
    console.log("You are in concert command");

  if (value === undefined) {
    var queryUrl = "https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp";
    axios.get(queryUrl)
    .then(function(response) {
        for (var i=0; i < response.data.length; i++) {
        console.log("----------------------------------------");
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
        moment = new Date(response.data[i].datetime);
        console.log((moment.getMonth()+1) + '/' + moment.getDate() + '/' + moment.getFullYear());
        console.log("----------------------------------------");
        }
    });
  }

  else {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl)
        .then(function(response) {
    for (var i=0; i < response.data.length; i++) {
        console.log("----------------------------------------");
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
        moment = new Date(response.data[i].datetime);
        console.log((moment.getMonth()+1) + '/' + moment.getDate() + '/' + moment.getFullYear());
        console.log("----------------------------------------");
        }
    });
  }
}

function spotify() {
    console.log("You are in spotify command")

  if (value === undefined) {
    keys.search({ type: 'track', query: "The Sign" })
        .then(function(response) {
        console.log("----------------------------------------");
        console.log("Artist: " + JSON.stringify(response.tracks.items[6].album.artists[0].name));
        console.log("Song Title: " + JSON.stringify(response.tracks.items[6].name));
        console.log("Spotify Link to the song: " + JSON.stringify(response.tracks.items[6].external_urls.spotify));
        console.log("From Album: " + JSON.stringify(response.tracks.items[6].album.name));
        console.log("----------------------------------------");
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  else {
    keys.search({ type: 'track', query: song })
        .then(function(response) {
    for (var i=0; i < response.tracks.items[i].length; i++) {
        console.log("----------------------------------------");
        console.log("Artist: " + JSON.stringify(response.tracks.items[i].album.artists[0].name));
        console.log("Song Title: " + JSON.stringify(response.tracks.items[i].name));
        console.log("Spotify Link to the song: " + JSON.stringify(response.tracks.items[i].external_urls.spotify));
        console.log("From Album: " + JSON.stringify(response.tracks.items[i].album.name));
        console.log("----------------------------------------");
    }
    })
    .catch(function(err) {
        console.log(err);
    });
  }
}


// function doWhat() {
//     fs.readFile("random.txt", "utf8", function(err, data) {
//         if (err) {
//           return console.log(err);
//         }
//     // Break the string down by comma separation and store the contents into the output array.
//     var output = data.split(",");
    
// }