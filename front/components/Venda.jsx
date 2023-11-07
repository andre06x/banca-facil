import { MinusCircle, Search, ShoppingBag, ShoppingCart } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import ModalRealizarVenda from "./ModalRealizarVenda";
import { formatarMoeda } from "@/utils/formatPrice";

export default function Venda({ estabelecimento, produtos, setProdutos }) {
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltrada, setCategoriaFiltrada] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [produtoClicado, setProdutoClicado] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    let categorias = [];
    produtos.forEach((element) => {
      if (!categorias.find((categoria) => categoria.id === element?.categoria_id)) {
        const cat = {
          id: element.categoria_id,
          categoria: element?.categorium?.categoria,
        };
        if (cat.categoria) {
          categorias.push(cat);
        }
      }
    });
    setProdutosFiltrados(produtos);
    setCategorias(categorias);
  }, [produtos]);

  function verificarItemCarrinho(produto) {
    const estaNoCarrinho = carrinho.find((cproduto) => cproduto.id === produto.id);
    return estaNoCarrinho;
  }
  function adicionarRemoverProduto(produto) {
    const estaNoCarrinho = verificarItemCarrinho(produto);
    if (estaNoCarrinho) {
      const novoCarrinho = carrinho.filter((cproduto) => cproduto.id !== produto.id);
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  }

  function filtrarProdutoCategoria(categoria) {
    if (categoriaFiltrada === categoria.id) {
      setCategoriaFiltrada("");
      setProdutosFiltrados(produtos);
    } else {
      setCategoriaFiltrada(categoria.id);
      const filtroProdutos = produtos.filter(
        (produto) => produto.categoria_id === categoria.id
      );
      setProdutosFiltrados(filtroProdutos);
    }
  }

  function filtrandoInput(value) {
    const procurarProdutos = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(value)
    );
    if (procurarProdutos.length > 0) {
      setProdutosFiltrados(procurarProdutos);
    } else {
      setProdutosFiltrados(produtos);
    }
  }
  return (
    <div className="mt-16 space-y-5">
      <h1 className="text-xl text-black font-semibold	">
        Venda {estabelecimento.nome_estabelecimento}
      </h1>

      <div className="flex ">
        <div className="bg-gray-300 rounded-full flex-1 grid grid-cols-12  ">
          <input
            type="text"
            onChange={(event) => filtrandoInput(event.target.value)}
            className="bg-transparent ml-3 col-span-10 md:col-span-11  border-0 focus:ring-0 focus:ring-offset-0"
            placeholder="Buscar pro item ou código "
          />
          <button className="mx-3 col-span-2 md:col-span-1">
            <Search color="#000" />
          </button>
        </div>

        <button className="ml-2 p-2" type="button" onClick={() => setIsOpenModal(true)}>
          <ShoppingBag color="#0099F9" />
        </button>
      </div>

      <div className="flex overflow-x-auto" style={{ whiteSpace: "nowrap" }}>
        {categorias.map((categoria, index) => (
          <button
            className={`shadow-md p-3 mb-3 mr-4 rounded-full h-10 flex flex-col items-center justify-center border border-2 ${
              categoriaFiltrada === categoria.id && "border-[#6875F4]"
            }`}
            key={index}
            type="button"
            onClick={() => filtrarProdutoCategoria(categoria)}
          >
            <span
              className={`font-semibold ${
                categoriaFiltrada === categoria.id ? "text-[#6875F4]" : "text-[#A9AEB3]"
              }`}
            >
              {categoria.categoria}
            </span>
          </button>
        ))}
      </div>

      {/* <pre style={{ width: 700, whiteSpace: "pre-wrap" }}>{JSON.stringify(carrinho)}</pre> */}
      <div className="grid grid-cols-12 gap-4">
        {produtosFiltrados.map((produto, index) => (
          <div
            key={index}
            className="col-span-4 sm:col-span-3 md:col-span-2 flex flex-col border"
          >
            <img
              src="https://www.americanbiorecovery.org/global_graphics/default-store-350x350.jpg"
              height={130}
              alt=""
            />
            <div
              className="flex-grow"
              onClick={() =>
                produtoClicado.includes(produto)
                  ? setProdutoClicado(produtoClicado.filter((p) => p.id !== produto.id))
                  : setProdutoClicado([...produtoClicado, produto])
              }
            >
              <div className="flex flex-col">
                <span className="font-semibold">
                  {formatarMoeda(Number(produto.valor))}/Un
                </span>
                <span className="font-medium text-sm">
                  {produtoClicado.includes(produto) || produto.nome.length < 20
                    ? produto.nome
                    : produto.nome.slice(0, 20) + "..."}
                </span>
              </div>
            </div>
            <div className="flex justify-end self-end m-2">
              <button
                className=""
                type="button"
                onClick={() => adicionarRemoverProduto(produto)}
              >
                {verificarItemCarrinho(produto) ? (
                  <MinusCircle color="#FF7070" />
                ) : (
                  <ShoppingCart color="#0099F9" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <ModalRealizarVenda
        estabelecimento={estabelecimento}
        carrinho={carrinho}
        setCarrinho={setCarrinho}
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
      />
    </div>
  );
}
