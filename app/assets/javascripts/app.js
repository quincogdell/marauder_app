var App = {};
// var App.map;

$( "document" ).ready( function() {
  App.setEventListeners();
  navigator.geolocation.getCurrentPosition(function(position){
    App.lat = position.coords.latitude;
    App.lng = position.coords.longitude;
    App.makeMap();
  });

});

App.watchUser = function(user_id) {
  var user_id = user_id;
  navigator.geolocation.watchPosition(function(position){
      var userUpdate = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      $.ajax({
        type: "PUT",
        url: "/users/" + user_id,
        data: {user: userUpdate},
        dataType: "json"
      }).done(function(user){
        console.log(user);
        App.dropPin(user.lat, user.lng);
      });
    });
};




// navigator.geolocation.watchPosition(function(position){
// console.log(position)
// })

App.setEventListeners = function() {
  $("form").on("submit", App.createUser);
  $("#drop-pin").on("click", App.dropPin);
};

App.createUser = function(e) {
  e.preventDefault();
  var newUser = {
    name: $("#user_name").val(),
    email: $("#user_email").val(),
    lat: App.lat,
    lng: App.lng
  };

  $.ajax({
    type: "POST",
    url: "/users",
    data: {user: newUser},
    dataType: "json"
  }).done( function(data) {
      $("form").trigger("reset");
      $("#notice").css("display", "inline");
      $("#notice").text("User " + data.name + " was created!");
      $("#notice").fadeOut();
      App.watchUser(data.id);
      App.dropPin(data.lat, data.lng);
    });
};

App.makeMap = function() {
  var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(App.lat, App.lng),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

  App.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
};


App.dropPin = function(lat, lng) {
  var myLatlng = new google.maps.LatLng(lat,lng);
  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
  });

  marker.setMap(App.map);
};


