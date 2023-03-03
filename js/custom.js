const url = 'https://api.openweathermap.org/data/2.5/forecast';
const url2 = 'https://api.openweathermap.org/data/2.5/weather';
const mykey = '61817fe9871c5ce196a7b67a92ce3a6b';

$(function(){
   let key = '';
   let myLat = 0, myLon = 0;

   $('.threetemp-body').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      centerMode: true,
      focusOnSelect: true
   });

   $('#searchbtn').on('click', function(){
       if($('.searchinput').hasClass('act')){
          $('.searchinput').removeClass('act'); 
       }else{
          $('.searchinput').addClass('act');
          $('.searchinput input').focus();
       }
   });

  $('#search-city').on('keypress', function(e){
      if(e.which == 13 && !e.shiftKey) {
         const key = $(this).val();
         //console.log(key);
         $(this).val('');
         $('.searchinput').removeClass('act'); 
         getWeather('', '', key);
      }
  });

  if(key == ''){
     if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            myLat = position.coords.latitude;
            myLon = position.coords.longitude;
            getWeather(myLat, myLon, '');
        });
     }
  }

}); //jquery



function getWeather(lat, lon, city){
    let wdata;
    if(city){
       wdata = {
        q : city,
        appid: mykey,
        units: 'metric',
        lang: 'kr'
       }
    }else{
       wdata = {
        lat : lat,
        lon : lon,
        appid: mykey,
        units: 'metric',
        lang: 'kr'
       } 
    }
    //console.log(wdata);
    $.ajax({
        dataType: 'json',
        url: url2,
        data: wdata,
        type: 'GET',
        success: function(data) {
            console.log(data);
            let city = data.name;
            let aCity = city.split("-");
            $('#cityname').html(aCity);

            // const dt = new Date(Number(data.list[0].dt)*1000);
            const dt = new Date();
            const nhours = ampm(dt.getHours());
            const nminute = dt.getMinutes() + "분";
            let temp = data.main.temp;
            temp = temp.toFixed(1)+"°C";
            $('#temp').text(temp);
          
            //날씨 아이콘
            let icon = getWeatherIcon(data.weather[0].icon);
            icon = `<i class="wi ${icon[0]}" style="color: ${icon[1]};"></i>`;
            $('#time').html(nhours + " " + nminute);
            $('#icon').html(icon);
            $('#desc').text(data.weather[0].description);
            let sunrise = new Date(Number(data.sys.sunrise)*1000);
            let sunset = new Date(Number(data.sys.sunset)*1000);
            let temp_min = Math.round(Number(data.main.temp_min));
            let temp_max = Math.round(Number(data.main.temp_max));
            $("#min-temp").text(temp_min);
            $("#max-temp").text(temp_max);
            $("#feels_like").text(" "+data.main.feels_like+"°C");
            $("#sunrise").text(" " + vday(sunrise));
            $("#sunset").text(" " + vday(sunset));
            $("#windspeed").text(" " + data.wind.speed);
            $("#winddeg").text(" "+ data.wind.deg);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}

function ampm(t){
   let tt;
   if(t > 12 && t != 24) {
      tt = "오후" + (t-12) + "시";
   }else if(t == 24){
      tt = "오전 12시"; 
   }else if(t == 12){
      tt = "오후 12시";
   }else{
      tt = "오전" + t + "시";
   }
   return tt;
}

function vday(str){
   let h = str.getHours();
   let m = str.getMinutes();
   return h+"시"+" "+m+"분";
}

//날씨아이콘 변환
function getWeatherIcon(ic){
    let color, icon;
    switch(ic){
       case '01d':
         color = "#ff8000";
         icon = 'wi-day-sunny'; 
       break;
       case '01n':
         color = "#e8e8e8";
         icon = 'wi-nitht-sunny'; 
       break;
       case '02d':
         color = "#e8e8e8";
         icon = 'wi-day-cloudy'; 
       break;
       case '02n':
         color = "#7d7c7c";
         icon = 'wi-night-alt-cloudy'; 
       break;
       case '03d':
         color = "#e8e8e8";
         icon = 'wi-cloud'; 
       break;
       case '03n':
         color = "#7d7c7c";
         icon = 'wi-cloud'; 
       break;
       case '04d':
         color = "#e8e8e8";
         icon = 'wi-cloud'; 
       break;
       case '04n':
         color = "#7d7c7c";
         icon = 'wi-cloud'; 
       break;
       case '09d':
         color = "#deeef0";
         icon = 'wi-day-rain'; 
       break;
       case '09n':
         color = "#51686b";
         icon = 'wi-night-alt-rain'; 
       break;
       case '10d':
         color = "#deeef0";
         icon = 'wi-day-rain-wind'; 
       break;
       case '10n':
         color = "#51686b";
         icon = 'wi-night-alt-rain-wind'; 
       break;
       case '11d':
         color = "#e8d79a";
         icon = 'wi-day-thunderstorm'; 
       break;
       case '11n':
         color = "#8a7a42";
         icon = 'wi-night-thunderstorm'; 
       break;
       case '13d':
         color = "#ffffff";
         icon = 'wi-day-snow'; 
       break;
       case '13n':
         color = "#ededed";
         icon = 'wi-night-snow'; 
       break;
       case '50d':
         color = "#bebbb1";
         icon = 'wi-fog'; 
       break;
       case '50n':
         color = "#bebbb1";
         icon = 'wi-night-fog'; 
       break;
    }
    let ndt = [icon, color];
    return ndt;
}