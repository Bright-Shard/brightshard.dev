// ==UserScript==
// @name         Cookie Clicker++
// @namespace    https://brightshard.dev/projects/ccpp
// @version      1.0
// @description  Destroy the galaxy. With cookies.
// @author       BrightShard
// @match        https://orteil.dashnet.org/cookieclicker/
// @icon         https://orteil.dashnet.org/cookieclicker/img/favicon.ico
// @downloadURL  https://brightshard.dev/downloads/Cookie_Clicker++.user.js
// @supportURL   https://brightshard.dev/projects/ccpp
// @homepageURL  https://brightshard.dev/projects/ccpp
// ==/UserScript==

console.log('Loading Cookie Clicker++...')

// HELP COMMAND
ccHelp = function(){
    console.log('Cookie Clicker++ HELP:')
    console.log('- Run maxBuildings() to buy all buildings (For free!)');
    console.log('- Run maxUpgrades() to purchase all upgrades (For free!)');
    console.log('- Run infiniteCookies() to purchase so many buildings, you make infinite cookies/second (For free!)');
    console.log('- Run maxDragon() to get the max Dragon level (Even if you don\'t have the dragon yet, for free!');
    console.log('- Run giveAchievements() to get all achievements in Cookie Clicker, even the ones that are "impossible" to get.');
    console.log('- Run reset() to reset all data. THERE WILLL BE NO PROMPT, ALL SAVE DATA WILL VANISH!');
    console.log('- Run ccHelp() to view this help message (help() was already taken :|)');
}

// COOKIE GIVING
function give(amount){
    Game.Earn(amount);
}
giveCookies = function(amount){
    give(amount);
}

// BUILDING PURCHASING
function buyBuilding(building,amount){
    var me=Game.Objects[building];
    me.amount+=amount;
    me.bought+=amount;
    Game.BuildingsOwned+=amount;
    me.refresh()
}
function buyAllBuildings(amount){
    for (var building in Game.Objects){
        buyBuilding(building,amount);
    }
}
maxBuildings = function(){
    console.log('Maxing out buildings...');
    if(Game.prefs['cursors'] = 0){
        console.warn('WARNING: Disabling cursors for your own safety. This prevents cursors from being shown on the website. '+
                     'While cursors can be reenabled in Cookie Clicker\'s settings, it will probably cause the page to freeze, since this command buys so many of them - so it\'s not recommended.');
        Game.Toggle('cursors', 'cursorsButton', 'Cursors ON', 'Cursors OFF', '0');
    }
    buyAllBuildings(Number.MAX_SAFE_INTEGER);
    console.log('All buildings maxed.');
}
infiniteCookies = function(){
    console.log('Summoning too many buildings...');
    if(Game.prefs['cursors'] = 0){
        console.warn('WARNING: Disabling cursors for your own safety. This prevents cursors from being shown on the website. '+
                     'While cursors can be reenabled in Cookie Clicker\'s settings, it will probably cause the page to freeze, since this command buys so many of them - so it\'s not recommended.');
        Game.Toggle('cursors', 'cursorsButton', 'Cursors ON', 'Cursors OFF', '0');
    }
    buyAllBuildings(Number.MAX_SAFE_INTEGER * Math.pow(10,288));
    console.warn('ERR0R: ToO mANY cooKIeS');
    console.log('Infnte cokkiez rechd.');
}

// UPGRADE PURCHASING
maxUpgrades = function(){
    console.log('Purchasing all upgrades...')
    for (var upgrade in Game.Upgrades){
        var me = Game.Upgrades[upgrade];
        me.basePrice = 0;
        if (me.pool!='toggle' && me.pool!='tech' && me.pool!='prestige' && me.pool!='debug' && me.pool!='prestigeDecor') me.buy(1);
    }
    console.log('All upgrades purchased.')
}

// DRAGON UPGRADES
function dragonRequirements(){
    var me = Game.UpgradesById[323]; // Upgrade to unlock the Crumbly Egg, the egg of the dragon
    me.basePrice = 0; // Set price to 0
    me.buy(1); // Buy for free
    me = Game.UpgradesById[324]; // Buy the Crumbly Egg
    me.basePrice = 0; // Set price to 0
    me.buy(1); // Buy for free
}
function maximiseDragonLevel(){
    return new Promise(resolve => {
        setTimeout(() => {
            while (Game.dragonLevel<Game.dragonLevels.length-1)
			{
				Game.dragonLevels[Game.dragonLevel].buy = function(){Game.Spend(0);};
				Game.dragonLevels[Game.dragonLevel].buy();
				Game.dragonLevel=(Game.dragonLevel+1)%Game.dragonLevels.length;

				if (Game.dragonLevel>=Game.dragonLevels.length-1) Game.Win('Here be dragon');
				Game.ToggleSpecialMenu(1);
				if (l('specialPic')){var rect=l('specialPic').getBoundingClientRect();Game.SparkleAt((rect.left+rect.right)/2,(rect.top+rect.bottom)/2);}
				Game.recalculateGains=1;
				Game.upgradesToRebuild=1;
			}

            resolve();
        }, 2000);
    });
}
maxDragon = async function(){
    console.log('Maxing Dragon levels...');
    // Requirements for max dragon:
    dragonRequirements()
    await maximiseDragonLevel();
    console.log('Dragon levels maxed.');
}

// ACHIEVEMENT GIVER
function giveAchievement(achievement){
    var me=Game.Achievements[achievement];
    me.won=1;
    if (me.won && Game.CountsAsAchievementOwned(me.pool)) Game.AchievementsOwned++;
}
giveAchievements = function(){
    for(var achievement in Game.Achievements){
        giveAchievement(achievement);
    }
}

// DEBUG COMMANDS
reset = function(){
    Game.HardReset(2);
}

console.log('Cookie Clicker++ loaded successfully.')
ccHelp()