import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-4xl font-bold">404 - Not Found</h2>
      <p className="text-xl text-gray-500">Could not find requested resource</p>
      <Link href="/" className="rounded bg-black px-6 py-3 font-bold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Return Home
      </Link>
    </div>
  );
}
