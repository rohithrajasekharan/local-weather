$(document).ready(function(){
  var API_KEY="4382976bd8d2e7a419dced13ecd633ff";
  var loc;
  var cel=false;
  var wd;
  function displayTemp(num, c){
    if(c) {
      return Math.round((num-32)*(5/9)) + " C";
    }else {
      return Math.round(num) + " F";
    }
  }
  function render(wd, cel) {
    var currentLocation = wd.name;
    var currentWeather = wd.weather[0].description;
    var currentTemp = displayTemp(wd.main.temp,cel);
    var high = displayTemp(wd.main.temp_max,cel);
    var low =displayTemp(wd.main.temp_min,cel);
    var icon=wd.weather[0].icon;
    $("#currentLocation").html(currentLocation);
    $("#currentTemp").html(currentTemp);
    $("#currentWeather").html(currentWeather);
    $("#high-low").html(high + " / " + low);
    var iconsrc = "http://openweathermap.org/img/w/"+icon+".png";
    $("#currentWeather").prepend('<img src="'+ iconsrc+'">');
  }
  $.getJSON("https://ipinfo.io", function(response) {
   loc=response.loc.split(",");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + loc[0] + "&lon=" + loc[1] + "&APPID=" + API_KEY, function(apiData){
    wd=apiData;
    render(apiData,cel);
    $('#toggle').on('click',function() {
      cel= !cel;
      render(wd, cel);
    })
    });
  });
});
