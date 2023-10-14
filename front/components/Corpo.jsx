import Estabelecimentos from "@/pages/estabelecimentos";

const Corpo = ({ rota }) => {
  return (
    <div className="corpo">
      {rota === "/estabelecimentos" && <Estabelecimentos />}
      {rota === "/outra-rota" && <OutraRota />}
      {/* Outros componentes de corpo... */}
    </div>
  );
};

export default Corpo;
