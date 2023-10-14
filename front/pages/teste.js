import Link from "next/link";

export default function Teste() {
  function teste() {
    console.log("teste");
  }

  return (
    <ul>
      <li onClick={() => teste()}>teste</li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/ssr">SSR</Link>
      </li>
      <li>
        <Link href="/ssg">SSG</Link>
      </li>
    </ul>
  );
}
