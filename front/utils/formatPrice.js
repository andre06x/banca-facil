export function formatarMoeda(valor) {
  if (valor) {
    console.log(valor.toLocaleString());
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return 0;
}
