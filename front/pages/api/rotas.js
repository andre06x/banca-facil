import { sign, verify } from "jsonwebtoken";
import { parseCookies } from "nookies";

export default async function handler(req, res) {
  const { "nextauth.token": token } = parseCookies();
  var decode = verify(token, "YXV0aC1hcGktc2VjcmV0LWNvbnRhaW5lci0xMjM0NTY=");
  const rotasComuns = [
    { nome: "Estabelecimentos", redirecionar: "/estabelecimentos", icon: "" },
    { nome: "Vendas", redirecionar: "/vendas", icon: "" },
    { nome: "Logout", redirecionar: "/logout", icon: "" },
  ];

  const rotasPrivadas = [
    ...rotasComuns,
    { nome: "Produtos", redirecionar: "/produtos", icon: "" },
    { nome: "Categorias", redirecionar: "/categorias", icon: "" },
    { nome: "Funcionários", redirecionar: "/funcionarios", icon: "" },
    { nome: "Taxas", redirecionar: "/taxas", icon: "" },
    { nome: "Relatórios", redirecionar: "/relatorios" },
  ];
  rotas = admin ? rotasPrivadas : rotasComuns;

  res.status(200).json({ rotas, decode });
}
