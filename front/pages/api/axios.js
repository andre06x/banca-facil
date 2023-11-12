import axios from "axios";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";

//interceptar refetch token
export function getApiClient(ctx, tokenClient) {
  let { "nextauth.token": token } = parseCookies(ctx ? ctx : null);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
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

  if (!token && !tokenClient) {
    console.log("entrou");
    const tokenDoCookie = Cookies.get("nextauth.token");

    api.defaults.headers["Authorization"] = ` Bearer ${tokenDoCookie}`;
  }
  return api;
}
