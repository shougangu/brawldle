var dailyNum = new Array();
dailyNum = [
    21, 18, 34, 54, 63, 10, 15, 37, 41, 45, 53, 51, 52, 10, 3, 32, 34, 30, 40,
    45, 36, 64, 37, 33, 22, 38, 33, 55, 39, 0, 66, 57, 39, 27, 7, 49, 44, 55,
    25, 8, 35, 25, 49, 19, 54, 32, 42, 29, 53, 3, 43, 56, 6, 51, 9, 40, 59, 64,
    14, 61, 52, 66, 5, 54, 35, 58, 54, 40, 39, 35, 37, 11, 21, 34, 41, 1, 53,
    43, 8, 0, 56, 54, 64, 23, 9, 23, 66, 28, 5, 35, 37, 37, 45, 49, 51, 37, 65,
    36, 62, 38, 7, 48, 14, 15, 17, 5, 56, 20, 19, 49, 12, 41, 0, 58, 8, 50, 14,
    53, 3, 8, 29, 63, 32, 59, 7, 29, 67, 24, 47, 4, 7, 49, 43, 7, 58, 9, 5, 39,
    64, 9, 8, 1, 17, 47, 49, 66, 7, 34, 21, 12, 22, 17, 40, 29, 28, 63, 18, 24,
    23, 66, 56, 29, 40, 55, 60, 14, 61, 10, 30, 2, 23, 30, 5, 52, 63, 21, 53,
    40, 11, 50, 5, 48, 35, 48, 25, 62, 13, 25, 16, 49, 6, 36, 44, 9, 69, 28, 31,
    57, 31, 43, 20, 3, 19, 54, 29, 21, 39, 38, 66, 28, 11, 36, 62, 30, 31, 30,
    49, 45, 4, 50, 41, 62, 20, 13, 68, 21, 66, 60, 40, 35, 60, 30, 41, 44, 61,
    47, 70, 63, 30, 50, 9, 54, 71, 33, 58, 47, 47, 66, 50, 42, 44, 69, 47, 19,
    18, 40, 64, 67, 24, 27, 66, 2, 68, 39, 43, 40, 70, 28, 56, 0, 40, 44, 68,
    50, 59, 80, 41, 44, 55, 59, 52, 5, 2, 34, 36, 6, 65, 79, 80, 10, 1, 68, 19,
    11, 5, 15, 52, 1, 51, 53, 52, 59, 23, 70, 11, 36, 80, 64, 70, 39, 14, 8, 20,
    0, 43, 55, 39, 56, 69, 78, 38, 44, 64, 61, 33, 51, 61, 65, 33, 38, 76, 40,
    67, 2, 71, 1, 54, 16, 34, 56, 19, 57, 75, 55, 52, 78, 68, 77, 15, 61, 71,
    60, 34, 22, 5, 3, 37, 78, 12, 56, 28, 29, 30, 31, 2, 56, 21, 18, 34, 54, 63,
    10, 15, 37, 41, 45, 53, 51, 52, 10, 3, 32, 34, 30, 40, 45, 36, 64, 37, 33,
    22, 38, 33, 55, 39, 0, 66, 57, 39, 27, 7, 49, 44, 55, 25, 8, 35, 25, 49, 19,
    54, 32, 42, 29, 53, 3, 43, 56, 6, 51, 9, 40, 59, 64, 14, 61, 52, 66, 5, 54,
    35, 58, 54, 40, 39, 35, 37, 11, 21, 34, 41, 1, 53, 43, 8, 0, 56, 54, 64, 23,
    9, 23, 66, 28, 5, 35, 37, 37, 45, 49, 51, 37, 65, 36, 62, 38, 7, 48, 14, 15,
    17, 5, 56, 20, 19, 49, 12, 41, 0, 58, 8, 50, 14, 53, 3, 8, 29, 63, 32, 59,
    7, 29, 67, 24, 47, 4, 7, 49, 43, 7, 58, 9, 5, 39, 64, 9, 8, 1, 17, 47, 49,
    66, 7, 34, 21, 12, 22, 17, 40, 29, 28, 63, 18, 24, 23, 66, 56, 29, 40, 55,
    60, 14, 61, 10, 30, 2, 23, 30, 5, 52, 63, 21, 53, 40, 11, 50, 5, 48, 35, 48,
    25, 62, 13, 25, 16, 49, 6, 36, 44, 9, 69, 28, 31, 57, 31, 43, 20, 3, 19, 54,
    29, 21, 39, 38, 66, 28, 11, 36, 62, 30, 31, 30, 49, 45, 4, 50, 41, 62, 20,
    13, 68, 21, 66, 60, 40, 35, 60, 30, 41, 44, 61, 47, 70, 63, 30, 50, 9, 54,
    71, 33, 58, 47, 47, 66, 50, 42, 44, 69, 47, 19, 18, 40, 64, 67, 24, 27, 66,
    2, 68, 39, 43, 40, 70, 28, 56, 0, 40, 44, 68, 50, 59, 80, 41, 44, 55, 59,
    52, 5, 2, 34, 36, 6, 65, 79, 80, 10, 1, 68, 19, 11, 5, 15, 52, 1, 51, 53,
    52, 59, 23, 70, 11, 36, 80, 64, 70, 39, 14, 8, 20, 0, 43, 55, 39, 56, 69,
    78, 38, 44, 64, 61, 33, 51, 61, 65, 33, 38, 76, 40, 67, 2, 71, 1, 54, 16,
    34, 56, 19, 57, 75, 55, 52, 78, 68, 77, 15, 61, 71, 60, 34, 22, 5, 3, 37,
    78, 12, 56, 28, 29, 30, 31, 2,
];
dailyNum[228] = 81;

var brawlers = new Array();
brawlers[0] = {
    name: "shelly",
    rarity: "Starter",
    wall: "Yes",
    health: 7400,
    projectiles: 5,
    year: 2017,
};

brawlers[1] = {
    name: "nita",
    rarity: "Rare",
    wall: "No",
    health: 8000,
    projectiles: 1,
    year: 2017,
};
// rare
brawlers[2] = {
    name: "colt",
    rarity: "Rare",
    wall: "Yes",
    health: 5600,
    projectiles: 6,
    year: 2017,
};
brawlers[3] = {
    name: "bull",
    rarity: "Rare",
    wall: "Yes",
    health: 10000,
    projectiles: 5,
    year: 2017,
};
brawlers[4] = {
    name: "brock",
    rarity: "Rare",
    wall: "Yes",
    health: 4800,
    projectiles: 1,
    year: 2017,
};
brawlers[5] = {
    name: "el primo",
    rarity: "Rare",
    wall: "Yes",
    health: 12000,
    projectiles: 4,
    year: 2017,
};
brawlers[6] = {
    name: "barley",
    rarity: "Rare",
    wall: "No",
    health: 4800,
    projectiles: 1,
    year: 2017,
};
brawlers[7] = {
    name: "poco",
    rarity: "Rare",
    wall: "No",
    health: 7400,
    projectiles: 1,
    year: 2017,
};
brawlers[8] = {
    name: "rosa",
    rarity: "Rare",
    wall: "No",
    health: 10000,
    projectiles: 3,
    year: 2019,
};

brawlers[9] = {
    name: "jessie",
    rarity: "Super Rare",
    wall: "No",
    health: 6000,
    projectiles: 1,
    year: 2017,
};
// s rare
brawlers[10] = {
    name: "dynamike",
    rarity: "Super Rare",
    wall: "Yes",
    health: 5600,
    projectiles: 2,
    year: 2017,
};
brawlers[11] = {
    name: "tick",
    rarity: "Super Rare",
    wall: "Yes",
    health: 4400,
    projectiles: 3,
    year: 2019,
};
brawlers[12] = {
    name: "8-bit",
    rarity: "Super Rare",
    wall: "No",
    health: 10000,
    projectiles: 6,
    year: 2019,
};
brawlers[13] = {
    name: "rico",
    rarity: "Super Rare",
    wall: "No",
    health: 5600,
    projectiles: 5,
    year: 2017,
};
brawlers[14] = {
    name: "darryl",
    rarity: "Super Rare",
    wall: "No",
    health: 10600,
    projectiles: 10,
    year: 2017,
};
brawlers[15] = {
    name: "penny",
    rarity: "Super Rare",
    wall: "No",
    health: 6400,
    projectiles: 1,
    year: 2018,
};
brawlers[16] = {
    name: "carl",
    rarity: "Super Rare",
    wall: "No",
    health: 8000,
    projectiles: 1,
    year: 2019,
};
brawlers[17] = {
    name: "jacky",
    rarity: "Super Rare",
    wall: "No",
    health: 10000,
    projectiles: 1,
    year: 2020,
};
brawlers[18] = {
    name: "gus",
    rarity: "Super Rare",
    wall: "No",
    health: 6400,
    projectiles: 1,
    year: 2022,
};

brawlers[19] = {
    name: "bo",
    rarity: "Epic",
    wall: "Yes",
    health: 7200,
    projectiles: 3,
    year: 2017,
};
// epic
brawlers[20] = {
    name: "emz",
    rarity: "Epic",
    wall: "No",
    health: 7200,
    projectiles: 1,
    year: 2019,
};
brawlers[21] = {
    name: "stu",
    rarity: "Epic",
    wall: "Yes",
    health: 6400,
    projectiles: 2,
    year: 2021,
};
brawlers[22] = {
    name: "piper",
    rarity: "Epic",
    wall: "Yes",
    health: 4600,
    projectiles: 1,
    year: 2017,
};
brawlers[23] = {
    name: "pam",
    rarity: "Epic",
    wall: "No",
    health: 9600,
    projectiles: 9,
    year: 2017,
};
brawlers[24] = {
    name: "frank",
    rarity: "Epic",
    wall: "Yes",
    health: 13400,
    projectiles: 1,
    year: 2018,
};
brawlers[25] = {
    name: "bibi",
    rarity: "Epic",
    wall: "No",
    health: 9600,
    projectiles: 1,
    year: 2019,
};
brawlers[26] = {
    name: "bea",
    rarity: "Epic",
    wall: "No",
    health: 5000,
    projectiles: 1,
    year: 2019,
};
brawlers[27] = {
    name: "nani",
    rarity: "Epic",
    wall: "Yes",
    health: 4800,
    projectiles: 3,
    year: 2020,
};
brawlers[28] = {
    name: "edgar",
    rarity: "Epic",
    wall: "No",
    health: 6600,
    projectiles: 2,
    year: 2020,
};
brawlers[29] = {
    name: "griff",
    rarity: "Epic",
    wall: "Yes",
    health: 6800,
    projectiles: 9,
    year: 2021,
};
brawlers[30] = {
    name: "grom",
    rarity: "Epic",
    wall: "Yes",
    health: 5600,
    projectiles: 1,
    year: 2021,
};
brawlers[31] = {
    name: "bonnie",
    rarity: "Epic",
    wall: "No",
    health: 9600,
    projectiles: 1,
    year: 2022,
};
brawlers[32] = {
    name: "hank",
    rarity: "Epic",
    wall: "No",
    health: 11200,
    projectiles: 1,
    year: 2023,
};

brawlers[33] = {
    name: "mortis",
    rarity: "Mythic",
    wall: "No",
    health: 7600,
    projectiles: 1,
    year: 2017,
};
// mythic
brawlers[34] = {
    name: "tara",
    rarity: "Mythic",
    wall: "Yes",
    health: 6200,
    projectiles: 3,
    year: 2017,
};
brawlers[35] = {
    name: "gene",
    rarity: "Mythic",
    wall: "Yes",
    health: 7200,
    projectiles: 1,
    year: 2019,
};
brawlers[36] = {
    name: "max",
    rarity: "Mythic",
    wall: "No",
    health: 6600,
    projectiles: 4,
    year: 2019,
};
brawlers[37] = {
    name: "mr. p",
    rarity: "Mythic",
    wall: "No",
    health: 6800,
    projectiles: 1,
    year: 2020,
};
brawlers[38] = {
    name: "sprout",
    rarity: "Mythic",
    wall: "No",
    health: 6000,
    projectiles: 1,
    year: 2020,
};
brawlers[39] = {
    name: "byron",
    rarity: "Mythic",
    wall: "No",
    health: 4800,
    projectiles: 1,
    year: 2020,
};
brawlers[40] = {
    name: "squeak",
    rarity: "Mythic",
    wall: "No",
    health: 7200,
    projectiles: 1,
    year: 2021,
};
brawlers[41] = {
    name: "gray",
    rarity: "Mythic",
    wall: "Yes",
    health: 6600,
    projectiles: 1,
    year: 2022,
};
brawlers[42] = {
    name: "willow",
    rarity: "Mythic",
    wall: "No",
    health: 5600,
    projectiles: 1,
    year: 2023,
};
brawlers[43] = {
    name: "doug",
    rarity: "Mythic",
    wall: "No",
    health: 10000,
    projectiles: 1,
    year: 2023,
};
brawlers[44] = {
    name: "chuck",
    rarity: "Mythic",
    wall: "No",
    health: 9000,
    projectiles: 3,
    year: 2023,
};

brawlers[45] = {
    name: "spike",
    rarity: "Legendary",
    wall: "No",
    health: 5200,
    projectiles: 1,
    year: 2017,
};
// legendary
brawlers[46] = {
    name: "crow",
    rarity: "Legendary",
    wall: "No",
    health: 4800,
    projectiles: 3,
    year: 2017,
};
brawlers[47] = {
    name: "leon",
    rarity: "Legendary",
    wall: "No",
    health: 6800,
    projectiles: 4,
    year: 2018,
};
brawlers[48] = {
    name: "sandy",
    rarity: "Legendary",
    wall: "No",
    health: 7600,
    projectiles: 1,
    year: 2019,
};
brawlers[49] = {
    name: "amber",
    rarity: "Legendary",
    wall: "No",
    health: 6400,
    projectiles: 1,
    year: 2020,
};
brawlers[50] = {
    name: "meg",
    rarity: "Legendary",
    wall: "No",
    health: 8000,
    projectiles: 16,
    year: 2021,
};
brawlers[51] = {
    name: "chester",
    rarity: "Legendary",
    wall: "Yes",
    health: 7400,
    projectiles: 1,
    year: 2022,
};

brawlers[52] = {
    name: "gale",
    rarity: "Epic",
    wall: "No",
    health: 7600,
    projectiles: 6,
    year: 2020,
};
// ex chromatics
brawlers[53] = {
    name: "surge",
    rarity: "Legendary",
    wall: "No",
    health: 6600,
    projectiles: 1,
    year: 2020,
};
brawlers[54] = {
    name: "colette",
    rarity: "Epic",
    wall: "No",
    health: 6800,
    projectiles: 1,
    year: 2020,
};
brawlers[55] = {
    name: "lou",
    rarity: "Mythic",
    wall: "No",
    health: 6400,
    projectiles: 3,
    year: 2020,
};
brawlers[56] = {
    name: "ruffs",
    rarity: "Mythic",
    wall: "Yes",
    health: 5600,
    projectiles: 2,
    year: 2021,
};
brawlers[57] = {
    name: "belle",
    rarity: "Epic",
    wall: "No",
    health: 5200,
    projectiles: 1,
    year: 2021,
};
brawlers[58] = {
    name: "buzz",
    rarity: "Mythic",
    wall: "No",
    health: 9600,
    projectiles: 5,
    year: 2021,
};
brawlers[59] = {
    name: "ash",
    rarity: "Epic",
    wall: "No",
    health: 10800,
    projectiles: 1,
    year: 2021,
};
brawlers[60] = {
    name: "lola",
    rarity: "Epic",
    wall: "No",
    health: 7600,
    projectiles: 6,
    year: 2021,
};
brawlers[61] = {
    name: "fang",
    rarity: "Mythic",
    wall: "No",
    health: 8600,
    projectiles: 1,
    year: 2022,
};
brawlers[62] = {
    name: "eve",
    rarity: "Mythic",
    wall: "No",
    health: 5800,
    projectiles: 3,
    year: 2022,
};
brawlers[63] = {
    name: "janet",
    rarity: "Mythic",
    wall: "No",
    health: 6400,
    projectiles: 1,
    year: 2022,
};
brawlers[64] = {
    name: "otis",
    rarity: "Mythic",
    wall: "No",
    health: 6400,
    projectiles: 3,
    year: 2022,
};
brawlers[65] = {
    name: "sam",
    rarity: "Epic",
    wall: "No",
    health: 10800,
    projectiles: 2,
    year: 2022,
};
brawlers[66] = {
    name: "buster",
    rarity: "Mythic",
    wall: "No",
    health: 10000,
    projectiles: 1,
    year: 2022,
};
brawlers[67] = {
    name: "mandy",
    rarity: "Epic",
    wall: "No",
    health: 5600,
    projectiles: 1,
    year: 2022,
};
brawlers[68] = {
    name: "r-t",
    rarity: "Mythic",
    wall: "No",
    health: 7800,
    projectiles: 1,
    year: 2023,
};
brawlers[69] = {
    name: "maisie",
    rarity: "Epic",
    wall: "No",
    health: 7200,
    projectiles: 1,
    year: 2023,
};
brawlers[70] = {
    name: "cordelius",
    rarity: "Legendary",
    wall: "No",
    health: 6400,
    projectiles: 2,
    year: 2023,
};
brawlers[71] = {
    name: "pearl",
    rarity: "Epic",
    wall: "Yes",
    health: 7800,
    projectiles: 6,
    year: 2023,
};
brawlers[72] = {
    name: "charlie",
    rarity: "Mythic",
    wall: "No",
    health: 6600,
    projectiles: 1,
    year: 2023,
};

brawlers[73] = {
    name: "mico",
    rarity: "Mythic",
    wall: "No",
    health: 6000,
    projectiles: 1,
    year: 2023,
};
// everyone after s21
brawlers[74] = {
    name: "kit",
    rarity: "Legendary",
    wall: "No",
    health: 6000,
    projectiles: 1,
    year: 2023,
};
brawlers[75] = {
    name: "larry & lawrie",
    rarity: "Epic",
    wall: "No",
    health: 6000,
    projectiles: 1,
    year: 2024,
};
brawlers[76] = {
    name: "angelo",
    rarity: "Epic",
    wall: "No",
    health: 6000,
    projectiles: 1,
    year: 2024,
};
brawlers[77] = {
    name: "melodie",
    rarity: "Mythic",
    wall: "No",
    health: 7200,
    projectiles: 1,
    year: 2024,
};
brawlers[78] = {
    name: "lily",
    rarity: "Mythic",
    wall: "No",
    health: 8200,
    projectiles: 1,
    year: 2024,
};
brawlers[79] = {
    name: "draco",
    rarity: "Legendary",
    wall: "No",
    health: 11000,
    projectiles: 1,
    year: 2024,
};
brawlers[80] = {
    name: "berry",
    rarity: "Epic",
    wall: "No",
    health: 5000,
    projectiles: 1,
    year: 2024,
};
brawlers[81] = {
    name: "clancy",
    rarity: "Mythic",
    wall: "No",
    health: 6600,
    projectiles: 1,
    year: 2024,
};
brawlers[82] = {
    name: "moe",
    rarity: "Mythic",
    wall: "No",
    health: 6800,
    projectiles: 1,
    year: 2024,
};
brawlers[83] = {
    name: "kenji",
    rarity: "Legendary",
    wall: "No",
    health: 7600,
    projectiles: 1,
    year: 2024,
};
brawlers[84] = {
    name: "juju",
    rarity: "Mythic",
    wall: "No",
    health: 6000,
    projectiles: 1,
    year: 2024,
};
