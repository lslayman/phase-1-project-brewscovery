fetch("https://api.openbrewerydb.org/v1/breweries?by_state=colorado&per_page=200")
    .then((resp) => resp.json());
    .then((json) => console.log(json))
