import { api } from "@/pages/api/api";
import { Modal } from "flowbite-react";
import { parseCookies } from "nookies";
import { useState } from "preact/hooks";
import { useEffect } from "react";

export default function ModalCriarTaxa({ setIsOpenModal, isOpenModal, taxas, setTaxas }) {
  const [tiposPagamentos, setTiposPagamentos] = useState([]);
  const [formTaxa, setFormTaxa] = useState({
    nome: "",
    taxa: "",
    acumulativa: false,
    tipo_pagamento_id: "",
  });
  const [loading, setLoading] = useState(false);

  function onChange(event) {
    const { name, value } = event.target;
    setFormTaxa({ ...formTaxa, [name]: value });
  }

  async function criarTaxa(event) {
    const { "nextauth.usuario": usuario_id } = parseCookies();
    event.preventDefault();
    const data = {
      ...formTaxa,
      usuario_id,
    };
    try {
      setLoading(true);
      const response = await api.post("/taxa/", data);
      setTaxas([...taxas, response.data.content]);
      setFormTaxa({ nome: "", taxa: "", acumulativa: false, tipo_pagamento_id: "" });
      setLoading(false);
      alert("Taxa criado com sucesso!");
    } catch (err) {
      alert(err.response.data.error);
      // console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      api.get("/tipos-pagamento/").then((response) => {
        console.log(response.data.content);
        setTiposPagamentos(response.data.content);
      });
    } catch (err) {
      alert(err.response.data.error);
    }
  }, []);

  function validarTaxa(valor) {
    const regex = /^\d{1,8}(\.\d{1,2})?$/;
    return regex.test(valor);
  }

  function handleBlur(event) {
    const input = event.target;
    const valor = input.value;
    if (!validarTaxa(valor)) {
      input.setCustomValidity("Por favor, insira um número decimal válido.");
    } else {
      input.setCustomValidity("");
    }
  }

  return (
    <Modal
      style={{ zIndex: 1000, minHeight: 700 }}
      show={isOpenModal}
      onClose={() => setIsOpenModal()}
    >
      <Modal.Header>Adicionar taxa</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={criarTaxa}>
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome da taxa
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome"
                  onChange={onChange}
                  value={formTaxa.nome}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="taxa"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Valor da taxa
              </label>
              <div className="mt-2">
                <input
                  id="taxa"
                  name="taxa"
                  onChange={onChange}
                  type="text"
                  pattern="^\d{1,8}(\.\d{1,2})?$"
                  value={formTaxa.taxa}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="acumulativa"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Acumulativa
              </label>
              <div className="mt-2">
                <select name="acumulativa" onChange={onChange} required id="">
                  <option value=""></option>
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="tipo_pagamento_id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tipo de Pagamento
              </label>
              <div className="mt-2">
                <select name="tipo_pagamento_id" onChange={onChange} required id="">
                  <option value=""></option>

                  {tiposPagamentos.map((tipo, indice) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.tipo}
                    </option>
                  ))}
                </select>
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
                  "Criar taxa"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
