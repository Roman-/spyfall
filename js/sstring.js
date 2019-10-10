// generates game settings string from current layout
// settings string format:
// "names_lociPack_numRounds_locations_outcomes_key"

// in sstring, settings are devided using these
Glob.ssSectionsDelimeter = '_';
Glob.ssDelimeter = '.';
function makeSettingsString() {
    // generate random key
    let key = randomNumber(10000) + 10000;

    // names
    let namesArr = playersNamesFromUi();
    let names = namesArr.join(Glob.ssDelimeter);

    // locations pack
    let lociPack = $("select#lociPack").val();
    // number of rounds for the game
    let numRounds = $("input#numRounds").val();

    // locations
    let locations = [];
    for (let i = 0; i < numRounds; i++)
        locations.push(randomNumber(Glob.locations(lociPack).length));
    // locationsEncoded = numArrayEncode(locations, key);
    locationsEncoded = numArrayEncode(locations, key).join(Glob.ssDelimeter);

    // outcomes
    let numPlayers = $("#playerListTable tr").length;
    let outcomes = [];
    for (let i = 0; i < numRounds; i++)
        outcomes.push(randomNumber(numPlayers));
    //outcomesEncoded = numArrayEncode(outcomes, key);
    outcomesEncoded = numArrayEncode(outcomes, key).join(Glob.ssDelimeter);

    let setupString =
        names + Glob.ssSectionsDelimeter
        + lociPack + Glob.ssSectionsDelimeter
        + numRounds + Glob.ssSectionsDelimeter
        + locationsEncoded + Glob.ssSectionsDelimeter
        + outcomesEncoded + Glob.ssSectionsDelimeter
        + key;

    return setupString;
}

// makes URL for joining game.
function makeSettingsUrl() {
    if (Glob.setupString) {
        const host = window.location.href.split('?')[0];
        // const host = "https://bestsiteever.ru/spy/";
        // return host + "?setup=" + encodeURIComponent(Glob.setupString);
        return host + "?setup=" + Glob.setupString;
    } else {
        return "Error";
    }
}

// returns game setup object (see glob.js)
// setupUrlComponent - setup string as URL component
// Glob.setup is game setup object:
// {
//   [0] playerNames   : array[string]           // array of player names
//   [1] lociPack      : integer;                // location pack integer
//   [2] numRounds     : integer;                // number of rounds in the game
//   [3] locations     : array[integer]          // array of location indeces
//   [4] outcomes      : array[integer];         // array of game outcomes - indeces of players who is a spy
//   [5] key           : integer;                // decoding key
//       me            : integer;                // index of my player
//       round         : integer;                // current round (starting with 0)
//       score         : array[integer]          // current game players score
// }
function decodeSetup(setupUrlComponent) {
    let result = {};
    let sstring = decodeURIComponent(setupUrlComponent);
    let arr = sstring.split(Glob.ssSectionsDelimeter);
    const numberOfFields = 6; // in game setup array
    if (arr.length != numberOfFields)
        return yellError("cant decode game setup, len!=5" + sstring);
    // me - unknown (yet)
    result["me"] = null;
    result["round"] = null;
    // key
    let key = parseInt(arr[5]);
    result["key"] = key;

    // player name
    let playerNames = arr[0].split(Glob.ssDelimeter);
    if (playerNames.length < 3)
        return yellError("player length < 3");
    result["playerNames"] = playerNames;

    // loci pack
    let lociPack = parseInt(arr[1]);
    result["lociPack"] = lociPack;

    // loci pack
    let numRounds = parseInt(arr[2]);
    result["numRounds"] = numRounds;

    // locations
    let locations = encodedToNumArray(arr[3].split(Glob.ssDelimeter), key);
    if (locations.length != numRounds)
        return yellError("number of locations "+locations.length+" != " + numRounds);
    result["locations"] = locations;

    // outcomes
    let outcomes = encodedToNumArray(arr[4].split(Glob.ssDelimeter), key);
    if (outcomes.length != numRounds)
        return yellError("number of outcomes "+outcomes.length+" != " + numRounds);
    result["outcomes"] = outcomes;

    return result;
}
