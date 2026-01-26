import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { Mail } from "lucide-react";

export function Connect() {
    return (
        <section id="connect" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-center">
             <h2 className="mb-4 text-3xl font-bold tracking-tight">Let&apos;s Connect</h2>
             <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
                Interested in working together or have a question? Feel free to reach out.
             </p>
             <Link
                href={`mailto:${SITE_CONFIG.social.email}`}
                className="inline-flex items-center justify-center rounded-md bg-black px-8 py-4 text-base font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
             >
                <Mail className="mr-2 h-5 w-5" /> Say Hello
             </Link>
        </section>
    )
}
