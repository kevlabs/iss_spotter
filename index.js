const {nextISSTimesForMyLocation} = require('./iss');

nextISSTimesForMyLocation((err, times) => {
  if (err) {
    console.log(`Didn't work: ${err}`);
    return;
  }
  times.forEach(({risetime, duration}) => {
    const time = new Date(0);
    time.setUTCSeconds(risetime);
    console.log(`Next pass at ${time} for ${duration} seconds!`)
  });

});


//TEST CODE
// fetchMyIP((err, ip) => console.log(err ? err : ip));
// fetchCoordsByIP('sadasd', (err, coord) => console.log(err ? err : coord));
// fetchISSFlyOverTimes({latitude: '43.63830', longitude: '-79.43010'}, (err, times) => console.log(err ? err : times));
// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log(err);
//   } else {
//     fetchCoordsByIP(ip, (err, coord) => {
//       if (err) {
//         console.log(err);
//       } else {
//         fetchISSFlyOverTimes(coord, (err, times) => console.log(err ? err : times));
//       }
//     });
//   }
// });
