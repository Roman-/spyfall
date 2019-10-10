// reset Global variables to null, indicating there's no game at the moment
function resetGame() {
    Glob.setup = null;
    Glob.setupString = null;
}

// "start first round" clicked
function onStartFirstRound() {
    if (!Glob.setup || Glob.setup.me === null) {
        console.warn("player not selected", Glob.setup);
        return;
    }

    // set round to 0
    Glob.setup.round = 0;
    Glob.setup.score = Array.apply(null, Array(Glob.setup.playerNames.length))
                            .map(Number.prototype.valueOf, 0); // array of player scores: [0,0,0,0,...]
    loRound(true);
}

// increment round number and start new round
function startNextRound() {
    Glob.setup.round++;
    if (Glob.setup.round >= Glob.setup.numRounds)
        loGameEnd();
    else
        loRound(true);
}

// start new game (in newGame lo)
function hostNewGame() {
    replaceEmptyNames();
    savePlayerNames();

    if ($("input.playerNameInput").length < 3) {
        alert(tr('There should be at least 3 players'));
        return;
    }
    $("button#showQrBtn").html(tr('Making QR code...'));
    // save player names locally
    setTimeout(function () {
        Glob.setupString = makeSettingsString();
        loQrCode();
    }, 10)
}

// game setup received from URL GET param
function onGameSetupReceived(sstring) {
    Glob.setup = decodeSetup(sstring);
    if (!Glob.setup) {
        console.warn("couldn\'t decode game setup", sstring);
        loMain();
    }

    // set interface language to game loci language
    Glob.currentLocale = Glob.lociPacks[Glob.setup.lociPack].lang;
    saveLocal('Glob.currentLocale', Glob.currentLocale);
    console.log("onGameSetupReceived: ", sstring);

    loWhoAreYou();
}
