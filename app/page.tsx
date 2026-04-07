import Greeting from "@/components/ui/Greeting";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Welcome to Blog Admin
      </h1>
      <p className="max-w-md text-center text-lg text-zinc-600 dark:text-zinc-400">
        A simple blog management application built with Next.js App Router.
      </p>
      <Greeting />
    </div>
  );
}
