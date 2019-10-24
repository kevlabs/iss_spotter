const request = require('request-promise-native');

const fetchMyIP = () => request({uri: 'https://api.ipify.org/?format=json', json: true})
  .then(({ip}) => {
    if (!ip) throw Error('Cannot fetch IP');
    return ip;
  });
  
const fetchCoordsByIP = (ip) => request({uri: `https://ipvigilante.com/${ip}`, json: true})
  .then(({data: {latitude, longitude}}) => {
    if (!latitude || !longitude) throw Error('Cannot geolocate IP');
    return {latitude, longitude};
  });
  
const fetchISSFlyOverTimes = ({latitude, longitude}) => request({uri: `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, json: true})
  .then(({response: times}) => {
    if (!times || !times.length) throw Error('Cannot get ISS flyover times');
    return times;
  });

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(ip => fetchCoordsByIP(ip))
    .then(coord => fetchISSFlyOverTimes(coord));
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };