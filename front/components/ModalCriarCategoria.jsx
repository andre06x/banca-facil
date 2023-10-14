import { api } from "@/pages/api/api";
import { Modal } from "flowbite-react";
import { parseCookies } from "nookies";
import { useState } from "preact/hooks";

export default function ModalCriarCategoria({
  isOpenModal,
  setIsOpenModal,
  setCategorias,
  categorias,
}) {
  const [formCategoria, setFormCategoria] = useState({ categoria: "" });
  const [loading, setLoading] = useState(false);

  function onChange(event) {
    const { name, value } = event.target;
    setFormCategoria({ ...formCategoria, [name]: value });
  }

  async function criarCategoria(event) {
    const { "nextauth.usuario": usuario_id } = parseCookies();
    event.preventDefault();
    const data = {
      ...formCategoria,
      usuario_id,
    };
    try {
      setLoading(true);
      const response = await api.post("/categoria", data);
      setCategorias([...categorias, response.data.content]);
      setFormCategoria({ categoria: "" });
      setLoading(false);
    } catch (err) {
      alert(err.response.data.error);
      // console.log(err);
      setLoading(false);
    }
  }

  return (
    <Modal
      style={{ zIndex: 1000, minHeight: 700 }}
      show={isOpenModal}
      onClose={() => setIsOpenModal()}
    >
      <Modal.Header>Adicionar categoria</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={criarCategoria}>
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Categoria
              </label>
              <div className="mt-2">
                <input
                  id="categoria"
                  name="categoria"
                  onChange={onChange}
                  value={formCategoria.categoria}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  "Criar categoria"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
