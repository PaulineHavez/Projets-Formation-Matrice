const init = () => {
  let cachTab = []; // tableau vide pour le cash

  let button = document.querySelector("button");

  button.addEventListener("click", async () => {
    let loader = document.querySelector("#wait");
    loader.style.visibility = "visible"; // Affiche le loader
    // // loader.hidden = false;

    let input = document.getElementById("ville");
    let cityName = input.value;

    const finder = cachTab.find((element) => element.cityName === cityName);
    //  console.log(finder);

    if (finder != undefined) {
      const coordonnees = finder.coordonnees;
      const latitude = coordonnees.results[0].geometry.lat;
      const longitude = coordonnees.results[0].geometry.lng;

      const meteo = finder.meteo;
      let day = new Date(); /// récupérer l'heure actuelle afin de donner une météo plus précise selon l'heure actuelle
      console.log(day);
      let heure = day.getHours();

      ///Actualiser l'heure selon les différentes heures données par l'API :
      //si il est 10h, alors on regardera la météo au créneau horaire supérieur, donc 12h
      if (heure == 0 || heure == 1 || heure == 2) {
        newHeure = 3;
      } else if (heure == 3 || heure == 4 || heure == 5) {
        newHeure = 6;
      } else if (heure == 6 || heure == 7 || heure == 8) {
        newHeure = 9;
      } else if (heure == 9 || heure == 10 || heure == 11) {
        newHeure = 12;
      } else if (heure == 12 || heure == 13 || heure == 14) {
        newHeure = 15;
      } else if (heure == 15 || heure == 16 || heure == 17) {
        newHeure = 18;
      } else if (heure == 18 || heure == 19 || heure == 20) {
        newHeure = 21;
      } else {
        newHeure = 0;
      }

      // Si temps : refaire ce programme avec un tableau, évite les répéitions avec plein de variables pour les dates/heures
      let hour = newHeure + ":00:00"; ///adapte le format de l'écriture de l'heure actualisée à celle de l'API

      //jour actuel= 0
      let dt_txt0 = meteo.list[0].dt_txt; /// récupère dt_txt
      let date0 = dt_txt0.slice(0, 10); /// récupère la date de dt_txt
      let date1 = date0 + " " + hour; /// date + heure actuelle

      //jour 1
      let dt_txt8 = meteo.list[8].dt_txt;
      let date8 = dt_txt8.slice(0, 10);
      let date2 = date8 + " " + hour;

      //jour 2
      let dt_txt15 = meteo.list[15].dt_txt;
      let date15 = dt_txt15.slice(0, 10);
      let date3 = date15 + " " + hour;

      //jour 3
      let dt_txt23 = meteo.list[23].dt_txt;
      let date23 = dt_txt23.slice(0, 10);
      let date4 = date23 + " " + hour;

      //jour 4
      let dt_txt31 = meteo.list[31].dt_txt;
      let date31 = dt_txt31.slice(0, 10);
      let date5 = date31 + " " + hour;

      //tableau qui récupère les dates selon l'heure actuelle
      dtText1 = meteo.list.filter(
        (items) =>
          items.dt_txt == date1 ||
          items.dt_txt == date2 ||
          items.dt_txt == date3 ||
          items.dt_txt == date4 ||
          items.dt_txt == date5
      );

      let multipleChoices = document.querySelectorAll("select"); // récupère la valeur donnée dans l'input à choix multiples
      responseChoices = multipleChoices[0].value;

      const dayNight = finder.dayNight;
      const sunRise = dayNight.results.sunrise;
      const sunSet = dayNight.results.sunset;
      //  console.log(sunRise, sunSet);

      //fonction qui convertit l'heure du lever/coucher du soleil en format horaire 12H
      const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(" ");

        let [hours, minutes] = time.split(":");

        if (hours === "12") {
          hours = "00";
        }

        if (modifier === "PM") {
          hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
      };

      //convertit en nombre les heures du lever/coucher du soleil format 12H
      let sunRise12 = parseInt(
        convertTime12to24(sunRise).replace(/:/g, "") + "00"
      );
      let sunSet12 = parseInt(
        convertTime12to24(sunSet).replace(/:/g, "") + "00"
      );

      const responseHourAPI = finder.responseHourAPI;
      let localHour = responseHourAPI.formatted.split(" "); // adapation du format de l'heure
      let shortLocalHour = parseInt(localHour[1].replace(/:/g, ""));

      // programme qui compare les heures et affiche le darkMode
      // if (shortLocalHour > sunRise12 && shortLocalHour < sunSet12) {
      //   let mode = "jour";
      // } else {
      //   mode = "nuit";
      //   let darkMode = document.querySelector("body");
      //   darkMode.style.backgroundColor = "blue";
      // }
    } else {
      let responseCity = await fetch(
        // requête à l'API pour avoir les coordonnées de la ville
        `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=c9ddbd603c8a4c24ae719e9f3279a3ea`
      );
      const coordonnees = await responseCity.json();

      const latitude = coordonnees.results[0].geometry.lat;
      const longitude = coordonnees.results[0].geometry.lng;

      let response = await fetch(
        // requête à l'API pour avoir la météo selon les coordonnées de la ville
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=49ccc9c60253cafc3df4627c8c346828`
      );
      const meteo = await response.json();

      let day = new Date(); /// récupérer l'heure actuelle afin de donner une météo plus précise selon l'heure actuelle
      let heure = day.getHours();

      ///Actualiser l'heure selon les différentes heures données par l'API :
      //si il est 10h, alors on regardera la météo au créneau horaire supérieur, donc 12h
      if (heure == 0 || heure == 1 || heure == 2) {
        newHeure = 3;
      } else if (heure == 3 || heure == 4 || heure == 5) {
        newHeure = 6;
      } else if (heure == 6 || heure == 7 || heure == 8) {
        newHeure = 9;
      } else if (heure == 9 || heure == 10 || heure == 11) {
        newHeure = 12;
      } else if (heure == 12 || heure == 13 || heure == 14) {
        newHeure = 15;
      } else if (heure == 15 || heure == 16 || heure == 17) {
        newHeure = 18;
      } else if (heure == 18 || heure == 19 || heure == 20) {
        newHeure = 21;
      } else {
        newHeure = 0;
      }

      // Si temps : refaire ce programme avec un tableau, évite les répéitions avec plein de variables pour les dates/heures
      let hour = newHeure + ":00:00"; ///adapte le format de l'écriture de l'heure actualisée à celle de l'API

      //jour actuel= 0
      let dt_txt0 = meteo.list[0].dt_txt; /// récupère dt_txt
      let date0 = dt_txt0.slice(0, 10); /// récupère la date de dt_txt
      let date1 = date0 + " " + hour; /// date + heure actuelle

      //jour 1
      let dt_txt8 = meteo.list[8].dt_txt;
      let date8 = dt_txt8.slice(0, 10);
      let date2 = date8 + " " + hour;

      //jour 2
      let dt_txt15 = meteo.list[15].dt_txt;
      let date15 = dt_txt15.slice(0, 10);
      let date3 = date15 + " " + hour;

      //jour 3
      let dt_txt23 = meteo.list[23].dt_txt;
      let date23 = dt_txt23.slice(0, 10);
      let date4 = date23 + " " + hour;

      //jour 4
      let dt_txt31 = meteo.list[31].dt_txt;
      let date31 = dt_txt31.slice(0, 10);
      let date5 = date31 + " " + hour;

      //tableau qui récupère les dates selon l'heure actuelle
      dtText1 = meteo.list.filter(
        (items) =>
          items.dt_txt == date1 ||
          items.dt_txt == date2 ||
          items.dt_txt == date3 ||
          items.dt_txt == date4 ||
          items.dt_txt == date5
      );

      let multipleChoices = document.querySelectorAll("select"); // récupère la valeur donnée dans l'input à choix multiples
      responseChoices = multipleChoices[0].value;

      //requête à l'API SunSet pour avoir l'heure du lever/coucher du soleil
      let responseSunSet = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today`
      );
      const dayNight = await responseSunSet.json();

      // console.log(dayNight); //
      const sunRise = dayNight.results.sunrise;
      const sunSet = dayNight.results.sunset;
      //  console.log(sunRise, sunSet);

      //fonction qui convertit l'heure du lever/coucher du soleil en format horaire 12H
      const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(" ");

        let [hours, minutes] = time.split(":");

        if (hours === "12") {
          hours = "00";
        }

        if (modifier === "PM") {
          hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
      };

      //convertit en nombre les heures du lever/coucher du soleil format 12H
      let sunRise12 = parseInt(
        convertTime12to24(sunRise).replace(/:/g, "") + "00"
      );
      let sunSet12 = parseInt(
        convertTime12to24(sunSet).replace(/:/g, "") + "00"
      );

      //requête à l'API TimeZone pour savoir l'heure actuelle de la ville & adapation du format de l'heure
      let hourAPI = await fetch(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=G9W4OOISZDIE&format=json&by=position&lat=${latitude}&lng=${longitude}`
      );

      const responseHourAPI = await hourAPI.json();

      // objet à pusher dans le tableau vide qui sera utilisé pour le cache
      const cachObject = {
        coordonnees: coordonnees,
        meteo: meteo,
        dayNight: dayNight,
        responseHourAPI: responseHourAPI,
        cityName: cityName,
      };

      //console.log(cachObject.cityName);
      cachTab.push(cachObject);
      // console.log(cachTab);

      let localHour = responseHourAPI.formatted.split(" "); // adapation du format de l'heure
      let shortLocalHour = parseInt(localHour[1].replace(/:/g, "")); //

      // programme qui compare les heures et affiche le darkMode
      if (shortLocalHour > sunRise12 && shortLocalHour < sunSet12) {
        console.log("ok");
        let mode = "jour";
        let dayMode = document.querySelector("body");
        dayMode.style.backgroundColor = "lightblue";
      } else {
        mode = "nuit";
        let darkMode = document.querySelector("body");
        darkMode.style.backgroundColor = "blue";
      }
    }
    //cache les divs container avant de lancer la recherche avec Submit
    let affichage = document.querySelectorAll(".container");
    for (let element of affichage) {
      element.style.display = "none";
    }

    //Boucle pour afficher les images selon la météo/ville/heure
    for (var j = 0; j < responseChoices; j++) {
      // loader.hidden = true;
      loader.style.visibility = "hidden"; // Masque le loader
      let weather = dtText1[j].weather[0].main; // récupération de weather
      let clouds = dtText1[j].clouds.all; // récupération de clouds

      affichage[j].style.display = "block"; // affiche les divs container

      let newDate = new Date(dtText1[j].dt_txt); /// cherche la date du jour[j] // en-GB à
      let nameDay = newDate.toLocaleDateString("en-EN", { weekday: "long" }); // récupère le nom du jour[j]

      ///conditions pour afficher les bons logos selon le temps
      if (weather == "Clouds" && clouds > 50) {
        affichage[j].innerHTML =
          "<h1>" + nameDay + '</h1><img src="clouds.svg" />';
      } else if (weather == "Clouds" && clouds > 0 && clouds < 50) {
        affichage[j].innerHTML =
          "<h1>" + nameDay + '</h1><img src="cloudy.svg" />';
      } else if (weather == "Clear") {
        affichage[j].innerHTML =
          "<h1>" + nameDay + '</h1><img src="sun.svg" />';
      } else if (weather == "Snow") {
        affichage[j].innerHTML =
          "<h1>" + nameDay + '</h1><img src="snow.svg" />';
      } else {
        affichage[j].innerHTML =
          "<h1>" + nameDay + '</h1><img src="rain.svg" />';
      }
    }
  });
};

init();

//Manque du projet :
//* refactoring
//* responsive (je l'ai complètement oublié)
//*faire fonctionner le loader
