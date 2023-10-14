import { parseCookies } from "nookies";
import { useEffect, useState } from "preact/hooks";
import dynamic from "next/dynamic";
import { getApiClient } from "./api/axios";
import { api } from "./api/api";
import { Trash2 } from "lucide-preact";
import ModalCriarProduto from "@/components/ModalCriarProduto";

const MapaComponente = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const ModalCriarEstabelecimento = dynamic(
  () => import("@/components/ModalCriarEstabelecimento"),
  {
    ssr: false,
  }
);

export async function getServerSideProps(ctx) {
  const { "nextauth.token": token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return { props: { token } };
}

export default function Home({ token }) {
  const { "nextauth.usuario": id } = parseCookies();
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const [estabelecimento, setEstabelecimento] = useState({});

  const abrirModal = () => setOpenModal(!isOpenModal);

  useEffect(() => {
    if (token) {
      console.log(token);
      try {
        const apiWeb = getApiClient(null, token);
        apiWeb.get(`/todos-estabelecimentos/${id}`).then((response) => {
          console.log(response.data);
          setEstabelecimentos(response.data.content);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [token]);

  return (
    <div>
      <div className="flex justify-between  mb-7">
        <h1 className="text-3xl">Bancas</h1>
        <button
          onClick={() => abrirModal()}
          className="bg-white w-10 h-10 rounded flex items-center justify-center shadow-xl"
        >
          <span className="text-lg font-bold">+</span>
        </button>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {estabelecimentos.map((estabelecimento) => (
          <div
            onClick={() => setEstabelecimento(estabelecimento)}
            className="bg-white col-span-12 md:col-span-4 p-5 rounded h-72 shadow-xl"
          >
            <div className="text-center ">{estabelecimento.nome_estabelecimento}</div>
            <div>
              <MapaComponente estabelecimento={estabelecimento} />
            </div>
          </div>
        ))}
      </div>
      <ModalCriarEstabelecimento
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
        estabelecimentos={estabelecimentos}
        setEstabelecimentos={setEstabelecimentos}
      />

      {estabelecimento.id ? (
        <Produtos estabelecimento={estabelecimento} usuario={id} />
      ) : (
        ""
      )}
    </div>
  );
}

function Produtos({ estabelecimento, usuario }) {
  const [produtos, setProdutos] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    api.get(`/todos-produtos/${estabelecimento.id}`).then((response) => {
      console.log(response.data);
      setProdutos(response.data.content || []);
    });
  }, [estabelecimento]);

  async function excluirProduto(id) {
    try {
      await api.delete(`/produto/${id}`);
      const produtosAtualizados = produtos.filter((item) => item.id !== id);
      setProdutos(produtosAtualizados);
      alert("excluido com sucesso!");
    } catch (err) {
      // console.log(err.message);
      alert(err.message);
    }
  }
  return (
    <div class="mt-20 relative overflow-x-auto shadow-md sm:rounded-lg p-3">
      <div class="pb-4 pt-2 pl-1 bg-white dark:bg-gray-900">
        <div className="flex justify-between mx-3">
          <span className="text-3xl text-gray-500 ">
            Lista de produtos {estabelecimento.nome_estabelecimento}
          </span>
          <button
            onClick={() => setIsOpenModal(true)}
            className="bg-white w-10 h-10 rounded flex items-center justify-center shadow-xl"
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3"></th>

            <th scope="col" class="px-6 py-3">
              Nome
            </th>
            <th scope="col" class="px-6 py-3">
              Valor
            </th>
            <th scope="col" class="px-6 py-3">
              Disponivel
            </th>
            <th scope="col" class="px-6 py-3">
              Categoria
            </th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr
              key={index}
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th scope="col" class="px-6 py-3"></th>

              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {produto.nome}
              </th>

              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {produto.valor}
              </th>

              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {produto.quantidade_disponivel}
              </th>

              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {produto.categorium.categoria}
              </th>

              <td class="px-6 py-4">
                <button
                  type="button"
                  onClick={() => excluirProduto(produto.id)}
                  className="ml-4"
                >
                  <Trash2 color="red" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalCriarProduto
        estabelecimento={estabelecimento.id}
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        produtos={produtos}
        setProdutos={setProdutos}
        usuario={usuario}
      />
    </div>
  );
}
