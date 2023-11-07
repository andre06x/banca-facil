import { formatarMoeda } from "@/utils/formatPrice";
import moment from "moment/moment";
import "moment/locale/pt-br";
import { useState } from "preact/hooks";

const formatarData = (data) => {
  const dataAtual = moment().startOf("day");
  const dataRecebida = moment(data);

  if (dataRecebida.isSame(dataAtual, "day")) {
    return `Hoje às ${dataRecebida.format("HH:mm")}`;
  } else if (dataRecebida.isSame(dataAtual.clone().subtract(1, "day"), "day")) {
    return `Ontem às ${dataRecebida.format("HH:mm")}`;
  } else {
    const diaSemana = dataRecebida.format("dddd");
    return `${diaSemana.charAt(0).toUpperCase()}${diaSemana.slice(
      1
    )}, ${dataRecebida.format("DD")} às ${dataRecebida.format("HH:mm")}`;
  }
};

const TableRows = ({ vendas }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className="cursor-pointer mb-10" onClick={() => setOpen(!open)}>
        <td className={`py-2 px-3 font-normal text-base bg-white my-4 whitespace-nowrap`}>
          <div className="flex">
            <svg
              className={`text-black w-6 h-6  mr-3 ${open ? "rotate-180" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>

            {formatarData(vendas?.data_completa)}
          </div>
        </td>
        <td className={`py-2 px-3 font-normal text-base bg-white my-4 whitespace-nowrap`}>
          {formatarMoeda(Number(vendas?.valor_total))}
        </td>
        <td
          className={`py-2 px-3 text-base  font-normal bg-white my-4 whitespace-nowrap`}
        >
          {vendas?.usuario?.nome}
        </td>
        <td className={`py-2 px-3 text-base  font-normal bg-white my-4  min-w-[250px]`}>
          {vendas?.tipo_pagamento?.tipo}
        </td>
      </tr>
      <tr>
        <td colSpan={15} className="pl-10">
          <h1 className={`text-xl ${open ? "block" : "hidden"}`}>{/* History */}</h1>
        </td>
      </tr>
      <tr
        className={`w-full overflow-hidden transition-[max-height] delay-1000 duration-1000 ease-in-out  ${
          open ? "max-h-20" : "max-h-0"
        }`}
      >
        <td colSpan={15} className="mb-3">
          <table
            className={`px-10 w-fit  ${open ? "block" : "hidden"} mx-auto mt-1 mb-4`}
          >
            <thead className=" text-base text-white font-semibold w-full">
              <tr className="bg-white">
                <th className="py-3 px-4 text-[#ababac] text-base sm:text-sm font-normal whitespace-nowrap">
                  Produto
                </th>
                <th className="py-3 px-4 text-[#ababac] text-base sm:text-sm font-normal whitespace-nowrap">
                  Preço.U
                </th>
                <th className="py-3 px-4 text-[#ababac] text-base sm:text-sm font-normal whitespace-nowrap">
                  Quantidade
                </th>
                <th className="py-3 px-4 text-[#ababac] text-base sm:text-sm font-normal whitespace-nowrap rounded-r-lg">
                  Preço Taxa
                </th>
                <th className="py-3 px-4 text-[#ababac] text-base sm:text-sm font-normal whitespace-nowrap rounded-r-lg">
                  Valor Total
                </th>
              </tr>
            </thead>

            <tbody>
              {vendas?.venda_produtos?.map((produto, key) => (
                <tr key={key} className="bg-white ">
                  <td className="py-3 px-4">{produto?.produto?.nome}</td>
                  <td className="py-3 px-4">
                    {formatarMoeda(Number(produto?.valor_unitario))}
                  </td>
                  <td className="py-3 px-4 text-center">{produto?.quantidade}</td>
                  <td className="py-3 px-4 text-center">
                    {formatarMoeda(produto?.valor_quantidade_taxa)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {formatarMoeda(Number(produto?.valor_total))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};

const VendaItem = ({ venda }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-md mb-4 p-4">
      <div
        className="cursor-pointer flex items-center justify-between mb-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center">
          <svg
            className={`text-black w-6 h-6 z-40 mr-3 ${open ? "rotate-180" : "rotate-0"}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span>{formatarData(venda?.data_completa)}</span>
        </div>
        <span className="font-bold">{formatarMoeda(Number(venda?.valor_total))}</span>
      </div>

      {open && (
        <div className="space-y-2">
          {venda?.venda_produtos.map((produto, key) => (
            <div key={key} className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{produto?.produto?.nome}</h3>
                <p>Preço: {formatarMoeda(Number(produto?.valor_unitario))}</p>
                <p>Quantidade: {produto?.quantidade}</p>
              </div>
              <p className="font-bold">{formatarMoeda(Number(produto?.valor_total))}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export function TabelasRelatorio({ vendas }) {
  return (
    <div className=" flex flex-col items-center justify-center py-5 ">
      <div className="w-full relative max-h-96 overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2 ">
        <div className="block md:hidden">
          {vendas?.map((venda, index) => (
            <VendaItem key={index} venda={venda} />
          ))}
        </div>
        <table className="hidden md:block table-auto relative overflow-scroll md:overflow-auto w-full text-left font-inter mb-4">
          <thead className="bg-white sticky z-10 top-0 rounded-lg text-base text-white font-semibold w-full mb-3">
            <tr className="">
              <th className="py-3 px-3 text-[#ababac] sm:text-base font-medium whitespace-nowrap w-1/6">
                Data
              </th>
              <th className="py-3 px-3 text-[#ababac] sm:text-base font-medium whitespace-nowrap w-1/6">
                Valor total
              </th>
              <th className="py-3 px-3 text-[#ababac] sm:text-base font-medium whitespace-nowrap w-1/6">
                Usuario
              </th>
              <th className="py-3 px-3 text-[#ababac] sm:text-base font-medium whitespace-nowrap w-1/6">
                Tipo pagamento
              </th>
            </tr>
          </thead>
          <tbody className="max-h-96">
            {vendas?.map((data, index) => (
              <TableRows key={index} vendas={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TableRowsTiposPagamentos = ({ vendas }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="cursor-pointer mb-10" onClick={() => setOpen(!open)}>
        <td className={`py-2 px-3 text-base font-normal bg-white my-4 whitespace-nowrap`}>
          <div className="flex items-center">
            <svg
              className={`text-black w-6 h-6 z-40 mr-3 ${
                open ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {vendas?.tipo}
          </div>
        </td>
        <td className={`py-2 px-3 text-base font-normal bg-white my-4 whitespace-nowrap`}>
          {vendas?.quantidade_vendas}
        </td>
        <td className={`py-2 px-3 text-base font-normal bg-white my-4 whitespace-nowrap`}>
          {formatarMoeda(Number(vendas?.valor_total))}
        </td>
      </tr>
      <tr>
        <td colSpan={15} className="pl-10">
          <h1 className={`text-xl ${open ? "block" : "hidden"}`}>{/* History */}</h1>
        </td>
      </tr>
      <tr
        className={`w-full overflow-hidden transition-[max-height] delay-1000 duration-1000 ease-in-out  ${
          open ? "max-h-20" : "max-h-0"
        }`}
      >
        <td colSpan={15} className="mb-3">
          <table
            className={`px-10 w-fit  ${open ? "block" : "hidden"} mx-auto mt-1 mb-4`}
          >
            <thead className="text-base text-white font-semibold w-full">
              <tr className="bg-white">
                <th className="py-3 px-4 text-[#ababac] text-base sm:text-sm font-normal whitespace-nowrap">
                  Nome
                </th>
                <th className="py-3 px-4 text-[#ababac] text-base sm:text-sm font-normal whitespace-nowrap">
                  Quantidade
                </th>
                <th className="py-3 px-4 text-[#ababac] text-base sm:text-sm font-normal whitespace-nowrap">
                  Valor Total
                </th>
              </tr>
            </thead>
            <tbody>
              {vendas?.produtos.map((produto, key) => (
                <tr key={key} className="bg-white">
                  <td className="py-3 px-4">{produto?.nome}</td>
                  <td className="py-3 px-4 text-center">{produto?.quantidade}</td>
                  <td className="py-3 px-4 text-center">
                    {formatarMoeda(Number(produto?.total))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};

const DivTableRowsTiposPagamentos = ({ vendas }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-md p-4 mb-4">
      <div
        className="cursor-pointer flex items-center justify-between mb-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center">
          <svg
            className={`text-black w-6 h-6 z-40 mr-3 ${open ? "rotate-180" : "rotate-0"}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {vendas?.tipo}
        </div>
      </div>
      {open && (
        <div className="space-y-2">
          {vendas?.produtos?.map((produto, key) => (
            <div key={key} className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{produto?.nome}</h3>
                <p>Quantidade: {produto?.quantidade}</p>
              </div>
              <p className="font-bold">{formatarMoeda(Number(produto?.total))}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export function TabelaTiposPagamentos({ tipos }) {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
        <div className="block md:hidden">
          {tipos?.map((data, index) => (
            <DivTableRowsTiposPagamentos key={index} vendas={data} />
          ))}
        </div>
        <table className="hidden md:block table-auto overflow-scroll md:overflow-auto w-full text-left font-inter mb-4">
          <thead className="bg-white rounded-lg text-base text-white font-semibold w-full mb-3">
            <tr>
              <th className="py-3 px-3 text-[#ababac] sm:text-base font-medium whitespace-nowrap w-1/6">
                Tipo
              </th>
              <th className="py-3 px-3 text-[#ababac] sm:text-base font-medium whitespace-nowrap w-1/6">
                Quantidade
              </th>
              <th className="py-3 px-3 text-[#ababac] sm:text-base font-medium whitespace-nowrap w-1/6">
                Valor Total
              </th>
            </tr>
          </thead>
          <tbody>
            {tipos?.map((data, index) => (
              <TableRowsTiposPagamentos key={index} vendas={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
