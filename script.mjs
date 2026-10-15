import { getListenEvents, getSong } from "./data.mjs";
import {
  getSongsListenedToEveryDayFromEvents,
  getTopGenresFromEvents,
} from "./helpers.mjs";

//DOM elements
const select = document.getElementById("user-select");
const answersContainer = document.getElementById("answers-container");

//Display all applicable answers for the selected user
function displayAnswers(userId) {
  const events = getListenEvents(userId);

  answersContainer.innerHTML = "";
  //Display message for no songs
  if (!events || events.length === 0) {
    answersContainer.textContent = "This user didn't listen to any songs.";
    return;
  }
  //Create elements for displaying answers
  {
    const song = getMostListenedSong(userId);
    const paragraph = document.createElement("p");
    paragraph.textContent = `Most Listened song (Count): ${song.artist} - ${song.title}`;
    answersContainer.append(paragraph);
  }
  {
    const mostListenedSongTime = getMostListeningTimeSong(userId);
    const paragraph = document.createElement("p");
    paragraph.textContent = `Most Listened song (Time): ${mostListenedSongTime.artist} - ${mostListenedSongTime.title}`;
    answersContainer.append(paragraph);
  }
  {
    const artist = getMostListenedArtist(userId);
    const paragraph = document.createElement("p");
    paragraph.textContent = `Most Listened artist (Count): ${artist}`;
    answersContainer.append(paragraph);
  }
  {
    const mostListenedArtistTime = getMostListeningTimeArtist(userId);
    const paragraph = document.createElement("p");
    paragraph.textContent = `Most Listened artist (Time): ${mostListenedArtistTime}`;
    answersContainer.append(paragraph);
  }
  {
    const fridayNightSong = getFridayNightSong(userId);
    if (fridayNightSong !== null) {
      const paragraph = document.createElement("p");
      paragraph.textContent = `Friday Night song (Count): ${fridayNightSong.artist} - ${fridayNightSong.title}`;
      answersContainer.append(paragraph);
    }
  }
  {
    const mostListenedSongOnFridayNightByTime =
      getMostListenedSongOnFridayNightByTime(userId);
    if (mostListenedSongOnFridayNightByTime !== null) {
      const paragraph = document.createElement("p");
      paragraph.textContent = `Friday Night song (Time): ${mostListenedSongOnFridayNightByTime.artist} - ${mostListenedSongOnFridayNightByTime.title}`;
      answersContainer.append(paragraph);
    }
  }
  {
    const result = getLongestStreakSong(userId);
    const songNames = result.songs.map(
      (song) => `${song.artist} - ${song.title}`
    );
    const paragraph = document.createElement("p");
    paragraph.textContent = `Longest Streak song: ${songNames.join(
      ", "
    )} (length: ${result.streakLength})`;
    answersContainer.append(paragraph);
  }
  {
    const everyDaySongs = getSongsListenedToEveryDay(userId);
    if (everyDaySongs.length > 0) {
      const songNames = everyDaySongs.map(
        (song) => `${song.artist} - ${song.title}`
      );
      const paragraph = document.createElement("p");
      paragraph.textContent = `Songs listened to every day: ${songNames.join(
        ", "
      )}`;
      answersContainer.append(paragraph);
    }
  }
  {
    const topGenres = getTopGenres(userId);
    if (topGenres.length > 0) {
      const paragraph = document.createElement("p");

      let heading;

      if (topGenres.length === 3) {
        heading = "Top three genres";
      } else if (topGenres.length === 2) {
        heading = "Top two genres";
      } else {
        heading = "Top genre";
      }

      paragraph.textContent = `${heading}: ${topGenres.join(", ")}`;
      answersContainer.append(paragraph);
    }
  }
}

//User's most often listened to song (Count) (Q-1)
function getMostListenedSong(userId) {
  const events = getListenEvents(userId);
  const songCounts = {};
  for (const event of events) {
    const songId = event.song_id;
    if (songId in songCounts) {
      songCounts[songId]++;
    } else {
      songCounts[songId] = 1;
    }
  }
  let mostListenedSongId = null;
  let maxCount = 0;
  for (const songId in songCounts) {
    if (songCounts[songId] > maxCount) {
      mostListenedSongId = songId;
      maxCount = songCounts[songId];
    }
  }
  return getSong(mostListenedSongId);
}
//User's most often listened to song (Time) (Q-4)
function getMostListeningTimeSong(userId) {
  const events = getListenEvents(userId);
  const listeningTime = {};
  for (const event of events) {
    const song = getSong(event.song_id);
    const durationTime = song.duration_seconds;
    if (event.song_id in listeningTime) {
      listeningTime[event.song_id] += durationTime;
    } else {
      listeningTime[event.song_id] = durationTime;
    }
  }
  let mostListenedSongId = null;
  let maxTime = 0;
  for (const songId in listeningTime) {
    if (listeningTime[songId] > maxTime) {
      mostListenedSongId = songId;
      maxTime = listeningTime[songId];
    }
  }
  return getSong(mostListenedSongId);
}

//User's most often listened to artist (Count)(Q-2)
function getMostListenedArtist(userId) {
  const events = getListenEvents(userId);
  const artistCounts = {};
  for (const event of events) {
    const song = getSong(event.song_id);
    const songArtist = song.artist;
    if (songArtist in artistCounts) {
      artistCounts[songArtist]++;
    } else {
      artistCounts[songArtist] = 1;
    }
  }
  let mostListenedArtist = null;
  let maxCount = 0;
  for (const songArtist in artistCounts) {
    if (artistCounts[songArtist] > maxCount) {
      mostListenedArtist = songArtist;
      maxCount = artistCounts[songArtist];
    }
  }
  return mostListenedArtist;
}

//User's most often listened to artist (Time)(Q-4)
function getMostListeningTimeArtist(userId) {
  const events = getListenEvents(userId);
  const artistTimes = {};
  for (const event of events) {
    const song = getSong(event.song_id);
    const durationTime = song.duration_seconds;
    const songArtist = song.artist;
    if (songArtist in artistTimes) {
      artistTimes[songArtist] += durationTime;
    } else {
      artistTimes[songArtist] = durationTime;
    }
  }
  let mostListenedArtist = null;
  let maxTime = 0;
  for (const songArtist in artistTimes) {
    if (artistTimes[songArtist] > maxTime) {
      mostListenedArtist = songArtist;
      maxTime = artistTimes[songArtist];
    }
  }
  return mostListenedArtist;
}

//Users most often listened friday night song (Count)(Q-3)
function getFridayNightSong(userId) {
  const events = getListenEvents(userId);
  const songCounts = {};
  for (const event of events) {
    const date = new Date(event.timestamp);
    const day = date.getDay();
    if (
      (day === 5 && event.seconds_since_midnight >= 61200) ||
      (day === 6 && event.seconds_since_midnight < 14400)
    ) {
      const songId = event.song_id;
      if (songId in songCounts) {
        songCounts[songId]++;
      } else {
        songCounts[songId] = 1;
      }
    }
  }
  let mostListenedSongId = null;
  let maxCount = 0;
  for (const songId in songCounts) {
    if (songCounts[songId] > maxCount) {
      mostListenedSongId = songId;
      maxCount = songCounts[songId];
    }
  }
  if (mostListenedSongId === null) {
    return null;
  }
  return getSong(mostListenedSongId);
}

//Users most often listened friday night song (Time)(Q-4)
function getMostListenedSongOnFridayNightByTime(userId) {
  const events = getListenEvents(userId);
  const listeningTime = {};
  for (const event of events) {
    const date = new Date(event.timestamp);
    const day = date.getDay();
    if (
      (day === 5 && event.seconds_since_midnight >= 61200) ||
      (day === 6 && event.seconds_since_midnight < 14400)
    ) {
      const song = getSong(event.song_id);
      const durationTime = song.duration_seconds;
      if (event.song_id in listeningTime) {
        listeningTime[event.song_id] += durationTime;
      } else {
        listeningTime[event.song_id] = durationTime;
      }
    }
  }

  let mostListenedSongId = null;
  let maxTime = 0;
  for (const songId in listeningTime) {
    if (listeningTime[songId] > maxTime) {
      mostListenedSongId = songId;
      maxTime = listeningTime[songId];
    }
  }
  if (mostListenedSongId === null) {
    return null;
  }
  return getSong(mostListenedSongId);
}

//User's longest streak song (Q-5)
function getLongestStreakSong(userId) {
  const events = getListenEvents(userId);
  let currentSongId = null;
  let currentStreak = 0;
  let longestStreak = 0;
  let longestStreakSongIds = [];
  for (const event of events) {
    const songId = event.song_id;
    if (songId === currentSongId) {
      currentStreak++;
    } else {
      currentSongId = songId;
      currentStreak = 1;
    }

    //Keep track the longest streak
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      longestStreakSongIds = [currentSongId];
    }
    //If two songs have same length
    else if (currentStreak === longestStreak) {
      if (!longestStreakSongIds.includes(currentSongId)) {
        longestStreakSongIds.push(currentSongId);
      }
    }
  }
  return {
    songs: longestStreakSongIds.map((songId) => getSong(songId)),
    streakLength: longestStreak,
  };
}

// User's listened every day songs (Q-6)
function getSongsListenedToEveryDay(userId) {
  const events = getListenEvents(userId);
  return getSongsListenedToEveryDayFromEvents(events, getSong);
}

//User's listened top 3 genres (Q-7)
function getTopGenres(userId) {
  const events = getListenEvents(userId);
  return getTopGenresFromEvents(events, getSong);
}

//What happens when select a user
select.addEventListener("change", function () {
  displayAnswers(select.value);
});
