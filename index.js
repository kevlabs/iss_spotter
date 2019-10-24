const {fetchMyIP, fetchCoordsByIP} = require('./iss');

// fetchMyIP((err, ip) => console.log(err ? err : ip));
// fetchCoordsByIP('sadasd', (err, coord) => console.log(err ? err : coord));
fetchMyIP((err, ip) => {
  if (err) {
    console.log(err);
  } else {
    fetchCoordsByIP(ip, (err, coord) => console.log(err ? err : coord));
  }
});
