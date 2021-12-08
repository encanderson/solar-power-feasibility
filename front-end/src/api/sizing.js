import axios from "axios";

import { createApiUrl } from "./baseUrl";

export const calcSystem = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: createApiUrl(`/api/v1/solar/pv-system`),
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  } catch (err) {
    return { status: null };
  }
};
