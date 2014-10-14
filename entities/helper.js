// to rad prototype function
Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}
// to deg prototype function
Number.prototype.toDeg = function() {
   return this * 180 / Math.PI;
}


// delete user from crowd and return updated crowd, disband crowd if only 1 user
var deleteUserInCrowdFromSid = function (sid) {
  for (var i = 0; i < available_crowds.length; i++) {
    for (var j = 0; j < available_crowds[i].users.length; j++) {
      if (sid === available_crowds[i].users[j].sid) {
        var user = available_crowds[i].users.splice(j,1);
        var crowd = available_crowds[i];
        if (crowd.users.length > 1) {
          return [crowd, crowd.id];
        } else {
          available_crowds.splice(i,1);
          return [{}, crowd.id];
        }
      }
    }
  }  
  return null;
}


// create new message for crowd from crowd id and return updated crowd
var createMessageForCrowd = function (new_message, crowd_id) {

  for (var i = 0; i < available_crowds.length; i++) {
    if (available_crowds[i].id === crowd_id) {
      var message = available_crowds[i].addMessage(new_message.user_id, new_message.name, new_message.content);
      var crowd = available_crowds[i];
      return crowd;
    }
  }  

  return false;
}

// determine midpoint between two location objects
var DetermineMidPoint = function (location1, location2) {

  var lat1 = location1.latitude;
  var lon1 = location1.longitude;
  var lat2 = location2.latitude;
  var lon2 = location2.longitude;
  
  var x2 = lon2-lon1;
  var dLon = x2.toRad();

  lat1 = lat1.toRad();
  lat2 = lat2.toRad();
  lon1 = lon1.toRad();
  lon2 = lon2.toRad();

  var Bx = Math.cos(lat2) * Math.cos(dLon);
  var By = Math.cos(lat2) * Math.sin(dLon);
  var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
  var lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

  return {
    latitude: lat3.toDeg(),
    longitude: lon3.toDeg()
  }
}


// get crowd at new users location or create crowd with lone user or return null
var getCrowd = function (new_user) {

  for (var i = 0; i < available_crowds.length; i++) {
    if (new_user.distance_from(available_crowds[i]) < 1) {
      var crowd = available_crowds[i].addUser(new_user);
      return [crowd, "update"];
    }
  }

  for (var i = 0; i < lone_users.length; i++) {
    if (new_user.distance_from(lone_users[i]) < 1) {
      var found_user = lone_users.splice(i,1)[0];
      var midpoint_location = DetermineMidPoint(found_user.location, new_user.location)
      var new_crowd = new Crowd(midpoint_location, [found_user, new_user]);
      for (var i = 0; i < new_crowd.users.length; i++) {
        clients[new_crowd.users[i].sid].join(new_crowd.id);
      }
      available_crowds.push(new_crowd)
      return [new_crowd, "new"];
    }
  }
  
  lone_users.push(new_user);
  return [null, "none"];  
}






module.exports.deleteUserInCrowdFromSid = deleteUserInCrowdFromSid;
module.exports.createMessageForCrowd = createMessageForCrowd;
module.exports.getCrowd = getCrowd;
module.exports.DetermineMidPoint = DetermineMidPoint;

