
// Fonction appelée lors du click du bouton
function start() {

  // pour la question3 :
  let ville = document.getElementById('city-input').value;

  if(ville === ''){
    ville = undefined;
  }
  // Création de l'objet apiWeather //modifiée pour q3
  const apiWeather = new API_WEATHER(ville);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });


    apiWeather
    .getThreeDayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;
      
      //pour que ca change de jour
      let jour=0;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      data.list.forEach((data, index) => {
        jour++;
        // Modifier le DOM
        document.getElementById(`${jour}-forecast-main`).innerHTML = main;
        document.getElementById(`${jour}-forecast-more-info`).innerHTML = description;
        document.getElementById(`${jour}-icon-weather-container`).innerHTML = icon;
        document.getElementById(`${jour}-forecast-temp`).innerHTML = `${temp}°C`;

      });

    
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

}


//Pour  que la fonction start se lance au chargement de la page
window.onload = start;
