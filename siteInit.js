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

function getPlanet(apiUrl){
    let request = new Request(apiUrl);
    let fetchedRequest = fetch(request).then(response => {
        if (response.status === 200) {
        return response.json();
    } else {
        throw new Error('Something went wrong on api server!');
    }
    }); 
    fetchedRequest.then((content)=>{
        let p = newPlanet(content);
        let data = document.querySelectorAll(`.${p.name}Data`);
        populateData(p, data);
    });  
}
function newPlanet(json){
    return new planet(json.englishName.toLowerCase(), json.mass, json.meanRadius, json.axialTilt, json.vol, `resources/${json.englishName.toLowerCase()}.png`);
}
function populateData(planet, data){
    let imageContainer = document.getElementById(`${planet.name}`);
    let image = document.createElement('IMG');
    image.setAttribute('src',`${planet.img}`);
    if(planet.name == 'saturn') image.setAttribute('style','width: 200px; height: 100px; margin-top: 50px;');
    else image.setAttribute('style','width: 200px; height: 200px;');
    imageContainer.appendChild(image);
    data[0].innerHTML = `<b>Mass:</b> ${planet.getMass().toExponential(5)} kg`;
    data[1].innerHTML = `<b>Radius:</b> ${planet.radius} km`;
    data[2].innerHTML = `<b>Angle:</b> ${planet.angle}°`;
    data[3].innerHTML = `<b>Volume:</b> ${planet.getVolume().toExponential(5)} km³`;
    data[4].innerHTML = `<b>Density:</b> ${~~planet.getDensity()} kg/m³`;
}
function addPlanet(){
    
    let selectItem = document.querySelector('#selPlanet');
    let selectedPlanet = selectItem.value;
    let capitalized = selectedPlanet.charAt(0).toUpperCase() + selectedPlanet.slice(1);
    
    if(document.getElementById(`${selectedPlanet}`) != null){
        return;
    }

    let div = document.createElement("DIV");
    div.classList.add("card");
    
    let card = `<div class="card-body">
            <h1>${capitalized}</h1>
            <div class="planet" id=${selectedPlanet}></div>
            <div>
                <p class="${selectedPlanet}Data"></p>
                <p class="${selectedPlanet}Data"></p>
                <p class="${selectedPlanet}Data"></p>
                <p class="${selectedPlanet}Data"></p>
                <p class="${selectedPlanet}Data"></p>
                <p class="${selectedPlanet}Data"></p>
            </div>
        </div>`;
    div.innerHTML = card;

    document.querySelector('#deckPlanets').appendChild(div);

    getPlanet(urlApiSolarSystem + planetsId[selectedPlanet]);
}

getPlanet(urlApiSolarSystem + planetsId['earth']);

let btn = document.querySelector('#displayPlanet');
btn.addEventListener('click', addPlanet);