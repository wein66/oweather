$(function(){
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
         console.log(key);
         $(this).val('');
         $('.searchinput').removeClass('act'); 
      }
  });
}); //jquery

function getWeatherLocation(){
    navigator.geolocation.getCurrentPosition(
        onWeatherSuccess, onWeatherError, { enableHighAccuracy: true }
    );
}

const onWeatherSuccess = function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
}