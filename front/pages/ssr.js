export function getServerSideProps() {
  return {
    props: { framework: "preact" },
  };
}

export default function SSRPage({ framework }) {
  console.log("teste");
  return <div>{framework} ssr example</div>;
}
