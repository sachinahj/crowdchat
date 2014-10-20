var colors = [
  '#FF0000',
  '#FF9900',
  '#FFFF00',
  '#009933',
  '#0000FF',
  '#9900CC'
];
// HELPER FUNCTIONS
// to rad prototype function
Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}
// to deg prototype function
Number.prototype.toDeg = function() {
   return this * 180 / Math.PI;
}

// get random location for new person
function getRandomPersonLocation () {

  var north_lat = map_bounds.getNorthEast().lat();
  var south_lat = map_bounds.getSouthWest().lat();
  var east_lng = map_bounds.getNorthEast().lng();
  var west_lng = map_bounds.getSouthWest().lng();
  var rand_lat = (Math.random() * (north_lat - south_lat) + south_lat);
  var rand_lng = (Math.random() * (east_lng - west_lng) + west_lng);

  return {
    latitude: rand_lat,
    longitude: rand_lng
  };

}

// create new person and place marker
function createNewPerson () {

  window.map_bounds = google_map.getBounds();
  window.map_zoom = google_map.getZoom();

  var location = getRandomPersonLocation();
  var user = new User(location);
  user.place_marker();

  return user;

}

// distance formula between two lat/lng points
function distanceBetweenUsersCrowds (user_crowd_1, user_crowd_2) {

  var lat1 = user_crowd_1.location.latitude;
  var lon1 = user_crowd_1.location.longitude;
  var lat2 = user_crowd_2.location.latitude;
  var lon2 = user_crowd_2.location.longitude;
  var R =  6371; // km 
  var x1 = lat2-lat1;
  var dLat = x1.toRad();  
  var x2 = lon2-lon1;
  var dLon = x2.toRad();  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; 

  return d;

}

// find crowd within distance from user
function findCrowdForUser (user) {

  var all_crowds_length = all_crowds.length
  var distance;
  for (var i = 0; i < all_crowds_length; i++) {
    distance = distanceBetweenUsersCrowds(user, all_crowds[i]);
    if (distance < (all_crowds[i].radius + default_radius)) {
      all_crowds[i].users.push(user);
      all_crowds[i].recalculate_location();
      all_crowds[i].draw_circle();

      var crowd = all_crowds[i]
      return crowd;
    }
  }

  var crowd = new Crowd(user);
  crowd.draw_circle();
  all_crowds.push(crowd);

  return crowd;

}

// merge crowds that have overlapping radii
function mergeCrowds(crowd) {

  var all_crowds_length = all_crowds.length;
  var distance;
  var crowds_to_join = [];

  for (var i = 0; i < all_crowds_length; i++) {
    distance = distanceBetweenUsersCrowds(crowd, all_crowds[i]);
    if (distance < (all_crowds[i].radius + crowd.radius)) {
      crowds_to_join.push(all_crowds[i]);
    }
  }

  if (crowds_to_join.length > 1) {
    all_crowds = _.difference(all_crowds, crowds_to_join);
    var crowds_to_join_length = crowds_to_join.length;
    var big_crowd = crowds_to_join[0];

    for (var i = 1; i < crowds_to_join_length; i++) {
      crowds_to_join[i].remove_circle();
      big_crowd.users = big_crowd.users.concat(crowds_to_join[i].users);
    }
    big_crowd.recalculate_location();
    big_crowd.draw_circle();
    all_crowds.push(big_crowd);
    mergeCrowds(big_crowd);

  }

  return crowd;

}