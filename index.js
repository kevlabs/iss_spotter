const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

// fetchMyIP((err, ip) => console.log(err ? err : ip));
// fetchCoordsByIP('sadasd', (err, coord) => console.log(err ? err : coord));
// fetchISSFlyOverTimes({latitude: '43.63830', longitude: '-79.43010'}, (err, times) => console.log(err ? err : times));
fetchMyIP((err, ip) => {
  if (err) {
    console.log(err);
  } else {
    fetchCoordsByIP(ip, (err, coord) => {
      if (err) {
        console.log(err);
      } else {
        fetchISSFlyOverTimes(coord, (err, times) => console.log(err ? err : times));
      }
    });
  }
});
