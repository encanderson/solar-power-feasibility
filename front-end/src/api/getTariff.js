import axios from "axios";

export async function getTariff(energySupplier, year) {
  try {
    const response = await axios({
      method: "GET",
      baseURL: `https://apise.way2.com.br/v1/tarifas?apikey=${process.env.REACT_APP_API_KEY_WAY2}`,
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
      },
      params: {
        agente: energySupplier,
        ano: year,
      },
    });

    return response.data;
  } catch (err) {
    return null;
  }
}
