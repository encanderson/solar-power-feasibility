import axios from "axios";

export async function getAddress(zipCode) {
  try {
    const response = await axios({
      method: "GET",
      baseURL: `https://viacep.com.br/ws/${zipCode}/json`,
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    return null;
  }
}
