//HERE API LINK AND MAP CREATION//
// Initialize the platform object
var platform = new H.service.Platform({
  apikey: "hR1wLxiB5wagyEi3gKHn_WbRjPzzZ6B9Q_gyBKWAp6w",
});

//Openweather API for latitude and longitude searching
const geoAPI = {
  key: "f8459d37bbe627c3ff7547e9a64d219d",
  baseurl: "http://api.openweathermap.org/geo/1.0/direct?q=",
};

var cityLat = 0;
var cityLon = 0;
var a = 0;
var b = 0;
var c = 0;
var mapisLive = 0;

/* Create Variables for Marker Tracking */
var brewALat = 0;
var brewBLat = 0;
var brewCLat = 0;
var brewALon = 0;
var brewBLon = 0;
var brewCLon = 0;
var brewAname = "";
var brewBname = "";
var brewCname = "";

var card1 = document.querySelector("#card1");
var card2 = document.querySelector("#card2");
var card3 = document.querySelector("#card3");

function cardSetup() {
  card1.textContent = " ";
  card2.textContent = " ";
  card3.textContent = " ";
  var card1NewH1 = document.createElement("h1");
  var card1NewA = document.createElement("a");
  var card1NewH3 = document.createElement("h3");
  card1.appendChild(card1NewH1);
  card1.appendChild(card1NewA);
  card1.appendChild(card1NewH3);
  var card2NewH1 = document.createElement("h1");
  var card2NewA = document.createElement("a");
  var card2NewH3 = document.createElement("h3");
  card2.appendChild(card2NewH1);
  card2.appendChild(card2NewA);
  card2.appendChild(card2NewH3);
  var card3NewH1 = document.createElement("h1");
  var card3NewA = document.createElement("a");
  var card3NewH3 = document.createElement("h3");
  card3.appendChild(card3NewH1);
  card3.appendChild(card3NewA);
  card3.appendChild(card3NewH3);
}

cardSetup();
randomBreweries();
searchRestore();

// added the search button functionality
document.querySelector("#searchBtn").addEventListener("click", function () {
  var searchCity = document.querySelector("#city-search").value;
  console.log(searchCity);
  var searchZipCode = document.querySelector("#postal-search").value;
  console.log(searchZipCode);
  var searchBrewType = document.querySelector("#brewery-type-search").value;
  console.log(searchBrewType);
  var searchRadius = document.querySelector("#radius-search").value;
  console.log(searchRadius);
  var searchInput = [searchCity, searchZipCode, searchBrewType, searchRadius];
  localStorage.setItem("savedSearch", JSON.stringify(searchInput));
  findGeo(searchCity);
  searchFunc(searchInput);
  //randomeBrewTest();
});

function searchRestore() {
  var savedSearch = JSON.parse(localStorage.getItem("savedSearch"));
  if (savedSearch !== null) {
    var searchCity = document.querySelector('#city-search');
    searchCity.value = savedSearch[0];
    var searchZipCode = document.querySelector('#postal-search');
    searchZipCode.value = savedSearch[1];
    var searchBrewType = document.querySelector('#brewery-type-search');
    searchBrewType.value = savedSearch[2];
    // Temporarily disabled
    // var searchRadius = document.querySelector('#radius-search');
    // searchRadius.value = savedSearch[3];
  } else {
    return;
  }
};

// added test function to search for city and brewery type
function searchFunc(searchInput) {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_city=${searchInput[0]}&by_type=${searchInput[2]}`
  )
    .then((breweries) => {
      return breweries.json();
    })
    .then(displayBrews);
}

//to test for randomBrewery but turns out it just pumps out celis
// function randomeBrewTest() {
//   fetch("https://api.openbrewerydb.org/breweries/random")
//     .then(brewery =>{
//       return brewery.json();

//     }).then(displayTest);

// }

function displayBrews(breweries) {
  console.log(breweries.length);

  if(breweries.length == 0){
    //modal calls here for no results found please try again
    var nullObj = document.getElementById("nullPrompt");
    nullObj.classList.remove("hidden");
    modal.classList.add("is-active");


  }else{
  for (var i = 1; i < 4; i++) {
    if (i === 1) {
      a = Math.floor(Math.random() * (20 - 0) + 1);
      if(breweries[a].name == null){
        i = 0;
      }else{
      card1.querySelector("h1").textContent = breweries[a].name;
      // card1.querySelector("a").textContent = "View their website!";
      // card1.querySelector("a").setAttribute("href", breweries[a].website_url);
      if (breweries[a].website_url === null) {
        card1.querySelector("a").textContent = "No Website Listed.";
        card1.querySelector("a").style.cursor = "default";
        card1.querySelector("a").style.color = "#363636";
        card1.querySelector("a").style.pointerEvents = "none";
      } else {
        card1.querySelector("a").textContent = "View their website!";
        card1.querySelector("a").style.cursor = "pointer";
        card1.querySelector("a").style.color = "#485fc7";
        card1.querySelector("a").style.pointerEvents = "initial";
        card1.querySelector("a").setAttribute('target', '_blank');
        card1.querySelector("a").setAttribute("href", breweries[a].website_url);
      };
      if (breweries[a].street === null) {
        card1.querySelector("h3").textContent = "No Address Listed.";
      } else {
        card1.querySelector("h3").textContent = breweries[a].street;
      }
      brewALat = breweries[a].latitude;
      brewALon = breweries[a].longitude;
      brewAname = breweries[a].name;
      }

      //insert lat and lons for marker API for the map
    } else if (i === 2) {
      b = Math.floor(Math.random() * (20 - 0) + 1);
      if(breweries[b].name == null && b == a){
        i = 0;
      }else{
      card2.querySelector("h1").textContent = breweries[b].name;
      // card2.querySelector("a").textContent = "View their website!";
      // card2.querySelector("a").setAttribute("href", breweries[b].website_url);
      if (breweries[b].website_url === null) {
        card2.querySelector("a").textContent = "No Website Listed.";
        card2.querySelector("a").style.cursor = "default";
        card2.querySelector("a").style.color = "#363636";
        card2.querySelector("a").style.pointerEvents = "none";
      } else {
        card2.querySelector("a").textContent = "View their website!";
        card2.querySelector("a").style.cursor = "pointer";
        card2.querySelector("a").style.color = "#485fc7";
        card2.querySelector("a").style.pointerEvents = "initial";
        card2.querySelector("a").setAttribute('target', '_blank');
        card2.querySelector("a").setAttribute("href", breweries[b].website_url);
      };
      if (breweries[b].street === null) {
        card2.querySelector("h3").textContent = "No Address Listed.";
      } else {
        card2.querySelector("h3").textContent = breweries[b].street;
      }
      brewBLat = breweries[b].latitude;
      brewBLon = breweries[b].longitude;
      brewBname = breweries[b].name;
      }

      //insert lat and lons for marker API for the map
    } else if (i === 3) {
      c = Math.floor(Math.random() * (20 - 0) + 1);
      if(breweries[c].name == null && c == b){
        i = 0;
      }else{
      card3.querySelector("h1").textContent = breweries[c].name;
      // card3.querySelector("a").textContent = "View their website!";
      // card3.querySelector("a").setAttribute("href", breweries[c].website_url);
      if (breweries[c].website_url === null) {
        card3.querySelector("a").textContent = "No Website Listed.";
        card3.querySelector("a").style.cursor = "default";
        card3.querySelector("a").style.color = "#363636";
        card3.querySelector("a").style.pointerEvents = "none";
      } else {
        card3.querySelector("a").textContent = "View their website!";
        card3.querySelector("a").style.cursor = "pointer";
        card3.querySelector("a").style.color = "#485fc7";
        card3.querySelector("a").style.pointerEvents = "initial";
        card3.querySelector("a").setAttribute('target', '_blank');
        card3.querySelector("a").setAttribute("href", breweries[c].website_url);
      };
      if (breweries[c].street === null) {
        card3.querySelector("h3").textContent = "No Address Listed.";
      } else {
        card3.querySelector("h3").textContent = breweries[c].street;
      }
      brewCLat = breweries[c].latitude;
      brewCLon = breweries[c].longitude;
      brewCname = breweries[c].name;
      }
      
      
      //insert lat and lons for marker API for the map
    }
  }}
}

//Converting City search on webpage to coordinates + save to local storage
function findGeo(city) {
  console.log(geoAPI.baseurl + city + "," + "&appid=" + geoAPI.key);
  fetch(geoAPI.baseurl + city + "," + "&appid=" + geoAPI.key)
    .then((coordinates) => {
      console.log(coordinates);
      return coordinates.json();
    })
    .then(linkCoord);
}

function linkCoord(coordinates) {
  const obj = coordinates[0];
  const cityLat = obj.lat;
  const cityLon = obj.lon;

  console.log("The coordinates for searched city: " + cityLat + "," + cityLon);
  createMap(cityLon, cityLat);
}


/* HERE API FUNCTIONS */
function createMap(cityLon, cityLat) {

  if(mapisLive == 1){
    const mapElement = document.getElementById("mapContainer");
    mapElement.remove();
    mapisLive = 0;
  }



  //Create the div for the map
  var obj = document.getElementById("mapSpot");
  var mapObj = document.createElement("div");
  mapObj.setAttribute("id", "mapContainer");
  obj.appendChild(mapObj);
  mapisLive = 1;

  // Obtain the default map types from the platform object
  var defaultLayers = platform.createDefaultLayers();

  // Instantiate (and display) the map
  var map = new H.Map(
    document.getElementById("mapContainer"),
    defaultLayers.vector.normal.map,
    {
      zoom: 11,
      center: { lng: cityLon, lat: cityLat },
    }
  );

  console.log("Lat and lons for Brewery A:" + brewALat + "," + brewALon);
  var ui = H.ui.UI.createDefault(map, defaultLayers);
    // Create an info bubble object at a specific geographic location:
  var bubbleA = new H.ui.InfoBubble({ lng: brewALon, lat: brewALat }, {
    content: brewAname
  });

  var bubbleB = new H.ui.InfoBubble({ lng: brewBLon, lat: brewBLat }, {
    content: brewBname
  });

  var bubbleC = new H.ui.InfoBubble({ lng: brewCLon, lat: brewCLat }, {
    content: brewCname
  });

    // Add info bubble to the UI:
  ui.addBubble(bubbleA);
  ui.addBubble(bubbleB);
  ui.addBubble(bubbleC);

}



// random breweries showing on page load.
function randomBreweries() {
  for (var i = 1; i < 4; i++) {
    if (i === 1) {
      fetch("https://api.openbrewerydb.org/breweries/random", {
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          card1.querySelector("h1").textContent = dataResponse[0].name;
          // card1.querySelector("a").textContent = "View their website!";
          // card1.querySelector("a").setAttribute("href", dataResponse[0].website_url);
          if (dataResponse[0].website_url === null) {
            card1.querySelector("a").textContent = "No Website Listed.";
            card1.querySelector("a").style.cursor = "default";
            card1.querySelector("a").style.color = "#363636";
            card1.querySelector("a").style.pointerEvents = "none";
          } else {
            card1.querySelector("a").textContent = "View their website!";
            card1.querySelector("a").style.cursor = "pointer";
            card1.querySelector("a").style.color = "#485fc7";
            card1.querySelector("a").style.pointerEvents = "initial";
            card1.querySelector("a").setAttribute('target', '_blank');
            card1.querySelector("a").setAttribute("href", dataResponse[0].website_url);
          };
          if (dataResponse[0].street === null) {
            card1.querySelector("h3").textContent = "No Address Listed.";
          } else {
            card1.querySelector("h3").textContent = dataResponse[0].street;
          };
        });
    } else if (i === 2) {
      fetch("https://api.openbrewerydb.org/breweries/random", {
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          card2.querySelector("h1").textContent = dataResponse[0].name;
          // card2.querySelector("a").textContent = "View their website!";
          // card2.querySelector("a").setAttribute("href", dataResponse[0].website_url);
          if (dataResponse[0].website_url === null) {
            card2.querySelector("a").textContent = "No Website Listed.";
            card2.querySelector("a").style.cursor = "default";
            card2.querySelector("a").style.color = "#363636";
            card2.querySelector("a").style.pointerEvents = "none";
          } else {
            card2.querySelector("a").textContent = "View their website!";
            card2.querySelector("a").style.cursor = "pointer";
            card2.querySelector("a").style.color = "#485fc7";
            card2.querySelector("a").style.pointerEvents = "initial";
            card2.querySelector("a").setAttribute('target', '_blank');
            card2.querySelector("a").setAttribute("href", dataResponse[0].website_url);
          };
          if (dataResponse[0].street === null) {
            card2.querySelector("h3").textContent = "No Address Listed.";
          } else {
            card2.querySelector("h3").textContent = dataResponse[0].street;
          };
        });
    } else if (i === 3) {
      fetch("https://api.openbrewerydb.org/breweries/random", {
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          card3.querySelector("h1").textContent = dataResponse[0].name;
          if (dataResponse[0].website_url === null) {
            card3.querySelector("a").textContent = "No Website Listed.";
            card3.querySelector("a").style.cursor = "default";
            card3.querySelector("a").style.color = "#363636";
            card3.querySelector("a").style.pointerEvents = "none";
          } else {
            card3.querySelector("a").textContent = "View their website!";
            card3.querySelector("a").style.cursor = "pointer";
            card3.querySelector("a").style.color = "#485fc7";
            card3.querySelector("a").style.pointerEvents = "initial";
            card3.querySelector("a").setAttribute('target', '_blank');
            card3.querySelector("a").setAttribute("href", dataResponse[0].website_url);
          };
          if (dataResponse[0].street === null) {
            card3.querySelector("h3").textContent = "No Address Listed.";
          } else {
            card3.querySelector("h3").textContent = dataResponse[0].street;
          };
        });
    }
  }
}

//Modal
const modalButton = document.querySelector("#modal-btn");
const modalBg = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");
const tipPrompt = document.querySelector(".modal-content");

modalButton.addEventListener("click", function () {
  tipPrompt.classList.remove("hidden");
  modal.classList.add("is-active");
  console.log("modal on");
});

modalBg.addEventListener("click", function () {
  tipPrompt.classList.add("hidden");
  modal.classList.remove("is-active");
  console.log("modal off");
});
