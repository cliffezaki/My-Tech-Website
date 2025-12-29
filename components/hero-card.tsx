import Image from "next/image";
import Link from "next/link";

interface HeroCardProps {
    title: string;
    excerpt: string;
    category?: string;
    imageUrl?: string;
    href?: string;
    readTime?: string;
}

export function HeroCard({
    title,
    excerpt,
    category,
    imageUrl,
    href = "#",
    readTime,
}: HeroCardProps) {
    return (
        <Link href={href} className="group block mb-8">
            <article className="overflow-hidden">
                {/* Large Image */}
                <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl bg-muted mb-4">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={1200}
                            height={500}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                            <span className="text-8xl opacity-20">📰</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                    {/* Category & Read Time */}
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest">
                        {category && (
                            <span className="text-gray-500">{category}</span>
                        )}
                        {readTime && (
                            <span className="text-gray-400">{readTime}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-4xl font-black leading-tight group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
                        {excerpt}
                    </p>
                </div>
            </article>
        </Link>
    );
}
