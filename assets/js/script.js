// added a click event 
document.querySelector('#searchBtn').addEventListener('click',function(){
    var searchInput = document.querySelector('#city-search').value
    console.log(searchInput);
    searchCity(searchInput);
})
// added test function to search for city 
function searchCity(searchInput){
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchInput}`)
  .then((response) => response.json())
  .then((dataResponse => {
    console.log(dataResponse);
  } ));
}
