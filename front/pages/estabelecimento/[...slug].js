import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "preact/hooks";
import { api } from "../api/api";
import { Trash2 } from "lucide-preact";
import Venda from "@/components/Venda";
import ModalCriarProduto from "@/components/ModalCriarProduto";
import { getApiClient } from "../api/axios";
import { formatarMoeda } from "@/utils/formatPrice";
import { verify } from "jsonwebtoken";

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  const estabelecimento_id = slug[0];
  const { "nextauth.token": token, "nextauth.usuario": usuario } = parseCookies(ctx);

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

  var estabelecimento = null;

  const apiWeb = getApiClient(ctx, token);

  var responseEstabelecimento = await apiWeb.get(
    `/estabelecimento/${estabelecimento_id}`
  );
  estabelecimento = responseEstabelecimento.data.content;

  const responseProdutos = await apiWeb.get(`/todos-produtos/${estabelecimento_id}`);
  const produtos = responseProdutos.data.content;
  return { props: { produtos, usuario, estabelecimento, admin } };
}
export default function Produtos({
  estabelecimento,
  produtos: produtosServer,
  usuario,
  admin,
}) {
  const [produtos, setProdutos] = useState(produtosServer);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalTaxaProduto, setModalTaxaProduto] = useState(false);
  const [editarProduto, setEditarProduto] = useState(null);

  function buscarTodosProdutos() {
    api.get(`/todos-produtos/${estabelecimento.id}`).then((response) => {
      console.log(response.data);
      setProdutos(response.data.content || []);
    });
  }

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
  if (estabelecimento === null) return "debug";
  return (
    <div class="w-full relative overflow-x-auto shadow-md sm:rounded-lg px-1">
      <>
        {admin ? (
          <>
            <div class="pb-4 pt-2 bg-white dark:bg-gray-900">
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
            <div className="block md:hidden">
              <div class="w-full">
                {produtos.map((produto, index) => (
                  <div
                    key={index}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-4 mb-4 flex flex-row justify-between items-center"
                  >
                    <div class="flex-1 mb-2 sm:mb-0">
                      <h3 class="text-lg font-semibold">{produto?.nome}</h3>
                      <p>Preço: {formatarMoeda(Number(produto.valor))}</p>
                      <p>Disponível: {produto.quantidade_disponivel}</p>
                      <p>Categoria: {produto?.categorium?.categoria}</p>
                    </div>

                    <div class="flex items-center">
                      <button
                        type="button"
                        onClick={() => excluirProduto(produto.id)}
                        class="ml-4"
                      >
                        <Trash2 color="red" size={20} />
                      </button>

                      <button
                        type="button"
                        class="ml-4"
                        onClick={() => {
                          setEditarProduto(produto);
                          setIsOpenModal(true);
                        }}
                      >
                        EDITAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="block overflow-x-auto hidden md:block">
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
                        {formatarMoeda(Number(produto.valor))}
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
                        {produto?.categorium?.categoria}
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

                      <td class="px-6 py-4">
                        <button
                          type="button"
                          className="ml-4"
                          onClick={() => {
                            setEditarProduto(produto);
                            setIsOpenModal(true);
                          }}
                        >
                          EDITAR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ModalCriarProduto
              estabelecimento={estabelecimento.id}
              setIsOpenModal={setIsOpenModal}
              isOpenModal={isOpenModal}
              produtos={produtos}
              setProdutos={setProdutos}
              usuario={usuario}
              editarProduto={editarProduto}
              setEditarProduto={setEditarProduto}
              buscarTodosProdutos={buscarTodosProdutos}
            />
          </>
        ) : (
          ""
        )}
      </>

      {estabelecimento ? (
        <Venda estabelecimento={estabelecimento} produtos={produtos} />
      ) : (
        ""
      )}
    </div>
  );
}
