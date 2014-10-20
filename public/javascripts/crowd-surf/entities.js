// ENTITIES
// counters
var user_id_counter = 1
  , crowd_id_counter = 1;

// User entity
function User (location) {
  // id
  this.id = user_id_counter;
  user_id_counter += 1;

  // location attributes
  this.location = {
    latitude: location.latitude,
    longitude: location.longitude
  };
  
  // map attributes and functions
  this.marker = null;
  this.place_marker = function () {
    var center = new google.maps.LatLng(
      this.location.latitude,
      this.location.longitude
    );
    var icon = {
      url: "images/crowd-person.png",
      scaledSize: new google.maps.Size(map_zoom/2, map_zoom/2)
    };
    var marker = new google.maps.Marker({
      position: center,
      map: google_map,
      icon: icon
    });
    this.marker = marker;
    return true;
  }
  this.remove_marker = function () {
    this.marker.setMap(null);
    this.marker = null;
    return true;
  }

}

// Crowd entity
function Crowd (user) {
  // id
  this.id = crowd_id_counter;
  crowd_id_counter += 1;

  // users
  this.users = [user];

  // location attributes
  this.location = {
    latitude: user.location.latitude,
    longitude: user.location.longitude
  }

  this.radius = default_radius;
  this.recalculate_location = function () {
    var users_length = this.users.length
      , x_sum = 0
      , y_sum = 0
      , z_sum = 0;

    for (var i = 0; i < users_length; i++) {
      x_sum +=  Math.cos(this.users[i].location.latitude.toRad()) * 
                Math.cos(this.users[i].location.longitude.toRad());

      y_sum +=  Math.cos(this.users[i].location.latitude.toRad()) * 
                Math.sin(this.users[i].location.longitude.toRad());

      z_sum +=  Math.sin(this.users[i].location.latitude.toRad());
    }
    x_sum = x_sum / users_length;
    y_sum = y_sum / users_length;
    z_sum = z_sum / users_length;
    var hyp = Math.sqrt(x_sum * x_sum + y_sum * y_sum);

    this.location.latitude = Math.atan2(z_sum, hyp).toDeg();
    this.location.longitude = Math.atan2(y_sum, x_sum).toDeg();

    var max_distance = 0
      , distance;
    for (var i = 0; i < users_length; i++) {
      distance = distanceBetweenUsersCrowds(this, this.users[i]);
      if (distance > max_distance){
        max_distance = distance;
      }
    }
    this.radius = max_distance + default_radius;
    return true;

  }
  
  // map attributes and functions
  this.color = _.sample(colors, 1)[0];
  this.circle = null;
  this.draw_circle = function () {
    if (this.circle) {
      this.remove_circle();
    }
    var center = new google.maps.LatLng(
      this.location.latitude,
      this.location.longitude
    );
    var circle_options = {
      strokeColor: this.color,
      strokeOpacity: 1.0,
      strokeWeight: 0.5,
      fillColor: this.color,
      fillOpacity: 0.25,
      map: google_map,
      center: center,
      radius: (this.radius * 1000)
    };
    var circle = new google.maps.Circle(circle_options);
    this.circle = circle;
    return true;
  }
  this.remove_circle = function () {
    this.circle.setMap(null);
    this.circle = null;
    return true;
  }


}