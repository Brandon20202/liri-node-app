require("dotenv").config();
var keys =require("./keys.js");
var Spotify=require("node-spotify-api")
var spotify= new Spotify(keys.spotify);
var request= require("request");
var fs =require("fs");
var axios =require("axios");
var nodeArgs=process.argv;
var newArg=process.argv[2];


function bandsintownLogic(){
    var artist=process.argv[3];
    var queryUrl="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response){
            console.log("Name of the venue and location: " + response.data.venue);
            console.log("Date of event: " + response.data.datetime);



        }
    );

};

function spotifyLogic(song) {
    var songQuery = '';
    if (song) {
      songQuery = song;
    }
    else {
      for (var i = 3; i < nodeArgs.length; i++) {
        songQuery += nodeArgs[i] + ' ';
      }
      if (songQuery === '') {
        songQuery = 'The Sign Ace of Base';
      }
    }
    spotify.search({ type: 'track', query: songQuery }, function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      console.log('Artist name: ' + data.tracks.items[0].artists[0].name + '\nSong name: ' + data.tracks.items[0].name + '\nPreview link: ' + data.tracks.items[0].preview_url + '\nAlbum name: ' + data.tracks.items[0].album.name + '\n------------------------------------------------');
    });
  }
  
  function omdbLogic() {
    var movieName = process.argv[3];
    axios.get("http://www.omdbapi.com/?t= " + movieName + "&y-&plot-short&apikey=trilogy").then(
        function (response){
            console.log("Title: " + response.data.Title);
            console.log("Release date: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings);
            console.log("----------------------------------------------------------------------------------------------------");
    
        });

    }
  
  
  function argumentLogic(song) {
    if (newArg === 'concert-this') {
        bandsintownLogic();
      
    }
    //Spotify logic
    else if (newArg === 'spotify-this-song') {
      spotifyLogic(song);
    }
    // OMDB logic
    else if (newArg === 'movie-this') {
      omdbLogic();
    }
    else if (newArg === 'do-what-it-says') {
      fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        var splitData = data.split(',');
        newArg = splitData[0];
        var passedObject = splitData[1];
        argumentLogic(passedObject);
      });
    }
    else {
      console.log('Unknown Command\nHere is a list of available commands: \n-------------------\nconcert-this artist/band\nspotify-this-song <song name here>\nmovie-this <movie name here>\ndo-what-it-says\n---------------------')
    }
  }
  
  argumentLogic();


