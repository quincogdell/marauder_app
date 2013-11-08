var App = {};
// var App.map;

$( "document" ).ready( function() {
  App.setEventListeners();
  debugger
  navigator.geolocation.getCurrentPosition(function(position){
    App.lat = position.coords.latitude;
    App.lng = position.coords.longitude;
    App.makeMap();
  });

});

App.setEventListeners = function() {
  $("form").on("submit", App.createUser);
  $("#drop-pin").on("click", App.dropPin);
};

App.createUser = function(e) {
  e.preventDefault();
  var newUser = {
    name: $("#user_name").val(),
    email: $("#user_email").val()
  };
  $.ajax({
    type: "POST",
    url: "/users",
    data: {user: newUser},
    dataType: "json"
  }).done( function(data) {
      $("form").reset();
      $("#notice").css("display", "inline");
      $("#notice").text("User " + data.name + " was created!");
      $("#notice").fadeOut();

    });
};

App.makeMap = function() {
  // var mapOptions = {
  //   center: new google.maps.LatLng(-34.397, 150.644),
  //   zoom: 8,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  // };
  debugger
  var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(App.lat, App.lng),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    debugger
  App.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
};


App.dropPin = function() {
  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
  });

  marker.setMap(App.map);
};


