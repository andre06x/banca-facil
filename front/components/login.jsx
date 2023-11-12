import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "preact/hooks";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { api } from "@/pages/api/api";

const SSRDynamic = dynamic(() => import("@/components/dynamic/ssr"));
const BrowserDynamic = dynamic(() => import("@/components/dynamic/browser"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function LoginLayout() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function realizarLogin(event) {
    console.log("clicou");
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/usuario/autenticar/", form);
      const { token, usuario, nome } = response.data.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24,
      });

      setCookie(undefined, "nextauth.usuario", usuario, {
        maxAge: 60 * 60 * 24,
      });

      setCookie(undefined, "nextauth.nome", nome, {
        maxAge: 60 * 60 * 24,
      });

      const { data } = await api.get("/tipos-pagamento");
      setCookie(undefined, "tipos-pagamentos", JSON.stringify(data.content), {
        maxAge: 60 * 60 * 24,
      });

      setLoading(false);

      window.location = "/";
      //router.push("/", { scroll: false });
    } catch (err) {
      console.log(err);

      setLoading(false);
      alert(err.response.data.error);
    }
  }

  function onChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }
  return (
    <>
      <Head>
        <title>BancaFácil</title>

        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center align-middle items-center flex flex-col">
            <Image src="/logov1.png" width={250} height={250} alt="logo" className="se" />

            <h2 className="mt-3 leading-9 tracking-tight text-lg">Logue com sua conta</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={realizarLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={onChange}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Senha
                  </label>
                  <div className="text-sm hidden">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="senha"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={onChange}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? (
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <span className="text-gray-500 font-medium text-center block my-3 ">
              Não tem conta?{" "}
              <Link className="font-bold text-[#4F46E5]" href="/criar-conta">
                CADASTRA-SE
              </Link>
            </span>
          </div>
        </div>{" "}
      </main>
    </>
  );
}
