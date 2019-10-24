const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (!response || response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    } else {
      const {ip} = JSON.parse(body);
      if (!ip) {
        callback(Error('Cannot fetch IP'), null);
      } else {
        callback(null, ip);
      }
    }

  });
};


/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (!response || response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP coordinates. Response: ${body}`), null);
    } else {
      const {data: {latitude, longitude}} = JSON.parse(body);
      if (!latitude || !longitude) {
        callback(Error('Cannot geolocate IP'), null);
      } else {
        callback(null, {latitude, longitude});
      }
    }

  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function({latitude, longitude}, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (!response || response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`), null);
    } else {
      const {response: times} = JSON.parse(body);
      if (!times || !times.length) {
        callback(Error('Cannot get ISS flyover times'), null);
      } else {
        callback(null, times);
      }
    }

  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
    } else {
      fetchCoordsByIP(ip, (err, coord) => {
        if (err) {
          callback(err, null);
        } else {
          fetchISSFlyOverTimes(coord, callback);
        }
      });
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };