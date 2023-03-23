function GeoLocation() 
{
  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  else 
  {
    console.log("Geo Location not suported");
  }
}

function showPosition(position) {
  var location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude,
  };
  console.log(location);
  MakeMap(location);
}

GeoLocation();

function MakeMap(location) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFybG9ud2FuZ2VyIiwiYSI6ImNrZzlrczM2dTBzMHcyeG53cmo5aHVxdzAifQ.ZpYLP0oOyJWonF368hFnUw";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [location.longitude, location.latitude], // starting position [lng, lat]
    zoom: 15, // starting zoom
  });

  const marker1 = new mapboxgl.Marker()
    .setLngLat([location.longitude, location.latitude])
    .addTo(map);
}
