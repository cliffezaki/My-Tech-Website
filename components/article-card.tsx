import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
    title: string;
    excerpt: string;
    category?: string;
    imageUrl?: string;
    href?: string;
    readTime?: string;
    author?: string;
}

export function ArticleCard({
    title,
    excerpt,
    category,
    imageUrl,
    href = "#",
    readTime,
    author,
}: ArticleCardProps) {
    return (
        <Link href={href} className="group block h-full">
            <article className="h-full flex flex-col transition-opacity duration-200 hover:opacity-80">
                {/* Image - Top */}
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-muted mb-4">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={400}
                            height={300}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <span className="text-3xl opacity-20">📰</span>
                        </div>
                    )}
                </div>

                {/* Content - Bottom */}
                <div className="flex flex-col flex-1">
                    {/* Category */}
                    {category && (
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-red mb-2">
                            {category}
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-bold leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4 font-[family-name:var(--font-playfair)]">
                        {title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3">
                        {excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mt-auto text-xs text-gray-500 font-medium">
                        {author && <span>{author}</span>}
                        {author && readTime && <span className="mx-1">·</span>}
                        {readTime && <span>{readTime}</span>}
                    </div>
                </div>
            </article>
        </Link>
    );
}
