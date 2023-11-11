import { Button, Modal } from "flowbite-react";
import { useState } from "preact/hooks";
import Select from "react-select";
import estados from "@/public/estados.json";
import axios from "axios";
import MapaModal from "./MapaModal";
import { parseCookies } from "nookies";
import { api } from "@/pages/api/api";
import { getApiClient } from "@/pages/api/axios";
export default function ModalCriarEstabelecimento({
  isOpenModal,
  setOpenModal,
  setEstabelecimentos,
  estabelecimentos,
}) {
  const [clickedLatLng, setClickedLatLng] = useState([
    -13.2399454992863, -51.67968750000001,
  ]);
  const [cidades, setCidades] = useState([]);
  const [loading, setIsloading] = useState(false);
  const [formEstabelecimento, setFormEstabelecimento] = useState({
    lat: null,
    lon: null,
    cidade: "",
    nome_estabelecimento: "",
  });

  const criarCadastro = async (event) => {
    event.preventDefault();
    try {
      const { "nextauth.usuario": usuario_id, "nextauth.token": token } = parseCookies();
      console.log(usuario_id);

      const data = {
        ...formEstabelecimento,
        usuario_id,
        lat: clickedLatLng[0],
        lon: clickedLatLng[1],
      };
      setIsloading(true);

      const apiWeb = getApiClient(null, token);

      await apiWeb.post("/estabelecimento", data);
      alert("Criado com sucesso!");
      setEstabelecimentos([...estabelecimentos, data]);
      setIsloading(false);
    } catch (err) {
      setIsloading(false);

      console.log(err);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormEstabelecimento({ ...formEstabelecimento, [name]: value });
  };

  const onInputChange = ({ value, sigla, label }) => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`
      )
      .then((response) => {
        const cidades = response.data.map((cidade) => ({
          value: cidade.nome,
          label: cidade.nome,
        }));
        setCidades(cidades);
      });
  };

  const customStyles = {
    menuList: (base) => ({
      ...base,
      maxHeight: "45px",
    }),
  };
  return (
    <Modal
      style={{ zIndex: 1000, minHeight: 700 }}
      show={isOpenModal}
      onClose={() => setOpenModal()}
    >
      <Modal.Header>Adicionar estabelecimento</Modal.Header>
      <Modal.Body style={{ minHeight: 450 }}>
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={criarCadastro}>
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome estabelecimento
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome_estabelecimento"
                  onChange={onChange}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Estados"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Estado
                </label>
              </div>
              <div className="mt-2">
                <Select
                  placeholder="Escolha o estado..."
                  onChange={onInputChange}
                  options={estados}
                />
              </div>
            </div>

            <div className="!mb-16">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Estados"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Municipio
                </label>
              </div>
              <div className="mt-2">
                <Select
                  placeholder="Escolha a cidade..."
                  options={cidades}
                  onChange={({ value }) => {
                    console.log(value);
                    setFormEstabelecimento({
                      ...formEstabelecimento,
                      cidade: value,
                    });
                  }}
                  styles={customStyles}
                  required
                />
              </div>
            </div>

            <MapaModal
              clickedLatLng={clickedLatLng}
              setClickedLatLng={setClickedLatLng}
              nome={formEstabelecimento.nome}
            />
            {JSON.stringify(clickedLatLng)}
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
                  "Criar estabelecimento"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
