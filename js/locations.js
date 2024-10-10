/* lociPack: object {
   lang: string // interface language to which it applies
   name: string // pack name
   description: string // pack verbose description
   lociList: array of strings // list of locations
}
*/
Glob.lociPacks = [
    {
        lang:        "ru",
        name:        "Стандартные на русском",
        description: "Стандартные локации в классической версии игры \"Находка для Шпиона\"",
        lociList: [ "База террористов", "Банк", "Больница", "Биотуалет", "Воинская часть", "Казино", "Киностудия", "Корпоративная вечеринка", "Овощебаза", "Океанский лайнер", "Отель", "Пассажирский поезд", "Пиратский корабль", "Пляж", "Подводная лодка", "Полицейский участок", "Полярная станция", "Посольство", "Ресторан", "Самолет", "Спа-салон", "Станция техобслуживания", "Супермаркет", "Театр", "Университет", "Церковь", "Цирк-шапито", "Школа"
]
    },
    {
        lang:        "en",
        name:        "Standard in English",
        description: "Standard game locations",
        lociList: [ "Beach", "Broadway Theater", "Casino", "Circus Tent", "Bank", "Day Spa", "Hotel", "Restaurant", "Supermarket", "Service Station", "Hospital", "Embassy", "Military Base", "Police Station", "School", "University", "Airplane", "Ocean Liner", "Passenger Train", "Submarine", "Cathedral", "Corporate Party", "Movie Studio", "Pirate Ship", "Polar Station", "Space Station"
        ]
    },
    {
        lang:        "nl",
        name:        "Standaard in Nederlands",
        description: "Standard spellocaties",
        lociList: [ "Strand", "Theater", "Casino", "Circustent", "Bank", "Spa", "Hotel", "Restaurant", "Supermarkt", "Snelwegsrestaurant", "Ziekenhuis", "Ambassade", "Militaire Basis", "Politie Station", "Basisschool", "Universiteit", "Vliegtuig", "Cuiseschip", "Passagiers Trein", "Onderzeeër", "Kathedraal", "Feestje", "Filmstudio", "Piratenschip", "Polair station", ""
        ]
    },
];

// temp return current locations list
Glob.locations = function (packIndex) {
    if (packIndex === undefined)
        console.error("packIndex undefined");
    return Glob.lociPacks[packIndex].lociList;
}
