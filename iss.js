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
}

module.exports = { fetchMyIP, fetchCoordsByIP };