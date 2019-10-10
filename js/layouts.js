// layout: #mainLayout is always there

// initial mainmenu layout
function loMain() {
    resetGame();

    // elements
    let helloDiv = $('<div><h1>'+tr('Spyfall')+'</h1><div class="card-body">'+tr('Spyfall_welcome_txt')+'</div></div>');
    let btn = $('<button class="btn btn-primary form-control padded">'+tr('Host new game')+'</button>')
        .click(function () {loNewGame()});

    let gameRulesDiv = $("<div class='card-body'></div>").append(tr("game_rules")).appendTo($("<div class='card'></div>"));
    $("#mainLayout").empty().append(helloDiv, btn, gameRulesDiv, btn.clone(true));
}

// show new game layout
function loNewGame() {
    let loNewGame = $("<div></div>");

    // players
    loNewGame.append(makePlayersList());
    loNewGame.append(additionalSettingsDiv());
    loNewGame.append(startGameButton());

    $("#mainLayout").empty().append(loNewGame);
    fixTableColors();
}

// layout with QR code and message "let everyone scan this QR code"
function loQrCode() {
    // apply setups that has just been created
    Glob.setup = decodeSetup(Glob.setupString);
    Glob.setup.me = 0; // I am the host

    // making layout
    let setupUrl = makeSettingsUrl();

    let preTextDiv = $("<div id='preText'>"+tr("Let all players scan this QR code:")+"</div>");
    let qrCodeDiv = $("<div id='qrcode'></div>");
    let urlAltSubText = $("<div>"+tr("Or send them this link:")+"</div>");
    let urlAlternative = gameUrlDiv(setupUrl);
    let divBeforeButton = $("<div>"+tr("When everyone entered the game and selected their names, you can start the game. Good luck!")+"</div>");
    let nextButton = $("<button class='btn btn-success form-control padded'>"+tr("Start round 1")+"</button>")
        .click(onStartFirstRound);
    $("#mainLayout").empty().append(qrLayHeader(), preTextDiv, qrCodeDiv, urlAltSubText, urlAlternative, divBeforeButton, nextButton);

    let qrCodeSize = Math.round(Math.min($('#mainLayout').width() * 0.95, $(window).height() * 0.85));

    // draw QR code
    let qrcode = new QRCode(qrCodeDiv[0], {
        width : qrCodeSize,
        height : qrCodeSize
    });

    try {
        qrcode.makeCode(setupUrl);
    } catch(e) {
        qrCodeDiv.html(tr("Can't generate QR code _reason_")).addClass('alert alert-danger');
        preTextDiv.empty();
        urlAltSubText.empty();
        console.log("caught: ", e);
    }
}

function loWhoAreYou() {
    let preTextDiv = $("<h1>"+tr("Who are you?")+"</h1>");
    // make players list there
    let playersList = playersListSelect();

    let startAsBtn = $("<button id='startAsBtn' class='btn btn-outline-primary form-control padded'></button>")
        .html(tr("Pick player above"))
        .click(onStartFirstRound);
    $("#mainLayout").empty().append(preTextDiv, playersList, "<hr>", startAsBtn, lociListDiv());
}

// gameplay round layout
// roundNumber - current round number
// animate: if true, animate layout changing so that user understands it's a new round and something has changed
function loRound(animate = false) {
    $("#mainLayout").empty();

    if (animate) {
        const animationTime = 200;

        setTimeout(function () {
            $("#mainLayout").append(roundHeader());
        }, animationTime * 1);
        setTimeout(function () {
            $("#mainLayout").append(revealLociDiv());
            $("#revealLoci").trigger('click');
        }, animationTime * 2);
        setTimeout(function () {
            $("#mainLayout").append(lociListDiv(), nextRoundButton());
        }, animationTime * 3);

        setTimeout(function () {
            $("#revealLoci").trigger('click').focus();
        }, Glob.timeToHideLociPreview);
    } else {
        $("#mainLayout").append(
            roundHeader(),
            revealLociDiv(),
            lociListDiv(),
            nextRoundButton()
        );
    }
}

// layout with game end (statistics)
function loGameEnd() {
    let divBegin = $("<div></div>").append($("<h1>"+tr("Game over")+"</h1>"));
    // make players list there
    let iAmHost = (Glob.setup.me === 0);
    if (iAmHost)
        divBegin.append(winnersTable());
    let statsDiv = $("<div></div>").append("<h2>"+tr("Some statistics")+"</h2>");
    for (let i = 0; i < Glob.setup.numRounds; i++) {
        let spyIndex = Glob.setup.outcomes[i];
        let spyName = Glob.setup.playerNames[spyIndex];
        let loci = Glob.locations(Glob.setup.lociPack)[Glob.setup.locations[i]];

        let roundDiv = $("<h3>"+tr("Round") + " " + (i+1)+"</h3>");
        let spyDiv = $("<div>"+ tr("Spy") + ": " + spyName + " " +  emojiSpanByIndex(spyIndex).html() + "</div>");
        let lociDiv = $("<div>"+ tr("Location") + ": " + loci + " " + "</div>");

        let card = $("<div class='card'></div>").append(roundDiv, spyDiv, lociDiv);
        statsDiv.append(card);
    }
    let mainMenuBtn = $("<button class='btn btn-primary form-control padded'>"+tr("Main menu")+"</button>")
        .click(loMain);
    $("#mainLayout").empty().append(divBegin, statsDiv, mainMenuBtn);

    resetGame();
}
