// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { verify } from "jsonwebtoken";
import { parseCookies } from "nookies";

export default async function handler(req, res) {
  const cookies = parseCookies({ req });
  const authToken = cookies["nextauth.token"];

  const decode = await verify(authToken, "YXV0aC1hcGktc2VjcmV0LWNvbnRhaW5lci0xMjM0NTY=");
  res.status(200).json({ name: "John Doe", decode });
}
