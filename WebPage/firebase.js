var config = {
    apiKey: "----------------------------------",
    authDomain: "----------------------------------",
    databaseURL: "--------------------------------",
    projectId: "-------------------------------",
    storageBucket: "--------------------------",
    messagingSenderId: "----------------------------"
  };
  firebase.initializeApp(config);

var database=firebase.database();
var ref= database.ref('latlong');
ref.on("value",getdata);


function getdata(data){
  
  ////////////////////////maps
  var options={
    zoom:12,
    center:{lat:28.7041,lng:77.1025}
  }
  var map= new google.maps.Map(document.getElementById('map'),options);
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  /////////////////////find user's location
  var x = document.getElementById("userlocation");
  var y = document.getElementById("carlocation");
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
  ////////////////////add marker for user  
  function showPosition(position) {
      x.innerHTML = "Your Location:<br>Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude;
      var a=parseFloat(position.coords.latitude);
      var b=parseFloat(position.coords.longitude);
      addMarker({lat:a,lng:b});
  }
  function addMarker(cords){
    var marker= new google.maps.Marker({
        position:cords,
        map:map
    });
  }  
//////////////add marker for car's position
  function showCarPosition(position) {
  y.innerHTML = "Cars Location:<br>Latitude , Longitude: " + position;
  geocodeLatLng(geocoder, map, infowindow,position);
}
/////////////reverseGeolocation
function geocodeLatLng(geocoder, map, infowindow,cordinates) {
    var latlngStr = cordinates.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[0].formatted_address);
          document.getElementById("address").innerHTML=results[0].formatted_address;
          infowindow.open(map, marker);
        } 
      } 
    });
}    
  //////////////////////firebase cordinates 
    console.log(data.val());
    var cordinates= data.val();
    var keys= Object.keys(cordinates);
      for(var i=0;i<keys.length;i++)
      {
        var point=keys[i];
        var cordi=cordinates[point].Latitude+","+cordinates[point].Longitude;
        console.log(cordi);
        showCarPosition(cordi);
        //console.log(cordinates[point].carNum);
     }
     
}