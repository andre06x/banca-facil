import axios from "axios";
import { parseCookies } from "nookies";
export function getApiClient(ctx, tokenClient) {
  const { "nextauth.token": token } = parseCookies(ctx);
  const api = axios.create({
    baseURL: "http://192.168.1.105:5000/api",
  });

  api.interceptors.request.use((config) => {
    console.log(config);
    return config;
  });

  if (token) {
    api.defaults.headers["Authorization"] = ` Bearer ${token}`;
  }
  if (tokenClient) {
    api.defaults.headers["Authorization"] = ` Bearer ${tokenClient}`;
  }
  return api;
}
