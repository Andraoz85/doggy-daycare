// app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-200 p-6 text-center">
      <img
        src="/dog-logo1.png"
        alt="Cool dog"
        className="w-94 mt-8 drop-shadow-lg"
      />

      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
        WELCOME TO <br /> DOGGY DAYCARE! 🐶
      </h1>
      <Link href="/dogs">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg shadow-md hover:bg-blue-600">
          OUR DOGS
        </button>
      </Link>
    </main>
  );
}
