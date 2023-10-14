import { parseCookies } from "nookies";
import { useEffect, useState } from "preact/hooks";
import { getApiClient } from "./api/axios";
import { api } from "./api/api";
import ModalCriarTaxa from "@/components/ModalCriarTaxa";
import { Trash2 } from "lucide-preact";

export async function getServerSideProps(ctx) {
  const { "nextauth.token": token } = parseCookies(ctx);
  console.log(token);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  const { "nextauth.usuario": id } = parseCookies(ctx);
  const response = await api.get(`/todas-taxas/${id}`);
  const taxas = response.data.content;
  return { props: { taxas } };
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
      alert("excluido com sucesso!");
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
                  <span>{taxa.taxa}</span>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  <span>{taxa.tipo_pagamento.tipo}</span>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  <span>{String(taxa.acumulativa)}</span>
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

      <ModalCriarTaxa
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
        taxas={taxas}
        setTaxas={setTaxas}
      />
    </div>
  );
}
