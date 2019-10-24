const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(times => times.forEach(({risetime, duration}) => {
    const time = new Date(0);
    time.setUTCSeconds(risetime);
    console.log(`Next pass at ${time} for ${duration} seconds!`);
  }))
  .catch(({message}) => console.error('Error:', message));