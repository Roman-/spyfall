Glob.currentLocale = 'en';

// map with translations
Glob.localeMap = {
    "Spyfall": {
        "ru": "Находка для шпиона",
    },
    "Spyfall_welcome_txt": {
        "en": "This is a mobile version of the famous Spyfall board game.",
        "ru": "Перед Вами мобильная версия известной игры \"Находка для шпиона\".",
    },
    "Host new game": {
        "ru": "Создать новую игру",
    },
    "Let's go!": {
        "ru": "Поехали!",
    },
    "Let all players scan this QR code:": {
        "ru": "Дайте всем игрокам сканировать этот QR-код:",
    },
    "Or send them this link:": {
        "ru": "Или поделитесь этой ссылкой на игру:",
    },
    "Start round 1": {
        "ru": "Начать первый раунд",
    },
    "Who are you?": {
        "ru": "Кто Вы?",
    },
    "Click on your name and get ready.": {
        "ru": "Нажмите на своё имя и приготовьтесь.",
    },
    "Pick player above": {
        "ru": "Выберите игрока",
    },
    "Some statistics": {
        "ru": "Немного статистики",
    },
    "Game over": {
        "ru": "Конец игры",
    },
    "Main menu": {
        "ru": "Главное меню",
    },
    "Player": {
        "ru": "Игрок",
    },
    "Get ready!": {
        "ru": "Приготовились!",
    },
    "you": {
        "ru": "Вы",
    },
    "delete": {
        "ru": "удалить",
    },
    "Who's gonna play?": {
        "ru": "Кто будет играть?",
    },
    "add player": {
        "ru": "добавить игрока",
    },
    "copy": {
        "ru": "копировать",
    },
    "copied!": {
        "ru": "скопировано!",
    },
    "Game setup corrupted": {
        "ru": "Невозможно считать параметры игры",
    },
    "Show current location": {
        "ru": "Показать текущую локацию",
    },
    "In round #": {
        "ru": "В раунде №",
    },
    "YOU ARE THE <b>SPY</b> IN THIS ROUND!": {
        "ru": "ВЫ - <b>ШПИОН</b> В ЭТОМ РАУНДЕ!",
    },
    "Finish game": {
        "ru": "Закончить игру",
    },
    "Finish round ": {
        "ru": "Закончить раунд ",
    },
    "Finish the game?": {
        "ru": "Закончить игру?",
    },
    "Start round ": {
        "ru": "Начать раунд ",
    },
    "All possible game locations:": {
        "ru": "Все возможные локации игры:",
    },
    "Start round 1 as ": {
        "ru": "Начать первый раунд за ",
    },
    "When everyone entered the game and selected their names, you can start the game. Good luck!": {
        "ru": "Когда все зашли в игру и выбрали свои имена, Вы можете начинать. Удачи!",
    },
    "Round": {
        "ru": "Раунд",
    },
    "Making QR code...": {
        "ru": "Создаю QR-код...",
    },
    "Can't generate QR code _reason_": {
        "ru": "Невозможно сгенерировать QR-код. Пожалуйста, вернитесь назад и впишите имена игроков латинницей, либо используйте эту ссылку, чтобы поделиться игрой:",
        "en": "Can't generate QR code. Please go back and write player names with Latin letters only, or use the URL below to share:",
    },
    "Spy": {
        "ru": "Шпион",
    },
    "Location": {
        "ru": "Локация",
    },
    "There should be at least 3 players": {
        "ru": "Должны играть как минимум 3 игрока",
    },
    "The civillians": {
        "ru": "Мирные жители",
    },
    "Who won this round?": {
        "ru": "Кто выиграл раунд?",
    },
    "Winners": {
        "ru": "Победители",
    },
    "New game": {
        "ru": "Новая игра",
    },
    "Night mode": {
        "ru": "Ночной режим",
    },
    "Language": {
        "ru": "Язык",
    },
    "Start over again?": {
        "ru": "Начать сначала?",
    },
    "Leave this game?": {
        "ru": "Покинуть текущую игру?",
    },
    "How to play?": {
        "ru": "Как играть?",
    },
    "Number of rounds": {
        "ru": "Количество раундов",
    },
    "Locations pack": {
        "ru": "Набор локаций",
    },
    "More settings": {
        "ru": "Дополнительные настройки",
    },
    "": {
        "ru": "",
    },
};

// returns the word \param w translated to language specified in Glob.currentLocale
function tr(w) {
    if (!Glob.localeMap.hasOwnProperty(w)) {
        console.warn("no locale thing for " + w);
        return w;
    }
    var options = Glob.localeMap[w];
    if (options.hasOwnProperty(Glob.currentLocale))
        return options[Glob.currentLocale];
    // else consider the word in English
    return w;
}

// rules
Glob.localeMap["game_rules"] = {
    "ru": `
<h2>Что это?</h2>
<b>Находка для шпиона</b> - психологическая игра, цель которой - раскрыть шпиона. Оптимально играть компанией 4-5 человек.

<h2>Как играть?</h2>
1. Соберите компанию игроков. Да, вы все должны собраться в реальном мире.<br>
2. Создайте новую игру. Впишите имена всех, кто будет играть, начиная с себя.<br>
3. Когда все остальные игроки сканировали QR-код игры, можно начинать Раунд.<br>

<h2>Раунд игры</h2>
Каждый раунд проходит на определённой локации. Она известна всем игрокам (кнопка "показать локацию"), кроме шпиона. Игроки по кругу задают друг другу вопросы про локацию, пытаясь выяснить, кто из них шпион.

<h2>Задача мирных жителей</h2>
Задача мирных - вычислить шпиона с помощью вопросов.<br>
Допустим, раунд проходит на локации "Космический корабль". Вы задаёте вопрос соседy - игроку X: "ты был на этой локации?". Если игрок X отвечает "Да", что вряд ли является правдой и наводит подозрения, можно предложить всем устроить <b>голосование</b> против игрока X. Если большинство Вас поддержало в голосовании, и оказывается, что игрок X действительно шпион, то все <b>мирные выигрывают раунд</b>, получают по 1 очку и начинается следующий раунд. Если же игрок X оказался мирным, то раунд <b>выигрывает шпион</b> и получает за него 2 очка, а мирные - ни одного.<br><br>
Вопросы и ответы на них <b>не должны быть слишком очевидными</b>. К примеру, если на локации "самолёт" на вопрос "что делают люди в этой локации" Вы ответите "летят из одной страны в другую", шпион сразу поймёт, о чём речь. Но если вы ответите "сидят", то, напротив, наведёте подозрения на себя, так как дали слишком общий ответ.

<h2>Задача шпиона</h2>
<b>Шпион выигрывает</b> раунд в двух случаях: если <b>назовёт вслух локацию</b> раунда или если остальные игроки <b>проголосовали против мирного</b>.
Сделать попытку назвать вслух локацию можно только один раз. Если она окажется неверной, раунд <b>выигрывают мирные</b>.

<h2>Окончание раунда</h2>
На раунд даётся фиксированное время (следит ведущий). По его окончании игроки обязаны устроить голосование, а шпион уже не имеет право назвать локацию. Игрок, против которого набралось наибольшее количество голосов, раскрывает свою роль и тем самым определяет, кто выиграл в этом раунде.
`,
"en": `
<h2> What is this? </h2>
<b> Spyfall </b> is a psychological game which goal is to uncover a spy. It is preferred to play in a company of 4-5 people.

<h2> How to play? </h2>
1. Get together with a company of players. Yes, you really should all get together in the real world. <br>
2. Create a new game. Enter the names of everyone who will play, starting with yourself. <br>
3. When all other players have scanned the QR code for the game, you can start the Round. <br>

<h2> Round of the game </h2>
Each round takes place at a specific location. It is known to all players (the "show location" button), except for the spy. One by one, players ask each other questions about the location, trying to find out who of them is a spy.

<h2> The "civilians" </h2>
The task of the "civilians" is to find the spy by asking each other questions. <br>
Let's suppose the location for this round is the SPACECRAFT. You ask your neighbor - to player X: "have you been to this location before?" If player X answers “Yes”, which is hardly true and causes suspicions, you can initiate <b>a vote</b> against player X. If most of the players supported the vote, and it turns out that player X is indeed a spy, then <b>the "civilians" win the round</b>, each earning 1 point and the next round begins. If player X turned out to be civilian, then <b>the round  is won by the spy</b> who gets 2 points.<br> <br>
Questions and answers <b>should not be too obvious</b>. For example, if at the location “airplane” to the question “what do people do in this location“ you answer “fly from one country to another”, the spy will immediately understand the location. On the contrary, if you answer "sitting", then you will raise suspicions on yourself, since your answer was way too general.

<h2>The spy</h2>
<b>The spy wins a round </b> in two cases: if he <b>names the location out loud</b>, or if other players <b>voted against the civilian</b>.
You can only try to name a location aloud once. If it turns out to be wrong, the round is <b>won by the civilians</b>.

<h2>End of the round</h2>
For each round, a fixed amount of time is given (the host should watch after it). At its end, players are required to arrange a vote, and the spy no longer has the right to name the location aloud. The player having the largest number of votes against him reveals his role, thus determining who won in this round.
`
};

