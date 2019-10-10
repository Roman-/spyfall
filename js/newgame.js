// returns string with default player name
function defaultPlayerNameByIndex(index) {
    if (index < Glob.playerNames.length)
        return Glob.playerNames[index];
    return tr("Player") + index;
}

// returns player name that is not on the screen board yet
function randomPlayerName() {
    let namesSet = new Set(Glob.playerNames.slice(1)); // set of names without first "Host"
    $("input.playerNameInput").each(function () {
        let existingName = $(this).val();
        namesSet.delete(existingName);
    });
    return (namesSet.size === 0) ? "Player-X" : namesSet.values().next().value;
}

// returns player object {index: int, name: string}
function makePlayerObject(iconNum, name = "") {
    if (name == "")
        name = defaultPlayerNameByIndex(iconNum);
    return {index: iconNum, name: name};
}

// deletes row from player table
function deletePlayerRow(id) {
    let row = $("#playerRow" + id);
    if (row.length)
        row.remove();
    fixTableColors();
}

// assigns colors to playerIconInput icons
function fixTableColors() {
    // return; // temp
    let index = 0;
    $("#playerListTable tr").each(function (index, element) {
        $(element).find('td.emojiContainer').html(emojiSpanByIndex(index));
        index++;
    });
}

// changes \param input value so that it doesn't have special chars
function filterInputName(input) {
    const forbiddenChars = "";
    let val = input.val().replace(/[,;|&?]/g,'');
    input.val(val);
}

// returns html instance (string) of emoji by player index.
// example return value: '&#128516;'
function emojiByIndex(index) {
    index %= Glob.playerEmojiCodes.length;
    return "&#" + Glob.playerEmojiCodes[index] + ";";
}

// returns color (string) by player index.
// example return value: 'red'
function playerColorByIndex(index) {
    index %= Glob.playerColors.length;
    return Glob.playerColors[index];
}

// returns span with player emoji (jquery object) by player index.
function emojiSpanByIndex(index) {
    return $('<span class="emojiHolder"></span>')
        .html(emojiByIndex(index))
        .css('background-color', playerColorByIndex(index));
}

// reutrns jquery object for Round Header: player's emoji, name, round number
function roundHeader() {
    let index = Glob.setup.me;
    let roundToDisplay = Glob.setup.round + 1;
    let myNameDiv = $("<div id='yourName'></div>").append(emojiByIndex(index), " ", Glob.setup.playerNames[index]);
    let currentRoundDiv = $("<div class='currentRound'></div>").html(tr("Round")+" <b>" + roundToDisplay + "</b>");
    let r = $('<div class="roundHeader"></div>').css('background-color', playerColorByIndex(index))
        .append(currentRoundDiv, myNameDiv);

    return r;
}

// reutrns jquery object for QR Code page Header
function qrLayHeader() {
    let index = Glob.setup.me;
    let myNameDiv = $("<div id='yourName'></div>").append(emojiByIndex(index), " ", Glob.setup.playerNames[index]);
    let currentRoundDiv = $("<div class='currentRound'></div>").html(tr("Get ready!"));
    let r = $('<div class="roundHeader"></div>').css('background-color', playerColorByIndex(index))
        .append(currentRoundDiv, myNameDiv);

    return r;
}

// returns jquery element of single player TR for table
// player - player object
function makePlayerTr(player) {
    let index = player.index;
    let disabled = (index == 0) ? "disabled" : "";
    let ifMe = (index == 0) ? " ("+tr("you")+")" : "";

    let nameInput = $("<input class='playerNameInput form-control' type='text' size='7' maxlength='10' value='"+player.name+"'/>")
        .click(function () {$(this).select()})
        .on('input', function () {filterInputName($(this))});
    let deleteBtn = ifMe
        ? $("<button class='btn btn-outline-secondary' disabled>&nbsp;("+tr("you")+")&nbsp;</button>")
        : $("<button class='btn btn-outline-danger' onclick='deletePlayerRow("+index+")' "+disabled+">"+tr("delete")+"</button>");
    // tds
    let td0 = $("<td class='emojiContainer'></td>").append(emojiSpanByIndex(index));
    let td1 = $("<td></td>").append(nameInput);
    let td2 = $("<td></td>").append(deleteBtn);

    let row = $("<tr class='playerRow' id='playerRow"+index+"'> </tr>").append(td0, td1, td2);

    return row;
}

// appends new player to the layout
function addPlayer() {
    let numPlayers = $("#playerListTable tr").length;
    let player = makePlayerObject(numPlayers, randomPlayerName());
    $("#playerListTable").append(makePlayerTr(player));
    fixTableColors();
    if (numPlayers >= Glob.maxPlayers)
        $("button#addNewPlayerBtn").hide();
    else
        $("button#addNewPlayerBtn").show();
}

// returns jquery element for table with players list
function makePlayersList() {
    let loPlayers = $("<div></div>");
    loPlayers.append($("<div id='playersHeader'><h2>"+tr("Who's gonna play?")+"</h2></div>"));
    let table = $("<table class='table' id='playerListTable'></table>");
    const initialPlayersNumber = 3;

    addNewBtn = $("<button class='btn btn-primary padded' id='addNewPlayerBtn'>+ "+tr("add player")+"</button>").click(addPlayer);

    loPlayers.append(table);
    loPlayers.append(addNewBtn);

    for (let i = 0; i < initialPlayersNumber; i++) {
        let player = makePlayerObject(i);
        table.append(makePlayerTr(player));
    }

    return loPlayers;
}

// returns "start game" button in "new game" layout
function startGameButton() {
    return $("<button class='btn btn-success form-control padded' id='showQrBtn'>"+tr("Let's go!")+"</button>").click(hostNewGame);
}

// returns jquery div (and its 'expand' button) with additional game settings
function additionalSettingsDiv() {
    let collapseBtn = $("<button class='btn btn-secondary form-control' data-toggle='collapse' data-target='#additionalSettings'></button>").html(tr('More settings'));
    let numRoundsDiv = $("<div class='form-group row'></div>").append(
        $("<label class='col-6 col-form-label' for='numRounds'></label>").html(tr('Number of rounds')),
        $("<input class='col-6 form-control' id='numRounds' type='number' min='3' max='15' />").val(5)
    );

    let lociSelect = $("<select class='form-control col-6' id='lociPack'></select>");
    $.each(Glob.lociPacks, function (index, lp) {
        lociSelect.append($("<option></option>").val(index).attr('title', lp.description).html(lp.name)  );
        // set LociSelectDiv to the first one corresponding to current locale language
        if (lp.lang == Glob.currentLocale)
            lociSelect.val(index);
    });

    let LociSelectDiv = $("<div class='form-group row'></div>").append(
        $("<label class='col-6 col-form-label' for='lociPack'></label>").html(tr('Locations pack')),
        lociSelect
    );

    return $("<div></div>").append(collapseBtn,
              $("<div class='collapse' id='additionalSettings'></div>")
                .append( $("<div class='card card-body'></div>").append(numRoundsDiv, LociSelectDiv) ));
}

// if there are empty name inputs, fill them with random names
function replaceEmptyNames() {
    $("input.playerNameInput").each(function () {
        if ($(this).val().trim() == "")
            $(this).val(randomPlayerName());
    });
}

// returns alternative url under QR code with URL and 'copy' button
function gameUrlDiv(setupUrl) {
    let groupDiv = $('<div class="input-group"></div>');
    let input = $('<input type="text" class="form-control" value="'+setupUrl+'" id="genedUrl"></input>')
        .click(function () {$(this).select();});
    let btn = $('<button class="btn btn-outline-secondary" type="button">'+tr('copy')+'</button>')
       .click(function () {
            // on 'copy' button click
            $("input#genedUrl").focus().select();
            if (document.execCommand('copy'))
                $(this).html(tr("copied!"))
        });
    let appendDiv = $('<div class="input-group-append"> </div>').append(btn);

    return groupDiv.append(input, appendDiv);
}

// reutrns jquery object for selection
// players list select on WHO ARE YOU layout
function playersListSelect() {
    let selectDiv = $("<div></div>");

    if (!Glob.setup)
        return selectDiv.append("<div class='alert alert-danger'>"+tr("Game setup corrupted")+"</div>");

    // get settings from Glob.setup.playerNames
    // start from 1 because Glob.setup.playerNames[0] is HOST, can't be selected by other players
    for (let index = 1; index < Glob.setup.playerNames.length; index++) {
        let color = Glob.playerColors[index];
        let name = Glob.setup.playerNames[index];
        btn = $("<button class='btn btn-primary form-control padded'></button>")
            .append(emojiByIndex(index), ("&nbsp;"+name))
            .css('background-color', color)
            .css('font-size', '2em')
            .click(function () {whoAmISelected(index)});
        selectDiv.append(btn);
    }
    return selectDiv;
}

// returns jquery element with "reveal your location" button
function revealLociDiv() {
    let result = $('<div></div>');
    let btn = $('<a id="revealLoci" class="btn btn-primary padded form-control" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">'+tr("Show current location")+'</a>');
    let lociDiv = $('<div class="collapse" id="collapseExample"></div>').append(myCardReveal());
    return result.append(btn, lociDiv);
}

// returns jquery object with my role in this round
// depending on current round, locations pack, location
function myCardReveal() {
    // am I the spy?
    let whosSpy = Glob.setup.outcomes[Glob.setup.round];
    let spyName = Glob.setup.playerNames[whosSpy];
    let lociIndex = Glob.setup.locations[Glob.setup.round];
    let lociName = Glob.locations(Glob.setup.lociPack)[lociIndex];
    let amIspy = (whosSpy == Glob.setup.me);
    let myName = Glob.setup.playerNames[Glob.setup.me];
    let roundToDisplay = Glob.setup.round + 1;
    let className = amIspy ? "border border-danger" : "border border-success";
    console.log("In round #" + roundToDisplay + ", spy is player " + whosSpy + "(" + spyName + ") and location is " + lociName);
    let insideDiv = amIspy
        ? tr("YOU ARE THE <b>SPY</b> IN THIS ROUND!")
        : lociName;
    return $("<div id='locationCard'></div>").html(insideDiv).addClass(className);
}

// adding score to current game score tracker
// param winningSide: 's' for spy, 'c' for civillians
function addScore(winningSide) {
    let civilianScore = (winningSide == 'c') ? 1 : 0;
    let spyScore = (winningSide == 's') ? 2 : 0;

    let spyIndex = Glob.setup.outcomes[Glob.setup.round];
    // console.log("addScore: round " + Glob.setup.round + ", spy wa player #", spyIndex);
    for (let i = 0; i < Glob.setup.playerNames.length; i++) {
        let playerIsSpy = (i === spyIndex);
        Glob.setup.score[i] += playerIsSpy ? spyScore : civilianScore;
        let playerName = Glob.setup.playerNames[i];
    }
}

// shows modal dialog "who won?"
function showWhoWonModal() {
    let modal =
    $("<div class='modal fade' role='dialo'></div>").append(
        $("<div class='modal-dialog' role='document' ></div>").append(
            $("<div class='modal-content' role='document'></div>").append(
                $("<div class='modal-header'></div>").append(
                    '<h5 class="modal-title">'+tr("Who won this round?")+'</h5> <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>'
                ),
                $("<div class='modal-body'></div>").append(
                    $("<button class='btn btn-outline-success padded form-control' data-dismiss='modal'>"+tr("The civillians")+"</button>")
                        .click(function () {addScore('c'); startNextRound()}),
                    $("<button class='btn btn-outline-danger padded form-control' data-dismiss='modal'>"+tr("Spy")+"</button>")
                        .click(function () {addScore('s'); startNextRound()}),
                )
            )
        )
    );
    modal.modal();
}

// in-game button for starting next round
function nextRoundButton() {
    let iAmHost = (Glob.setup.me === 0);
    let currentRound = Glob.setup.round;
    let isLastRound = (currentRound+1 == Glob.setup.numRounds);
    let buttonText = isLastRound
        ? tr("Finish game")
        : (tr("Finish round ") + (currentRound+1));
    return $("<button class='btn btn-primary form-control'></button>")
        .html(buttonText)
        .click(function () {
            let questionMsg = isLastRound
                ? tr('Finish the game?')
                : tr('Start round ') + (currentRound+1+1) + "?";

            if (iAmHost) {
                // ask who won
                showWhoWonModal();
                $("button#closeModal").focus();
            } else {
                // general procedure: start next round
                if (confirm(questionMsg))
                    startNextRound();
            }
        });
}

function lociListDiv() {
    let html = "";

    for (let i = 0; i < Glob.locations(Glob.setup.lociPack).length; ++i)
        html += "<span class='lociInList'>" + Glob.locations(Glob.setup.lociPack)[i] + "</span> ";
    let h = ($(window).height() * 0.7) + 'px';
    let box = $("<div class='border' id='gameLociList'></div>").html(html);
    let div = $('<div></div>').append(tr("All possible game locations:")).append(box);
    return div;
}

// returns array of player names that user has inputted on newGame layout
// if can't extract from UI, returns empty array
function playersNamesFromUi() {
    // names
    if ($("#playerListTable tr").length == 0)
        return [];

    let namesArr = [];
    $("#playerListTable tr").each(function (index, element) {
        // in TR, find TD with .playerNameInput class.
        let input = $(element).find('.playerNameInput');
        if (input.length == 0)
            return [];
        namesArr.push(input.val());
    });
    return namesArr;
}

// on player button clicked
function whoAmISelected(index) {
    // add 'me' to Global
    Glob.setup.me = index;
    let name = Glob.setup.playerNames[index];
    $("button#startAsBtn").html(tr('Start round 1 as ') + name + ' ' + emojiByIndex(index)).focus();
}

// returns jqery object with winners
function winnersTable() {
    let div = $("<div class='alert alert-success'></div>");
    div.append("<h2>" + tr('Winners') + "</h2><hr>");

    // winners array element: {score: int, name: string, avatar: $()}
    let winnersArray = [];
    for (let i = 0; i < Glob.setup.playerNames.length; i++) {
        winnersArray.push({
            'score': Glob.setup.score[i],
            'name': Glob.setup.playerNames[i]
        });
    }
    winnersArray.sort(function (a,b) {return b.score - a.score;});

    for (let i = 0; i < winnersArray.length; i++) {
        let score = winnersArray[i].score;
        let name = winnersArray[i].name;
        let row = $("<div class='h2'></div>").html("<b>" + score + "</b> " + name);
        div.append(row);
    }

    return div;
}
