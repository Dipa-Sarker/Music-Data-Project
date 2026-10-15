//User's listened every day songs (Q-6)

export function getSongsListenedToEveryDayFromEvents(events, getSong) {
  const listeningDays = new Set();

  for (const event of events) {
    const date = event.timestamp.slice(0, 10);
    listeningDays.add(date);
  }

  const songDays = {};

  for (const event of events) {
    const songId = event.song_id;
    const date = event.timestamp.slice(0, 10);

    if (!songDays[songId]) {
      songDays[songId] = new Set();
    }

    songDays[songId].add(date);
  }

  const everyDaySongIds = [];

  for (const songId in songDays) {
    if (songDays[songId].size === listeningDays.size) {
      everyDaySongIds.push(songId);
    }
  }

  return everyDaySongIds.map((songId) => getSong(songId));
}

//User's listened top 3 genres (Q-7)

export function getTopGenresFromEvents(events, getSong) {
  const genreCounts = {};

  for (const event of events) {
    const song = getSong(event.song_id);
    const genre = song.genre;

    if (!genreCounts[genre]) {
      genreCounts[genre] = 0;
    }

    genreCounts[genre]++;
  }
  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  const topGenres = sortedGenres.slice(0, 3);
  return topGenres.map((genre) => genre[0]);
}
