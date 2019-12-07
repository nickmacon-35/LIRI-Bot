require("dotenv").config();

var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
var axios = require("axios");

var command = process.argv[2];
var value = process.argv.slice(3).join(" ");

function func(comm, val) {
switch(comm) {
    case 'movie-this':
        movie(val);
    break;

    case 'concert-this':
        concert(val);
    break;

    case 'spotify-this-song':
        spotify(val);
    break;

    case 'do-what-it-says':
        doWhat(val);
    break;
}
}


function movie() {
    console.log("You are in movie command");

  if (!process.argv[3]) {
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
    var queryUrl = "https://www.omdbapi.com/?t=" + value + "&apikey=trilogy";
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

  if (!process.argv[3]) {
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
    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
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

  if (!process.argv[3]) {
    keys.search({ type: 'track', query: "The Sign" })
        .then(function(response) {
        console.log("----------------------------------------");
        console.log("Artist: " + response.tracks.items[6].album.artists[0].name);
        console.log("Song Title: " + response.tracks.items[6].name);
        console.log("Spotify Link to the song: " + response.tracks.items[6].external_urls.spotify);
        console.log("From Album: " + response.tracks.items[6].album.name);
        console.log("----------------------------------------");
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  else {
    keys.search({ type: 'track', query: value })
        .then(function(response) {
    for (var i=0; i < JSON.stringify(response.tracks.items[i]).length; i++) {
        console.log("----------------------------------------");
        console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
        console.log("Song Title: " + response.tracks.items[i].name);
        console.log("Spotify Link to the song: " + response.tracks.items[i].external_urls.spotify);
        console.log("From Album: " + response.tracks.items[i].album.name);
        console.log("----------------------------------------");
    }
    })
    .catch(function(err) {
        console.log(err);
    });
  }
}

function doWhat() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
    // Break the string down by comma separation and store the contents into the output array.
    var output = data.split(",");
    console.log(output[0]);
    console.log(output.slice(1).join(" "));
    value = output.slice(1).join(" ");
    func(output[0], value);
  }); 
}

func(command, value);