'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-gray-500">We apologize for the inconvenience.</p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Try again
        </button>
        <Link href="/" className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700">
          Go Home
        </Link>
      </div>
    </div>
  );
}
