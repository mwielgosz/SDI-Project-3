//alert("JavaScript works!");

// Michael Wielgosz
// SDI 1402
// Project 3
// Monster Battle Arena

// Global variables
var playerHP = 100,
    playerEnergy = 100,
    playerAttacks = ["Punch", "Sword Stab", "Sword Slash", "Fire Magic", "Water Magic"], // Names
    playerAttacksDamage = [1, 5, 7, 10, 10], // Damage
    playerAttacksEnergy = [5, 10, 15, 20, 20], // Required Energy
    playerRegeneration = ["Health", "Energy"], // Names
    playerRegenerationAmounts = [25, 50], // Amount replenished
    playerWins = 0,
    monsterArray = monsterData.monsters,
    currentMonsterHP = 0,
    currentMonster = [];

// Function to retrieve next monster's data
var getMonsterData = function(monsterIndex) {
    console.log("A " + monsterArray[monsterIndex].name + " walks into the arena!");

    return monsterArray[monsterIndex];
}

// Function to display player and monster stats
var getAllStats = function() {
    var monster = "\nYou are fighting a " + currentMonster.name + "!\nHP: " + currentMonsterHP + "\n\n";
    var player = "Your Statistics:\nHP: " + playerHP + "\nEnergy: " + playerEnergy + "\n";
    
    return monster + player;
}

// Function to display possible player attacks, damage dealt, and energy used
var attackMonster = function(monsterHP) {
    var attacks = "Enter the number corresponding to the attack you want to use\n",
        selectedAttack = -1;
    for (var i=0; i < playerAttacks.length; i++) {
        attacks = attacks + "\n" + i + " - " + playerAttacks[i] + " - Damage: " + playerAttacksDamage[i] + " - Energy Used: " + playerAttacksEnergy[i];        
    }
    selectedAttack = parseInt(prompt(attacks));

    if (playerEnergy >= playerAttacksEnergy[selectedAttack]) {
        // Player has enough energy to perform selected attack
        monsterHP -= playerAttacksDamage[selectedAttack];
        playerEnergy -= playerAttacksEnergy[selectedAttack];
    } else {
        // Player does not have enough energy to perform selected attack
    }

    return monsterHP;
}

// Function to generate new monster
var getNewMonster = function() {
    // Get new monster attributes
    currentMonster = getMonsterData(getRandomInt(0, (monsterArray.length - 1)));
    currentMonsterHP = currentMonster.hp;

    // Ask if player will fight or run away
    var isFighting = confirm(getAllStats() + "\nWill you fight or run away?");
    
    return isFighting;
}

// Function to randomly generate an integer
var getRandomInt = function(min, max) {
    var random = Math.floor(Math.random() * (max - min + 1)) + min;

    return random;
}


// Function to fight monster
var fightMonster = function() {
    var monsterName = currentMonster.name,
        monsterAttacks = currentMonster.attacks,
        isAttacking = true;

    while(currentMonsterHP > 0) {
        console.log(getAllStats());

        isAttacking = confirm(getAllStats() + "\nClick 'OK' to attack\nClick 'Cancel' to regenerate");
        if (isAttacking) {
            // Attacking monster
            if (playerEnergy > 0) {
                // Player has sufficent energy to attack
                currentMonsterHP = attackMonster(currentMonsterHP);
            } else {
                // Player does not have sufficent energy to perform any attack
                console.log("You do not have enough energy to perform an attack");
            }
        } else {
            // Regenerating player
        }

        if (currentMonsterHP <= 0) {
            // Monster died
            playerWins++;
            currentMonsterHP = 0;
            console.log("The " + currentMonster.name + " is defeated!");
        }
    }
}

console.log("Welcome to the Monster Battle Arena\nHere, you will be fighting monsters until you run away or die!");

// Game loops while player is alive
while(playerHP > 0) {
    if (getNewMonster()) {
        // Player decides to accept monster fight
        fightMonster();
    } else {
        // Player decides to run away, ending game
        console.log("Running away from " + currentMonster.name + "!");
        break;
    }
    console.log("\nYou have defeated " + playerWins + " monsters!");
}

if (playerHP <= 0) {
    // Player died
    playerHP = 0;
    console.log("The " + currentMonster.name + " kicked your butt!");
}

// Game Over
console.log("Game Over!");
