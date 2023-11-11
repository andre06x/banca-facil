import { parseCookies } from "nookies";
import { useEffect, useState } from "preact/hooks";
import { getApiClient } from "./api/axios";
import { Trash, Trash2 } from "lucide-preact";
import ModalCriarCategoria from "@/components/ModalCriarCategoria";
import { api } from "./api/api";
import { verify } from "jsonwebtoken";

export async function getServerSideProps(ctx) {
  const { "nextauth.token": token, "nextauth.usuario": id } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  const decode = await verify(token, "YXV0aC1hcGktc2VjcmV0LWNvbnRhaW5lci0xMjM0NTY=");
  const admin = decode?.auth.admin;

  if (!admin) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  const response = await api.get(`/todas-categorias/${id}`);
  const categorias = response.data.content || [];

  return { props: { categorias } };
}

export default function Categorias({ categorias: categoriasServer }) {
  const [categorias, setCategorias] = useState(categoriasServer);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function abrirModal() {
    setIsOpenModal(!isOpenModal);
  }

  async function excluirCategoria(categoria) {
    try {
      await api.delete(`/categoria/${categoria}`);
      const categoriasAtualizadas = categorias.filter((item) => item.id !== categoria);
      setCategorias(categoriasAtualizadas);
      alert("excluido com sucesso!");
    } catch (err) {
      // console.log(err.message);
      alert(err?.response.data.err || err.message);
    }
  }

  return (
    <div>
      <ModalCriarCategoria
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        categorias={categorias}
        setCategorias={setCategorias}
      />

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <div class="pb-4 pt-2 pl-1 bg-white dark:bg-gray-900">
          <div className="flex justify-between mx-3">
            <span className="text-3xl text-gray-500 ">Lista de categorias</span>
            <button
              onClick={() => abrirModal()}
              className="bg-white w-10 h-10 rounded flex items-center justify-center shadow-xl"
            >
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Categoria
              </th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria, index) => (
              <tr
                key={index}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {categoria.categoria}
                </th>
                <td class="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => excluirCategoria(categoria.id)}
                    className="ml-4"
                  >
                    <Trash2 color="red" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
