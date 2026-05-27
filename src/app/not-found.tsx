import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto min-h-screen-90 py-32 text-center">
      <h1 className="text-8xl font-bold font-headline text-headline mb-4">
        404
      </h1>
      <h2 className="text-3xl mb-8 font-headline text-headline">
        Seite nicht gefunden
      </h2>
      <p className="mb-8">Die angeforderte Seite konnte nicht gefunden werden.</p>
      <Link
        href="/"
        className="bg-secondary hover:opacity-90 text-white font-headline font-semibold uppercase py-2 px-4 rounded tracking-wide"
      >
        Zurück zur Startseite
      </Link>
    </main>
  );
}
