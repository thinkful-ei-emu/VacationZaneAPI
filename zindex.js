'use strict';

function displayHtml(item){
  return `<li class="search-results-js"><h1>${item.fullName}</h1>
  <p>${item.description}</p>
  <a href=${item.url}>${item.url}</a>
  </li>`;
}

function displayResults(responseJson){
  
  const results=responseJson.data.map(element=>
    displayHtml(element));
  
  $('ul').html(results);

}

function handleSubmitevent(){
  $('#search-form').submit(event=>{
    event.preventDefault();
    const searchText=$('.search-input-js').val();
    const resultsOnPage= $('.results-displayed-js').val()-1;
    const stateCodeInput=$('.state-code-input').val().toUpperCase();
    console.log(stateCodeInput);
  
    apiFetch(searchText,resultsOnPage,stateCodeInput);
  }
    
  );

  
}

function apiFetch(searchText,resultsOnPage,stateCodeInput){
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateCodeInput}&fields=[\'description\',\'fullName\',\'url\']&limit=${resultsOnPage}&api_key=lIc2hZSkulNJhmurPy7iTymjjhqjAoBMP3axXo5g&q=${searchText}`)
    .then(response=>response.json())
    .then(responseJson=>{
      displayResults(responseJson);    
    })
    .catch(error=>alert(`Failure try a different state code. ${error.message}`));
    
    
}



$(handleSubmitevent);