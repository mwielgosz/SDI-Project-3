//alert("JavaScript works!");

// Michael Wielgosz
// SDI 1402
// Project 3
// Monster Battle Arena

// Global variables
var playerHP = 100,
    playerEnergy = 100,
    playerAttacks = [
                        ["Punch", "Sword Stab", "Sword Slash", "Fire Magic", "Water Magic"], // Names
                        [1, 5, 7, 10, 10], // Damage
                        [5, 10, 15, 20, 20] // Required Energy
                    ],
    playerRegeneration = [
                            ["Health", "Energy"], // Names
                            [25, 50] // Amount replenished
                        ],
    playerWins = 0,
    monsterArray = monsterData.monsters,
    currentMonster = [];

// Function to retrieve next monster's data
var getMonsterData = function(monsterIndex) {
    console.log("You are fighting a " + monsterArray[monsterIndex].name + "\nIt has " + monsterArray[monsterIndex].hp + " hit points (HP)");
    
    return monsterArray[monsterIndex];
}

// Function to display player and monster stats
var getAllStats = function() {
    var monster = "You're fighting a " + currentMonster.name + "!\nHP: " + currentMonster.hp + "\n\n";
    var player = "Your Statistics:\nHP: " + playerHP + "\nEnergy: " + playerEnergy;
    
    return monster + player;
}

// Function to generate new monster
var getNewMonster = function() {
    // Get new monster
    currentMonster = getMonsterData(getRandomInt(0, (monsterArray.length - 1)));
    // Ask if player will fight or run away
    var willFight = confirm(getAllStats() + "\n\nWill you fight or run away?");
    
    return willFight;
}

// Function to randomly generate an integer
var getRandomInt = function(min, max) {
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("Random number: " + random);
    return random;
}
console.log("Welcome to the Monster Battle Arena\nHere, you will be fighting monsters until you run away or die!");

while(playerHP >0) {
    if (getNewMonster()) {
        console.log("Fighting!");
    } else {
        console.log("Running away!");
        break;
    }
}
