import config from "@src/config";

const BASE_URL = config.baseUrl;

function createUrl(path) {
  const url = `${BASE_URL}${path}`;
  return url;
}
export default createUrl;
