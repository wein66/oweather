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
    const mykey = '61817fe9871c5ce196a7b67a92ce3a6b';
    const url = '//api.openweathermap.org/data/2.5/forecast';
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
        url: url,
        data: wdata,
        type: 'GET',
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
}

