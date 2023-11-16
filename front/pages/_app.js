import "@/styles/globals.css";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import layoutt from "@/components/layout.jsx";
import { parseCookies } from "nookies";
import LoginLayout from "@/components/login.jsx";
import { verify } from "jsonwebtoken";
import { useEffect } from "react";
import useErrorBoundary from "./NotFound.jsx";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function ErrorFallback({ error }) {
  console.error("Erro na renderização:", error);
  return <NotFound />;
}

export default function App({ Component, pageProps, authenticated, rotas }) {
  const { "nextauth.usuario": usuario } = parseCookies();
  const Layout = authenticated ? layoutt : LoginLayout;
  const router = useRouter();
  const rotasSemAuth = ["/login", "/criar-conta"];

  useEffect(() => {
    if (!usuario && !authenticated && !rotasSemAuth.includes(router.pathname)) {
      router.push("/login");
    }
  }, [authenticated, usuario]);

  // useErrorBoundary();

  if (!authenticated) {
    return <Component {...pageProps} />;
  } else {
    return (
      <Layout rotas={rotas}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

App.getInitialProps = async ({ ctx }) => {
  const { "nextauth.token": token } = parseCookies(ctx ? ctx : undefined);

  // Verificar se o token é válido
  const authenticated = token ? true : false;
  let rotas = [];
  if (token) {
    try {
      var decode = verify(token, "YXV0aC1hcGktc2VjcmV0LWNvbnRhaW5lci0xMjM0NTY=");
    } catch (err) {}
    const admin = decode?.auth.admin;

    const rotasComuns = [{ nome: "", redirecionar: "/", icon: "" }];

    const rotasPrivadas = [
      ...rotasComuns,
      { nome: "Categorias", redirecionar: "/categorias", icon: "" },
      { nome: "Funcionários", redirecionar: "/funcionarios", icon: "" },
      { nome: "Taxas", redirecionar: "/taxas", icon: "" },
    ];
    rotas = admin ? rotasPrivadas : rotasComuns;
  } else {
  }
  return { authenticated, rotas };
};
