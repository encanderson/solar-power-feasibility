// const distance = (x0, y0, x1, y1) => {
//   return Math.hypot(x1 - x0, y1 - y0);
// };

let lat1 = -7.232706069946289;
let lon1 = -39.408382415771484;

let lat2 = -7.091088771820068;
let lon2 = -40.026206970214844;

const calcDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //

  const distance = R * c; // in metres

  return +(distance / 1000).toFixed(3); // distance em km
};

console.log(calcDistance(lat1, lon1, lat2, lon2));
