const urlApiSolarSystem = "https://api.le-systeme-solaire.net/rest.php/bodies/";
const planetsId = {
    mercury: "mercure",
    venus: "venus",
    earth: "terre",    
    mars: "mars",
    jupiter: "jupiter",
    saturn: "saturne",
    uranus: "uranus",
    neptune: "neptune",
    pluto: "pluton"
};

fetchAndPopulate('earth');

let btn = document.querySelector('#displayPlanet');
btn.addEventListener('click', clickHandler);

//functions

function clickHandler(){
    let selectItem = document.querySelector('#selPlanet');
    let selectedPlanet = selectItem.value;
    if(document.getElementById(`${selectedPlanet}`) != null){
        return;
    }
    document.querySelector('#deckPlanets').appendChild(createCard(selectedPlanet));
    fetchAndPopulate(selectedPlanet);
};

function createCard(planet){
    let capitalized = planet.charAt(0).toUpperCase() + planet.slice(1);

    let div = document.createElement("DIV");
    div.classList.add("card");
    
    let card = `<div class="card-body">
            <h1>${capitalized}</h1>
            <div class="planet" id=${planet}></div>
            <div>
                <p class="${planet}Data"></p>
                <p class="${planet}Data"></p>
                <p class="${planet}Data"></p>
                <p class="${planet}Data"></p>
                <p class="${planet}Data"></p>
                <p class="${planet}Data"></p>
            </div>
        </div>`;
    div.innerHTML = card;

    return div;
}

function fetchAndPopulate(selectedPlanet){
    getPlanet(urlApiSolarSystem + planetsId[selectedPlanet]).then((content) => {
        let planet = newPlanet(content);
        let data = document.querySelectorAll(`.${planet.name}Data`);
        populateData(planet, data);
    });
}

function getPlanet(apiUrl){
    let request = new Request(apiUrl);
    let fetchedRequest = fetch(request).then(response => {
        if (response.status === 200) {
        return response.json();
    } else {
        throw new Error('Something went wrong on api server!');
    }
    }); 
    return fetchedRequest.then((content)=>{
        return content;
    });  
}
function populateData(planet, data){
    insertImage(planet);
    data[0].innerHTML = `<b>Mass:</b> ${planet.getMass().toExponential(5)} kg`;
    data[1].innerHTML = `<b>Radius:</b> ${planet.radius} km`;
    data[2].innerHTML = `<b>Angle:</b> ${planet.angle}°`;
    data[3].innerHTML = `<b>Volume:</b> ${planet.getVolume().toExponential(5)} km³`;
    data[4].innerHTML = `<b>Density:</b> ${~~planet.getDensity()} kg/m³`;
}
function insertImage(planet){
    let imageContainer = document.getElementById(`${planet.name}`);
    let image = document.createElement('IMG');
    image.setAttribute('src',`${planet.img}`);
    if(planet.name == 'saturn') image.setAttribute('style','width: 200px; height: 100px; margin-top: 50px;');
    else image.setAttribute('style','width: 200px; height: 200px;');
    imageContainer.appendChild(image);
}

function newPlanet(json){
    return new planet(json.englishName.toLowerCase(), json.mass, json.meanRadius, json.axialTilt, json.vol, `resources/${json.englishName.toLowerCase()}.png`);
}