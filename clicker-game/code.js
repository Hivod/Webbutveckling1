var bank = 0;
var clickVal = 1;
var clickMod = 1;
var perTick = 0;
var tickMod = 1;

var upgrades = [
  {name: "lejon", displayName: "Lejon", cost: 15, perTick: 1, tickMod: 0, unlock: 2, isUnlocked: false, count: 0},
  {name: "duckhuntdog", displayName: "Duck Hunt Dog", cost: 100, perTick: 5, tickMod: 0, unlock: 100, isUnlocked: false, count: 0}
];

button = document.getElementById("clickerbutton");

button.addEventListener("click", function() {
  console.log("click");
  document.getElementById("clickcount").innerHTML = Math.floor(bank += clickVal * clickMod);
  updateValues();
});

function updateValues() {
  document.getElementById("clickcount").innerHTML = Math.floor(bank);
  document.getElementById("pertick").innerHTML = perTick * tickMod;
  document.getElementsByTagName("title")[0].innerHTML = Math.floor(bank);
  for(var i = 0; i < upgrades.length; i++) {
    document.getElementById(upgrades[i].name + "cost").innerHTML = upgrades[i].cost + " clicks";
    document.getElementById(upgrades[i].name + "count").innerHTML = upgrades[i].count;
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
  document.getElementById("upgrades").innerHTML += "<li><button id=" + upgrade.name + " class='upgrade' onclick='buyUpgrade(this.id)'>" + upgrade.displayName + "<span class='upgrade' id=" + upgrade.name + "count> 0</span><p class='upgrade' id=" + upgrade.name + "cost>" + upgrade.cost + " clicks</p></button></li>";
}

function buyUpgrade(upgrade) {
  for(var i = 0; i < upgrades.length; i++) {
    if(upgrades[i].name == upgrade && bank >= upgrades[i].cost) {
      bank -= upgrades[i].cost;
      perTick += upgrades[i].perTick;
      tickMod += upgrades[i].tickMod;
      upgrades[i].count++;
      upgrades[i].cost = Math.floor(upgrades[i].cost * 1.718);
      updateValues();
    }
  }
}

// HEARTBEAT
window.setInterval(function() {
  document.getElementById("clickcount").innerHTML = Math.floor(bank += perTick * tickMod * 0.1);
  checkUpgrades();
}, 100);