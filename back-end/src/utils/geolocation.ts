import NodeGeocoder from "node-geocoder";

import { fetchAdapter, OsmGeocoder } from "@spurreiter/geocoder";

const adapter = fetchAdapter();
const geocoder = new OsmGeocoder(adapter, { language: "en", limit: 3 });

export const geoLocation = async (
  address: string
): Promise<NodeGeocoder.Entry[]> => {
  const results = await geocoder.forward(address);

  return results;
};

export const calcDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
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
