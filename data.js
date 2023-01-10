import { characterImages, visionImages } from "./images.js";

export async function mainData() {
  try {
    const charactersArray = await fetchCharacters();
    let selectedArray = [];
    const nameSearch = document.getElementById("namesearch").value;
    const rarity = document.getElementById("rarity").value;
    const vision = document.getElementById("vision").value;
    const weapon = document.getElementById("weapon").value;

    //if you do not search by name and choose a filter
    if (nameSearch) {
      selectedArray = searchByName(charactersArray, nameSearch);
    } else if (rarity || vision || weapon) {
      selectedArray = filterCharacters(charactersArray);
    }

    //if you search by name and nothing is found - show all
    if (selectedArray.length > 0) {
      displayCharacters(selectedArray);
    } else {
      displayCharacters(charactersArray);
    }
  } catch (error) {
    const maininfo = document.querySelector(".maininfo");
    maininfo.innerHTML = `Something went wrong :( ${error}`;
  }
}

async function fetchCharacters() {
  try {
    const url = "https://api.genshin.dev/characters";
    const charactersData = await fetch(url).then((response) => response.json());
    const charactersArray = await fetchEachCharacter(charactersData);
    return charactersArray;
  } catch (error) {
    const maininfo = document.querySelector(".maininfo");
    maininfo.innerHTML = `Something went wrong :( ${error}`;
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
    const maininfo = document.querySelector(".maininfo");
    maininfo.innerHTML = `Something went wrong :( ${error}`;
  }
}

function filterCharacters(charactersArray) {
  const chosenRarity = Number(document.getElementById("rarity").value);
  const chosenVision = document.getElementById("vision").value;
  const chosenWeapon = document.getElementById("weapon").value;
  let filteredArray = charactersArray;

  //if one of the filter is skipped
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
  for (const character of characters) {
    const row = table.insertRow();
    const nameCell = row.insertCell();
    nameCell.addEventListener("click", () => {
      showInfo(character);
    });
    const rarityCell = row.insertCell();
    const visionCell = row.insertCell();
    const weaponCell = row.insertCell();
    nameCell.innerHTML = `<span id="line">|</span> ${character.name}`;
    rarityCell.innerHTML = character.rarity;
    const visionSrc = visionImages.find(
      (c) => c.vision === character.vision
    ).src;
    visionCell.innerHTML = `<img src="${visionSrc}" class="vision-image"> ${character.vision}`;
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

  const nameH2 = document.createElement("h2");
  nameH2.setAttribute("id", "name-h3");
  nameH2.innerHTML = `${character.name}`;
  maininfo.appendChild(nameH2);
  const descriptionSpan = document.createElement("span");
  descriptionSpan.setAttribute("id", "description-span");
  descriptionSpan.innerHTML = `<b>Description:</b> <i>${character.description}</i>`;
  maininfo.appendChild(descriptionSpan);
  maininfo.appendChild(document.createElement("br"));
  const raritySpan = document.createElement("span");
  raritySpan.setAttribute("id", "rarity-span");
  raritySpan.innerHTML = `<b>Rarity:</b> ${character.rarity}`;
  maininfo.appendChild(raritySpan);
  maininfo.appendChild(document.createElement("br"));
  const visionSpan = document.createElement("span");
  visionSpan.setAttribute("id", "vision-span");
  //add pictures to vision
  const visionSrc = visionImages.find((c) => c.vision === character.vision).src;
  visionSpan.innerHTML = `<b>Vision:</b> <img src="${visionSrc}" class="vision-image" alt="${character.vision}"> <span class="visionname">${character.vision}</span> <span id="visionmore"><small>(click to know more about elemental reactions)</small></span>`;
  maininfo.appendChild(visionSpan);

  // show elemental reactions
  const visionName = document.querySelector(".visionname");
  visionSpan.addEventListener("click", () => {
    showElementInfo(visionName.innerText);
  });

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
    talentSpan.innerHTML = `> <b>${talent.name}</b> <br> <b>Description:</b> <i>${talent.description}</i><br>`;
    talentSpan.setAttribute("class", `passive-talent`);
    maininfo.appendChild(talentSpan);
    maininfo.appendChild(document.createElement("br"));
  }
  const skillTalentsHeading = document.createElement("h3");
  skillTalentsHeading.innerHTML = "Skill Talents";
  maininfo.appendChild(skillTalentsHeading);
  for (let i = 0; i < character.skillTalents.length; i++) {
    const talent = character.skillTalents[i];
    const talentSpan = document.createElement("span");
    talentSpan.innerHTML = `> <b>${talent.name}</b> <br> <b>Description:</b> <i>${talent.description}</i><br>`;
    talentSpan.setAttribute("class", `skill-talent`);
    maininfo.appendChild(talentSpan);
    maininfo.appendChild(document.createElement("br"));
  }
}

async function showElementInfo(elementName) {
  try {
    const response = await fetch(
      `https://api.genshin.dev/elements/${elementName}`
    );
    const data = await response.json();
    const visionName = document.getElementById("vision-span");
    const reactionsHeading = visionName.querySelector(".reaction");
    const visionMore = document.getElementById("visionmore");
    visionMore.innerHTML = "";
    if (!reactionsHeading) {
      const reactionsHeading = document.createElement("h3");
      reactionsHeading.innerHTML = "Reactions:";
      reactionsHeading.classList.add("reaction");
      visionName.appendChild(reactionsHeading);
      for (let i = 0; i < data.reactions.length; i++) {
        const reaction = data.reactions[i];
        const reactionSpan = document.createElement("span");
        reactionSpan.innerHTML = `> <b>${reaction.name}</b> <br> <b>Description:</b> <i>${reaction.description}</i> <br>`;
        reactionSpan.setAttribute("class", "reaction");
        visionName.appendChild(reactionSpan);
        visionName.appendChild(document.createElement("br"));
      }
    }
  } catch (error) {
    const visionName = document.querySelector(".visionname");
    const reaction = visionName.querySelector(".reaction");
    if (!reaction) {
      visionName.innerHTML += `<br> Something went wrong :( ${error}`;
    }
  }
}
