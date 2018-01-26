var bank = 0;
var clickVal = 1;
var clickMod = 1;
var perTick = 1;
var tickMod = 1;

var upgrades = [
  {name: "lejon", displayName: "Lejon", cost: 100, perTick: 1, tickMod: 0, unlock: 10, isUnlocked: false, count: 0},
  {name: "duckhuntdog", displayName: "Duck Hunt Dog", cost: 200, perTick: 0, tickMod: 1, unlock: 150, isUnlocked: false, count: 0}
];

button = document.getElementById("clickerbutton");

button.addEventListener("click", function() {
  console.log("click");
  document.getElementById("clickcount").innerHTML = bank += clickVal * clickMod;
  document.getElementsByTagName("title")[0].innerHTML = bank;
});

function updateValues() {
  document.getElementById("clickcount").innerHTML = bank += perTick * tickMod;
  document.getElementsByTagName("title")[0].innerHTML = bank;
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
  document.getElementById("upgrades").innerHTML += "<li><button id=" + upgrade.name + " class='upgrade' onclick='buyUpgrade(this.id)'>" + upgrade.displayName + " " + upgrade.cost + "</button></li>";
}

function buyUpgrade(upgrade) {
  for(var i = 0; i < upgrades.length; i++) {
    if(upgrades[i].name == upgrade && bank >= upgrades[i].cost) {
      bank -= upgrades[i].cost;
      perTick += upgrades[i].perTick;
      tickMod += upgrades[i].tickMod;
      upgrades[i].count++;
      updateValues();
    }
  }
}

// HEARTBEAT
window.setInterval(function() {
  document.getElementById("clickcount").innerHTML = bank += perTick * tickMod;
  checkUpgrades();
}, 1000);