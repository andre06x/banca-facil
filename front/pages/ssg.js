import { useState } from "preact/hooks";

export function getStaticProps() {
  return {
    props: { framework: "preact" },
  };
}

export default function SSGPage({ framework }) {
  const [number, setNumber] = useState(1);
  return (
    <div>
      {framework} ssg example {number}
    </div>
  );
}
