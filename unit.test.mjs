import assert from "node:assert";
import test from "node:test";
import {
  getSongsListenedToEveryDayFromEvents,
  getTopGenresFromEvents,
} from "./helpers.mjs";

// Sample songs used by both tests
const songs = {
  "song-a": { id: "song-a", genre: "Pop" },
  "song-b": { id: "song-b", genre: "Folk" },
  "song-c": { id: "song-c", genre: "Punk" },
  "song-d": { id: "song-d", genre: "Jazz" },
};

// Return song details when given a song ID
function getTestSong(songId) {
  return songs[songId];
}

// Q-6: Test that only songs heard on every listening day are returned
test("Only songs heard on every listening day are returned", () => {
  const events = [
    { song_id: "song-a", timestamp: "2024-08-01T10:00:00" },
    { song_id: "song-a", timestamp: "2024-08-01T11:00:00" },
    { song_id: "song-b", timestamp: "2024-08-01T12:00:00" },
    { song_id: "song-c", timestamp: "2024-08-01T13:00:00" },

    { song_id: "song-a", timestamp: "2024-08-02T10:00:00" },
    { song_id: "song-b", timestamp: "2024-08-02T11:00:00" },

    { song_id: "song-a", timestamp: "2024-08-03T10:00:00" },
    { song_id: "song-b", timestamp: "2024-08-03T11:00:00" },
  ];

  const result = getSongsListenedToEveryDayFromEvents(events, getTestSong);

  assert.deepEqual(
    result.map((song) => song.id),
    ["song-a", "song-b"]
  );
});

// Q-7: Test that genres are ranked by listening-event count
test("Top three genres are ranked by listening-event count", () => {
  const events = [
    { song_id: "song-a" },
    { song_id: "song-a" },
    { song_id: "song-a" },
    { song_id: "song-b" },
    { song_id: "song-b" },
    { song_id: "song-c" },
    { song_id: "song-d" },
  ];

  const result = getTopGenresFromEvents(events, getTestSong);

  assert.deepEqual(result, ["Pop", "Folk", "Punk"]);
});
