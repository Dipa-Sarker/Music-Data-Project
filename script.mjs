// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

/*import { countUsers } from "./common.mjs";


window.onload = function () {
  document.querySelector("body").innerText = `There are ${countUsers()} users`;
}; */
import { getListenEvents, getSong } from "./data.mjs";


//DOM elements
const select = document.getElementById("user-select");
const answersContainer = document.getElementById("answers-container");


//function to display answers so it is reusable and DRY is obeyed
function displayAnswers(userId) {
  const events = getListenEvents(userId);

  answersContainer.innerHTML = "";
  //display message for no songs
  if (!events || events.length === 0) {
    answersContainer.textContent = "This user didn't listen to any songs.";
    return;
  }
  //create elements for displaying answers
  const song = getMostListenedSong(userId);
  const songAnswerElement = document.createElement("p");
  songAnswerElement.textContent = `Most Listened song (Count): ${song.artist} - ${song.title}`;
  const artist = getMostListenedArtist(userId);
  const artistAnswerElement = document.createElement("p");
  artistAnswerElement.textContent = `Most Listened artist (Count): ${artist}`;
  const fridayNightSong = getFridayNightSong(userId);
  if (fridayNightSong !== null) {
  const fridayNightSongAnswerElement = document.createElement("p");
  fridayNightSongAnswerElement.textContent = `Friday Night song (Count): ${fridayNightSong.artist} - ${fridayNightSong.title}`;

  answersContainer.append(songAnswerElement, artistAnswerElement, fridayNightSongAnswerElement);
}
}

//user's most often listened to song (Q-1)
function getMostListenedSong(userId) {
const events = getListenEvents(userId);
const songCounts = {};
for (const event of events){
  const songId = event.song_id;
  if(songId in songCounts){
    songCounts[songId]++;
  }
  else {
    songCounts[songId] = 1;

}
}
let mostListenedSongId = null;
let maxCount = 0;
for (const songId in songCounts) {
  if(songCounts[songId] > maxCount){
    mostListenedSongId = songId;
    maxCount = songCounts[songId];
  }
}
return getSong(mostListenedSongId);

}

//display answer for most listened song when select an user
select.addEventListener("change", function () {
  displayAnswers(select.value);
});

//user's most often listened to artist (Q-2)
function getMostListenedArtist(userId) {
const events = getListenEvents(userId);
const artistCounts = {};
for (const event of events){
  const song = getSong(event.song_id);
const songArtist = song.artist;
  if(songArtist in artistCounts){
    artistCounts[songArtist]++;
  }
  else {
    artistCounts[songArtist] = 1;

}
}
let mostListenedArtist = null;
let maxCount = 0;
for (const songArtist in artistCounts) {
  if(artistCounts[songArtist] > maxCount){
    mostListenedArtist = songArtist;
    maxCount = artistCounts[songArtist];
  }
}
return mostListenedArtist;

}

//Users most often listened friday night song(Q-3)
function getFridayNightSong(userId){
  console.log("Function called for user:", userId);
  const events = getListenEvents(userId);
  for(const event of events){
    console.log("Checking event:", event.timestamp);
const date = new Date(event.timestamp);
const day = date.getDay();
if( (day === 5 && event.seconds_since_midnight >= 61200) || (day === 6 && event.seconds_since_midnight < 14400 )){
const songCounts = {};
for (const event of events){
  const songId = event.song_id;
  if(songId in songCounts){
    songCounts[songId]++;
  }
  else {
    songCounts[songId] = 1;

}
}
let mostListenedSongId = null;
let maxCount = 0;
for (const songId in songCounts) {
  if(songCounts[songId] > maxCount){
    mostListenedSongId = songId;
    maxCount = songCounts[songId];
  }
}
if (mostListenedSongId === null) {
  return null;
}
  return getSong(mostListenedSongId);
}
  }

}
