const Geocode = require('react-geocode');
const { googleAPIKey } = require('./keys');

Geocode.setApiKey(googleAPIKey);
Geocode.enableDebug();

exports.GetGeo = async (address) => {
    const response = await Geocode.fromAddress(address) 
    const { lat, lng } = response.results[0].geometry.location;
    return [lat, lng];
}