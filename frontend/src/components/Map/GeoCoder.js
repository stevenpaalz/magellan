import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
Geocode.enableDebug();

export const GetGeo = async (address) => {
    const response = await Geocode.fromAddress(address) 
    const { lat, lng } = response.results[0].geometry.location;
    return [lat, lng];
}

// export const GetAddress = (lat, lng) => {
    
//     Geocode.fromLatLng(lat, lng).then(
//         (response) => {
//             const address = response.results[0].formatted_address;
//             return address
//         },
//         (error) => {
//             console.error(error);
//         }
//     );
// }

