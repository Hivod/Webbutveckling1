/* TODO

1 time upgrades
balancing
graphics

*/


var bank = 0;
var clickVal = 1;
var clickMod = 1;
var perSecond = 0;
var psMod = 1;
var tickRate = 30;

var upgrades = [
  {name: "lejon", displayName: "Lejon", cost: 15, perSecond: 1, psMod: 0, clickVal: 0, clickMod: 0, unlock: 0, isUnlocked: false, count: 0},
  {name: "duckhuntdog", displayName: "Duck Hunt Dog", cost: 100, perSecond: 5, psMod: 0, clickVal: 0, clickMod: 0, unlock: 50, isUnlocked: false, count: 0},
  {name: "clickboi", displayName: "Click Boi", cost: 200, perSecond: 0, psMod: 0, clickVal: 3, clickMod: 0, unlock: 100, isUnlocked: false, count: 0},
  {name: "zebra", displayName: "Zebra", cost: 4000, perSecond: 0, psMod: .25, clickVal: 0, clickMod: 0, unlock: 400, isUnlocked: false, count: 0}
];

if(readCookie("isSaved")) {
  bank = parseFloat(readCookie("bank"));
  for(var i = 0; i < upgrades.length; i++) {
    upgrades[i].count = parseFloat(readCookie(upgrades[i].name + "Count"));
  }
  updateValues();
}

button = document.getElementById("clickerbutton");

button.addEventListener("click", function() {
  document.getElementById("clickcount").innerHTML = Math.floor(bank += clickVal * clickMod);
  buttonColor();
  updateValues();
  saveData();
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
}

function updateValues() {
  clickVal = 1;
  clickMod = 1;
  perSecond = 0;
  psMod = 1;
  for(var i = 0; i < upgrades.length; i++) {
    clickVal += upgrades[i].clickVal * upgrades[i].count;
    clickMod += upgrades[i].clickMod * upgrades[i].count;
    perSecond += upgrades[i].perSecond * upgrades[i].count;
    psMod += upgrades[i].psMod * upgrades[i].count;
  }
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
    document.getElementById(upgrades[i].name + "count").innerHTML = upgrades[i].count;
  }
  saveData();
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
      upgrades[i].count++;
      upgrades[i].cost = Math.floor(upgrades[i].cost * 1.2);
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

function saveData() {
  createCookie("bank", bank);
  for(var i = 0; i < upgrades.length; i++) {
    createCookie(upgrades[i].name + "Count", upgrades[i].count);
  }
  createCookie("isSaved", true);
}

window.setInterval(function() {
  document.getElementById("clickcount").innerHTML = Math.floor(bank += perSecond * psMod / tickRate);
  checkUpgrades();
  updateValues();
}, 1000/tickRate);

window.setInterval(function() {
  saveData();
},10000);