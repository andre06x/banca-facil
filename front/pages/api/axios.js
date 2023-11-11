import axios from "axios";
import { parseCookies } from "nookies";

//interceptar refetch token
export function getApiClient(ctx, tokenClient) {
  const { "nextauth.token": token } = parseCookies(ctx);
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  console.log(api);
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
