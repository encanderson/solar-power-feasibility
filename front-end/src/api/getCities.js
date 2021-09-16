import axios from "axios";

export async function getCities(uf) {
  try {
    const response = await axios({
      method: "GET",
      baseURL: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
      },
    });

    const cities = [];
    response.data.map((city, idx) => {
      cities.push(city.nome);

      return cities;
    });
    return cities;
  } catch (err) {
    return null;
  }
}
