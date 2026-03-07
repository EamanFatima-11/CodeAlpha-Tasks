const playlist = [
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: "6:13"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "5:45"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "Levitating",
    artist: "Dua Lipa",
    duration: "7:20"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    title: "Memories",
    artist: "Maroon 5",
    duration: "4:10"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    duration: "3:02"
  }
];

/* DOM Elements */
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const songList = document.getElementById("song-list");
const themeToggle = document.getElementById("theme-toggle");

let songIndex = 0;

/* Load Song */
function loadSong(index) {
  const song = playlist[index];

  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  durationEl.textContent = song.duration;

  document.querySelectorAll("#song-list li").forEach(li => li.classList.remove("active"));
  const activeItem = document.querySelector(`#song-list li[data-index="${index}"]`);
  if (activeItem) activeItem.classList.add("active");
}

/* Play Song */
function playSong() {
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

/* Pause Song */
function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

/* Play/Pause Toggle */
playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});

/* Previous Song */
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + playlist.length) % playlist.length;
  loadSong(songIndex);
  playSong();
});

/* Next Song */
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % playlist.length;
  loadSong(songIndex);
  playSong();
});

/* Progress Update */
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

/* Loaded Metadata */
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

/* Seek Progress */
progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

/* Volume Control */
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

/* Auto Next */
audio.addEventListener("ended", () => {
  nextBtn.click();
});

/* Load Playlist */
function loadPlaylist() {
  songList.innerHTML = ""; // prevent duplicates

  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist} (${song.duration})`;
    li.dataset.index = index;

    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songIndex);
      playSong();
    });

    songList.appendChild(li);
  });
}

/* Dark/Light Mode */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  themeToggle.innerHTML = document.body.classList.contains("light-mode")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

/* Time Formatter */
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

/* Initialize */
loadPlaylist();
loadSong(songIndex);
