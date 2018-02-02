/* TODO

save data (cookies)
1 time upgrades
clicking upgrades
balancing
graphics, possibly themes

*/


var bank = 0;
var clickVal = 1;
var clickMod = 1;
var perSecond = 0;
var psMod = 1;
var tickRate = 30;

var upgrades = [
  {name: "lejon", displayName: "Lejon", cost: 15, perSecond: 1, psMod: 0, unlock: 2, isUnlocked: false, count: 0},
  {name: "duckhuntdog", displayName: "Duck Hunt Dog", cost: 100, perSecond: 5, psMod: 0, unlock: 100, isUnlocked: false, count: 0},
  {name: "zebra", displayName: "Zebra", cost: 4000, perSecond: 0, psMod: 1.25, unlock: 400, isUnlocked: false, count: 0}
];

button = document.getElementById("clickerbutton");

button.addEventListener("click", function() {
  console.log("click");
  document.getElementById("clickcount").innerHTML = Math.floor(bank += clickVal * clickMod);
  buttonColor();
  updateValues();
});

function buttonColor() {
  var val = 255+64;
  var red = Math.floor(Math.random() * 255); val -= red;
  if(val>255) {
    var green = Math.floor(Math.random() * 255); val -= green;
  } else {
    var green = Math.floor(Math.random() * val); val -= green;
  }
  var blue = val;
  button.style.background = "rgb(" + red + "," + green + "," + blue + ")";
  console.log("rgb(" + red + "," + green + "," + blue + ")");
  //button.style.background = "rgb(" + Math.floor(Math.random() * 64 + 64) + "," + Math.floor(Math.random() * 64 + 64) + "," + Math.floor(Math.random() * 64 + 64) + ")";
}

function updateValues() {
  document.getElementById("clickcount").innerHTML = Math.floor(bank);
  document.getElementById("persecond").innerHTML = perSecond * psMod;
  document.getElementsByTagName("title")[0].innerHTML = Math.floor(bank);
  var unlockedAmount = 0;
  /* get amount of unlocked upgrades */
  for(var i = 0; i < upgrades.length; i++) {
    if(upgrades[i].isUnlocked) unlockedAmount++;
  }
  for(var i = 0; i < unlockedAmount; i++) {
    document.getElementById(upgrades[i].name + "cost").innerHTML = upgrades[i].cost + " clicks";
    document.getElementById(upgrades[i].name + "count").innerHTML = upgrades[i].count;1
  }
}

function checkUpgrades() {
  for(var i = 0; i < upgrades.length; i++) {
    if(bank >= upgrades[i].unlock && !upgrades[i].isUnlocked) {
      upgrades[i].isUnlocked = true;
      console.log(upgrades[i].displayName + " unlocked!");
      addUpgradeToList(upgrades[i]);
    }
  }
}

function addUpgradeToList(upgrade) {
  document.getElementById("upgrades").innerHTML += "<li><button id=" + upgrade.name + " class='upgrade' onclick='buyUpgrade(this.id); '>" + upgrade.displayName + "<span class='upgrade' id=" + upgrade.name + "count> 0</span><p class='upgrade' id=" + upgrade.name + "cost>" + upgrade.cost + " clicks</p></button></li>";
}

function buyUpgrade(upgrade) {
  for(var i = 0; i < upgrades.length; i++) {
    if(upgrades[i].name == upgrade && bank >= upgrades[i].cost) {
      bank -= upgrades[i].cost;
      perSecond += upgrades[i].perSecond;
      psMod += upgrades[i].psMod;
      upgrades[i].count++;
      upgrades[i].cost = Math.floor(upgrades[i].cost * 1.18);
      updateValues();
    }
  }
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


window.setInterval(function() {
  document.getElementById("clickcount").innerHTML = Math.floor(bank += perSecond * psMod / tickRate);
  checkUpgrades();
  updateValues();
}, 1000/tickRate);