/******************************************************************************
***
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: John De Appolonia Student ID: 101283208 Date: Jan 30, 2022
*
*
******************************************************************************
**/ 
var info;

$(document).ready(function () {

  $('#submitWeather').click(function () {

    var city = $("#city").val();

    if (city != '') {

      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/find?callback=?&q=" + city + "&units=metric&appid=54c608785529197f0d45d4ef0584ec49",
        type: "GET",
        dataType: "json",
        success: function (data) {
          info = data;
          secondCall();

        }
      });

    } else {
      alert("Please provide one city name");
    }
  });
});

function secondCall() {
  var widget;
  for (let i = 0; i < info.list.length; i++) {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?id=" + info.list[i].id + "&units=metric" + "&appid=54c608785529197f0d45d4ef0584ec49",
      type: "GET",
      dataType: "json",
      async: false,
      success: function (data) {
        //console.log(data);
        widget += show(data, i);
        //console.log(widget);
        $("#show").html(widget);
        $("#city").val("");
      }

    })
  }
}

function show(data, index) {

  console.log(new Date(data.sys.sunrise * 1000));
  var riseDate = new Date(data.sys.sunrise * 1000);
  var rise = riseDate.toLocaleTimeString();
  var setDate = new Date(data.sys.sunset * 1000);
  var time = setDate.toLocaleTimeString();
  console.log(info.list[index].name);

  return ("<h3 style='font-size:40px; font-weight: bold;'>Current Weather for " + info.list[index].name + ", " + info.list[index].sys.country +
    "<img src='http://openweathermap.org/images/flags/" + info.list[index].sys.country.toLowerCase() + ".png'></img> " + //flag
    //"<h3><img src='http://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + "@2x.png' </img> </h3>"
    "<h3><strong>Weather</strong>: " + info.list[index].weather[0].main + "</h3>" +
    "<h3><strong>Description</strong>: " + info.list[index].weather[0].description + "</h3>" +
    "<h3><strong>Temperature</strong>: " + info.list[index].main.temp + "&deg;C</h3>" +
    "<h3><strong>Pressure</strong>: " + info.list[index].main.pressure + "hPa</h3>" +
    "<h3><strong>Humidity</strong>: " + info.list[index].main.humidity + "%</h3>" +
    "<h3><strong>Min Temperature</strong>: " + info.list[index].main.temp_min + "&deg;C</h3>" +
    "<h3><strong>Max Temperature</strong>: " + info.list[index].main.temp_max + "&deg;C</h3>" +
    "<h3><strong>Wind Speed</strong>: " + info.list[index].wind.speed + "m/s</h3>" +
    "<h3><strong>Wind Direction</strong>: " + info.list[index].wind.deg + "&deg;</h3>" +
    "<h3><strong>Geo Cords</strong>: " + "[" + info.list[index].coord.lat + "," + info.list[index].coord.lon + "]" + "&deg;</h3>" +
    "<h3><strong>Clouds</strong>: " + info.list[index].clouds.all + "%</h3>" +
    "<h3><strong>Sunrise: </strong>" + rise + ", <strong>Sunset: </strong>" + time + "</h3>");

}