//alert("JavaScript works!");

// Michael Wielgosz
// SDI 1402
// Project 3
// Monster Battle Arena

// Global variables
var playerHP = 100,
    playerEnergy = 150,
    playerAttacks = ["Punch", "Sword Stab", "Sword Slash", "Flame Jet", "Lightning"], // Names
    playerAttacksDamage = [5, 10, 15, 20, 25], // Damage
    playerAttacksEnergy = [10, 15, 20, 25, 30], // Required Energy
    playerRegeneration = ["Health", "Energy"], // Names
    playerRegenerationAmounts = [25, 50], // Amount replenished
    playerWins = 0,
    monsterArray = [],
    currentMonsterHP = 0,
    currentMonster = [],
    randomizedMonster = [];

// Function to get all monster data
var getJSON = function() {
    var monsters = [];

    for (var key in monsterData.monsters) {
        monsters.push(monsterData.monsters[key])
    }

    return monsters;
}

// Function to randomly generate an integer
var getRandomInt = function(min, max) {
    var random = Math.floor(Math.random() * (max - min + 1)) + min;

    return random;
}

// Function to retrieve next monster's data
var getMonsterData = function(monsterIndex) {
    console.log("A " + monsterArray[monsterIndex].name + " walks into the arena!");

    return monsterArray[monsterIndex];
}

// Function to display player and monster stats
var getAllStats = function(monsterArray) {
    var monster = "\nYou are fighting a " + monsterArray.name + "!\nHP: " + currentMonsterHP + "\n\n";
    var player = "Your Statistics:\nHP: " + playerHP + "\nEnergy: " + playerEnergy + "\n";
    
    return monster + player;
}

// Function to generate new monster
var getNewMonster = function(randomMonster) {
    currentMonster = randomizedMonster;
    // Get new monster attributes
    currentMonsterHP = currentMonster.hp;

    // Ask if player will fight or run away
    var isFighting = confirm(getAllStats(currentMonster) + "\nWill you fight or run away?");
    
    return isFighting;
}

// Function to fight monster
var fightMonster = function(monsterName) {
    var monsterAttacks = currentMonster.attacks,
        isAttacking = true,
        isDead = false,
        monsterString = ""
        stats = "";

    while(currentMonsterHP > 0) {
        stats = getAllStats(currentMonster);
        console.log(stats);

        isAttacking = confirm(stats + "\nClick 'OK' to attack\nClick 'Cancel' to regenerate");
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
            regeneratePlayer();
        }

        if (currentMonsterHP <= 0) {
            // Monster died
            playerWins++;
            currentMonsterHP = 0;
            monsterString = "The " + currentMonster.name + " is defeated!";
            alert(monsterString);
            console.log(monsterString);
        } else {
            // Monster attacks player
            killsPlayer = monsterAttack(isDead);
            if (killsPlayer) {
                break;
            }
        }
    }
}

// Function to display possible player attacks, damage dealt, and energy used
var attackMonster = function(monsterHP) {
    var attacks = "Enter the number corresponding to the attack you want to use\n",
        selectedAttack = -1
        attackString = "";

    for (var i=0; i < playerAttacks.length; i++) {
        attacks = attacks + "\n" + i + " - " + playerAttacks[i] + " - Damage: " + playerAttacksDamage[i] + " - Energy Used: " + playerAttacksEnergy[i];        
    }
    selectedAttack = parseInt(prompt(attacks));

    if (playerEnergy >= playerAttacksEnergy[selectedAttack]) {
        // Player has enough energy to perform selected attack
        attackString = "You attack using " + playerAttacks[selectedAttack] + " dealing " + playerAttacksDamage[selectedAttack] + " damage!";
        monsterHP -= playerAttacksDamage[selectedAttack];
        playerEnergy -= playerAttacksEnergy[selectedAttack];
    } else {
        // Player does not have enough energy to perform selected attack
        attackString = "You do not have enough energy to use " + playerAttacks[selectedAttack];
    }

    alert(attackString);
    console.log(attackString);

    return monsterHP;
}

// Function to regenerate player statistics
var regeneratePlayer = function() {
    var regens = "Enter the number corresponding to the regeneration you want to use\n",
        selectedRegen = -1,
        regenString = "";

    for (var i=0; i < playerRegeneration.length; i++) {
        regens = regens + "\n" + i + " - " + playerRegeneration[i] + " - Amount Restored: " + playerRegenerationAmounts[i];        
    }

    selectedRegen = parseInt(prompt(regens));

    switch (selectedRegen) {
        case 0:
            // Regenerate Health
            playerHP += playerRegenerationAmounts[selectedRegen];
            regenString = "Your HP has been restored by " + playerRegenerationAmounts[selectedRegen] + ". Your total HP is " + playerHP;
            alert(regenString);
            console.log(regenString);
            break;
        case 1:
            // Regenerate Energy
            playerEnergy += playerRegenerationAmounts[selectedRegen];
            regenString = "Your Energy has been restored by " + playerRegenerationAmounts[selectedRegen] + ". Your total Energy is " + playerEnergy;
            alert(regenString);
            console.log(regenString);
            break;
    }
}

// Function to have monster attack player
var monsterAttack = function(killsPlayer) {
    var attackType = getRandomInt(0, currentMonster.attacks.length - 1),
        attackString = "\nThe " + currentMonster.name + " uses attack " + currentMonster.attacks[attackType] + " dealing "+ currentMonster.damage[attackType] + " damage!\n";

    alert(attackString);
    console.log(attackString);
    playerHP -= currentMonster.damage[attackType];

    if (playerHP <= 0) {
        // Attack kills player
        killsPlayer = true;
    }

    return killsPlayer;
}

// Get all monster data
monsterArray = getJSON();

console.log("Welcome to the Monster Battle Arena\nHere, you will be fighting monsters until you run away or die!");

// Game loops while player is alive
while(playerHP > 0) {
    randomizedMonster = getMonsterData(getRandomInt(0, monsterArray.length - 1));
    if (getNewMonster(randomizedMonster)) {
        // Player decides to accept monster fight
        fightMonster(currentMonster.name);
    } else {
        // Player decides to run away, ending game
        console.log("Running away from " + currentMonster.name + "!");
        break;
    }
    console.log("\nYou have defeated " + playerWins + " monsters!");
}

// Player died
alert("You have been killed by the " + currentMonster.name + ". Game Over!");
console.log("The " + currentMonster.name + " kicked your butt!");

// Game Over
console.log("Game Over!");
