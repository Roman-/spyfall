$(document).ready(function() {
    // error handler: if it happens, let him see it
    window.onerror = function(errorMessage, errorUrl, errorLine) {
        let preInfo = "An error occured. If you see this message, please contact the developer at fpmk2@ya.ru, send the screenshot and describe what actions lead to this error.";
        let contents = "Info: " + errorMessage + ", " + errorLine+ ", " + errorUrl;
        alert(preInfo + "\n" + contents);
    }

    loadSettings();

    // have settings string in URL?
    let gameSetup = jQuery.query.get("setup"); // game setup from _GET var URL
    if (gameSetup) {
        try {
            // remove game setup from URL
            window.history.replaceState("", "", "index.html");
        } catch (err) {
            console.warn('can not clear URL');
        }
        onGameSetupReceived(gameSetup);
    } else {
        // opened fresh URL
        loMain();
        $("#newGameBtn").trigger('click');
    }

    applyDayNightMode();
    initMenu();
});

// updates Glob variables from localstorage
function loadSettings() {
    let loadedNames = loadLocal('Glob.playerNames', null);
    if (loadedNames) {
        try {
            Glob.playerNames = JSON.parse(loadedNames);
            // console.log("loaded player names from local: ", Glob.playerNames);
        } catch(e) {
            console.warn("couldn\'t load player names from local: ", e);
        }
    }

    Glob.currentLocale = loadLocal('Glob.currentLocale', Glob.currentLocale);
    Glob.nightMode = (loadLocal('Glob.nightMode', false) === 'true');
}

// save player names to local storage
function savePlayerNames() {
    let namesArr = playersNamesFromUi();
    let index = 0;
    namesArr.forEach(function (name) {
        Glob.playerNames[index] = name;
        index++;
    });
    saveLocal('Glob.playerNames', Glob.playerNames);
}

// place translated text in menu
function initMenu() {
    $("#navbarNav").find("li.nav-item a.nav-link").attr('data-toggle', 'collapse').attr("data-target", "#navbarNav");

    $("#menuNightmode").html(tr("Night mode")).click(toggleNightMode);
    $("#menuNewGame").html(tr("New game")).click(function () {
        if ((Glob.setup === null) || confirm(tr("Start over again?")))
            loNewGame();
    });
    $("#menuHowToPlay").html(tr("How to play?")).click(function () {
        if ((Glob.setup === null) || confirm(tr("Leave this game?")))
            loMain();
    });

    $("#langru").html("русская версия").click(function () {
        if ((Glob.setup === null) || confirm(tr("Leave this game?")))
            Glob.currentLocale = 'ru';
            toggleLanguage('ru');
    });

    $("#langen").html("English version").click(function () {
        if ((Glob.setup === null) || confirm(tr("Leave this game?")))
            Glob.currentLocale = 'en';
            toggleLanguage('en');
    });

    $("#langnl").html("Nederlandse versie").click(function () {
        if ((Glob.setup === null) || confirm(tr("Leave this game?")))
            Glob.currentLocale = 'nl';
            toggleLanguage('nl');
    });
    
}

// switching Glob.nightMode value to opposite and re-draws interface
function toggleNightMode() {
    Glob.nightMode = !Glob.nightMode;
    saveLocal("Glob.nightMode", Glob.nightMode);
    applyDayNightMode();
}

function toggleLanguage(language) {
    Glob.currentLocale = language;
    if (saveLocal('Glob.currentLocale', Glob.currentLocale))
        location.reload();
    else
        alert("Cant change language")
}


// depending on Glob.nightMode, makes interface dark or light
function applyDayNightMode() {
    if (Glob.nightMode)
        DarkReader.enable();
    else
        DarkReader.disable();
}
