import Link from "next/link";
import Image from "next/image";

interface Article {
    id: string | number;
    category?: string;
    title: string;
    excerpt?: string;
    imageUrl?: string;
    author?: string; // or readTime
    readTime?: string;
    href?: string;
}

interface HeroSectionProps {
    featuredArticle: Article;
    topStories: Article[]; // Expecting exactly 2 articles
}

export function HeroSection({ featuredArticle, topStories }: HeroSectionProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 border-b border-gray-200 dark:border-gray-800 pb-12">
            {/* Left Column - Hero (70% approx -> 8/12 cols) */}
            <div className="lg:col-span-8">
                <Link href={featuredArticle.href || "#"} className="group block">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted mb-4">
                        {featuredArticle.imageUrl ? (
                            <Image
                                src={featuredArticle.imageUrl}
                                alt={featuredArticle.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <span className="text-6xl opacity-20">📰</span>
                            </div>
                        )}
                    </div>
                    <div className="space-y-3">
                        {featuredArticle.category && (
                            <span className="text-sm font-bold uppercase tracking-wider text-brand-red">
                                {featuredArticle.category}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-5xl font-black leading-tight group-hover:underline decoration-4 underline-offset-4 font-[family-name:var(--font-playfair)]">
                            {featuredArticle.title}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                            {featuredArticle.excerpt}
                        </p>
                        <div className="text-sm text-gray-500 font-medium">
                            {featuredArticle.author && <span>{featuredArticle.author}</span>}
                            {featuredArticle.author && featuredArticle.readTime && <span className="mx-2">·</span>}
                            {featuredArticle.readTime && <span>{featuredArticle.readTime}</span>}
                        </div>
                    </div>
                </Link>
            </div>

            {/* Right Column - Top Stories (30% approx -> 4/12 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
                {topStories.map((story) => (
                    <Link key={story.id} href={story.href || "#"} className="group block flex-1">
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-muted mb-3">
                            {story.imageUrl ? (
                                <Image
                                    src={story.imageUrl}
                                    alt={story.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                                    <span className="text-3xl opacity-20">📰</span>
                                </div>
                            )}
                        </div>
                        <div>
                            {story.category && (
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-red mb-1 block">
                                    {story.category}
                                </span>
                            )}
                            <h3 className="text-xl font-bold leading-snug group-hover:underline decoration-2 underline-offset-4 mb-2 font-[family-name:var(--font-playfair)]">
                                {story.title}
                            </h3>
                            <div className="text-xs text-gray-500 font-medium">
                                {story.author && <span>{story.author}</span>}
                                {story.author && story.readTime && <span className="mx-1">·</span>}
                                {story.readTime && <span>{story.readTime}</span>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
