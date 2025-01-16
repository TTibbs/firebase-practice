import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-xl">
          Welcome to my Firebase Auth implementation with Next.js.
        </h1>
        <Link
          href={"/auth/login"}
          className="w-auto mx-auto py-2 px-3 bg-zinc-100 rounded-lg text-zinc-900 hover:bg-zinc-300 transition-all duration-300 ease-linear"
        >
          Auth Page
        </Link>
      </div>
    </section>
  );
}
