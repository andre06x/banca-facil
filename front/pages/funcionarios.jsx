import { useEffect, useState } from "preact/hooks";
import { api } from "./api/api";
import { parseCookies } from "nookies";
import { BadgePlus, Pencil, Trash2 } from "lucide-preact";
import dynamic from "next/dynamic";
import { getApiClient } from "./api/axios";

const ModalFuncionario = dynamic(() => import("@/components/ModalCriarFuncionario"), {
  ssr: true,
});

export async function getServerSideProps(ctx) {
  const { "nextauth.token": token, "nextauth.usuario": usuario } = parseCookies(ctx);
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

  const apiWeb = getApiClient(ctx, token);

  const response = await apiWeb.get(`/buscar-funcionarios/${usuario}`);
  const response_estabelecimento = await apiWeb.get(`/todos-estabelecimentos/${usuario}`);

  const funcionarios = response.data.content || [];
  const estabelecimentos = response_estabelecimento.data.content || [];
  return {
    props: {
      funcionarios,
      usuario,
      estabelecimentos,
    },
  };
}
export default function Funcionarios({
  funcionarios: funcionariosServer,
  usuario,
  estabelecimentos: estabelecimentosServer,
}) {
  const [funcionarios, setFuncionarios] = useState(funcionariosServer);
  const [estabelecimentos, setEstabelecimentos] = useState(estabelecimentosServer);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function abrirModal() {
    setIsOpenModal(!isOpenModal);
  }

  const [formFuncionario, setFormFuncionario] = useState({
    nome: "",
    email: "",
    responsavel: usuario,
  });

  async function editarFuncionario(event) {
    event.preventDefault();
    try {
      const response = await api.put(`/usuario/${formFuncionario.id}`, formFuncionario);
      alert("Atualizado com sucesso");
      setFuncionarios(
        funcionarios.map((obj) => (obj.id === formFuncionario.id ? formFuncionario : obj))
      );
    } catch (err) {
      if (err.response.data.error === "Validation error") {
        alert(
          "O email informado já existe em nossa base de dados. Por favor, informe um email válido."
        );
      }
    }
  }

  function onChangeFuncionario(event) {
    const { name, value } = event.target;
    setFormFuncionario({ ...formFuncionario, [name]: value });
  }

  function excluirFuncionario(event) {}
  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <div class="pb-4 pt-2 pl-1 bg-white dark:bg-gray-900">
          <div className="flex justify-between mx-3">
            <span className="text-3xl text-gray-500 ">Lista de funcionários</span>
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
                Nome
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario, index) => (
              <tr
                key={index}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {funcionario.nome}
                </th>
                <td className="px-6 py-4 text-gray-400">
                  <span>{funcionario.email}</span>
                </td>

                <td class="px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      funcionario.id === formFuncionario.id
                        ? setFormFuncionario({})
                        : setFormFuncionario(funcionario)
                    }
                    className="ml-4"
                  >
                    <Pencil color="gray" size={20} />
                  </button>
                </td>
                <td class="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => excluirFuncionario(funcionario.id)}
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

      {formFuncionario.id ? (
        <div class="mt-5  relative overflow-x-auto bg-white shadow-md sm:rounded-lg p-3">
          <h1 className="text-2xl text-gray-500 mb-2">
            Editando funcionário {formFuncionario.nome}
          </h1>
          <form className="space-y-6" onSubmit={editarFuncionario}>
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome
              </label>
              <div className="mt-2">
                <input
                  name="nome"
                  type="nome"
                  value={formFuncionario.nome}
                  onChange={onChangeFuncionario}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  onChange={onChangeFuncionario}
                  value={formFuncionario.email}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
                <div className="text-sm hidden">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  name="senha"
                  type="password"
                  autoComplete="current-password"
                  onChange={onChangeFuncionario}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Atualizar funcionario
            </button>
          </form>

          <EstabelecimentoFuncionario
            estabelecimentos={estabelecimentosServer}
            funcionario={formFuncionario}
          />
        </div>
      ) : (
        ""
      )}

      <ModalFuncionario
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        funcionarios={funcionarios}
        setFuncionarios={setFuncionarios}
        usuario={usuario}
      />
    </div>
  );
}

function EstabelecimentoFuncionario({
  estabelecimentos: estabelecimentosServer,
  funcionario,
}) {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [estabelecimentosUsuario, setEstabelecimentosUsuario] = useState([]);
  const [estabelecimentoEscolhido, setEstabelecimentoEscolhido] = useState("");

  async function teste() {
    console.log(funcionario.id);
    api.get(`/buscar-estabelecimento-funcionario/${funcionario.id}`).then((response) => {
      const estabeleUsuario = response.data.content;
      setEstabelecimentosUsuario(estabeleUsuario);

      let estabelecimentosNaoPreenchidos = [];
      for (let i = 0; i < estabelecimentosServer.length; i++) {
        const existeEstabelecimento = estabeleUsuario.find(
          (server) => server.id === estabelecimentosServer[i].id
        );
        if (!existeEstabelecimento) {
          estabelecimentosNaoPreenchidos.push(estabelecimentosServer[i]);
        }
      }

      setEstabelecimentos(estabelecimentosNaoPreenchidos);
    });
  }

  useEffect(() => {
    teste();
  }, [funcionario]);

  async function vincularFuncionario() {
    try {
      const data = {
        usuario_id: funcionario.id,
        estabelecimento_id: estabelecimentoEscolhido,
      };
      const response = await api.post("/vincular-funcionario-estabelecimento", data);
      alert("Funcionário cadastrado com sucesso!");
      teste();
    } catch (err) {}
  }

  async function desvincular(vinculo) {
    try {
      const response = await api.delete(
        `/excluir-vinculo-funcionario-estabelecimento/${vinculo.id_vinculo}`
      );
      alert("Vinculo deletado com sucesso!");
      teste();
    } catch (err) {}
  }
  return (
    <div className="border border-separate">
      <h1 className="text-lg">Estabelecimentos do {funcionario.nome}</h1>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th></th>
            <th scope="col" class="px-6 py-3">
              Estabelecimento
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <select
                name=""
                id=""
                onChange={(e) => setEstabelecimentoEscolhido(e.target.value)}
              >
                <option value=""></option>
                {estabelecimentos.map((estabelecimentos) => (
                  <option value={estabelecimentos.id}>
                    {estabelecimentos.nome_estabelecimento}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <td class="px-6 py-4">
                <button
                  type="button"
                  onClick={() => vincularFuncionario()}
                  className="ml-4"
                >
                  <BadgePlus color="blue" size={20} />
                </button>
              </td>
            </td>
          </tr>
          {estabelecimentosUsuario.map((estabelecimento, index) => (
            <tr
              key={index}
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {estabelecimento.nome_estabelecimento}
              </th>

              <td class="px-6 py-4">
                <button
                  type="button"
                  onClick={() => desvincular(estabelecimento)}
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
  );
}
