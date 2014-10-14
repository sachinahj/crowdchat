var users_counter = 1;
// constructor user function
var User = function (new_user, sid) {
  this.id = users_counter;
  users_counter += 1;
  this.name = new_user.name;
  this.sid = sid;
  this.location = {
    latitude: new_user.latitude,
    longitude: new_user.longitude,
    accuracy: new_user.accuracy
  };
  this.distance_from = function (user_crowd) {
    var lat1 = this.location.latitude;
    var lon1 = this.location.longitude;
    var lat2 = user_crowd.location.latitude;
    var lon2 = user_crowd.location.longitude;
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
};


module.exports = User;