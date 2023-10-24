import { api } from "@/pages/api/api";
import { formatarMoeda } from "@/utils/formatPrice";
import { Modal } from "flowbite-react";
import { CircleDollarSign, CreditCard, ShoppingBag } from "lucide-preact";
import { parseCookies } from "nookies";
import { useState } from "preact/hooks";
import { useEffect } from "react";

export async function getServerSideProps() {
  console.log("teste");

  return {
    props: {},
  };
}

export default function ModalRealizarVenda({
  estabelecimento,
  carrinho,
  setCarrinho,
  isOpenModal,
  setIsOpenModal,
}) {
  const [loading, setLoading] = useState(false);
  const [pagamentos, setPagamentos] = useState([]);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState("");
  const [calculoValor, setCalculoValor] = useState({
    total: 0,
    totalProdutos: 0,
    totalTaxas: 0,
  });

  useEffect(() => {
    console.log("teste");
    let { "tipos-pagamentos": tipos } = parseCookies();
    tipos = JSON.parse(tipos);
    setPagamentos(tipos);
    console.log(carrinho);
  }, [carrinho]);

  useEffect(() => {
    const calcularTaxaFinal = () => {
      let totalTaxas = 0;

      carrinho.forEach((produto) => {
        const taxas = produto.produto_taxas
          .map((produtoTaxa) => produtoTaxa.taxa)
          .filter((taxa) => taxa.tipo_pagamento_id === pagamentoSelecionado.id);

        if (taxas.length > 0) {
          const { taxa, acumulativa } = taxas[0];
          const valorTaxa = acumulativa
            ? Number(taxa) * produto.quantidade
            : Number(taxa);

          totalTaxas += valorTaxa;
        }
      });

      let totalProdutos = 0;
      carrinho.forEach((item) => {
        totalProdutos += item.quantidade * Number(item.valor);
      });

      const total = totalProdutos + totalTaxas;
      setCalculoValor({ totalProdutos, totalTaxas, total });
    };

    calcularTaxaFinal();
  }, [carrinho, pagamentoSelecionado]);

  async function realizarVenda(event) {
    event.preventDefault();

    if (carrinho.length < 1) {
      return alert("Não é possível realizar a venda com carrinho vazio...");
    }

    if (pagamentoSelecionado === "") {
      return alert("É necessário selecionar um tipo de pagamento...");
    }
    let { "nextauth.usuario": usuario_id } = parseCookies();

    const produtos = carrinho.map((c) => ({
      produto_id: c.id,
      quantidade: c.quantidade,
    }));
    const data = {
      usuario_id,
      estabelecimento_id: estabelecimento.id,
      tipo_pagamento_id: pagamentoSelecionado.id,
      produtos,
    };

    try {
      const response = await api.post("/venda-status", data);
      alert("Venda realizada com sucesso.");
      setCarrinho([]);
      setIsOpenModal(false);
    } catch (err) {
      alert(err.response.data.error[0].aviso);
    }
    console.log(JSON.stringify(data));
  }

  function alterarQuantidade(tipo, produto) {
    const quantidadeAtual = produto.quantidade;
    let updatedCart = [...carrinho];
    const produtoIndex = carrinho.findIndex((item) => item.id === produto.id);
    const proximaQuantidade = tipo === "add" ? quantidadeAtual + 1 : quantidadeAtual - 1;

    if (proximaQuantidade < 1) {
      excluirProduto(produto);
    } else if (proximaQuantidade > 0) {
      updatedCart[produtoIndex].quantidade = proximaQuantidade;
      setCarrinho(updatedCart);
    }
  }

  const verificarIcone = (tipo) => {
    switch (tipo) {
      case "Crédito":
        return (
          <CreditCard
            size={35}
            color={tipo === pagamentoSelecionado.tipo ? "#6875F4" : "#A9AEB3"}
          />
        );
        break;
      case "Débito":
        return (
          <ShoppingBag
            size={35}
            color={tipo === pagamentoSelecionado.tipo ? "#6875F4" : "#A9AEB3"}
          />
        );

      case "Pix":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
            <path
              fill={tipo === pagamentoSelecionado.tipo ? "#6875F4" : "#A9AEB3"}
              d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.76C231.1-7.586 280.3-7.586 310.6 22.76L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.78L22.76 310.6C-7.586 280.3-7.586 231.1 22.76 200.8L80.78 142.7H112.6z"
            />
          </svg>
        );

      case "Dinheiro":
        return (
          <CircleDollarSign
            size={35}
            color={tipo === pagamentoSelecionado.tipo ? "#6875F4" : "#A9AEB3"}
          />
        );
    }
  };

  const verificarTaxa = (produto) => {
    const quantidade = produto.quantidade;
    const taxas = produto.produto_taxas
      .map((produtoTaxa) => produtoTaxa.taxa)
      .filter((taxa) => taxa.tipo_pagamento_id === pagamentoSelecionado.id);

    if (taxas.length > 0) {
      const { taxa, acumulativa } = taxas[0];
      const valorTaxa = acumulativa ? Number(taxa) * quantidade : taxa;

      return valorTaxa;
    }
  };

  const excluirProduto = (produto) => {
    const produtoRemovido = carrinho.filter((carrinho) => carrinho.id !== produto.id);
    setCarrinho(produtoRemovido);
  };
  return (
    <Modal
      style={{ zIndex: 1000, minHeight: 700 }}
      show={isOpenModal}
      onClose={() => setIsOpenModal()}
    >
      <Modal.Header>{carrinho.length} produto/s no carrinho</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={realizarVenda}>
            <div className="space-y-12">
              {carrinho.map((cproduto, index) => (
                <div className="produto shadow-md flex flex-col border rounded p-2 my-2">
                  <div className="flex align-items-center">
                    <img
                      src="https://www.americanbiorecovery.org/global_graphics/default-store-350x350.jpg"
                      width="60"
                    />
                    <div className="ml-2 flex flex-col">
                      <span className="font-bold text-gray-500">{cproduto.nome}</span>
                      <div>
                        <span className="valor-produto">
                          {formatarMoeda(Number(cproduto.valor))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex my-3 relative">
                      <button
                        type="button"
                        className="remover border-0 text-red-500 font-bold mr-1"
                        onClick={() => excluirProduto(cproduto)}
                      >
                        Remover
                      </button>

                      <div>
                        <button
                          type="button"
                          className="mx-3 w-8 h-8 rounded bg-gray-100"
                          onClick={() => alterarQuantidade("sub", cproduto)}
                        >
                          -
                        </button>
                        <span className="quantidade-total">{cproduto.quantidade}</span>
                        <button
                          className="mx-3 h-8 w-8 rounded bg-gray-100"
                          type="button"
                          onClick={() => alterarQuantidade("add", cproduto)}
                        >
                          +
                        </button>
                      </div>

                      <span className="absolute valor-total-produto" style="right:0px">
                        {formatarMoeda(cproduto.valor * cproduto.quantidade)}
                      </span>
                    </div>

                    <div className="flex my-3 relative">
                      <div>TAXA</div>

                      <span className="absolute valor-total-produto" style="right:0px">
                        {formatarMoeda(verificarTaxa(cproduto))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <div className="flex justify-between">
                  <span>{carrinho.length} produtos</span>
                  <span>{formatarMoeda(calculoValor.totalProdutos)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxas </span>
                  <span>{formatarMoeda(calculoValor.totalTaxas)}</span>
                </div>

                <div className="flex justify-between">
                  <span>TOTAL </span>
                  <span>{formatarMoeda(calculoValor.total)}</span>
                </div>
              </div>
              <div className="flex space-x-5 items-center justify-center">
                {pagamentos.map((pagamento) => (
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      className={`shadow-md p-3 mb-3 rounded-full h-14 w-14 flex flex-col items-center justify-center border border-2 ${
                        pagamentoSelecionado.tipo === pagamento.tipo && "border-[#6875F4]"
                      }`}
                      onClick={() =>
                        pagamento.tipo === pagamentoSelecionado.tipo
                          ? setPagamentoSelecionado("")
                          : setPagamentoSelecionado(pagamento)
                      }
                    >
                      {verificarIcone(pagamento.tipo)}
                    </button>
                    <span
                      className={`font-semibold ${
                        pagamentoSelecionado.tipo === pagamento.tipo
                          ? "text-[#6875F4]"
                          : "text-[#A9AEB3]"
                      }`}
                    >
                      {pagamento.tipo}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="flex shadow-md mt-8 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                  "Realizar venda"
                )}
              </button>{" "}
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
