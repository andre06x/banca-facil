import { useState } from "preact/hooks";
import { Router, useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children, rotas }) {
  const { "nextauth.nome": nome } = parseCookies();

  const router = useRouter();
  const toggleSidebar = () => {};

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const logout = () => {
    destroyCookie(undefined, "nextauth.token");
    router.push("/login");
  };

  return (
    <>
      <nav className="bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-gray-300 text-lg ml-2 font-bold text-[#6875F5]"
            >
              <Image src="/logov1.png" width={150} height={150} alt="logo" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            {/* Adicione seus links de navegação aqui */}
            {rotas.map((rota, indice) => (
              <Link className="hover:text-gray-300" href={rota.redirecionar} key={indice}>
                {rota.nome}
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNavbar}
              className="text-black focus:outline-none transition duration-300"
            >
              <svg
                className={`w-6 h-6 ${isOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Menu de navegação para dispositivos móveis */}
        {isOpen ? (
          <div className="md:hidden mt-2 transition duration-300 flex flex-col">
            {/* Adicione seus links de navegação para dispositivos móveis aqui */}

            {rotas.map((rota, indice) => (
              <Link className="hover:text-gray-300" href={rota.redirecionar} key={indice}>
                {rota.nome}
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
      </nav>

      <div className="container mx-auto p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg border-gray-700">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

/*
{rotas.map((rota, indice) => (
  <Link className="hover:text-gray-300" href={rota.redirecionar} key={indice}>
    {rota.nome}
  </Link>
))}*/
