import Image from "next/image";
import Link from "next/link";

interface HorizontalCardProps {
    title: string;
    excerpt: string;
    category?: string;
    imageUrl?: string;
    href?: string;
    readTime?: string;
}

export function HorizontalCard({
    title,
    excerpt,
    category,
    imageUrl,
    href = "#",
    readTime,
}: HorizontalCardProps) {
    return (
        <Link href={href} className="group block">
            <article className="flex gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
                {/* Image - Left side */}
                <div className="w-32 h-24 md:w-48 md:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={192}
                            height={128}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                            <span className="text-2xl opacity-20">📰</span>
                        </div>
                    )}
                </div>

                {/* Content - Right side */}
                <div className="flex-1 flex flex-col justify-center">
                    {/* Category & Read Time */}
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest mb-1">
                        {category && (
                            <span className="text-gray-500">{category}</span>
                        )}
                        {readTime && (
                            <span className="text-gray-400">{readTime}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold leading-snug group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {title}
                    </h3>

                    {/* Excerpt - hidden on mobile */}
                    <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {excerpt}
                    </p>
                </div>
            </article>
        </Link>
    );
}
