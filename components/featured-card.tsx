import Image from "next/image";
import Link from "next/link";

interface FeaturedCardProps {
    title: string;
    excerpt: string;
    category?: string;
    imageUrl?: string;
    href?: string;
    readTime?: string;
}

export function FeaturedCard({
    title,
    excerpt,
    category,
    imageUrl,
    href = "#",
    readTime,
}: FeaturedCardProps) {
    return (
        <Link href={href} className="group block">
            <article className="overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Large Image */}
                <div className="aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={800}
                            height={450}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                            <span className="text-6xl opacity-20">📰</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="pt-4 space-y-2">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest">
                        {category && (
                            <span className="text-gray-500">{category}</span>
                        )}
                        {readTime && (
                            <span className="text-gray-400">{readTime}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-black leading-tight group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-base text-gray-500 dark:text-gray-400 line-clamp-2">
                        {excerpt}
                    </p>
                </div>
            </article>
        </Link>
    );
}
