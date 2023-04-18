const { googleAPIKey } = require('./keys');

const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client();

exports.getLatLng = async (address) => {
  const response = await client.geocode({ params: { address, key: googleAPIKey } });
  const { lat, lng } = response.data.results[0].geometry.location;
  return [lat, lng];
}