import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-medium">
        Ops. Parece que essa página não existe.
      </h1>
      <Link
        to="/"
        className="bg-zinc-900 text-white font-medium text-lg px-12 py-2 rounded-lg hover:bg-zinc-700 transition-colors duration-300"
      >
        Voltar para o início
      </Link>
    </section>
  );
}
