// global variables
var Glob = function () {}

// list of player object: {index: int, name: string}
Glob.players = [];

Glob.playerNames = [
    "Host", // [0] is always host player
    "Jazz", "Emma", "Noah", "Liam", "Olivia", "Ava", "Sophia", "Isabella", "William", "Mason", "James"];
Glob.maxPlayers = 15; // maximum number of players in the game

// player colors and icons only depend on their indeces
// colors: dark bg colors for white text
Glob.playerColors = ['#1d2f4f', '#364f1d', '#471a1a', '#1a4741', '#471a45', '#535407', '#4f2b1d', '#47361a'];
// html codes of emoji used for player avatars
Glob.playerEmojiCodes = [128516, 128522, 128523, 128526, 128527, 128541, 128579, 128515, 128518, 128580, 128566, 128521];

// encoded game setup in setupstring
Glob.setupString = null;

// Glob.setup is game setup object:
// see sstring.js
Glob.setup = null;

// misc
Glob.timeToHideLociPreview = 1800; // ms before hiding location preview in game
Glob.nightMode = false;
