import { parseCookies } from "nookies";
import { useEffect, useState } from "preact/hooks";
import { getApiClient } from "./api/axios";
import { api } from "./api/api";
import ModalCriarTaxa from "@/components/ModalCriarTaxa";
import { Trash2 } from "lucide-preact";
import { formatarMoeda } from "@/utils/formatPrice";
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

  const apiWeb = getApiClient(ctx, token);

  try {
    const response = await apiWeb.get(`/todas-taxas/${id}`);
    const taxas = response.data.content;
    return { props: { taxas } };
  } catch {
    const taxas = [];
    return { props: { taxas } };
  }
}

export default function Taxas({ taxas: taxasServer }) {
  const [taxas, setTaxas] = useState(taxasServer);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function abrirModal() {
    setIsOpenModal(!isOpenModal);
  }

  async function excluirTaxa(taxa) {
    try {
      await api.delete(`/taxa/${taxa}`);
      const taxasAtualizadas = taxas.filter((item) => item.id !== taxa);
      setTaxas(taxasAtualizadas);
      alert("Taxa excluída com sucesso!");
    } catch (err) {
      console.log(err.message);
      alert(err?.response.data.err || err.message);
    }
  }

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <div class="pb-4 pt-2 pl-1 bg-white dark:bg-gray-900">
          <div className="flex justify-between mx-3">
            <span className="text-3xl text-gray-500 ">Lista de taxas</span>
            <button
              onClick={() => abrirModal()}
              className="bg-white w-10 h-10 rounded flex items-center justify-center shadow-xl"
            >
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        </div>

        <div className="w-full block md:hidden">
          {taxas.map((taxa, index) => (
            <div
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-4 mb-4 flex flex-row justify-between items-center"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <h3 className="text-lg font-semibold">{taxa.nome}</h3>
                <p>Valor: {formatarMoeda(Number(taxa.taxa))}</p>
                <p>Tipo de pagamento: {taxa.tipo_pagamento.tipo}</p>
                <p>Acumulativa: {taxa.acumulativa ? "Sim" : "Não"}</p>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => excluirTaxa(taxa.id)}
                  className="ml-4 text-red-500"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Nome da taxa
                </th>
                <th scope="col" class="px-6 py-3">
                  Valor da taxa
                </th>
                <th scope="col" class="px-6 py-3">
                  Tipo de pagamento
                </th>

                <th scope="col" class="px-6 py-3">
                  Acumulativa
                </th>
              </tr>
            </thead>
            <tbody>
              {taxas.map((taxa, index) => (
                <tr
                  key={index}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {taxa.nome}
                  </th>
                  <td className="px-6 py-4 text-gray-400">
                    <span>{formatarMoeda(Number(taxa.taxa))}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    <span>{taxa.tipo_pagamento.tipo}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    <span>{taxa.acumulativa ? "Sim" : "Não"}</span>
                  </td>
                  <td class="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => excluirTaxa(taxa.id)}
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

      <ModalCriarTaxa
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        taxas={taxas}
        setTaxas={setTaxas}
      />
    </div>
  );
}
