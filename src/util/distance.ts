export function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the earth in kilometers
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
    Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}


// export function getCoordinateRange(latitude, longitude) {
//   const earthRadiusKm = 6371; // Radius of the Earth in kilometers
//   const distanceKm = 5; // Desired distance in kilometers

//   // Convert latitude and longitude to radians
//   const latRad = (latitude * Math.PI) / 180;
//   const lonRad = (longitude * Math.PI) / 180;

//   // Calculate the north-south and east-west offsets
//   const latOffset = (distanceKm / earthRadiusKm) * (180 / Math.PI);
//   const lonOffset = (distanceKm / (earthRadiusKm * Math.cos(latRad))) * (180 / Math.PI);

//   // Calculate the coordinate range
//   const minLatitude = latitude - latOffset;
//   const maxLatitude = latitude + latOffset;
//   const minLongitude = longitude - lonOffset;
//   const maxLongitude = longitude + lonOffset;

//   // Return the coordinate range as an object
//   return {
//     minLatitude,
//     maxLatitude,
//     minLongitude,
//     maxLongitude,
//   };
// }

// export function getCoordinatesRange(lat, lon, radius = 5) {
//   const earthRadius = 6371; // Earth radius in kilometers
//   const latRadians = (lat * Math.PI) / 180;
//   const lonRadians = (lon * Math.PI) / 180;
//   const dLat = (radius / earthRadius) * Math.PI;
//   const dLon = (radius / earthRadius) * Math.PI;

//   const lat2 = latRadians + (dLat / 2);
//   const lon2 = lonRadians + (dLon / 2);

//   const lat1 = latRadians - (dLat / 2);
//   const lon1 = lonRadians - (dLon / 2);

//   return {
//     latitude: lat1,
//     longitude: lon1,
//     latitude2: lat2,
//     longitude2: lon2,
//   };
// }


export function getCoordinateRange(latitude, longitude) {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers
  const distanceKm = 5; // Desired distance in kilometers

  // Convert latitude and longitude to radians
  const latRad = (latitude * Math.PI) / 180;
  const lonRad = (longitude * Math.PI) / 180;

  // Calculate the north-south and east-west offsets
  const latOffset = (distanceKm / earthRadiusKm) * (180 / Math.PI);
  const lonOffset = (distanceKm / (earthRadiusKm * Math.cos(latRad))) * (180 / Math.PI);

  // Calculate the coordinate range
  const minLatitude = latitude - latOffset;
  const maxLatitude = latitude + latOffset;
  const minLongitude = longitude - lonOffset;
  const maxLongitude = longitude + lonOffset;

  // Return the coordinate range as an object
  return {
    minLatitude,
    maxLatitude,
    minLongitude,
    maxLongitude,
  };
}

