import { mainData } from "./data.js";

function main() {
  const button = document.getElementById("button");
  button.addEventListener("click", () => {
    mainData();
  });
  const refresh = document.getElementById("refresh");
  const rarity = document.getElementById("rarity");
  const vision = document.getElementById("vision");
  const weapon = document.getElementById("weapon");
  const search = document.getElementById("namesearch");
  refresh.addEventListener("click", () => {
    rarity.selectedIndex = 0;
    vision.selectedIndex = 0;
    weapon.selectedIndex = 0;
    search.value = "";
  });
}

window.addEventListener("load", main);
