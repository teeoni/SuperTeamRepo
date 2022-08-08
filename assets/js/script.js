//HERE API LINK AND MAP CREATION//
  // Initialize the platform object
  var platform = new H.service.Platform({
    'apikey': 'hR1wLxiB5wagyEi3gKHn_WbRjPzzZ6B9Q_gyBKWAp6w'
  });

//Openweather API for latitude and longitude searching
const geoAPI = {
  key: "f8459d37bbe627c3ff7547e9a64d219d",
  baseurl: "http://api.openweathermap.org/geo/1.0/direct?q="
}

var cityLat = 0;
var cityLon = 0;
var a = 0;
var b = 0;
var c = 0;

var card1 = document.querySelector('#card1');
var card2 = document.querySelector('#card2');
var card3 = document.querySelector('#card3');





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

cardSetup()


// added the search button functionality
document.querySelector('#searchBtn').addEventListener('click',function(){
    var searchCity = document.querySelector('#city-search').value;
    console.log(searchCity);
    var searchZipCode = document.querySelector('#postal-search').value;
    console.log(searchZipCode);
    var searchBrewType = document.querySelector('#brewery-type-search').value;
    console.log(searchBrewType);
    var searchRadius = document.querySelector('#radius-search').value;
    console.log(searchRadius);
    var searchInput = [searchCity, searchZipCode, searchBrewType, searchRadius];
    findGeo(searchCity);
    searchFunc(searchInput);
    //randomeBrewTest(); 
    
})

// added test function to search for city and brewery type
function searchFunc(searchInput){
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchInput[0]}&by_type=${searchInput[2]}`)
  .then(breweries =>{ 
    return breweries.json();
  }).then(displayTest);

}


//to test for randomBrewery but turns out it just pumps out celis
function randomeBrewTest() {
  fetch("https://api.openbrewerydb.org/breweries/random")
    .then(brewery =>{
      return brewery.json();
    
    }).then(displayTest);
    
    

}

function displayTest(breweries){
  console.log(breweries); 

  for(var i = 1; i < 4; i++){
    if(i === 1) {

        a = Math.floor(Math.random() * (20-0) +1);
        
        card1.querySelector("h1").textContent = breweries[a].name;
        card1.querySelector("a").textContent = "View their website!";
        card1.querySelector("a").setAttribute("href", breweries[a].website_url);
        if(breweries[0].street === null) {
          card1.querySelector("h3").textContent = "No Address Listed.";
        }else {
          card1.querySelector("h3").textContent = breweries[a].street;
        }

        //insert lat and lons for marker API for the map


   }else if(i === 2) {

        b = Math.floor(Math.random() * (20-0) +1);
        
        card2.querySelector("h1").textContent = breweries[b].name;
        card2.querySelector("a").textContent = "View their website!";
        card2.querySelector("a").setAttribute("href", breweries[b].website_url);
        if(breweries[0].street === null) {
          card2.querySelector("h3").textContent = "No Address Listed.";
        }else {
          card2.querySelector("h3").textContent = breweries[b].street;
        }

         //insert lat and lons for marker API for the map               
    }else if(i === 3) {
      
        c = Math.floor(Math.random() * (20-0) +1);
        
        card3.querySelector("h1").textContent = breweries[c].name;
        card3.querySelector("a").textContent = "View their website!";
        card3.querySelector("a").setAttribute("href", breweries[c].website_url);
        if(breweries[0].street === null) {
          card3.querySelector("h3").textContent = "No Address Listed.";
        }else {
          card3.querySelector("h3").textContent = breweries[c].street;
        }

        //insert lat and lons for marker API for the map


      }


    }

       
  }; 
    



//Converting City search on webpage to coordinates + save to local storage
function findGeo(city){
  console.log(geoAPI.baseurl + city + "," + "&appid=" + geoAPI.key);
  fetch(geoAPI.baseurl + city + "," + "&appid=" + geoAPI.key)
  .then(coordinates =>{
      console.log(coordinates);
      return coordinates.json();
      
  }).then(linkCoord);

  
}

function linkCoord(coordinates){
  const obj = coordinates[0];
  const cityLat = obj.lat;
  const cityLon = obj.lon;

  console.log("The coordinates for searched city: " + cityLat + "," + cityLon);
  createMap(cityLon,cityLat);

}

function createMap(cityLon, cityLat){

  // Obtain the default map types from the platform object
  var maptypes = platform.createDefaultLayers();

  // Instantiate (and display) the map
  var map = new H.Map(
    
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 10,
      center: { lng: cityLon, lat: cityLat },
      
    });

   console.log("longitude, latitude: " +  longitude +","+ latitude);

}


//marker API through HERE
function addMarkersToMap(breweries) {
  var markerA = new H.map.Marker({lat:breweries[a].latitude, lng:breweries[a].longitude});
  map.addObject(markerA);

  var markerB = new H.map.Marker({lat:breweries[b].latitude, lng:breweries[b].longitude});
  map.addObject(markerB);

  var markerC = new H.map.Marker({lat:breweries[c].latitude, lng:breweries[c].longitude});
  map.addObject(markerC);

  
}




// random breweries showing on page load.
/* function randomBreweries() {
  for(var i = 1; i < 4; i++ ) {
    if(i === 1) {
      fetch('https://api.openbrewerydb.org/breweries/random')
      .then((response) => response.json())
      .then((dataResponse => {
        console.log(dataResponse);
        card1.querySelector("h1").textContent = dataResponse[0].name;
        card1.querySelector("a").textContent = "View their website!";
        card1.querySelector("a").setAttribute("href", dataResponse[0].website_url);
        if(dataResponse[0].street === null) {
          card1.querySelector("h3").textContent = "No Address Listed.";
        }else {
          card1.querySelector("h3").textContent = dataResponse[0].street;
        }
      })); 
 
    }else if(i === 2) {
      fetch('https://api.openbrewerydb.org/breweries/random')
      .then((response) => response.json())
      .then((dataResponse => {
        console.log(dataResponse);
        card2.querySelector("h1").textContent = dataResponse[0].name;
        card2.querySelector("a").textContent = "View their website!";
        card2.querySelector("a").setAttribute("href", dataResponse[0].website_url);
        if(dataResponse[0].street === null) {
          card2.querySelector("h3").textContent = "No Address Listed.";
        }else {
          card2.querySelector("h3").textContent = dataResponse[0].street;
        }
        
      })); 
    }else if(i === 3) {
      fetch('https://api.openbrewerydb.org/breweries/random')
      .then((response) => response.json())
      .then((dataResponse => {
        console.log(dataResponse);
        card3.querySelector("h1").textContent = dataResponse[0].name;
        card3.querySelector("a").textContent = "View their website!";
        card3.querySelector("a").setAttribute("href", dataResponse[0].website_url);
        if(dataResponse[0].street === null) {
          card3.querySelector("h3").textContent = "No Address Listed.";
        }else {
          card3.querySelector("h3").textContent = dataResponse[0].street;
        }
      })); 
    }
    
  }


} */

//randomBreweries()

