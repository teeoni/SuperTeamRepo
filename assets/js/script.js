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

cardSetup();
randomBreweries();
searchRestore();

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
    localStorage.setItem("savedSearch", JSON.stringify(searchInput));
    searchFunc(searchInput);
    //randomeBrewTest();
    console.log("Search should have fired");
});

function searchRestore() {
  var savedSearch = JSON.parse(localStorage.getItem("savedSearch"));
  if (savedSearch !== null) {
    var searchCity = document.querySelector('#city-search');
    searchCity.value = savedSearch[0];
    // Temporarily disabled
    // var searchZipCode = document.querySelector('#postal-search');
    // searchZipCode.value = savedSearch[1];
    var searchBrewType = document.querySelector('#brewery-type-search');
    searchBrewType.value = savedSearch[2];
    // Temporarily disabled
    // var searchRadius = document.querySelector('#radius-search');
    // searchRadius.value = savedSearch[3];
  } else {
    return;
  }
}

// added test function to search for city and brewery type
function searchFunc(searchInput){
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchInput[0]}&by_type=${searchInput[2]}`)
  .then(breweries =>{ 
    return breweries.json();
  }).then(displayTest);
}


//to test for randomBrewery but turns out it just pumps out celis
// function randomeBrewTest() {
//   fetch("https://api.openbrewerydb.org/breweries/random")
//     .then(brewery =>{
//       return brewery.json();
    
//     }).then(displayTest);
    
// }

function displayTest(breweries){
  console.log(breweries); 
  
  for(var i = 1; i < 4; i++){
    if(i === 1) {

        const a = Math.floor(Math.random() * (20-0) +1);
        
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

        const b = Math.floor(Math.random() * (20-0) +1);
        
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
      
        const c = Math.floor(Math.random() * (20-0) +1);
        
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
    






// random breweries showing on page load.
 function randomBreweries() {
  for(var i = 1; i < 4; i++ ) {
    if(i === 1) {
      fetch('https://api.openbrewerydb.org/breweries/random', {cache: "no-cache"})
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
      fetch('https://api.openbrewerydb.org/breweries/random', {cache: "no-cache"})
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
      fetch('https://api.openbrewerydb.org/breweries/random', {cache: "no-cache"})
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



