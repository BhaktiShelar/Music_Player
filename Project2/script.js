let audio = document.getElementById("audio");
let songTitle = document.getElementById("song-title");
let artist = document.getElementById("artist");
let albumImage = document.getElementById("album-image");
let playButton = document.getElementById("play");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let addToPlaylistButton = document.getElementById("add-to-playlist");
let openPlaylistButton = document.getElementById("open-playlist");
let userPlaylist = document.getElementById("user-playlist");

let currentSongIndex = 0;
let userSongs = JSON.parse(localStorage.getItem("userPlaylist")) || []; // Load from localStorage

let songs = [
    { title: "Tenu Sang Rakhna", artist: "Achint, Arijit Singh", src: "music/song1.mp3", img: "song1.jpg" },
    { title: "I Am In Love", artist: "Pritam, KK", src: "music/song2.mp3", img: "song2.jpg" },
    { title: "Shayarana", artist: "Sajid-Wajid, Shalmali Kholgade", src: "music/song3.mp3", img: "song3.jpg" },
    { title: "Assi Sajna", artist: "Jasleen Royal, Aditya Sharma, Intense", src: "music/song4.mp3", img: "song4.jpg" },
    { title: "Abhi Kuch Dino Se", artist: "Pritam, Mohit Chauhan", src: "music/song5.mp3", img: "song5.jpg" },
    { title: "Tum Se Hi", artist: "Pritam, Mohit Chauhan", src: "music/song6.mp3", img: "song6.jpg" }
];

function loadSong(index) {
    let song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    albumImage.src = `photo/${song.img}`;
    audio.load();
}

// Play/Pause Functionality
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "⏸";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
});

// Next/Previous Song
nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playButton.textContent = "⏸";
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playButton.textContent = "⏸";
});

// Add to Playlist
addToPlaylistButton.addEventListener("click", () => {
    let selectedSong = songs[currentSongIndex];

    if (!userSongs.some(song => song.title === selectedSong.title)) {
        userSongs.push(selectedSong);
        localStorage.setItem("userPlaylist", JSON.stringify(userSongs)); // Store in localStorage
        updatePlaylistUI();
    }
});

// Update Playlist UI
function updatePlaylistUI() {
    userPlaylist.innerHTML = ""; // Clear the list
    userSongs.forEach(song => {
        let li = document.createElement("li");
        li.textContent = song.title;

        // Play song when clicked from playlist
        li.addEventListener("click", () => {
            currentSongIndex = songs.findIndex(s => s.title === song.title);
            loadSong(currentSongIndex);
            audio.play();
            playButton.textContent = "⏸";
        });

        userPlaylist.appendChild(li);
    });
}

// Toggle Playlist Visibility
openPlaylistButton.addEventListener("click", () => {
    userPlaylist.style.display = (userPlaylist.style.display === "none" || userPlaylist.style.display === "") ? "block" : "none";
});

// Load Playlist from LocalStorage on Page Load
window.onload = () => {
    updatePlaylistUI();
};

// Load First Song
loadSong(currentSongIndex);
