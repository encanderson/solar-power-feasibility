import { geoLocation } from "@src/utils/geolocation";

import {
  powerCorrection,
  calcTamb,
  getHsp,
  energyProduction,
  calcPvPower,
  calcAvgProduction,
  calcAreaWeight,
} from "@src/utils/power";

import { SizeInput } from "@src/@types/sizing";

export const sizing = async (
  address: string,
  nearCity: string,
  data: SizeInput
): Promise<unknown> => {
  try {
    const resp = await geoLocation(address);
    if (resp.length) {
      const lat = resp[0].latitude;
      const lon = resp[0].longitude;

      const Tamb = await calcTamb(nearCity);

      const hsp = await getHsp(data.city);

      const power = powerCorrection(Tamb);

      const energy = await energyProduction(power, data.city, lat);

      const pvPower = calcPvPower(energy, data.demand, data.disponibilidade);

      const energyArray = calcAvgProduction(energy, pvPower.number);

      const dimensions = calcAreaWeight(pvPower.number);

      return {
        temperature: Tamb,
        hsp: hsp,
        energy: energyArray.energy,
        power: pvPower.power,
        lat: lat,
        lon: lon,
        average: energyArray.average,
        city: data.city,
        state: data.state,
        distributor: data.distributor,
        demand: data.demand,
        weight: dimensions.weight,
        area: dimensions.area,
      };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
