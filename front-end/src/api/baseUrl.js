import config from "@src/config";

const CEP_URL = config.api;

export function createApiUrl(path) {
  const url = `${CEP_URL}${path}`;
  return url;
}
