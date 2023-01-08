import { characterImages } from "./images.js";

export async function mainData() {
  try {
    const charactersArray = await fetchCharacters();
    let selectedArray = [];
    const nameSearch = document.getElementById("namesearch").value;
    const rarity = document.getElementById("rarity").value;
    const vision = document.getElementById("vision").value;
    const weapon = document.getElementById("weapon").value;

    if (nameSearch) {
      selectedArray = searchByName(charactersArray, nameSearch);
    } else if (rarity || vision || weapon) {
      selectedArray = filterCharacters(charactersArray);
    }

    if (selectedArray.length > 0) {
      displayCharacters(selectedArray);
    } else {
      displayCharacters(charactersArray);
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchCharacters() {
  try {
    const url = "https://api.genshin.dev/characters";
    const charactersData = await fetch(url).then((response) => response.json());
    const charactersArray = await fetchEachCharacter(charactersData);
    return charactersArray;
  } catch (error) {
    console.log(error);
  }
}

async function fetchEachCharacter(cdata) {
  try {
    let charactersArray = cdata.map(async (element) => {
      const eUrl = `https://api.genshin.dev/characters/${element}`;
      const characterData = await fetch(eUrl).then((response) =>
        response.json()
      );
      return characterData;
    });
    return Promise.all(charactersArray);
  } catch (error) {
    console.log(error);
  }
}

function filterCharacters(charactersArray) {
  const chosenRarity = Number(document.getElementById("rarity").value);
  const chosenVision = document.getElementById("vision").value;
  const chosenWeapon = document.getElementById("weapon").value;
  let filteredArray = charactersArray;

  if (chosenRarity) {
    filteredArray = filteredArray.filter(
      (character) => character.rarity === chosenRarity
    );
  }
  if (chosenVision) {
    filteredArray = filteredArray.filter(
      (character) => character.vision === chosenVision
    );
  }
  if (chosenWeapon) {
    filteredArray = filteredArray.filter(
      (character) => character.weapon === chosenWeapon
    );
  }
  return filteredArray;
}

function searchByName(charactersArray, name) {
  return charactersArray.filter((character) => {
    return character.name.toLowerCase().includes(name.toLowerCase());
  });
}

function displayCharacters(characters) {
  const table = document.getElementById("table");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  //    console.log(JSON.parse(JSON.stringify(characters)));
  for (const character of characters) {
    const row = table.insertRow();
    const nameCell = row.insertCell();
    nameCell.addEventListener("click", () => {
      showInfo(character);
    });
    const rarityCell = row.insertCell();
    const visionCell = row.insertCell();
    const weaponCell = row.insertCell();
    nameCell.innerHTML = character.name;
    rarityCell.innerHTML = character.rarity;
    visionCell.innerHTML = character.vision;
    weaponCell.innerHTML = character.weapon;
  }
}

function showInfo(character) {
  //select maininfo and clear it
  const maininfo = document.querySelector(".maininfo");
  maininfo.innerHTML = "";

  // Find the image src for character in the characterImages array
  const imageSrc = characterImages.find((c) => c.name === character.name).src;
  const image = document.createElement("img");
  image.src = imageSrc;
  image.setAttribute("id", "character-image");
  maininfo.appendChild(image);
  maininfo.appendChild(document.createElement("br"));

  const nameSpan = document.createElement("span");
  nameSpan.setAttribute("id", "name-span");
  nameSpan.innerHTML = `<b>Name:</b> ${character.name}`;
  maininfo.appendChild(nameSpan);
  maininfo.appendChild(document.createElement("br"));
  const descriptionSpan = document.createElement("span");
  descriptionSpan.setAttribute("id", "description-span");
  descriptionSpan.innerHTML = `<b>Description:</b> ${character.description}`;
  maininfo.appendChild(descriptionSpan);
  maininfo.appendChild(document.createElement("br"));
  const raritySpan = document.createElement("span");
  raritySpan.setAttribute("id", "rarity-span");
  raritySpan.innerHTML = `<b>Rarity:</b> ${character.rarity}`;
  maininfo.appendChild(raritySpan);
  maininfo.appendChild(document.createElement("br"));
  const visionSpan = document.createElement("span");
  visionSpan.setAttribute("id", "vision-span");
  visionSpan.innerHTML = `<b>Vision:</b> ${character.vision}`;
  maininfo.appendChild(visionSpan);
  maininfo.appendChild(document.createElement("br"));
  const weaponSpan = document.createElement("span");
  weaponSpan.setAttribute("id", "weapon-span");
  weaponSpan.innerHTML = `<b>Weapon:</b> ${character.weapon}`;
  maininfo.appendChild(weaponSpan);
  maininfo.appendChild(document.createElement("br"));

  //show talents
  const passiveTalentsHeading = document.createElement("h3");
  passiveTalentsHeading.innerHTML = "Passive Talents";
  maininfo.appendChild(passiveTalentsHeading);
  for (let i = 0; i < character.passiveTalents.length; i++) {
    const talent = character.passiveTalents[i];
    const talentSpan = document.createElement("span");
    talentSpan.innerHTML = `<b>Name:</b> ${talent.name} <br> <b>Description:</b> ${talent.description}`;
    talentSpan.setAttribute("id", `passive-talent-${i}`);
    maininfo.appendChild(talentSpan);
    maininfo.appendChild(document.createElement("br"));
  }
  const skillTalentsHeading = document.createElement("h3");
  skillTalentsHeading.innerHTML = "Skill Talents";
  maininfo.appendChild(skillTalentsHeading);
  for (let i = 0; i < character.skillTalents.length; i++) {
    const talent = character.skillTalents[i];
    const talentSpan = document.createElement("span");
    talentSpan.innerHTML = `<b>Name:</b> ${talent.name} <br> <b>Description:</b> ${talent.description}`;
    talentSpan.setAttribute("id", `skill-talent-${i}`);
    maininfo.appendChild(talentSpan);
    maininfo.appendChild(document.createElement("br"));
  }
}
