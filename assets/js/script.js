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
    searchFunc(searchInput);
})

// added test function to search for city and brewery type
function searchFunc(searchInput){
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchInput[0]}&by_type=${searchInput[2]}`)
  .then((response) => response.json())
  .then((dataResponse => {
  console.log(dataResponse);
  } ));
}

// random breweries showing on page load.
function randomBreweries() {
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


}

randomBreweries()

