import { api } from "@/pages/api/api";
import { Modal } from "flowbite-react";
import { parseCookies } from "nookies";
import { useState } from "preact/hooks";
import { useEffect } from "react";

export default function ModalCriarProduto({
  setIsOpenModal,
  isOpenModal,
  produtos,
  setProdutos,
  estabelecimento,
  usuario,
  editarProduto,
  setEditarProduto,
  buscarTodosProdutos,
}) {
  const [categorias, setCategorias] = useState([]);
  const [formProduto, setFormProduto] = useState({});
  const [taxasFiltradas, setTaxasFiltradas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taxaSelecionada, setTaxaSelecionada] = useState("");

  useEffect(() => {
    const produtoBase = editarProduto
      ? editarProduto
      : { nome: "", valor: "", quantidade_disponivel: false, categoria_id: "" };
    console.log(produtoBase);
    setFormProduto(produtoBase);
  }, [editarProduto]);

  function onChange(event) {
    const { name, value } = event.target;
    setFormProduto({ ...formProduto, [name]: value });
  }

  async function criarTaxa(event) {
    event.preventDefault();

    if (!editarProduto) {
      const data = {
        ...formProduto,
        estabelecimento_id: estabelecimento,
      };

      try {
        setLoading(true);
        const response = await api.post("/produto", data);
        setProdutos([...produtos, response.data.content]);
        setFormProduto({
          nome: "",
          valor: "",
          quantidade_disponivel: false,
          categoria_id: "",
        });
        setLoading(false);
        alert("Produto criado com sucesso!");
      } catch (err) {
        alert(err.response.data.error);
        // console.log(err);
        setLoading(false);
      }
    } else {
      console.log("Atualizar");
    }
  }

  useEffect(() => {
    try {
      api.get(`/todas-categorias/${usuario}`).then((response) => {
        setCategorias(response.data.content);
      });
      api.get(`/todas-taxas/${usuario}`).then((response) => {
        var taxasFiltradas = [];
        if (editarProduto) {
          const produto = editarProduto;
          const tiposPagamentoFiltrados = [];

          let taxasCadastradas = response.data.content || [];

          // Filtrando taxas que não existem no produto
          for (let i = 0; i < taxasCadastradas.length; i++) {
            const taxa = taxasCadastradas[i];
            let existeTaxa = false;
            let existeTipoPagamento = false;

            // Verifica se a taxa já existe no produto
            for (let j = 0; j < produto.produto_taxas.length; j++) {
              const produtoTaxa = produto.produto_taxas[j];
              if (produtoTaxa.taxa.id === taxa.id) {
                existeTaxa = true;
                break;
              }
            }

            // Verifica se o tipo de pagamento já existe no produto
            for (let j = 0; j < produto.produto_taxas.length; j++) {
              const produtoTaxa = produto.produto_taxas[j];
              if (produtoTaxa.taxa.tipo_pagamento.id === taxa.tipo_pagamento.id) {
                existeTipoPagamento = true;
                break;
              }
            }

            // Adiciona a taxa filtrada se não existir no produto e não tiver o tipo de pagamento já cadastrado
            if (!existeTaxa && !existeTipoPagamento) {
              taxasFiltradas.push(taxa);
            }
          }
          console.log(taxasFiltradas);
        }
        setTaxasFiltradas(taxasFiltradas);
      });
    } catch (err) {
      alert(err.response.data.error);
    }
  }, [editarProduto]);

  async function excluirVinculo(id) {
    try {
      console.log(id);
      const response = await api.delete(
        `/produto-taxa/${id}/produto/${editarProduto.id}`
      );
      setEditarProduto(response.data.content);

      buscarTodosProdutos();
      alert("Excluido com sucesso");
    } catch (err) {
      console.log(err);
    }
  }

  async function adicionarTaxa() {
    if (taxaSelecionada === "") {
      return alert("Selecione uma taxa para continuar");
    }
    try {
      const data = {
        produto_id: editarProduto.id,
        taxa_id: taxaSelecionada,
      };
      const response = await api.post(`/produto-taxa`, data);
      setEditarProduto(response.data.content);
      setTaxaSelecionada("");
      alert("Vinculado com sucesso!");
      buscarTodosProdutos();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      style={{ zIndex: 1000, minHeight: 700 }}
      show={isOpenModal}
      onClose={() => {
        setIsOpenModal();
        setEditarProduto(null);
      }}
    >
      <Modal.Header>
        {editarProduto ? `${editarProduto.nome} edição ` : "Adicionar produto"}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={criarTaxa}>
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome produto
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome"
                  onChange={onChange}
                  value={formProduto.nome}
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
                Preço
              </label>
              <div className="mt-2">
                <input
                  id="valor"
                  name="valor"
                  onChange={onChange}
                  type="text"
                  pattern="^\d{1,8}(\.\d{1,2})?$"
                  value={formProduto.valor}
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
                Categoria
              </label>
              <div className="mt-2">
                <select
                  name="categoria_id"
                  onChange={onChange}
                  required
                  id=""
                  value={formProduto.categoria_id}
                >
                  <option value=""></option>
                  {categorias.map((categoria, index) => (
                    <option value={categoria.id} key={index}>
                      {categoria.categoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="taxa"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantidade disponivel
              </label>
              <div className="mt-2">
                <input
                  id="quantidade_disponivel"
                  name="quantidade_disponivel"
                  onChange={onChange}
                  value={formProduto.quantidade_disponivel}
                  type="number"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <h4 className="text-lg">Produto Taxas</h4>
            <div>
              {editarProduto?.produto_taxas.map(({ taxa, id }) => (
                <div className="flex space-x-3">
                  <div>{taxa.nome}</div>
                  <div>{taxa.taxa}</div>
                  <div>{taxa.acumulativa}</div>
                  <div>{taxa.tipo_pagamento.tipo}</div>
                  <button type="button" onClick={() => excluirVinculo(id)}>
                    Excluir
                  </button>
                </div>
              ))}

              <h3 className="my-6">adicionar taxa</h3>
              <div className="flex ">
                <select
                  name=""
                  id=""
                  value={taxaSelecionada}
                  onChange={(e) => setTaxaSelecionada(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {taxasFiltradas.map((taxa) => (
                    <option value={taxa.id}>{`${taxa.nome} ${taxa.taxa} ${
                      taxa.acumulativa ? "acumulativa" : "não acumulativa"
                    } ${taxa.tipo_pagamento.tipo}`}</option>
                  ))}
                </select>
                <button type="button" className="" onClick={() => adicionarTaxa()}>
                  Adicionar
                </button>
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
                  <span>{editarProduto ? "Atualizar produto" : "Adicionar produto"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
