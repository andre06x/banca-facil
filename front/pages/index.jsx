import { parseCookies } from "nookies";
import { useEffect, useState } from "preact/hooks";
import dynamic from "next/dynamic";
import { getApiClient } from "./api/axios";
import { api } from "./api/api";
import { List, Trash2 } from "lucide-preact";
import ModalCriarProduto from "@/components/ModalCriarProduto";
import Venda from "@/components/Venda";
import ModalTaxaProduto from "@/components/ModalTaxaProduto";
import Link from "next/link";
import { Datepicker } from "flowbite-react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";
import { formatarMoeda } from "@/utils/formatPrice";
import { TabelaTiposPagamentos, TabelasRelatorio } from "@/components/TabelasRelatorio";

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

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const total = data01.reduce((acc, entry) => acc + entry.value, 0);
const dataWithPercentages = data01.map((entry) => ({
  ...entry,
  percentage: ((entry.value / total) * 100).toFixed(2) + "%",
  label: `${entry.name} (${((entry.value / total) * 100).toFixed(2)}%)`,
}));

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
            className="bg-white col-span-12 md:col-span-4 p-5 rounded  shadow-xl"
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
        <div className="my-5">
          <Link
            className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href={`/estabelecimento/${estabelecimento.id}/produtos`}
          >
            Produtos
          </Link>
          <Relatorio estabelecimento_id={estabelecimento.id} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const Relatorio = ({ estabelecimento_id }) => {
  const [relatorio, setRelatorio] = useState({
    quantidade: [],
    faturamento: 0,
    media: 0,
    diasRentaveis: [],
    produtosVendidosRentaveis: [],
    tipos: [],
  });
  const [dataRelatorio, setDataRelatorio] = useState({ dataInicio: "", dataFim: "" });

  const fetchRelatorio = async () => {
    if (estabelecimento_id) {
      const data = { estabelecimento_id };
      if (dataRelatorio.dataInicio && dataRelatorio.dataFim) {
        data.dataInicio = dataRelatorio.dataInicio;
        data.dataFim = dataRelatorio.dataFim;
      }
      console.log(data);
      try {
        const responseUltimasVendas = await api.post(
          "/relatorio/gerar-ultimas-vendas",
          data
        );
        const responseDiasRentaveis = await api.post("/relatorio/dias-rentaveis", data);
        const responseProdutosRentaveis = await api.post(
          "/relatorio/produtos-vendidos-rentaveis/",
          data
        );
        const responseTiposPagamento = await api.post("/relatorio/tipo-pagamento", data);

        const faturamento = responseUltimasVendas.data.content.reduce((soma, venda) => {
          if (!isNaN(Number(venda.valor_total))) {
            return soma + Number(venda.valor_total);
          }
          return soma;
        }, 0);

        const media = faturamento / responseUltimasVendas.data.content.length;

        setRelatorio({
          quantidade: responseUltimasVendas.data.content.filter(
            (venda) => venda.valor_total !== null
          ),
          faturamento,
          media,
          diasRentaveis: responseDiasRentaveis.data.content.filter(
            (dia) => dia.total !== null
          ),
          produtosVendidosRentaveis: responseProdutosRentaveis.data.content.map(
            (produto) => ({
              nome: produto.nome,
              total: Number(produto.total),
              quantidade: Number(produto.quantidade),
            })
          ),
          tipos: responseTiposPagamento.data.content.filter(
            (data) => data.valor_total !== null
          ),
        });
      } catch (error) {
        console.error("Erro ao buscar dados do relatório:", error);
      }
    }
  };

  useEffect(() => {
    fetchRelatorio();
  }, [estabelecimento_id]);

  function renderLabel(entry) {
    return entry.nome;
  }

  const total = relatorio?.produtosVendidosRentaveis?.reduce(
    (acc, entry) => acc + Number(entry.quantidade),
    0
  );

  const dataWithPercentages = relatorio.produtosVendidosRentaveis.map((entry) => ({
    ...entry,
    percentage: ((Number(entry.quantidade) / total) * 100).toFixed(2) + "%",
    label: `${entry.nome} (${((Number(entry.quantidade) / total) * 100).toFixed(2)}%)`,
  }));

  return (
    <div className="flex flex-col my-3">
      <div className="flex space-y-3 space-x-0 md:space-y-0 md:space-x-3  flex-col md:flex-row  my-5 ml-4">
        <div className="flex flex-col">
          <label htmlFor="data-inicio" className="text-gray-700 font-medium">
            Data Inicial:
          </label>
          <input
            type="date"
            id="data-inicio"
            value={dataRelatorio.dataInicio}
            onChange={(event) => {
              setDataRelatorio({ ...dataRelatorio, dataInicio: event.target.value });
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="data-fim" className="text-gray-700 font-medium">
            Data Final:
          </label>
          <input
            type="date"
            id="data-fim"
            value={dataRelatorio.dataFim}
            onChange={(event) => {
              setDataRelatorio({ ...dataRelatorio, dataFim: event.target.value });
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          className="justify-center md:self-end h-12 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => fetchRelatorio()}
        >
          Buscar
        </button>
      </div>

      <div className="flex justify-between">
        <div className="flex-1 grid grid-cols-12 gap-1">
          <div className="col-span-12 md:col-span-3">
            <div className="flex justify-between items-center bg-white p-3 flex rounded shadow-lg mx-3 ">
              <div className="flex flex-col space-y-1">
                <span className="text-slate-400 bold text-lg font-normal">
                  Quantidade
                </span>
                <span className="text-black font-semibold text-xl">
                  {relatorio.quantidade.length}
                </span>
              </div>

              <div className="bg-[#F6F9FF]  p-3 rounded-full">
                <List />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="flex justify-between items-center bg-white p-3 flex rounded shadow-lg mx-3 ">
              <div className="flex flex-col space-y-1">
                <span className="text-slate-400 bold text-lg font-normal">
                  Faturamento
                </span>
                <span className="text-black font-semibold text-xl">
                  {formatarMoeda(relatorio.faturamento)}
                </span>
              </div>

              <div className="bg-[#F6F9FF]  p-3 rounded-full">
                <List />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="flex justify-between items-center bg-white p-3 flex rounded shadow-lg mx-3 ">
              <div className="flex flex-col space-y-1">
                <span className="text-slate-400 bold text-lg font-normal">Média</span>
                <span className="text-black font-semibold text-xl">
                  {formatarMoeda(relatorio.media)}
                </span>
              </div>

              <div className="bg-[#F6F9FF]  p-3 rounded-full">
                <List />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="flex justify-between items-center bg-white p-3 flex rounded shadow-lg mx-3 ">
              <div className="flex flex-col space-y-1">
                <span className="text-slate-400 bold text-lg font-normal">Produto+</span>
                <span className="text-black font-semibold text-xl">
                  {relatorio.produtosVendidosRentaveis[0]?.nome}
                </span>
              </div>

              <div className="bg-[#F6F9FF]  p-3 rounded-full">
                <List />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-12">
          <h1>graficos</h1>
          <div className="w-full grid grid-cols-12 ">
            <div className="col-span-12 md:col-span-6 h-96 m-5">
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="col-span-12 md:col-span-6"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={relatorio.diasRentaveis}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="total"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="col-span-12 md:col-span-6 h-96 m-5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="quantidade"
                    nameKey="label"
                    isAnimationActive={true}
                    data={dataWithPercentages}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={renderLabel}
                  />
                  <Tooltip />
                  <Legend align="center" verticalAlign="bottom" layout="horizontal" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-12">
          <h1>tabelas</h1>
          <TabelasRelatorio vendas={relatorio.quantidade} />
          <TabelaTiposPagamentos tipos={relatorio.tipos} />
        </div>
      </div>
    </div>
  );
};
