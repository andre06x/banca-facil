import { formatarMoeda } from "@/utils/formatPrice";
import { Modal } from "flowbite-react";

export default function ModalTaxaProduto({
  cproduto,
  modalTaxaProduto,
  setModalTaxaProduto,
}) {
  return (
    <Modal
      style={{ zIndex: 1000, minHeight: 700 }}
      show={modalTaxaProduto}
      onClose={() => setModalTaxaProduto(!modalTaxaProduto)}
    >
      <Modal.Header>{cproduto.nome} </Modal.Header>
      <Modal.Body>
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
          <div></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
